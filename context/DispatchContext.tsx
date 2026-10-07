"use client";

import { createContext, useContext, useMemo, useState } from "react";

type DispatchContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const DispatchContext = createContext<DispatchContextValue | null>(null);

export function DispatchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const value = useMemo(() => ({ open, setOpen }), [open]);
  return <DispatchContext.Provider value={value}>{children}</DispatchContext.Provider>;
}

export function useDispatch() {
  const ctx = useContext(DispatchContext);
  if (!ctx) throw new Error("useDispatch must be used within DispatchProvider");
  return ctx;
}
