import {
  DISPATCH_PHONE,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PLANT_ADDRESS,
  WHATSAPP_URL,
} from "@/lib/catalog";
import Link from "next/link";

const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PLANT_ADDRESS)}`;

export const metadata = {
  title: "İletişim",
};

export default function IletisimPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="display max-w-3xl text-3xl text-frost sm:text-4xl">İletişim — COOLDER Soğutma</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
        Form yok. WhatsApp veya Instagram’dan yazın; teklif ve 7/24 arıza için tek konuşma yeter.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-tile border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-frost">Adres</h2>
          <p className="mt-3 text-base leading-7 text-mute">{PLANT_ADDRESS}</p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex font-semibold text-cyan"
          >
            Haritada aç
          </a>
        </div>
        <div className="rounded-tile border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-frost">WhatsApp</h2>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-2xl font-bold tabular text-frost"
          >
            {DISPATCH_PHONE}
          </a>
          <p className="mt-3 text-sm leading-6 text-mute">7/24 arıza ve teklif için yazın.</p>
        </div>
        <div className="rounded-tile border border-line bg-white p-6">
          <h2 className="text-lg font-bold text-frost">Instagram</h2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-xl font-bold text-frost"
          >
            {INSTAGRAM_HANDLE}
          </a>
          <p className="mt-3 text-sm leading-6 text-mute">Saha ve kurulum paylaşımları.</p>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/#servis" className="btn bg-alert text-white">
          Arıza / servis
        </Link>
        <Link href="/#urun-gruplari" className="btn bg-cyan text-white">
          Ürün grupları
        </Link>
        <Link href="/#hakkimizda" className="btn border border-line bg-white text-frost">
          Hakkımızda
        </Link>
      </div>
    </div>
  );
}
