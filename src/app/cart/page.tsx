import React from 'react';
import NavBarTest from '@/components/NavBar'
import CartProductList from '@/components/ListCart'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function CartPage() {
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

