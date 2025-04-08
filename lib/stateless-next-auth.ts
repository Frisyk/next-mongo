import 'server-only';

import { encrypt, decrypt } from './stateless-session';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Fungsi untuk mengambil data session NextAuth dan menyimpannya di stateless session
export async function syncSessionFromNextAuth() {
  try {
    console.log("[StatelessNextAuth] Syncing session from NextAuth");
    const nextAuthSession = await getServerSession(authOptions);
    
    if (!nextAuthSession || !nextAuthSession.user || !nextAuthSession.user.id) {
      console.log("[StatelessNextAuth] No valid NextAuth session found");
      return null;
    }
    
    // Ambil data dari NextAuth session
    const { id, isAdmin = false } = nextAuthSession.user;
    
    // Buat session stateless baru
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 minggu
    const session = await encrypt({ userId: id, isAdmin, expiresAt });
    
    // Simpan session baru di cookie
    cookies().set('session', session, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
    
    console.log("[StatelessNextAuth] Session synced successfully for user:", id);
    return { userId: id, isAdmin };
  } catch (error) {
    console.error("[StatelessNextAuth] Error syncing session:", error);
    return null;
  }
}

// Fungsi untuk memeriksa apakah session valid dengan prioritas NextAuth
export async function getAuthSession() {
  console.log("[StatelessNextAuth] Checking auth session");
  
  // Coba ambil session dari NextAuth dulu
  const nextAuthSession = await getServerSession(authOptions);
  
  if (nextAuthSession?.user?.id) {
    console.log("[StatelessNextAuth] Found valid NextAuth session");
    
    // Sync NextAuth session ke stateless session
    await syncSessionFromNextAuth();
    
    return {
      isAuth: true,
      userId: nextAuthSession.user.id,
      isAdmin: nextAuthSession.user.isAdmin || false
    };
  }
  
  // Jika tidak ada NextAuth session, cek stateless session
  console.log("[StatelessNextAuth] Checking stateless session");
  const cookie = cookies().get('session')?.value;
  
  if (!cookie) {
    console.log("[StatelessNextAuth] No stateless session cookie found");
    return { isAuth: false, userId: null, isAdmin: false };
  }
  
  const session = await decrypt(cookie);
  
  if (!session?.userId) {
    console.log("[StatelessNextAuth] Invalid stateless session");
    return { isAuth: false, userId: null, isAdmin: false };
  }
  
  console.log("[StatelessNextAuth] Valid stateless session found for user:", session.userId);
  return {
    isAuth: true,
    userId: session.userId,
    isAdmin: session.isAdmin || false
  };
}

// Fungsi untuk memastikan user terautentikasi dengan mendukung kedua jenis session
export async function requireAuthVerify() {
  const { isAuth, userId, isAdmin } = await getAuthSession();
  
  if (!isAuth || !userId) {
    console.log("[StatelessNextAuth] Redirecting unauthenticated user to login");
    
    // Simpan path tujuan untuk redirect setelah login
    const currentPath = cookies().get('currentPath')?.value || '/dashboard';
    cookies().set('redirectAfterLogin', currentPath, {
      path: '/',
      maxAge: 60 * 10, // 10 menit
      httpOnly: true,
      sameSite: 'lax'
    });
    
    redirect('/login');
  }
  
  return { userId, isAdmin };
}

// Fungsi untuk mendapatkan data user lengkap dari database
export async function getUserById(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/user/${userId}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error("[StatelessNextAuth] Error fetching user data:", error);
    return null;
  }
} 