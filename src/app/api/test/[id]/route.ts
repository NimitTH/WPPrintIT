import { NextRequest, NextResponse } from 'next/server';
import {prisma} from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;

        if (!id || isNaN(parseInt(id))) {
            return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
        }

        await prisma.product.delete({
            where: { product_id: Number(id) },
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while deleting product" }, { status: 500 });
    }
}