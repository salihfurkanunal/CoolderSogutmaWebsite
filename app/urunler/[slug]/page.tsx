import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FAMILY_LABELS, productGroupImage, WHATSAPP_URL } from "@/lib/catalog";
import { getProduct, isQuoteProduct, PRODUCTS, relatedProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p?.name ?? "Ürün" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = relatedProducts(p);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-mute">
        <Link href="/urunler">Ürünler</Link>
        {" · "}
        <Link href={`/urunler?family=${p.family}`}>{FAMILY_LABELS[p.family]}</Link>
      </p>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div
          className="relative overflow-hidden rounded-tile bg-plate"
          style={{ aspectRatio: p.placeholder.ratio.replace(":", " / ") }}
        >
          <Image
            src={productGroupImage(p.family)}
            alt={p.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-cyan">{FAMILY_LABELS[p.family]}</p>
          <h1 className="mt-1 display text-4xl sm:text-5xl">{p.name}</h1>
          <p className="mt-4 text-base leading-7 text-mute">{p.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn bg-cyan text-white">
              WhatsApp’tan teklif
            </a>
            <Link href="/#servis" className="btn bg-frost text-white">
              Teklif / montaj
            </Link>
            <Link href="/#iletisim" className="btn border border-line">
              Bize yazın
            </Link>
          </div>
          {isQuoteProduct(p) ? (
            <p className="mt-8 rounded-2xl border border-line bg-obsidian px-4 py-4 text-sm leading-7 text-mute">
              Bu grup için sabit katalog ölçüsü yok. Keşif sonrası size uygun cihazı birlikte seçeriz; teklif için
              WhatsApp’tan yazmanız yeterli.
            </p>
          ) : (
            <dl className="mt-8 grid grid-cols-2 gap-3 text-sm">
              <Spec k="Sıcaklık" v={p.tempRange} />
              <Spec
                k="Motor"
                v={p.motor === "dahili" ? "Dolabın içinde" : p.motor === "remote" ? "Dışarıda" : "Ortak sistem"}
              />
              {p.dimensions.w > 0 ? (
                <Spec k="Ölçü" v={`${p.dimensions.w}×${p.dimensions.d}×${p.dimensions.h} mm`} />
              ) : null}
            </dl>
          )}
          <ul className="mt-6 flex flex-wrap gap-2">
            {p.highlights.map((h) => (
              <li key={h} className="rounded-full border border-line px-3 py-1 text-sm text-mute">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-2xl font-bold">Aynı gruptan</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl border border-line px-3 py-3">
      <dt className="text-sm text-mute">{k}</dt>
      <dd className="mt-1 font-semibold">{v}</dd>
    </div>
  );
}
