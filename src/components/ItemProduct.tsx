"use client";

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios'
import type { ItemProduct, PropsProductId } from "@/types/index"
import { Image, Button, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { MinusIcon1, PlusIcon1 } from '@/components/Icon'

export default function ProductItem(params: PropsProductId) {
    const { data: session, status } = useSession();
    const id = params.productId.id;
    const router = useRouter();

    const [product, setProduct] = useState<ItemProduct>({
        id: 0,
        product_id: 0,
        product_name: "",
        description: "",
        price: 0,
        quantity: 0,
        stock: 0,
        image: "",
        screened_images: [""],
        total_price: 0
    })

    const fetchProduct = async (id: number) => {
        try {
            const res = await axios.get(`/api/product/${id}`)
            setProduct(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    const [screenedImage, setScreenedImage] = useState<string[]>([])
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (status === "unauthenticated") {
            alert("กรุณาเข้าสู่ระบบก่อนทำรายการ");
            router.push("/signin");
            return;
        }

        const files = e.target.files;
        if (!files) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images", file);
        });

        try {
            const res = await axios.post("/api/cart/upload", formData);
            if (res.data.success) {
                setScreenedImage((prev) => [...prev, ...res.data.urls]);
            }

        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    useEffect(() => {
        fetchProduct(Number(id))
    }, [id, screenedImage])

    const [additionalText, setAdditionalText] = useState<string | null>(null)

    const [quantity, setQuantity] = useState(1);
    const updateQuantity = (quantity: number) => {
        if (quantity < 0) { return }
        setQuantity(quantity)
    }

    const handleSubmitCart = async (e: React.FormEvent) => {
        e.preventDefault()

        if (status === "unauthenticated") {
            alert("กรุณาเข้าสู่ระบบก่อนทำรายการ")
            router.push("/signin")
            return;
        }

        if (product.stock === 0) {
            alert("สินค้าหมด")
            return;
        }

        try {
            const total_price = product.price * quantity;

            const payload = {
                id: session?.user?.id,
                product_id: product.product_id,
                quantity: quantity,
                screenedimages: screenedImage,
                total_price: total_price,
                additional: additionalText
            };

            const res = await axios.post('/api/cart', payload)
            alert("เพิ่มสินค้าลงในตะกร้าเรียบร้อย")
            console.log(res.data)
        } catch (error) {
            console.error(error);
        };
    };
    return (
        <div>
            <div className='mx-auto max-w-screen-lg'>
                <form className='mt-4 p-4 flex flex-wrap' onSubmit={handleSubmitCart}>
                    <Image
                        isZoomed
                        isBlurred
                        key={product.image}
                        loading='lazy'
                        alt={product.description}
                        className='flex justify-center items-center sm:max-2xl:w-[400px] sm:max-2xl:[400px]'
                        classNames={{
                            wrapper: "mr-6 max-sm:mr-0 flex justify-center items-center",
                            img: "object-cover w-full h-full",
                            zoomedWrapper: "flex justify-center items-center sm:w-[400px] sm:h-[400px]"
                        }}
                        radius="lg"
                        shadow="sm"
                        src={product.image}
                    />
                    <div className='max-sm:w-full flex flex-col gap-4 max-sm:mt-4'>
                        <h3 className="text-3xl font-bold ">
                            <span className=' '>
                                {product.product_name}
                            </span>
                        </h3>
                        <p className="text-2xl font-semibold">
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500'>
                                ฿{product.price}
                            </span>
                        </p>
                        <div>
                            <p className="mb-3 text-xl font-bold text-default-700">รายละเอียดสินค้า</p>
                            <p className="text-xl font-medium text-default-500">{product.description}</p>
                        </div>
                        <div>
                            <p className='mb-1'>สกรีนภาพ</p>
                            <Input
                                classNames={{
                                    base: "max-w-full sm:max-w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small ",
                                    inputWrapper: "h-full font-normal text-default-500",
                                }}
                                type="file"
                                multiple={true}
                                color="default"
                                fullWidth
                                onChange={handleImageUpload}
                            >
                                เพิ่มภาพ
                            </Input>
                        </div>
                        <div>
                            <Textarea
                                placeholder="เสื้อสีชมพูหรือสกรีนภาพด้านล่างสุด..."
                                label="อยากได้อะไรเพิ่มบ้าง?"
                                labelPlacement="outside"
                                onChange={(e) => setAdditionalText(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div className='flex flex-row gap-5 items-center flex-auto'>
                            <p className="text-xl font-bold text-default-700">จำนวน</p>
                            <Button
                                isIconOnly
                                aria-label="Minus"
                                color="default"
                                onPress={() => updateQuantity(quantity - 1)}
                            >
                                <MinusIcon1 />
                            </Button>
                            <p className='text-2xl'>{quantity}</p>
                            <Button
                                isIconOnly
                                aria-label="Plus"
                                color="default"
                                onPress={() => updateQuantity(quantity + 1)}
                            >
                                <PlusIcon1 />
                            </Button>
                        </div>
                        <Button
                            color="primary"
                            radius="lg"
                            fullWidth
                            className='flex'
                            variant="solid"
                            startContent={<Icon icon="vaadin:cart" width={24} ></Icon>}
                            type='submit'
                        >
                            เพิ่มลงตะกร้า
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}