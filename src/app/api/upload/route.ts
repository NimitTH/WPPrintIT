import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { put } from "@vercel/blob";

// const UPLOAD_DIR = path.resolve(process.cwd() ?? "" , "public/uploads")

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }

    try {
        // อัปโหลดไฟล์ไปยัง Vercel Blob
        const blob = await put(`image/user/${file.name}`, await file.arrayBuffer(), {
            access: "public", // ให้ URL สามารถเข้าถึงได้
            contentType: file.type, // ระบุ Content-Type
        });

        // สร้าง URL สำหรับไฟล์ที่อัปโหลด
        const fileUrl = blob.url;

        return NextResponse.json({
            success: true,
            name: file.name,
            url: fileUrl, // URL ของไฟล์ที่อัปโหลด
        });
        
        // if (file) {
        //     if (!fs.existsSync(UPLOAD_DIR)) {
        //         console.error("Upload directory does not exist:", UPLOAD_DIR);
        //         fs.mkdirSync(UPLOAD_DIR, { recursive: true });
        //     }
            
        //     const buffer = Buffer.from(await file.arrayBuffer());
        //     fs.writeFileSync(path.resolve(UPLOAD_DIR, file.name), buffer);
            
        // } else {
        //     return NextResponse.json({ success: false, message: "No file uploaded" });
        // }
        
        // const filePath = `/uploads/${file.name}`;

        // return NextResponse.json({
        //     success: true,
        //     name: file.name,
        //     url: filePath, // URL ของไฟล์
        // });
        
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ success: false, message: "Upload failed" });
    }
};

// export async function DELETE(req: Request) {
//     try {
//         // ลบไฟล์จาก Vercel Blob

//         return Response.json({ message: 'fasdf'});
//     } catch (error) {
//         console.log(error);
//     }
// };