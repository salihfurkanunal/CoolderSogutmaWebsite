import Link from "next/link";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";

export function Pillars() {
  return (
    <section className="bg-obsidian py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="display text-3xl sm:text-4xl">Ne arıyorsunuz?</h2>
        <p className="mt-3 max-w-2xl text-mute">İki ana grup: markette satılan dolaplar ve işletme soğuk odaları.</p>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="card p-5 sm:p-6">
            <h3 className="text-2xl font-bold">Market dolapları</h3>
            <p className="mt-3 text-sm leading-6 text-mute">
              Sütlük, şarküteri reyonu, kola-ayran dolabı ve ada dondurucu. Market, bakkal ve istasyon için.
            </p>
            <div className="mt-5">
              <MediaPlaceholder
                file="PILLAR_A_RETAIL_LINEUP.WEBP"
                subtitle="Cam kapılı sütlük, içecek dolabı ve dondurucu yan yana."
                ratio="16 / 9"
              />
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-mute sm:grid-cols-3">
              <li>Süt ve yoğurt</li>
              <li>Soğuk içecek</li>
              <li>Dondurulmuş gıda</li>
            </ul>
            <Link href="/urunler?div=ticari" className="mt-5 inline-flex font-semibold text-cyan">
              Market ürünlerini gör →
            </Link>
          </article>
          <article className="card p-5 sm:p-6">
            <h3 className="text-2xl font-bold">Soğuk oda ve fabrika</h3>
            <p className="mt-3 text-sm leading-6 text-mute">
              Et, süt, sebze deposu, şoklama odası ve büyük soğutma sistemleri. Kasap, fabrika ve lojistik için.
            </p>
            <div className="mt-5">
              <MediaPlaceholder
                file="PILLAR_B_INDUSTRIAL_PLANT.WEBP"
                subtitle="Panel soğuk oda ve büyük soğutma makineleri."
                ratio="16 / 9"
              />
            </div>
            <ul className="mt-4 grid gap-2 text-sm text-mute sm:grid-cols-3">
              <li>Soğuk oda</li>
              <li>Şoklama</li>
              <li>Merkezi sistem</li>
            </ul>
            <Link href="/urunler?div=endustriyel" className="mt-5 inline-flex font-semibold text-cyan">
              Soğuk oda ürünlerini gör →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
