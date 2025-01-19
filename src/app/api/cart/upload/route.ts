import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob";

// const UPLOAD_DIR = path.resolve(process.cwd() ?? "" , "public/cart/images")

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (files.length === 0) {
        return NextResponse.json({ success: false, message: "No files uploaded" });
    }

    // if (!fs.existsSync(UPLOAD_DIR)) {
    //     fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    // }

    const urls: string[] = [];

    try {
        for (const file of files) {
            const blob = await put(`cart/images/${file.name}`, await file.arrayBuffer(), {
                access: "public", // ให้ไฟล์เข้าถึงได้ผ่าน URL
                contentType: file.type, // ระบุประเภทไฟล์ (MIME Type)
            });

            urls.push(blob.url); // เก็บ URL ของไฟล์ที่อัปโหลด
        }

        console.log("Uploaded files:", urls);

        return NextResponse.json({
            success: true,
            urls, // ส่งกลับ URL ของภาพทั้งหมด
        });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ success: false, message: "Upload failed" });
    }
    // for (const file of files) {
    //     const buffer = Buffer.from(await file.arrayBuffer());
    //     const filePath = path.resolve(UPLOAD_DIR, file.name);
    //     fs.writeFileSync(filePath, buffer);

    //     urls.push(`/cart/images/${file.name}`);
    // }

    // console.log("Uploaded files:", urls);

    // return NextResponse.json({
    //     success: true,
    //     urls, // ส่ง URL ของภาพทั้งหมดกลับ
    // });
}


// export async function DELETE(req: Request) {
//     try {
//         const test = await req.json()
//         console.log(test);
//         return Response.json({ message: 'fasdf'});
//     } catch (error) {
//         console.log(error);
//     }
    
// };