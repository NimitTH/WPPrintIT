"use client";

import React from "react";

import NavBar from '@/components/NavBar'
import ProductListItem1 from "@/components/ProductList";

import { usePathname } from 'next/navigation'

export default function Page() {


  const pathname = usePathname()

  

  console.log(pathname);
  

  return (
    <div>
      <NavBar />
      <ProductListItem1 />
    </div>
  );
}