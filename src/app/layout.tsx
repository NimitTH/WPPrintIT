import React from 'react';
import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Sarabun } from "next/font/google";
// import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react"

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// const thSarabun = localFont({
//   src: "./fonts/Sarabun-Regular.ttf",
//   variable: "--font-th-sarabun",
//   weight: "100 900",
// });

const sarabun = Sarabun({
  subsets: ['thai', 'latin'],
  weight: ['400', '700'],
  // style: ['normal', 'italic'],
  display: 'swap',
});

// const bai_jamjuree = Bai_Jamjuree({
//   subsets: ['thai', 'latin'],
//   weight: ['400', '700'],
//   style: ['normal', 'italic'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: "WPPrintIT",
  description: "เว็บสำหรับสั่งซื้อสินค้า ปรินท์ที่มีคุณภาพ",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" className="font-sans">
      <body
        className={`${sarabun.className} antialiased`}
      >
        <SessionProvider>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
