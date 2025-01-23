import React from 'react';
import NavBar from '@/components/NavBar'
import ProductListItem from "@/components/ListProduct";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function WPPrintITPage() {
  const session = await auth();
  if (session?.user.status === "suspended") redirect("/suspended")
  return (
    <div>
      <NavBar />
      <ProductListItem />
    </div>
  );
}