import Image from "next/image";
import Link from "next/link";
import { DISPATCH_PHONE, WHATSAPP_URL } from "@/lib/catalog";

export function Hero() {
  return (
    <section
      id="ana-sayfa"
      className="relative isolate h-[calc(100svh-4.25rem)] min-h-[calc(100svh-4.25rem)] overflow-hidden bg-night"
    >
      <Image
        src="/images/hero/banner.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="hero-ice-veil pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-4 py-16 sm:px-6">
        <p className="script-slogan max-w-xl text-[clamp(1.85rem,4.2vw,2.9rem)] text-white">
          Soğuk kalsın, iş yürüsün.
        </p>
        <h1 className="display mt-4 max-w-[16ch] text-[clamp(2.5rem,6.2vw,4.5rem)] text-white">
          Soğutmanız bozulmasın, işiniz durmasın.
        </h1>
        <p className="mt-7 max-w-[38rem] text-base leading-8 text-white [text-shadow:0_1px_2px_rgba(16,28,36,0.9),0_0_28px_rgba(16,28,36,0.55)] sm:text-lg">
          Reyon dolabı, soğuk oda ve süt tankı. Konya’dan kuruyor, bozulursa 7/24 geliyoruz.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/#urun-gruplari" className="btn bg-white text-frost">
            Ürün grupları
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="btn border border-white/55 bg-white/10 text-white"
          >
            {DISPATCH_PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
