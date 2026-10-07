"use client";

import { useSearchParams } from "next/navigation";
import { FAMILY_LABELS, resolveProductFamily, WHATSAPP_URL } from "@/lib/catalog";
import { PRODUCTS } from "@/lib/products";
import { applyFilters } from "./FilterPanel";
import { ProductCard } from "./ProductCard";
import { ProductGroupGrid } from "@/components/home/ProductGroupGrid";
import Link from "next/link";

export function Catalog() {
  const params = useSearchParams();
  const familyParam = params.get("family");
  return <CatalogView key={familyParam ?? ""} />;
}

function CatalogView() {
  const params = useSearchParams();
  const family = resolveProductFamily(params.get("family"));
  const list = applyFilters(PRODUCTS, { family: family ?? "all" });

  if (!family) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <header className="mb-8 max-w-2xl">
          <h1 className="display text-4xl sm:text-5xl">Ürünler</h1>
          <p className="mt-2 text-mute">Gruba tıklayın. Uygun cihazı birlikte belirleriz.</p>
        </header>
        <ProductGroupGrid />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="text-sm text-mute">
        <Link href="/urunler">Ürünler</Link>
        {" · "}
        {FAMILY_LABELS[family]}
      </p>
      <header className="mt-4 mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display text-4xl sm:text-5xl">{FAMILY_LABELS[family]}</h1>
          <p className="mt-2 max-w-xl text-mute">
            Bu gruptaki seçenekler. Model ve kapasiteyi birlikte belirleriz; WhatsApp’tan yazmanız yeterli.
          </p>
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="btn bg-cyan text-white">
          WhatsApp’tan teklif
        </a>
      </header>

      {list.length === 0 ? (
        <p className="card p-8 text-sm text-mute">
          Bu grup için ölçüye göre teklif hazırlıyoruz. WhatsApp’tan yazmanız yeterli.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
