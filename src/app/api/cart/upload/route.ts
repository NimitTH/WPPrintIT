import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma"

const UPLOAD_DIR = path.resolve(process.cwd() ?? "" , "public/cart/images")

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const files = formData.getAll("images") as File[];

    if (files.length === 0) {
        return NextResponse.json({ success: false, message: "No files uploaded" });
    }

    if (!fs.existsSync(UPLOAD_DIR)) {
        fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const urls: string[] = [];
    for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.resolve(UPLOAD_DIR, file.name);
        fs.writeFileSync(filePath, buffer);

        urls.push(`/cart/images/${file.name}`);
    }

    console.log("Uploaded files:", urls);

    return NextResponse.json({
        success: true,
        urls, // ส่ง URL ของภาพทั้งหมดกลับ
    });
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