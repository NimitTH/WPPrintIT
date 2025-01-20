/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'], // โดเมนของ Google
        domains: ["wpprintit.vercel.app"],
        domains: [
            'p7dxvdesxarzmt14.public.blob.vercel-storage.com',
        ],
    },
    // experimental: {
    //     esmExternals: true, // เปิดใช้งานการรองรับไฟล์ .mjs
    //     appDir: true, // หากคุณใช้ App Router
    // },
};



export default nextConfig;