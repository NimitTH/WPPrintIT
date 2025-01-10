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
        const { name } = await req.json()
        console.log(name);
        
        const NewCategori = await prisma.category.create({
            data: { name }
        })
        return NextResponse.json(NewCategori)
    } catch (error) {
        console.log(error);
    }
}