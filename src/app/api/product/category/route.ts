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
            data: { category_name }
        })
        return NextResponse.json(NewCategori)
    } catch (error) {
        console.log(error);
    }
}