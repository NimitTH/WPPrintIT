import React from 'react';
import NavBar from '@/components/NavBar'
import OrderList from '@/components/ListOrder'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function Order() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <OrderList />
        </div>
    )
}