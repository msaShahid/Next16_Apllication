import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    default: "Authentication",
    template: "%s | Authentication",
  },
  description: "Authentication pages including sign in, sign up, and password reset",
};

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
