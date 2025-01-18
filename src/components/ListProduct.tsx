"use client";
import { useState, useEffect } from "react";
import { Button, Image, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Selection, ScrollShadow } from "@heroui/react";
import Link from "next/link";
import { ChevronDownIcon, FilterIcon, SearchIcon } from "./Icon";
import axios from "axios";
import React from "react";

export default function ProductListItem1() {
    const [products, setProduct] = useState([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<Selection>(new Set(["all"]));
    const [isLoading, setIsLoading] = useState(true); // เพิ่มสถานะการโหลด

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // เริ่มการโหลด
            try {
                await Promise.all([fetchProduct(), fetchCategories()]);
            } finally {
                setIsLoading(false); // สิ้นสุดการโหลด
            }
        };
        fetchData();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await axios.get("/api/product");
            setProduct(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get("/api/product/category");
            setCategories(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const onSearchChange = React.useCallback((value?: string) => {
        setFilterValue(value || "");
    }, []);

    const filteredProducts = React.useMemo(() => {
        const searchFilter = (product: any) =>
            product.product_name.toLowerCase().includes(filterValue.toLowerCase());

        const categoryFilter = (product: any) => {
            const selectedCategories = Array.from(statusFilter);
            if (selectedCategories.includes("all")) return true;
            return product.category.some((c: any) => selectedCategories.includes(c.category_name));
        };

        return products.filter((product: any) => searchFilter(product) && categoryFilter(product));
    }, [products, filterValue, statusFilter]);

    const categoryOptions = categories.map((category: any) => ({
        name: category.category_name,
        uid: category.category_name,
    }));

    return (
        <div className="mx-auto max-w-screen-xl flex flex-col gap-2">
            <div className="flex justify-between px-2 gap-2">
                <Input
                    isClearable
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
                <Dropdown
                    className="border-1 border-default-200"
                >
                    <DropdownTrigger className="border-1 border-default-200">
                        <Button
                            startContent={<FilterIcon className="text-small" />}
                            className="h-[32px] max-sm:min-w-[32px]"
                            
                            
                            variant="flat"
                        >
                            <p className="max-sm:hidden">หมวดหมู่สินค้า</p>
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        aria-label="Table Columns"
                        closeOnSelect={false}
                        selectedKeys={statusFilter}
                        selectionMode="multiple"
                        onSelectionChange={setStatusFilter}
                        as={ScrollShadow}
                        
                        className="w-[200px] h-[300px]"
                        
                    >
                        <>
                            <DropdownItem key="all" className="capitalize">
                                ทั้งหมด
                            </DropdownItem>
                            {categoryOptions.map((category: any) => (
                                <DropdownItem key={category.uid} className="capitalize">
                                    {category.name}
                                </DropdownItem>
                            ))}
                        </>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="px-2 grid gap-3 xl:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
                {isLoading ? (
                    <div className="col-span-full text-center py-10">
                        <h3 className="text-lg font-semibold text-default-700">กำลังโหลดสินค้า...</h3>
                    </div>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product: any, index: number) => (
                        <div key={index} className="mt-3 flex flex-col">
                            <Link href={`/product/${product.product_id}`} className="flex-auto">
                                <Image
                                    isZoomed
                                    alt={product.product_name}
                                    className="object-cover w-96 xl:h-[225px] md:h-[200px] sm:h-[150px] h-[125px]"
                                    radius="lg"
                                    shadow="sm"
                                    src={product.image}
                                />
                                <div className="mt-2 flex justify-between">
                                    <h3 className="text-medium font-semibold text-default-900 line-clamp-2">{product.product_name}</h3>
                                    <p className="text-medium font-semibold">
                                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-sky-500">
                                            ฿{product.price}
                                        </span>
                                    </p>
                                </div>
                                <div className="mt-1">
                                    <p className="text-small font-medium text-default-500 line-clamp-2">{product.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <h3 className="text-lg font-semibold text-default-700">ไม่พบสินค้า</h3>
                        <p className="text-sm text-default-500">ลองค้นหาใหม่อีกครั้ง หรือเปลี่ยนตัวกรอง</p>
                    </div>
                )}
            </div>
        </div>
    );
}
