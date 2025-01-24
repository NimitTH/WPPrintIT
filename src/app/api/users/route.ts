import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json(await prisma.user.findMany({
            orderBy: { createdAt: "desc" },
        }));
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while fetching users" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { name, username, email, tel, address, image } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                username: username,
                email: email,
                tel: tel,
                address: address,
                image: image,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        return NextResponse.json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error: any) {
        console.error("Error creating user:", error);

        return NextResponse.json(
            { error: "User could not be created", details: error.message },
            { status: 500 }
        )
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
