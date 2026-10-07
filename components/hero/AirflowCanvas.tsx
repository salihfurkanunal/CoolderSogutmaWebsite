"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AirflowCanvas({ intensity = 0.4 }: { intensity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    const ribbons = Array.from({ length: 9 }, (_, i) => ({
      phase: i * 0.7,
      amp: 18 + i * 6,
      y: 0.18 + i * 0.08,
      w: 0.6 + (i % 3) * 0.15,
    }));

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (t: number) => {
      if (!running) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.00035;
      ribbons.forEach((r, i) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const nx = x / w;
          const y =
            h * r.y +
            Math.sin(nx * Math.PI * 2 * r.w + time * (1.2 + intensity) + r.phase) * r.amp * (0.4 + intensity);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = i % 2 === 0 ? `rgba(14,116,144,${0.12 + intensity * 0.25})` : `rgba(3,105,161,${0.08 + intensity * 0.2})`;
        ctx.lineWidth = i % 3 === 0 ? 1.6 : 1;
        ctx.stroke();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, reduced]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />;
}
