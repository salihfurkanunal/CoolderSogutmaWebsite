"use client";

import Image from "next/image";
import { PRODUCT_GROUPS, productGroupImage } from "@/lib/catalog";
import { useNeedWizard } from "@/components/layout/NeedWizard";
import type { ProductFamily } from "@/lib/types";

const ROWS = [
  PRODUCT_GROUPS.slice(0, 4),
  PRODUCT_GROUPS.slice(4, 8),
  PRODUCT_GROUPS.slice(8, 12),
] as const;

const TILE =
  "group flex h-full w-full max-w-none flex-col overflow-hidden rounded-tile border border-line bg-white text-center shadow-[0_10px_28px_rgba(0,0,0,0.06)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-cyan hover:shadow-hud sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-3rem)/4)]";

function Tile({
  id,
  label,
  onPick,
}: {
  id: ProductFamily;
  label: string;
  onPick: (id: ProductFamily) => void;
}) {
  return (
    <button type="button" onClick={() => onPick(id)} className={TILE}>
      <div className="relative aspect-square w-full overflow-hidden bg-plate">
        <Image
          src={productGroupImage(id)}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center"
        />
      </div>
      <p className="flex min-h-[3.25rem] items-center justify-center px-3 py-3 text-base font-semibold leading-snug">
        {label}
      </p>
    </button>
  );
}

export function ProductGroupGrid() {
  const { openWizard } = useNeedWizard();
  return (
    <div className="space-y-4">
      {ROWS.map((row) => (
        <div key={row.map((g) => g.id).join("-")} className="flex flex-wrap justify-center gap-4">
          {row.map((group) => (
            <Tile
              key={group.id}
              id={group.id}
              label={group.label}
              onPick={(id) => openWizard(id)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
