import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: Request) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const status = token?.status;
  const isSuspended = status === 'suspended';
  const userRole = token?.role;
  const isAdmin = userRole === 'ADMIN';

  // หน้าที่ต้องการให้ล็อกอินก่อนเข้าถึง
  const protectedPaths = [
    '/admin', '/admin/users', '/admin/products', '/admin/order', 
    '/home', '/cart', '/order', '/profile', 'password'
  ];

  // หน้าที่ต้องการให้เฉพาะ admin เข้าถึง
  const adminPaths = ['/admin', '/admin/user', '/admin/product', '/admin/order'];
  const isProtectedPath = protectedPaths.some((path) => req.url.includes(path));
  const isAdminPath = adminPaths.some((path) => req.url.includes(path));


  if (isSuspended) {
    return NextResponse.redirect(new URL('/suspended', req.url));
  }
  
  if (isAdminPath && !isAdmin) {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// กำหนดว่า middleware นี้จะทำงานกับทุก path
export const config = {
  matcher: [
    '/',
    '/admin/:path*',
    '/products/:path*',
    '/home',
    '/cart',
    '/order',
    '/profile',
    '/password',
    '/api/user/password',
  ],
};
