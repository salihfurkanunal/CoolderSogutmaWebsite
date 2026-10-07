"use client";

import { useRef } from "react";

export function Magnetic({
  children,
  className = "",
  strength = 18,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
      }}
      style={{ transition: "transform 160ms ease-out" }}
    >
      {children}
    </div>
  );
}
