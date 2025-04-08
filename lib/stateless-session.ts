import 'server-only';

import type { SessionPayload } from './definitions';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Pastikan secret key ada
const secretKey = process.env.SECRET || process.env.NEXTAUTH_SECRET;
if (!secretKey) {
  console.error('[StatelessSession] SECRET atau NEXTAUTH_SECRET tidak ditemukan di environment variables');
}
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  console.log("[StatelessSession] Encrypting payload", { userId: payload.userId, isAdmin: payload.isAdmin });
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1w')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  if (!session || session.trim() === '') {
    console.log("[StatelessSession] Empty session provided to decrypt");
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    console.log("[StatelessSession] Successfully decrypted session for user:", (payload as SessionPayload).userId);
    return payload as SessionPayload;
  } catch (error) {
    console.error("[StatelessSession] Error decrypting session:", error);
    return null;
  }
}

export async function createSession(userId: string, isAdmin: boolean) {
  try {
    console.log("[StatelessSession] Creating session for user:", userId);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
    const session = await encrypt({ userId, isAdmin, expiresAt });
    
    // Log untuk debug
    console.log("[StatelessSession] Session token created:", session ? "Success" : "Failed");
    
    // Set cookie dengan opsi yang benar
    cookies().set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
    
    // Cek kalau cookie berhasil disimpan
    const savedCookie = cookies().get('session');
    console.log("[StatelessSession] Cookie saved:", savedCookie ? "Yes" : "No");

    // Dapatkan redirect URL dari cookie atau default
    const lastPage = cookies().get('redirectAfterLogin')?.value || (isAdmin ? '/admin' : '/dashboard');
    console.log("[StatelessSession] Redirecting to:", lastPage);

    // Hapus cookie redirect setelah digunakan
    cookies().set('redirectAfterLogin', '', { expires: new Date(0), path: '/' });

    return redirect(lastPage);
  } catch (error) {
    console.error("[StatelessSession] Error creating session:", error);
    return redirect('/login?error=session_creation_failed');
  }
}

export async function verifySession() {
  console.log("[StatelessSession] Verifying session");
  const cookie = cookies().get('session')?.value;
  
  if (!cookie) {
    console.log("[StatelessSession] No session cookie found");
    return { isAuth: false, userId: undefined };
  }
  
  console.log("[StatelessSession] Found session cookie, decrypting");
  const session = await decrypt(cookie);
  
  if (!session || !session.userId) {
    console.log("[StatelessSession] Invalid session data");
    return { isAuth: false, userId: undefined };
  }
  
  // Cek apakah session sudah expired
  if (session.expiresAt && new Date(session.expiresAt) < new Date()) {
    console.log("[StatelessSession] Session expired");
    return { isAuth: false, userId: undefined };
  }
  
  console.log("[StatelessSession] Valid session for user:", session.userId);
  return { isAuth: true, userId: session.userId, isAdmin: session.isAdmin };
}

export async function updateSession() {
  console.log("[StatelessSession] Updating session");
  const sessionCookie = cookies().get('session')?.value;
  
  if (!sessionCookie) {
    console.log("[StatelessSession] No session to update");
    return null;
  }
  
  const payload = await decrypt(sessionCookie);

  if (!payload || !payload.userId) {
    console.log("[StatelessSession] Invalid payload in session, cannot update");
    return null;
  }

  // Perbarui waktu kedaluwarsa
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const newPayload = {
    ...payload,
    expiresAt: expires
  };
  
  // Buat token baru
  const newSession = await encrypt(newPayload);
  
  // Set cookie dengan token baru
  cookies().set('session', newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
  
  console.log("[StatelessSession] Session updated for user:", payload.userId);
  return { userId: payload.userId, isAdmin: payload.isAdmin };
}

export function deleteSession() {
  console.log("[StatelessSession] Deleting session");
  cookies().delete('session');
  
  // Juga hapus cookie NextAuth untuk berjaga-jaga
  cookies().delete('next-auth.session-token');
  cookies().delete('next-auth.csrf-token');
  cookies().delete('next-auth.callback-url');
  
  console.log("[StatelessSession] Session deleted, redirecting to homepage");
  return redirect('/');
}
