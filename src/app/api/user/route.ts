import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany(); // ตัวอย่าง query
    return NextResponse.json(users)
}

export async function PUT(req: Request) {
    try {
        const { name, username, email, tel, address, image } = await req.json();

        // ตรวจสอบว่า email มีค่าหรือไม่
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // ถ้ารหัสผ่านใหม่ถูกส่งมา ให้เข้ารหัส
        // let hashedPassword: string | undefined = undefined;
        // if (password) {
        //     hashedPassword = bcryptjs.hashSync(password, 10);
        // }

        // อัปเดตข้อมูลผู้ใช้
        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                name,
                username,
                email,
                tel,
                address,
                image,
                // ...(hashedPassword && { password: hashedPassword }), // เพิ่มเฉพาะเมื่อมี hashedPassword
            },
        });

        return NextResponse.json({
            message: "User edited successfully",
            user: updatedUser,
        });
    } catch (error: any) {
        console.error("Error updating user:", error);

        return NextResponse.json(
            { error: "User could not be edited", details: error.message },
            { status: 500 }
        )
    }
}
