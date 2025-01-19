/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // โดเมนของ Google
        domains: ["wpprintit.vercel.app"],
    },
    // experimental: {
    //     esmExternals: true, // เปิดใช้งานการรองรับไฟล์ .mjs
    //     appDir: true, // หากคุณใช้ App Router
    // },
};



export default nextConfig;