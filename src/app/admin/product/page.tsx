import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import NavBar from "@/components/NavBar"
import TableProduct from "@/components/ManageProducts"

export default async function ProductPage() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session?.user?.role === "USER") redirect("/products")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <TableProduct />
        </div>
    )
}
