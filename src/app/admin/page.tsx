'use client'
import React from 'react'
import {
    Tabs,
    Tab,
    Listbox,
    ListboxItem,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Link,
} from "@nextui-org/react";
import NavBar from "@/components/NavbarAdmin";

type Props = {}

export default function page({ }: Props) {
    return (
        <div>
            <NavBar />
            <div className='w-screen h-[90vh] flex flex-col items-center justify-center text-center'>
                <p className="w-[100%] h-[25%] flex items-center justify-center text-center text-6xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">คุณเป็นผู้ดูแลระบบ</p>
                <div className="flex flex-row gap-6 items-center justify-center text-center">
                    <Link href="/admin/user" className="text-2xl font-bold text-background">จัดการผู้ใช้งาน</Link>
                    <Link href="/admin/product" className="text-2xl font-bold text-background">จัดการสินค้า</Link>
                    <Link href="/admin/order" className="text-2xl font-bold text-background">จัดการรายการสั่งซื้อ</Link>
                </div>
            </div>
        </div>
    )
}