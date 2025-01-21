import React from 'react'
import Profile from '@/components/Profile'
import NavBar from '@/components/NavBar'
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await auth();
  if (!session) redirect("/signin")
  if (session.user.status === "suspended") redirect("/suspended")
  return (
    <div>
      <NavBar />
      <Profile />
    </div>
  )
}