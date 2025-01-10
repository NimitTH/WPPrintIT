import React from 'react'
import OrderList from '@/components/OrderList'
import NavBar from '@/components/NavBar'



type Props = {}

export default function Order(props: Props) {
    return (
        <div>
            <NavBar />
            <OrderList />
        </div>
    )
}