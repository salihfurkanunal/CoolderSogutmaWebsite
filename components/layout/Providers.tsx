"use client";

import { DispatchProvider } from "@/context/DispatchContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <DispatchProvider>{children}</DispatchProvider>;
}
