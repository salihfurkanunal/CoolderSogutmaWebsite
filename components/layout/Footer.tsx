import { DISPATCH_PHONE, PLANT_ADDRESS, WHATSAPP_URL } from "@/lib/catalog";

export function Footer() {
  return (
    <footer
      id="iletisim"
      className="scroll-mt-[4.25rem] bg-frost pb-24 pt-10 text-mist sm:pt-12"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pr-28 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
        <div>
          <p className="text-xl font-bold text-white sm:text-2xl">COOLDER</p>
          <p className="mt-2 max-w-xs text-sm leading-6 sm:text-base sm:leading-7">{PLANT_ADDRESS}</p>
        </div>
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
        </div>
        <p className="max-w-xs text-sm leading-6 sm:text-base sm:leading-7 lg:text-right">
          7/24 açık. Teklif için üstteki Teklif al, arıza için Servis.
        </p>
      </div>
    </footer>
  );
}
