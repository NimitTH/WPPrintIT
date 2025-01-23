import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import NavBar from "@/components/NavBar"
import Password from "@/components/Password"

export default async function Passwordpage() {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <Password />
        </div>
    )
}