import 'server-only';

import type { SessionPayload } from './definitions';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1w')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    });
    return payload as SessionPayload;
  } catch (error) {
    return null;
  }
}


export async function createSession(userId: string, isAdmin: boolean) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week
  const session = await encrypt({ userId, isAdmin, expiresAt });
  
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });

  const lastPage = cookies().get('redirectAfterLogin')?.value || (isAdmin ? '/admin' : '/dashboard');

  // Hapus cookie setelah digunakan
  cookies().set('redirectAfterLogin', '', { expires: new Date(0), path: '/' });

  return redirect(lastPage);
}


export async function verifySession() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);  
  
  // if (!session?.userId && ) {
  //   redirect('/');
  // }
  
  return { isAuth: true, userId: session?.userId };
}

export async function updateSession() {
  const session = cookies().get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  });
}

export function deleteSession() {
  cookies().delete('session');
  redirect('/');
}
