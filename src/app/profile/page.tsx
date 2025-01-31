import React from 'react';
import { auth } from "@/auth";
import { redirect } from 'next/navigation';
import NavBar from '@/components/NavBar'
import Profile from '@/components/Profile'

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