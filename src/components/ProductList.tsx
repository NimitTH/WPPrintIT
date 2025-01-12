"use client";
import { Image,Input } from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "./Icon";
import React from "react";

export default function ProductListItem1() {
    const [products, setProduct] = useState<any[]>([]);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get("/api/product");
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSearchChange = React.useCallback((value?: string) => {
        setFilterValue(value || "");
    }, []);

    const filteredProducts = products.filter((product: any) =>
        product.product_name.toLowerCase().includes(filterValue.toLowerCase())
    );

    return (
        <div className="mx-auto max-w-screen-xl flex flex-col gap-2">
            <Input
                isClearable
                className="px-2"
                classNames={{
                    base: "w-full sm:max-w-[44%]",
                    inputWrapper: "border-1",
                }}
                placeholder="ค้นหาชื่อสินค้า..."
                size="sm"
                radius="full"
                startContent={<SearchIcon className="text-default-600/90" />}
                value={filterValue}
                variant="bordered"
                onClear={() => setFilterValue("")}
                onValueChange={onSearchChange}
            />
            <div className=" px-2 grid gap-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                {filteredProducts.map((product, index) => (
                    <div key={index} className="mt-3 flex flex-col">
                        <Link href={`/product/${product.product_id}`} className="flex-auto">
                            <Image
                                isZoomed
                                alt={product.name}
                                className="object-cover w-96 xl:h-[225px] md:h-[200px] sm:h-[150px] h-[125px]"
                                radius="lg"
                                shadow="sm"
                                src={product.image}
                            />
                            <div className="mt-2 flex justify-between">
                                <h3 className="text-medium font-semibold text-default-900 line-clamp-2">{product.product_name}</h3>
                                <p className="text-medium font-semibold">
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500'>
                                        ฿{product.price}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-1">
                                <p className="text-small font-medium text-default-500 line-clamp-2">{product.description}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
