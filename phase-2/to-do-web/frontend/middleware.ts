import { NextRequest, NextResponse } from 'next/server';

// Protect dashboard route
export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;

  // Define protected routes
  const protectedPaths = ['/dashboard'];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  // If user is trying to access a protected route without a token
  if (isProtectedPath && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login/signup pages, redirect to dashboard
  const authPaths = ['/login', '/signup'];
  const isAuthPath = authPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (token && isAuthPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific paths
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
