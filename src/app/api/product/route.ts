import { prisma } from '@/lib/prisma'
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        return NextResponse.json(await prisma.product.findMany({ include: { category: true } }))
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { image, product_name, description, price, stock, category } = await req.json();

        const categoryRecords = await Promise.all(
            category.map(async (categoryName: string) => {
                return await prisma.category.upsert({
                    where: { category_name: categoryName },
                    update: { },
                    create: { 
                        category_name: categoryName,
                        updatedAt: new Date()
                    },
                });
            })
        );
        
        const NewProduct = await prisma.product.create({
            data: {
                image,
                product_name,
                description,
                price,
                stock,
                category: {
                    connect: categoryRecords.map((category: any) => ({ category_name: category.category_name })),
                },
                updatedAt: new Date(),
                createdAt: new Date(),
            },
            include: {
                category: true,
            },
        })

        console.log(NewProduct);

        return NextResponse.json(NewProduct)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { product_id, image, product_name, description, category, price, stock } = await req.json();

        const categoryRecords = await Promise.all(
            category.map(async (categoryName: string) => {
                return await prisma.category.upsert({
                    where: { category_name: categoryName },
                    update: { },
                    create: { 
                        category_name: categoryName,
                        updatedAt: new Date()
                    },
                });
            })
        );
        

        // อัปเดต Product พร้อมปรับปรุงความสัมพันธ์ของ Categories
        const updatedProduct = await prisma.product.update({
            where: { product_id },
            data: {
                product_name,
                description,
                category: {
                    set: categoryRecords.map((category) => ({ category_id: category.category_id })), // ล้างของเก่าและตั้งค่าความสัมพันธ์ใหม่
                },
                price,
                image,
                stock,
            },
            include: {
                category: true,
            },
            
        });

        console.log(updatedProduct);
        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }
}