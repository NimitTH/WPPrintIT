import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { prisma } from "@/lib/prisma"

const UPLOAD_DIR = path.resolve(process.cwd() ?? "" , "public/uploads")

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File | null;
        console.log(file);
        
        if (file) {
            if (!fs.existsSync(UPLOAD_DIR)) {
                console.error("Upload directory does not exist:", UPLOAD_DIR);
                fs.mkdirSync(UPLOAD_DIR, { recursive: true });
            }
            
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(path.resolve(UPLOAD_DIR, file.name), buffer);
            
        } else {
            return NextResponse.json({ success: false, message: "No file uploaded" });
        }
        
        const filePath = `/uploads/${file.name}`;

        return NextResponse.json({
            success: true,
            name: file.name,
            url: filePath, // URL ของไฟล์
        });
        
    } catch (error) {
        console.log(error);
    }
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