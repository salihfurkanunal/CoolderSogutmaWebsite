"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { DISPATCH_PHONE, WHATSAPP_URL } from "@/lib/catalog";
import { useNeedWizard } from "./NeedWizard";

const LINKS = [
  { href: "/", label: "Ana Sayfa", hash: "ana-sayfa" },
  { href: "/#hakkimizda", label: "Hakkımızda", hash: "hakkimizda" },
  { href: "/#urun-gruplari", label: "Ürünler", hash: "urun-gruplari" },
  { href: "/#servis", label: "Servis", hash: "servis" },
  { href: "/#saha-islerimiz", label: "Saha işlerimiz", hash: "saha-islerimiz" },
  { href: "/#iletisim", label: "İletişim", hash: "iletisim" },
] as const;

type SectionHash = (typeof LINKS)[number]["hash"];

const SECTION_IDS = LINKS.map((l) => l.hash);

function scrollToTop(smooth = false) {
  window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function scrollToId(id: string) {
  if (id === "ana-sayfa") {
    scrollToTop(true);
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resolveActiveSection(): SectionHash {
  const doc = document.documentElement;
  const nearBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 32;
  if (nearBottom) return "iletisim";

  const probe = 4.25 * 16 + 24;
  let current: SectionHash = "ana-sayfa";
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - probe <= 0) current = id;
  }
  return current;
}

export function Nav() {
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState<SectionHash>("ana-sayfa");
  const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, visible: false });
  const { openWizard } = useNeedWizard();
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef(new Map<SectionHash, HTMLAnchorElement>());
  const lockedRef = useRef<SectionHash | null>(null);
  const unlockTimerRef = useRef<number | null>(null);

  const measureIndicator = useCallback((hash: SectionHash) => {
    const nav = navRef.current;
    const link = linkRefs.current.get(hash);
    if (!nav || !link) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const label = link.querySelector("[data-nav-label]") as HTMLElement | null;
    const target = label ?? link;
    const navBox = nav.getBoundingClientRect();
    const textBox = target.getBoundingClientRect();
    const barWidth = Math.max(18, textBox.width * 0.58);
    setIndicator({
      left: textBox.left - navBox.left + (textBox.width - barWidth) / 2,
      top: textBox.bottom - navBox.top + 5,
      width: barWidth,
      visible: true,
    });
  }, []);

  const clearUnlockTimer = useCallback(() => {
    if (unlockTimerRef.current !== null) {
      window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
    }
  }, []);

  const navigateTo = useCallback(
    (id: SectionHash) => {
      lockedRef.current = id;
      setActive(id);
      scrollToId(id);
      // Ana sayfada hash kullanma: tarayıcı #ana-sayfa ile aşağı kaydırıyor.
      window.history.replaceState(null, "", id === "ana-sayfa" ? "/" : `/#${id}`);

      clearUnlockTimer();

      const unlock = () => {
        if (id === "ana-sayfa") {
          scrollToTop(false);
          lockedRef.current = null;
          setActive("ana-sayfa");
          clearUnlockTimer();
          return;
        }
        lockedRef.current = null;
        setActive(resolveActiveSection());
        clearUnlockTimer();
      };

      const onScrollEnd = () => {
        window.removeEventListener("scrollend", onScrollEnd);
        unlock();
      };
      window.addEventListener("scrollend", onScrollEnd, { once: true });

      unlockTimerRef.current = window.setTimeout(() => {
        window.removeEventListener("scrollend", onScrollEnd);
        unlock();
      }, 1200);
    },
    [clearUnlockTimer]
  );

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    if (path !== "/") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && hash !== "ana-sayfa") return;
    if (hash === "ana-sayfa") window.history.replaceState(null, "", "/");
    scrollToTop(false);
  }, [path]);

  useEffect(() => {
    if (path !== "/") return;
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "") as SectionHash | "";
    if (hash === "ana-sayfa" || hash === "") {
      window.history.replaceState(null, "", "/");
      scrollToTop(false);
      setActive("ana-sayfa");
      return;
    }
    if (!SECTION_IDS.includes(hash as SectionHash)) return;
    const timer = window.setTimeout(() => navigateTo(hash as SectionHash), 50);
    return () => window.clearTimeout(timer);
  }, [path, navigateTo]);

  useEffect(() => {
    if (path !== "/") {
      lockedRef.current = null;
      clearUnlockTimer();
      setActive("ana-sayfa");
      return;
    }

    const update = () => {
      if (lockedRef.current) return;
      setActive(resolveActiveSection());
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [path, clearUnlockTimer]);

  useEffect(() => () => clearUnlockTimer(), [clearUnlockTimer]);

  useLayoutEffect(() => {
    if (path !== "/") {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    measureIndicator(active);
  }, [active, path, measureIndicator, menu]);

  useEffect(() => {
    if (path !== "/") return;
    const onResize = () => measureIndicator(active);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, path, measureIndicator]);

  const goHash = (id: SectionHash) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenu(false);
    if (path !== "/") return;
    e.preventDefault();
    navigateTo(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-white">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          onClick={(e) => {
            setMenu(false);
            if (path !== "/") return;
            e.preventDefault();
            navigateTo("ana-sayfa");
          }}
        >
          <Image
            src="/images/logo.webp"
            alt="COOLDER logosu"
            width={160}
            height={152}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <Image
            src="/images/topbar-yazi-b.webp"
            alt="COOLDER soğutma"
            width={900}
            height={181}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <nav
          ref={navRef}
          className="relative hidden h-full items-center gap-1 lg:flex"
          aria-label="Ana menü"
        >
          {LINKS.map((l) => {
            const isActive = path === "/" && active === l.hash;
            return (
              <Link
                key={l.hash}
                href={l.href}
                ref={(node) => {
                  if (node) linkRefs.current.set(l.hash, node);
                  else linkRefs.current.delete(l.hash);
                }}
                onClick={goHash(l.hash)}
                className={`relative px-2.5 py-2 text-nav font-medium transition-colors duration-200 xl:px-3 xl:text-base ${
                  isActive ? "text-frost" : "text-mute hover:text-frost"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span data-nav-label>{l.label}</span>
              </Link>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-[3px] w-10 origin-left rounded-full bg-frost motion-safe:transition-[transform,opacity] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: indicator.visible
                ? `translate3d(${indicator.left}px, ${indicator.top}px, 0) scaleX(${indicator.width / 40})`
                : `translate3d(${indicator.left}px, ${indicator.top}px, 0) scaleX(0)`,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm font-semibold text-frost sm:inline-flex"
          >
            {DISPATCH_PHONE}
          </a>
          <button
            type="button"
            className="rounded-full bg-cyan px-3.5 py-2 text-sm font-semibold text-white hover:bg-sky"
            onClick={() => {
              setMenu(false);
              openWizard();
            }}
          >
            Teklif al
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md border border-line lg:hidden"
            aria-expanded={menu}
            aria-label={menu ? "Menüyü kapat" : "Menüyü aç"}
            onClick={() => setMenu((v) => !v)}
          >
            <span className="flex w-4 flex-col gap-1">
              <span className="h-px w-full bg-frost" />
              <span className="h-px w-3 bg-frost" />
              <span className="h-px w-full bg-frost" />
            </span>
          </button>
        </div>
      </div>

      {menu ? (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="flex flex-col px-4 py-3" aria-label="Mobil menü">
            {LINKS.map((l) => {
              const isActive = path === "/" && active === l.hash;
              return (
                <Link
                  key={l.hash}
                  href={l.href}
                  onClick={goHash(l.hash)}
                  className={`border-b border-line py-3 text-base font-medium ${
                    isActive ? "text-frost" : ""
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {l.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="border-b border-line py-3 text-left text-base font-semibold text-cyan"
              onClick={() => {
                setMenu(false);
                openWizard();
              }}
            >
              Teklif al
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="py-3 font-semibold text-cyan">
              {DISPATCH_PHONE}
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
