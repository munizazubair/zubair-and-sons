"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { AuthPage } from "@/components/auth/AuthPage";

function AuthPageContent() {
  const router = useRouter();

  return (
    <AuthPage
      onBack={() => router.push("/")}
      onSuccess={() => {
        // AuthPage already handles routing (to "/" or "/dashboard") after a
        // successful sign in, so nothing extra is needed here. This callback
        // exists to satisfy the AuthPage prop contract.
      }}
    />
  );
}

export default function Auth() {
  return (
    <Suspense fallback={null}>
      <AuthPageContent />
    </Suspense>
  );
}