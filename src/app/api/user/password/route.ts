import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"

export async function PUT(req: NextRequest) {
    try {
        
        // อ่าน Body ของคำขอเพียงครั้งเดียว
        const body = await req.json();
        console.log("Request body:", body);

        const { id, password, newpassword } = body;

        if (!id || !password || !newpassword) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // ค้นหา User
        const user = await prisma.user.findUnique({ where: { id: id } });
        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcryptjs.compare(password, user.password!);
        console.log("Password match result:", isMatch); // true หรือ false
        
        if (!isMatch) {
            return NextResponse.json(
                { error: "Invalid current password" },
                { status: 401 }
            );
        }


        // แฮชรหัสผ่านใหม่
        const hashedPassword = await bcryptjs.hash(newpassword, 10);

        // อัปเดตรหัสผ่าน
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { password: hashedPassword },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Error updating password:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
