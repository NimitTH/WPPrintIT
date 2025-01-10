import React from 'react'
import ProductItem from '@/components/ProductItem'

type Props = {
    params: {
        id: string
    }
}

export default function page({ params }: Props) {
    return (
        <div>
            <ProductItem productid={params}/>
        </div>
    )
}