import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { status } = await request.json();
        const { id } = params;

        await prisma.order.update({
            where: { order_id: parseInt(id) },
            data: { status: status }
        });

        console.log(status, id);
        return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating status:", error);
        return NextResponse.json({ message: "Error updating status" }, { status: 500 });
    }

}