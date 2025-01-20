import React from 'react'
import ManageUsers from '@/components/ManageUsers'
import Navbar from '@/components/NavBar'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function page() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    if (session?.user?.role === "USER") redirect("/products")
    return (
        <>
            <Navbar />
            <ManageUsers />
        </>
    )
}