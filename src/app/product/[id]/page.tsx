import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar';
import ProductItem from '@/components/ItemProduct';

type Props = { params: { id: string } };

export default async function ProductItemPage({ params }: Props) {
    const session = await auth();
    if (!session) redirect("/signin")
    if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <NavBar />
            <ProductItem productId={params} />
        </div>
    )
}