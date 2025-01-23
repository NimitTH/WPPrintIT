import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import Navbar from '@/components/NavBar'
import ManageUsers from '@/components/ManageUsers'

export default async function UserPage() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session?.user?.role === "USER") redirect("/products")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <>
            <Navbar />
            <ManageUsers />
        </>
    )
}