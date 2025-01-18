import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");

        const orders = await prisma.order.findMany({
            where: { 
                userId: Number(params.id),
                status: status,
            },
            include: { 
                orderitem: true && {
                    include: {
                        product: true,
                        screened_images: true
                    }
                }
            },
            orderBy: { order_date: "desc" },
        });

        // รวม orderitem ของทุก order
        const orderItems = orders.flatMap((order) =>
            order.orderitem.map((item) => ({
                ...item,
                status: order.status, // เพิ่มสถานะของ order
                order_id: order.order_id, // เพิ่มรหัสของ order
                total_amount: order.total_amount, // เพิ่มจำนวนเงินทั้งหมด
                total_quantity: order.total_quantity, // เพิ่มจำนวนเงินทั้งหมด
                order_date: order.order_date, // เก็บวันที่ของ order
            }))
        );
        
        return NextResponse.json(orderItems);
    } catch (error) {
        console.log(error);
    }
}