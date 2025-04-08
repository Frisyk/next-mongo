import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { jwtVerify } from 'jose';

// Konstanta untuk jalur yang memerlukan autentikasi
const protectedPaths = ['/dashboard/kuis', '/admin'];
const adminPaths = ['/admin'];

// Fungsi untuk decrypt token stateless
async function decryptStatelessToken(token: string | undefined) {
  if (!token) return null;
  
  try {
    const secretKey = process.env.SECRET || process.env.NEXTAUTH_SECRET;
    if (!secretKey) return null;
    
    const key = new TextEncoder().encode(secretKey);
    const { payload } = await jwtVerify(token, key, {
      algorithms: ['HS256'],
    });
    
    return payload;
  } catch (error) {
    console.error('[Middleware] Error decrypting stateless token:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Log semua cookies untuk debugging
  const allCookies = request.cookies.getAll().map(c => `${c.name}=${c.value.substring(0, 20)}...`);
  
  // Cek apakah rute memerlukan autentikasi
  const isProtectedRoute = protectedPaths.some(path => pathname.startsWith(path));
  const isAdminRoute = adminPaths.some(path => pathname.startsWith(path));
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Coba dapatkan token dari NextAuth
  const nextAuthToken = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  // Coba dapatkan token dari stateless session
  const statelessToken = await decryptStatelessToken(
    request.cookies.get('session')?.value
  );
  
  
  // Verifikasi autentikasi - user valid jika salah satu token ada
  const isAuthenticated = Boolean(nextAuthToken || (statelessToken && statelessToken.userId));
  
  // Verifikasi admin - periksa kedua token
  const isAdmin = 
    (nextAuthToken && nextAuthToken.isAdmin === true) || 
    (statelessToken && statelessToken.isAdmin === true);
  
  // Redirect ke login jika tidak terotentikasi
  if (!isAuthenticated) {
    
    // Menyimpan URL tujuan asli
    const callbackUrl = encodeURIComponent(pathname);
    const loginUrl = new URL(`/login?callbackUrl=${callbackUrl}`, request.url);
    
    return NextResponse.redirect(loginUrl);
  }
  
  // Cek akses admin
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Admin diredirect langsung ke dashboard admin
  if (isAdmin && pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  // User terotentikasi dan memiliki izin yang benar
  return NextResponse.next();
}

// Konfigurasi untuk menentukan path mana yang harus diproses oleh middleware
export const config = {
  matcher: [
    '/dashboard/kuis/:path*',
    '/admin/:path*',
    '/api/admin/:path*'
  ],
}
