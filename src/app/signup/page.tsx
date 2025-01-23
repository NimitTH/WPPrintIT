import React from 'react';
import SignUpForm from "@/components/form/SignUpForm";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function SignUpPage() {
  const session = await auth();
  if (session?.user.status === "suspended") redirect("/suspended")
  return (
    <div>
      <SignUpForm />
    </div>
  )
}