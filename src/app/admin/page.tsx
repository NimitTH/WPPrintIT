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
            <p className="text-6xl md:text-9xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient">You Are Admin</p>
        </div>
    )
}