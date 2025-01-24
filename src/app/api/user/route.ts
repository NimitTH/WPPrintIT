import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        });
        
        return NextResponse.json(users);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { name, username, email, tel, address, image } = await req.json();

        console.log(name, username, email, tel, address, image);


        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
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
