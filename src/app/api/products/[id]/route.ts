import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: { id: string } }) {
    return Response.json(await prisma.product.findUnique({
        where: { product_id: Number(params.id) },
        include: { category: true }
    }))
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { image, product_name, description, price ,stock } = await req.json()
        const editproduct = await prisma.product.update({
            where: { product_id: Number(params.id) },
            data: { image, product_name, description, price ,stock }
        })
        return Response.json(editproduct)
    } catch (error) {
        return new Response(error as BodyInit, { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try { 
        return Response.json(await prisma.product.delete({
            where: { product_id: Number(params.id) },
        }))
    } catch (error) {
        return new Response(error as BodyInit, {
            status: 500,
        })
    }
}