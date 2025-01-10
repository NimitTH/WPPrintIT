import React from 'react'
import ManageUsers from '@/components/ManageUsers'
import Navbar from '@/components/NavBar'

type Props = {}

export default function page({ }: Props) {
    return (
        <>
            <Navbar />
            <ManageUsers />
        </>
    )
}