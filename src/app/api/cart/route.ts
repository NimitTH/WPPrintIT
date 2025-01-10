import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// export async function GET(req: NextRequest) {
//     try {
//         return NextResponse.json(await prisma.cartItem.findMany());
//     } catch (error) {
//         return NextResponse.json({ error: 'An error occurred while fetching products' }, { status: 500 });
//     }
// }
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('userId');
        
        const cart = await prisma.cartitem.findMany({
            where: { userId: Number(userId) },
            include: { product: true, },
        })

        return NextResponse.json(cart);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { id, productId, quantity, screened_image, total_price } = await req.json();
        console.log(total_price);
        
        if (!id || !productId || !quantity ) {
            return NextResponse.json({ error: 'Please provide all required fields' }, { status: 400 });
        }

        let cart: any = await prisma.cart.findFirst({
            where: { userId: id },
            include: { cartitem: true },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { 
                    userId: id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    total_amount: 100, // เปลี่ยนด้วย
                }
            });
        }

        await prisma.cartitem.create({
            data: {
                userId: id,
                cartId: cart.cart_id,
                productId,
                quantity,
                screened_image,
                total_price: total_price || 0.0,
            },
        });

        return NextResponse.json({ message: 'Item added to cart successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while adding the item to the cart' }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { id, productId, quantity, screened_image, total_price } = await req.json();
        
        if (!id || !productId || !quantity) {
            return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
        }

        let cart: any = await prisma.cart.findFirst({
            where: { userId: id },
            include: { cartitem: true },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: id ,
                } as any,
            });
        }

        const existingCartItem = await prisma.cartitem.findFirst({
            where: {
                cartId: cart.cart_id,
                productId,
            },
        });

        if (existingCartItem) {
            await prisma.cartitem.update({
                where: { cart_item_id: existingCartItem.cart_item_id },
                data: { 
                    quantity: existingCartItem.quantity,
                    screened_image: screened_image,
                    total_price: total_price || 0.0,
                },
            });
        } else {
            await prisma.cartitem.create({
                data: {
                    userId: id,
                    cartId: cart.cart_id,
                    productId,
                    quantity,
                    total_price
                },
            });
        }

        return NextResponse.json({ message: "Product added to cart successfully" });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while adding product to cart" }, { status: 500 });
    }

}