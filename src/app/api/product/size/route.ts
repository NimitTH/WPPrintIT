import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        return NextResponse.json(await prisma.size.findMany())
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const { size_name } = await request.json()
        return NextResponse.json(await prisma.size.create({ data: { size_name } }))
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}
