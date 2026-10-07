"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { WORK_SHOTS } from "@/lib/works";

type DragState = {
  tracking: boolean;
  dragging: boolean;
  startX: number;
  scrollLeft: number;
  pointerId: number;
  suppressClick: boolean;
};

export function FieldWorks() {
  const titleId = useId();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState>({
    tracking: false,
    dragging: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
    suppressClick: false,
  });
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = lightbox !== null;
  const loopPaused = paused || manualPaused || open || dragging;

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const showPrev = useCallback(() => {
    setLightbox((i) => (i === null ? i : (i - 1 + WORK_SHOTS.length) % WORK_SHOTS.length));
  }, []);
  const showNext = useCallback(() => {
    setLightbox((i) => (i === null ? i : (i + 1) % WORK_SHOTS.length));
  }, []);

  const normalizeLoop = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollLeft = 8;
    });
  }, []);

  useEffect(() => {
    let raf = 0;
    const reduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const tick = () => {
      const el = scrollerRef.current;
      if (el && !loopPaused) {
        el.scrollLeft += 0.55;
        normalizeLoop();
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [loopPaused, normalizeLoop]);

  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button[data-lightbox-close]")?.focus({
      preventScroll: true,
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        showPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        showNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    };
  }, [open, closeLightbox, showPrev, showNext]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      tracking: true,
      dragging: false,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
      suppressClick: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const el = scrollerRef.current;
    if (!drag.tracking || !el) return;
    const dx = e.clientX - drag.startX;

    if (!drag.dragging && Math.abs(dx) > 6) {
      drag.dragging = true;
      drag.suppressClick = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }

    if (!drag.dragging) return;
    el.scrollLeft = drag.scrollLeft - dx;
    normalizeLoop();
  };

  const endDrag = () => {
    const drag = dragRef.current;
    if (!drag.tracking) return;
    const wasDragging = drag.dragging;
    drag.tracking = false;
    drag.dragging = false;
    setDragging(false);
    try {
      if (wasDragging) scrollerRef.current?.releasePointerCapture(drag.pointerId);
    } catch {
      /* already released */
    }
    if (wasDragging) {
      // click event may still fire after pointerup — ignore it once
      drag.suppressClick = true;
      window.setTimeout(() => {
        dragRef.current.suppressClick = false;
      }, 80);
    }
  };

  const openShot = (index: number) => {
    if (dragRef.current.suppressClick || dragRef.current.dragging) return;
    setLightbox(index);
  };

  return (
    <section
      id="saha-islerimiz"
      className="scroll-mt-[4.25rem] overflow-hidden bg-white pb-16 pt-8 sm:pb-20 sm:pt-10"
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 id={titleId} className="display text-3xl text-frost sm:text-4xl">
          Saha işlerimiz
        </h2>
        <p className="mx-auto mt-4 max-w-[36rem] text-base leading-7 text-mute">
          Kurulum ve servisten kareler. Sürükleyerek gezinin; üzerine gelince büyür, tıklayınca açılır.
        </p>
        <button
          type="button"
          className="mt-4 rounded-full border border-line px-4 py-2 text-sm font-medium text-mute hover:border-cyan hover:text-frost sm:hidden"
          onClick={() => setManualPaused((v) => !v)}
          aria-pressed={manualPaused}
        >
          {manualPaused ? "Kaydı sürdür" : "Kaydı durdur"}
        </button>
      </div>

      <div
        className="works-marquee relative mt-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
        }}
      >
        <div
          ref={scrollerRef}
          className={`works-marquee-scroller ${dragging ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onScroll={normalizeLoop}
        >
          <ul className="works-marquee-group">
            {[0, 1].map((copy) =>
              WORK_SHOTS.map((shot, index) => (
                <li key={`${copy}-${shot.id}`} className="works-marquee-item">
                  <button
                    type="button"
                    className="works-shot"
                    onClick={() => openShot(index)}
                    aria-label={`${shot.alt}, büyüt`}
                    tabIndex={copy === 0 ? 0 : -1}
                  >
                    <Image
                      src={shot.src}
                      alt={copy === 0 ? shot.alt : ""}
                      width={320}
                      height={400}
                      sizes="220px"
                      draggable={false}
                      className="works-shot-img h-full w-full object-cover"
                    />
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {open && lightbox !== null ? (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Saha fotoğrafı"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Kapat"
            onClick={closeLightbox}
          />

          <button
            type="button"
            className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-2xl font-bold text-frost shadow-hud sm:left-6"
            onClick={showPrev}
            aria-label="Önceki fotoğraf"
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-2xl font-bold text-frost shadow-hud sm:right-6"
            onClick={showNext}
            aria-label="Sonraki fotoğraf"
          >
            ›
          </button>

          <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-4">
            <div className="relative aspect-[3/4] w-full max-h-[min(78vh,900px)] overflow-hidden rounded-2xl bg-black sm:aspect-[4/3]">
              <Image
                src={WORK_SHOTS[lightbox].src}
                alt={WORK_SHOTS[lightbox].alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-4 text-white">
              <p className="text-sm text-white/85">
                {lightbox + 1} / {WORK_SHOTS.length}
              </p>
              <button
                type="button"
                data-lightbox-close
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-frost"
                onClick={closeLightbox}
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
