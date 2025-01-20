import React from 'react'
import TableProduct from "@/components/ManageProducts"
import NavBar from "@/components/NavBar"
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();
    if (session?.user?.role === "USER") redirect("/")
        
    return (
        <div>
            <NavBar />
            <TableProduct />
        </div>
    )
}
