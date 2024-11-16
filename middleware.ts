import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/stateless-session';
import { cookies } from 'next/headers';

// 1. Specify protected and public routes with patterns
const protectedRoutePattern = /^\/dashboard\/[^\/]+\/[^\/]+$/; // Protects only /dashboard/[belajar]/[quiz]
const publicRoutes = ['/login', '/signup', '/'];

export default async function middleware(req: NextRequest) {
  // 2. Get the current path
  const path = req.nextUrl.pathname;
  
  // 3. Check if the current route matches the protected pattern
  const isProtectedRoute = protectedRoutePattern.test(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 4. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 5. Redirect logic
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/redirect', req.nextUrl));
  }

  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  return NextResponse.next();
}
