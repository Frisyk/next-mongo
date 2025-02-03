import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/stateless-session';
import { cookies } from 'next/headers';

const protectedRoutePattern = /^\/dashboard\/[^\/]+\/[^\/]+$/;
const adminRoutePattern = /^\/admin/;
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutePattern.test(path);
  const isAdminRoute = adminRoutePattern.test(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Ambil session dari cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // Simpan halaman terakhir yang diakses sebelum login
  if (isProtectedRoute && !session?.userId) {
    const response = NextResponse.redirect(new URL('/redirect', req.nextUrl));
    response.cookies.set('redirectAfterLogin', path, { httpOnly: true, path: '/' });
    return response;
  }

  // Jika user mengakses halaman admin tanpa hak akses
  if (isAdminRoute) {
    if (!session?.userId || !session?.isAdmin) {
      return NextResponse.redirect(new URL('/', req.nextUrl));
    }
  }

  // Jika user yang sudah login mengakses halaman public
  if (isPublicRoute && session?.userId) {
    const redirectTo = cookies().get('redirectAfterLogin')?.value || (session?.isAdmin ? '/admin' : '/dashboard');
    return NextResponse.redirect(new URL(redirectTo, req.nextUrl));
  }

  return NextResponse.next();
}
