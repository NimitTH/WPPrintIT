"use client"
import React from 'react'
import CartProductList from '@/components/ListCart'
import NavBarTest from '@/components/NavBar'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBarTest />
            <CartProductList />
        </div>
    )
}

