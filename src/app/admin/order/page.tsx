import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import Navbar from "@/components/NavBar";
import ManageOrders from "@/components/ManageOrders";

export default async function OrderPage() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session?.user?.role === "USER") redirect("/products")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <Navbar />
            <ManageOrders />
        </div>
    )
}