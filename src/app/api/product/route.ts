import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json(await prisma.product.findMany())
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { image, product_name, description, price, stock,  } = await req.json();
        
        const NewProduct = await prisma.product.create({
            data: {
                image,
                product_name,
                description,
                price,
                stock,
                updatedAt: new Date(),
                createdAt: new Date(),
            },
        })

        console.log(NewProduct);

        return NextResponse.json(NewProduct)
    } catch (error) {
        console.error(error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { product_id, image, product_name, description, price, stock } = await req.json();

        

        // อัปเดต Product พร้อมปรับปรุงความสัมพันธ์ของ Categories
        const updatedProduct = await prisma.product.update({
            where: { product_id },
            data: {
                product_name,
                description,
                price,
                image,
                stock,
            },
            
        });

        console.log(updatedProduct);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}