import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    return NextResponse.json(await prisma.product.findUnique({
        where: { product_id: Number(params.id) },
        
    }))
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { image, product_name, description, price, stock } = await req.json()
        
        const editproduct = await prisma.product.update({
            where: { product_id: Number(params.id) },
            data: { 
                image, 
                product_name, 
                description, 
                
                price, 
                stock 
            }
        })
        return NextResponse.json(editproduct)
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const id = params.id;
        await prisma.product.delete({
            where: { product_id: Number(id) },
        });

        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while deleting product" }, { status: 500 });
    }
}
