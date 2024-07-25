"use client";
import { SessionProvider } from "next-auth/react";

export function Wrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
