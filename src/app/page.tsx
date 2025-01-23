"use client";

import React from "react";

import NavBar from '@/components/NavBar'
import ProductListItem1 from "@/components/ListProduct";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/signin")
  if (session.user.status === "suspended") redirect("/suspended")
  return (
    <div>
      <NavBar />
      <ProductListItem1 />
    </div>
  );
}