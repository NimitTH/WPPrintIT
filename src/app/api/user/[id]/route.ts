import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { image } = await req.json();
        const id = params.id;
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: { image },
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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