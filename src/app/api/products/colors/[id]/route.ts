import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { color_name } = await req.json()
        const EditColor = await prisma.productcolor.update({
            where: { color_id: Number(params.id) },
            data: { color_name }
        })
        return NextResponse.json(EditColor)
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE({ params }: { params: { id: string } }) {
    try {
        return NextResponse.json(
            await prisma.productcolor.delete({
                where: { color_id: Number(params.id) }
            })
        )
    } catch (error) {
        console.log(error);
    }
}