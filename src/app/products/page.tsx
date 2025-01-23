import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import NavBar from "@/components/NavBar"
import ProductList from "@/components/ListProduct";

export default async function ProductsPage() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <ProductList />
        </div>
    )
}
