import Image from "next/image";
import Link from "next/link";
import { DISPATCH_PHONE, WHATSAPP_URL } from "@/lib/catalog";

export function Hero() {
  return (
    <section
      id="ana-sayfa"
      className="relative isolate overflow-hidden bg-night max-sm:aspect-[4/5] max-sm:min-h-[28rem] sm:h-[calc(100svh-4.25rem)] sm:min-h-[calc(100svh-4.25rem)]"
    >
      <Image
        src="/images/hero/banner.webp"
        alt="COOLDER Soğutma — soğutma sistemleri hero görseli"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[50%_42%] sm:object-[50%_48%]"
      />
      <div className="hero-ice-veil pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-4 pb-10 pt-16 sm:justify-center sm:px-6 sm:pb-16 sm:pt-16">
        <p className="script-slogan max-w-xl text-[clamp(1.55rem,5.5vw,2.9rem)] text-white [text-shadow:0_1px_3px_rgba(16,28,36,0.75),0_0_24px_rgba(16,28,36,0.4)]">
          Soğuk kalsın, iş yürüsün.
        </p>
        <h1 className="display mt-3 max-w-[16ch] text-[clamp(2rem,8vw,4.5rem)] text-white [text-shadow:0_2px_4px_rgba(16,28,36,0.7),0_0_28px_rgba(16,28,36,0.35)] sm:mt-4">
          Soğutmanız bozulmasın, işiniz durmasın.
        </h1>
        <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-7 text-white [text-shadow:0_1px_2px_rgba(16,28,36,0.85),0_0_20px_rgba(16,28,36,0.45)] sm:mt-7 sm:text-base sm:leading-8 sm:text-lg">
          Reyon dolabı, soğuk oda ve süt tankı. Konya’dan kuruyor, bozulursa 7/24 geliyoruz.
        </p>
        <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
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
