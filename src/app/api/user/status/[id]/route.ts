import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { status } = await request.json();
        const { id } = params;

        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { status: status }
        });

        return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ message: "Error updating status" }, { status: 500 });
    }
   
}