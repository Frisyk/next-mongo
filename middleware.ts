import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/stateless-session';
import { cookies } from 'next/headers';

// Define protected patterns for admin and normal routes
const protectedRoutePattern = /^\/dashboard\/[^\/]+\/[^\/]+$/; // Protects /dashboard/[belajar]/[quiz]
const adminRoutePattern = /^\/admin/; // Protects any /admin routes
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if the route is protected or admin-only
  const isProtectedRoute = protectedRoutePattern.test(path);
  const isAdminRoute = adminRoutePattern.test(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // Redirect logic for protected routes
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/redirect', req.nextUrl));
  }

  // Redirect logic for admin routes
  if (isAdminRoute) {
    if (!session?.userId || !session?.isAdmin) {
      // console.log(session);
      return NextResponse.redirect(new URL('/', req.nextUrl)); // Redirect unauthorized users to login
    }
  }

  // Redirect logic for public routes
  if (isPublicRoute && session?.userId && !path.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
