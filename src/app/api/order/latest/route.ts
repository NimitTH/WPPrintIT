import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const order = await prisma.order.findFirst({
            where: { userId: Number(userId) },
            include: { orderitem: { include: { product: true } } },
            orderBy: { order_date: "desc" },
        });

        if (!order) {
            return NextResponse.json({ error: "No orders found" }, { status: 404 });
        }

        return NextResponse.json({ order });
    } catch (error) {
        console.error("Error fetching latest order:", error);
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
