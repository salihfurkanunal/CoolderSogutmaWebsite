import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";

const STEPS = [
  { n: "1", t: "Odayı kuruyoruz", d: "Panelleri, kapıyı ve zemini yerinde birleştiriyoruz." },
  { n: "2", t: "Boruları çekiyoruz", d: "Soğutma hatlarını bağlayıp kaçak testini yapıyoruz." },
  { n: "3", t: "Çalışır teslim ediyoruz", d: "Gazı doldurup soğutmayı ölçüyor, anahtar teslim bırakıyoruz." },
];

export function Assembly() {
  return (
    <section className="bg-obsidian py-8 pb-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="display text-3xl sm:text-4xl">Kurulum da bizde</h2>
          <p className="mt-4 max-w-lg text-base leading-7 text-mute">
            Sadece cihaz satmıyoruz. Soğuk odayı kurup çalışır halde teslim ediyoruz.
          </p>
          <ol className="mt-8 space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="flex gap-4 border-t border-line pt-4">
                <span className="text-xl font-bold text-cyan">{s.n}</span>
                <div>
                  <p className="font-semibold">{s.t}</p>
                  <p className="text-sm text-mute">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <Link href="/#servis" className="btn mt-8 bg-frost text-white">
            Montaj iste
          </Link>
        </div>
        <MediaPlaceholder
          file="ON_SITE_COMMISSIONING_CHARGE.WEBP"
          subtitle="Teknisyen, yeni kurulan soğuk odayı çalışır hale getirirken."
          ratio="4 / 5"
        />
      </div>
    </section>
  );
}
