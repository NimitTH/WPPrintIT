import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Debug token
  console.log("Token:", token);

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  const status = token?.status;
  const isSuspended = status === 'suspended';
  const userRole = token?.role;
  const isAdmin = userRole === 'ADMIN';

  // หน้า protected paths
  const protectedPaths = ['/admin', '/home', '/cart', '/order', '/profile'];
  const isProtectedPath = protectedPaths.some((path) => req.url.includes(path));

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (isSuspended) {
    return NextResponse.redirect(new URL('/suspended', req.url));
  }

  const adminPaths = ['/admin', '/admin/users', '/admin/products', '/admin/order'];
  const isAdminPath = adminPaths.some((path) => req.url.includes(path));

  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  console.log("Request URL:", req.url);
  console.log("Token:", token);
  console.log("Protected path:", isProtectedPath);
  console.log("Admin path:", isAdminPath);


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/products/:path*',
    '/home',
    '/cart',
    '/order',
    '/profile',
    '/password',
  ],
};

