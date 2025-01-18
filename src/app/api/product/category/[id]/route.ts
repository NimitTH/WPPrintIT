import { prisma } from '@/lib/prisma'
import { NextResponse, type NextRequest } from 'next/server';


export async function DELETE(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        return NextResponse.json(
            await prisma.category.delete({
                where: { category_id: Number(params.id) }
            })
        )
    } catch (error) {
        console.log(error);
    }
}