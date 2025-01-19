import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        return NextResponse.json(await prisma.category.findMany())
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { category_name } = await req.json()
        console.log(category_name);
        
        const NewCategori = await prisma.category.create({
            data: { 
                category_name: category_name,
                updatedAt: new Date(), 
            }
        })
        return NextResponse.json(NewCategori)
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { categories } = await req.json();
        console.log(categories);

        const updatePromises = categories.map((category: any) =>
            prisma.category.update({
                where: { category_id: category.category_id },
                data: { category_name: category.category_name },
            })
        );

        await Promise.all(updatePromises);
        return NextResponse.json({ message: "Categories updated successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}