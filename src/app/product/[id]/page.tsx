import React from 'react'
import ProductItem from '@/components/ItemProduct'

import { auth } from "@/auth";
import { redirect } from 'next/navigation';
type Props = {
    params: {
        id: string
    }
}

export default async function page({ params }: Props) {
        const session = await auth();
        if (!session) redirect("/signin")
        if (session.user.status === "suspended") redirect("/suspended")
    return (
        <div>
            <ProductItem productid={params}/>
        </div>
    )
}