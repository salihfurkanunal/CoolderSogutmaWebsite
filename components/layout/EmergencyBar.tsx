"use client";

import { useDispatch } from "@/context/DispatchContext";

export function EmergencyBar() {
  const { setOpen } = useDispatch();
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="fixed right-4 bottom-4 z-40 rounded-full bg-alert px-5 py-3.5 text-sm font-semibold text-white shadow-hud md:right-6 md:bottom-6"
      aria-label="Arıza bildir"
    >
      Arıza mı var?
    </button>
  );
}
