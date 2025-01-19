import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {

        const cart = await prisma.cartitem.findMany({
            where: { userId: Number(params.id) },
            include: { product: true, screenedimages: true },
        });

        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while fetching products" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { quantity, screened_image, total_price } = await req.json();
        
        await prisma.cartitem.update({
            where: { cart_item_id: Number(params.id) },
            data: { 
                quantity: quantity,
                screened_image: screened_image,
                total_price: total_price,
            },
        });
        
        return NextResponse.json({ message: "Product added to cart successfully"});
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while adding product to cart" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        
        await prisma.cartitem.delete({
            where: { cart_item_id: Number(params.id) },
        });

        return NextResponse.json({ message: "Product removed from cart successfully"});
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while removing product from cart" }, { status: 500 });
    }
    
}

// const { id, productId, quantity } = await req.json();
        
        // ตรวจสอบว่าข้อมูลที่จำเป็นครบถ้วนหรือไม่
        // if (!id || !productId || !quantity) {
            //     return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
            // }
            
            // // ค้นหาตะกร้าของผู้ใช้
        // let cart: any = await prisma.cart.findFirst({
        //     where: { userId: id },
        //     include: { cartItem: true },
        // });

        // // ถ้าไม่มีตะกร้า ให้สร้างใหม่
        // if (!cart) {
            //     cart = await prisma.cart.create({
                //         data: {
        //             userId: id,
        //         },
        //     });
        // }