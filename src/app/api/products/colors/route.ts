import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server';

export async function GET() {
    try {
        return NextResponse.json(await prisma.productcolor.findMany())
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { color_name } = await req.json()
        const NewColor = await prisma.productcolor.create({
            data: { 
                color_name,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
        return Response.json(NewColor)
    } catch (error) {
        console.log(error);
    }
}