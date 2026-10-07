import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

export function Featured() {
  const picks = [
    PRODUCTS.find((p) => p.id === "md-1800")!,
    PRODUCTS.find((p) => p.id === "bc-1200")!,
    PRODUCTS.find((p) => p.id === "cr-mod-100")!,
    PRODUCTS.find((p) => p.id === "rack-sc-120")!,
  ];
  return (
    <section className="bg-obsidian py-8 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-3xl sm:text-4xl">Öne çıkan ürünler</h2>
          <Link href="/urunler" className="font-semibold text-cyan">
            Tümünü gör →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {picks.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
