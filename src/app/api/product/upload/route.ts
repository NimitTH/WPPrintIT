import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma"
import { put } from "@vercel/blob";

// const UPLOAD_DIR = path.resolve(process.cwd() ?? "" , "public/product/images")

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
        return NextResponse.json({ success: false, message: "No file uploaded" });
    }
    try {
        const blob = await put(`image/product/${file.name}`, await file.arrayBuffer(), {
            access: "public", // ให้ URL สามารถเข้าถึงได้
            contentType: file.type, // ระบุ Content-Type
        });

        const fileUrl = blob.url;

        return NextResponse.json({
            success: true,
            name: file.name,
            url: fileUrl, // URL ของไฟล์ที่อัปโหลด
        });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ success: false, message: "Upload failed" });
    }

    
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
    
    // const filePath = `/product/images/${file.name}`;
    // console.log(filePath);
    
    // return NextResponse.json({
    //     success: true,
    //     name: file.name,
    //     url: filePath, // URL ของไฟล์
    // });
};

// export async function DELETE(req: Request) {
//     try {
//         const test = await req.json()
//         console.log(test);
//         return Response.json({ message: 'fasdf'});
//     } catch (error) {
//         console.log(error);
//     }
    
// };