import {
  DISPATCH_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PLANT_ADDRESS,
  WHATSAPP_URL,
} from "@/lib/catalog";
import Link from "next/link";

/** Canlı sitedeki ana sayfa bölümleriyle uyumlu bağlantılar */
const FOOTER_LINKS = [
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/#urun-gruplari", label: "Ürünler" },
  { href: "/#servis", label: "Servis" },
  { href: "/#saha-islerimiz", label: "Saha işlerimiz" },
  { href: "/#iletisim", label: "İletişim" },
] as const;

export function Footer() {
  return (
    <footer
      id="iletisim"
      className="scroll-mt-[4.25rem] bg-frost pb-28 pt-10 text-mist sm:pb-24 sm:pt-12"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-14">
        <div className="max-w-md">
          <p className="text-xl font-bold text-white sm:text-2xl">COOLDER Soğutma</p>
          <p className="mt-2 text-sm leading-6 sm:text-base sm:leading-7">{PLANT_ADDRESS}</p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
            {FOOTER_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/80 hover:text-white">
                {l.label}
              </Link>
            ))}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-sm font-semibold text-white/80">WhatsApp</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-xl font-bold tabular text-white hover:text-white/75 sm:text-2xl"
            >
              {DISPATCH_PHONE}
            </a>
            <p className="mt-2 text-sm leading-6 text-white/55">7/24 arıza ve teklif</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/80">Instagram</p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-lg font-semibold text-white hover:text-white/75"
            >
              {INSTAGRAM_HANDLE}
            </a>
            <p className="mt-2 text-sm leading-6 text-white/55">Saha ve kurulumlar</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
