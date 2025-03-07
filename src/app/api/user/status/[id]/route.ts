import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { status } = await req.json();
        const { id } = params;

        await prisma.user.update({
            where: { id: Number(id) },
            data: { status: status }
        });

        console.log(status);
        console.log(id);
        

        return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ message: "Error updating status" }, { status: 500 });
    }
}