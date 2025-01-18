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
            include: { product: true, screened_images: true },
        })

        return NextResponse.json(cart);
    } catch (error: any) {
        return NextResponse.json({ error: 'An error occurred while fetching products' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { id, product_id, quantity, screened_image, total_price, additional, screened_images } = await req.json();
        console.log(additional);

        if (!id || !product_id || !quantity) {
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
                    total_amount: 0, // เปลี่ยนด้วย
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            });
        }

        await prisma.cartitem.create({
            data: {
                userId: id,
                cartId: cart.cart_id,
                productId: product_id,
                quantity: quantity,
                screened_images: {
                    create: screened_images.map((url: string) => ({ screened_image_url: url })), // สร้างภาพหลายภาพในตาราง ScreenedImage
                },
                total_price: total_price,
                additional: additional
            },
            include: {
                screened_images: true, // ดึงข้อมูลภาพกลับมาด้วย
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
        const { id, product_id, quantity, screened_image, total_price } = await req.json();

        if (!id || !product_id || !quantity) {
            return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 });
        }

        type Cart = {
            cart_id: number;
            userId: number;
            createdAt: Date;
            updatedAt: Date;
            total_amount: number;
        }

        let cart: Cart | null = await prisma.cart.findFirst({
            where: { userId: id },
            include: { cartitem: true },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    total_amount: 0,
                },
            });
        }

        const existingCartItem = await prisma.cartitem.findFirst({
            where: {
                cartId: cart.cart_id,
                productId: product_id,
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
                    productId: product_id,
                    quantity: quantity,
                    total_price: total_price
                },
            });
        }

        return NextResponse.json({ message: "Product added to cart successfully" });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred while adding product to cart" }, { status: 500 });
    }

}