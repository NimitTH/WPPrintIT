import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        return NextResponse.json(await prisma.product.deleteMany())
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }
}