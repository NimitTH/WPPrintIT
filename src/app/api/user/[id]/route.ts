import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//     try {
//         const { image } = await req.json();
//         const id = params.id;
//         const user = await prisma.user.update({
//             where: { id: parseInt(id) },
//             data: { image },
//         });
//         return NextResponse.json(user);
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }


export async function PUT(req: NextRequest) {
    try {
        const { name, username, email, tel, address, image, id } = await req.json();

        console.log(name, username, email, tel, address, image, id);

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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        const user = await prisma.user.delete({
            where: { id: parseInt(id) },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}