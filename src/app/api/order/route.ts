// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function POST(req: NextRequest) {
//     try {
//         const { userId, selectedItems } = await req.json();

//         if (!selectedItems || selectedItems.length === 0) {
//             return NextResponse.json({ error: "No items selected" }, { status: 400 });
//         }

//         // ดึงข้อมูลสินค้าเฉพาะที่เลือกใน Cart
//         const cartItems = await prisma.cartitem.findMany({
//             where: {
//                 cart_item_id: { in: selectedItems }, // ดึงเฉพาะ ID ที่เลือก
//                 cart: { userId: userId },
//             },
//             include: { product: true },
//         });

//         if (cartItems.length === 0) {
//             return NextResponse.json({ error: "No valid cart items found" }, { status: 400 });
//         }

//         // 1

//         // ดึงข้อมูล Cart และ CartItem ของผู้ใช้
//                                 const cart = await prisma.cart.findFirst({
//                                     where: { userId },
//                                     include: {
//                                         cartitem: {
//                                             include: {
//                                                 product: true, // ดึงข้อมูลสินค้าด้วย
//                                             },
//                                         },
//                                     },
//                                 });

//                                 if (!cart || cart.cartitem.length === 0) {
//                                     return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
//                                 }

//         // คำนวณราคาทั้งหมด
//         const totalPrice = cart.cartitem.reduce((sum, item: any) => {
//             return sum + item.product.price * item.quantity;
//         }, 0);

//         // สร้าง Order
//         const order = await prisma.order.create({
//             data: {
//                 userId: userId,
//                 total_amount: totalPrice,
//                 status: "pending", // เริ่มต้นสถานะเป็น "pending"
//                 orderitem: {
//                     create: cart.cartitem.map((item) => ({
//                         productId: item.productId,
//                         quantity: item.quantity,
//                         price: item.product.price,
//                         updatedAt: new Date(),
//                         createdAt: new Date()
//                     })),
//                 },
//                 updatedAt: new Date(),
//                 order_date: new Date(),
//                 address: "eiei"

//             },
//         });

//         // ลบ Cart หลังจากสร้าง Order
//         await prisma.cartitem.deleteMany({ where: { cartId: cart.cart_id } });
//         await prisma.cart.delete({ where: { cart_id: cart.cart_id } });

//         return NextResponse.json({ message: "Order created successfully", order });
//     } catch (error) {
//         console.error(error);
//         return NextResponse.json({ error: "An error occurred while creating the order" }, { status: 500 });
//     }
// }



// export async function GET(req: NextRequest) {
//     try {
//         const userId = req.headers.get("userId");

//         if (!userId) {
//             return NextResponse.json({ error: "User ID is required" }, { status: 400 });
//         }

//         const orders = await prisma.order.findMany({
//             where: { userId: Number(userId) },
//             include: { orderitem: { include: { product: true } } },
//             orderBy: { order_date: "desc" },
//         });

//         return NextResponse.json(orders);
//     } catch (error) {
//         console.log(error);

//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const orders = await prisma.order.findMany({
            include: { orderitem: { include: { product: true, orderscreenedimages: true } }, user: true },
            orderBy: { order_date: "desc" },
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const { userId, selectedItems } = await req.json();

        if (!selectedItems || selectedItems.length === 0) {
            return NextResponse.json({ error: "No items selected" }, { status: 400 });
        }

        const cartItems = await prisma.cartitem.findMany({
            where: {
                cart_item_id: { in: selectedItems },
                cart: { userId: userId, },
            },
            include: { product: true, screenedimages: true, },
        });

        if (cartItems.length === 0) {
            return NextResponse.json({ error: "No valid cart items found" }, { status: 400 });
        }

        const totalAmount = cartItems.reduce((sum, item: any) => {
            return sum + item.product.price * item.quantity;
        }, 0);

        const totalQuantity = cartItems.reduce((sum, item: any) => {
            return sum + item.quantity;
        }, 0);

        const order = await prisma.order.create({
            data: {
                userId: userId,
                orderitem: {
                    create: cartItems.map((item) => ({
                        productId: item.productId,
                        screened_image: item.screened_image,
                        orderscreenedimages: {
                            create: item.screenedimages.map((image) => ({
                                screened_image_url: image.screened_image_url,
                            })),
                        },
                        additional: item.additional,
                        quantity: item.quantity,
                        price: item.product.price,
                        total_price: item.product.price * item.quantity,
                        createdAt: new Date(),
                        updatedAt: new Date()
                    })),
                },
                total_quantity: totalQuantity,
                total_amount: totalAmount,
                status: "ToBePaid",
                order_date: new Date(),
                updatedAt: new Date(),
            },
        });

        // Update stock for each product
        for (const item of cartItems) {
            await prisma.product.update({
                where: { product_id: item.productId },
                data: {
                    stock: item.product.stock as number - item.quantity,
                },
            });
        }

        await prisma.cartitem.deleteMany({
            where: { cart_item_id: { in: selectedItems } },
        });

        return NextResponse.json({ message: "Order created successfully", order });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "An error occurred while creating the order" }, { status: 500 });
    }
}

