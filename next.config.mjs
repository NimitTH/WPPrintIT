/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // โดเมนของ Google
    },
    experimental: {
        esmExternals: true, // เปิดใช้งานการรองรับไฟล์ .mjs
        appDir: true, // หากคุณใช้ App Router
    },
};



export default nextConfig;