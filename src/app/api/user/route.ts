import { prisma } from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany(); // ตัวอย่าง query
    return NextResponse.json(users)
}



export async function PUT(req: Request) {
    try {
        const { name, username, email, tel, address, image } = await req.json();

        if (!email) {
            return Response.json({ error: "Email is required" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                name: name,
                username: username,
                email: email,
                tel: tel,
                address: address,
                image: image,
                updatedAt: new Date()
            },
        });

        return Response.json({
            message: "User edited successfully",
            user: updatedUser,
        });
    } catch (error: any) {
        console.error("Error updating user:", error);

        return Response.json(
            { error: "User could not be edited", details: error.message },
            { status: 500 }
        )
    }
}
