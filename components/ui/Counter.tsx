"use client";

import { useEffect, useState } from "react";

export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  return (
    <span className="tabular">
      {prefix}
      {n.toFixed(decimals)}
      {suffix}
    </span>
  );
}
