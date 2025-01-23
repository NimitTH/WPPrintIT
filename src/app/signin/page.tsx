import React from 'react';
import SignInForm from "@/components/form/SignInForm";
import { auth } from "@/auth";
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await auth();
  if (session?.user.status === "suspended") redirect("/suspended")
  return (
    <div>
      <SignInForm />
    </div>
  )
}