"use client";

import Image from "next/image";
import Link from "next/link";
import { FAMILY_LABELS, productGroupImage } from "@/lib/catalog";
import { isQuoteProduct } from "@/lib/products";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  selected,
  onPin,
}: {
  product: Product;
  selected?: boolean;
  onPin?: (id: string) => void;
}) {
  return (
    <article className="card flex h-full flex-col overflow-hidden">
      <div
        className="relative w-full overflow-hidden bg-plate"
        style={{ aspectRatio: product.placeholder.ratio.replace(":", " / ") }}
      >
        <Image
          src={productGroupImage(product.family)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm text-cyan">{FAMILY_LABELS[product.family]}</p>
        <h3 className="mt-1 text-xl font-bold leading-tight">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-mute">{product.short}</p>
        {isQuoteProduct(product) ? (
          <p className="mt-4 text-sm text-mute">Ölçü ve model yerinde belirlenir.</p>
        ) : (
          <p className="mt-4 text-sm">
            Sıcaklık: <span className="font-semibold text-cyan">{product.tempRange}</span>
          </p>
        )}
        <div className="mt-4 flex items-center justify-between gap-2">
          <Link href={`/urunler/${product.slug}`} className="font-semibold text-cyan">
            İncele
          </Link>
          {onPin ? (
            <button
              type="button"
              onClick={() => onPin(product.id)}
              className={`rounded-full border px-3 py-1 text-sm ${selected ? "border-cyan text-cyan" : "border-line text-mute"}`}
            >
              {selected ? "Seçildi" : "Karşılaştır"}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}
