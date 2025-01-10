import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { role } = await request.json();
        const { id } = params;

        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { role: role }
        });

        return NextResponse.json({ message: "Role updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating role:", error);
        return NextResponse.json({ message: "Error updating role" }, { status: 500 });
    }
}