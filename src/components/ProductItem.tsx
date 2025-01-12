"use client";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react';
import { Image, Button, Input } from '@nextui-org/react';

import NavBar from "@/components/NavBar"
import { Icon } from "@iconify/react";
import { MinusIcon1, PlusIcon1 } from '@/components/Icon'

import { useRouter } from 'next/navigation';

type Props = {
    productid: {
        id: string
    }
}

export default function Product(params: Props) {
    const router = useRouter()
    const id = params.productid.id

    const [product, setProduct] = useState<any>([])
   

    const fetchProduct = async (id: Number) => {
        try {
            const response = await axios.get(`/api/product/${id}`)
            setProduct(response.data)

        } catch (error) {
            console.error(error);
            
        }
    }

    useEffect(() => {
        fetchProduct(Number(id))
    }, [id])

    const { data: session, status } = useSession()

    const [quantity, setQuantity] = useState(1)

    const [screenedImage, setScreenedImage] = useState<string | null>(null)

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (status === "unauthenticated") {
            alert("กรุณาเข้าสู่ระบบก่อนทำรายการ")
            router.push("/signin")
            return
        }
        const file = e.target.files?.[0];
        console.log(file);

        if (file) {
            const formData = new FormData();
            formData.append("image", file);

            try {
                const response = await axios.post("/api/cart/upload", formData);
                if (response.data.success) {
                    setScreenedImage(response.data.url);
                }
            } catch (error) {
                console.error("Image upload failed:", error);
            }
        }
    };

    const handleSubmitCart = async (e: React.FormEvent) => {
        e.preventDefault()

        if (status === "unauthenticated") {
            alert("กรุณาเข้าสู่ระบบก่อนทำรายการ")
            router.push("/signin")
            return
        }

        let test = product.price * quantity
        try {
            const payload = {
                id: session?.user?.id,
                productId: product.product_id,
                quantity: quantity,
                screened_image: screenedImage,
                total_price: test
            };
            
            const res = await axios.post('/api/cart', payload)
            alert("เพิ่มสินค้าลงในตะกร้าเรียบร้อย")
            console.log(res.data)
        } catch (error) {
            console.error(error);
        }
    }

    const updateQuantity = (quantity: number) => {
        if (quantity < 0) { return }
        setQuantity(quantity)
    }

    console.log(product)

    return (
        <div>
            <NavBar />
            <div className='mx-auto max-w-screen-lg'>
                <form className='mt-4 p-4 flex flex-wrap' onSubmit={handleSubmitCart}>
                    <Image
                        isZoomed
                        isBlurred
                        key={product.image}
                        loading='lazy'
                        alt={product.description}
                        className='flex justify-center sm:max-2xl:w-[400px] sm:max-2xl:h-[400px]'
                        classNames={{
                            wrapper: "mr-6 max-sm:mr-0",
                            img: "object-cover w-full h-full",
                            zoomedWrapper: "sm:w-[400px] sm:h-[400px]"
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
                            <p className="mb-3 text-xl font-bold text-default-700">สกรีนภาพ</p>
                            <Input
                                classNames={{
                                    base: "max-w-full sm:max-w-full h-10",
                                    mainWrapper: "h-full",
                                    input: "text-small ",
                                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                }}
                                type="file"
                                fullWidth
                                onChange={handleImageUpload}
                            >
                                เพิ่มภาพ
                            </Input>
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