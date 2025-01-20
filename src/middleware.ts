import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { auth } from "@/auth"

export default auth(async(req: Request) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  const status = token?.status;
  const isSuspended = status === 'suspended';
  if (isSuspended) {
    return NextResponse.redirect(new URL('/suspended', req.url));
  }

  const userRole = token?.role;
  const isAdmin = userRole === 'ADMIN';
  const adminPaths = ['/admin', '/admin/user', '/admin/product', '/admin/order'];
  const isAdminPath = adminPaths.some((path) => req.url.includes(path));
  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL('/products', req.url));
  }

  const protectedPaths = [
    '/admin', '/admin/users', '/admin/products', '/admin/order',
    '/products', '/cart', '/order', '/profile', 'password'
  ];
  const isProtectedPath = protectedPaths.some((path) => req.url.includes(path));
  if (isProtectedPath && !token) {
    console.log("Token:", token);
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  console.log("Request URL:", req.url);
  console.log("Admin path:", isAdminPath);
  console.log("Token:", token);
  console.log("Protected path:", isProtectedPath);

  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/',
    '/admin/:path*',
    '/product/:path*',
    '/products',
    '/cart',
    '/order',
    '/profile',
    '/password',
  ],
};
