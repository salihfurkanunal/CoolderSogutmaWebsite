"use client";

import { FAMILY_LABELS, PRODUCT_GROUPS } from "@/lib/catalog";
import type { Product, ProductFamily } from "@/lib/types";

export type FilterState = {
  family: "all" | ProductFamily;
};

export const DEFAULT_FILTERS: FilterState = {
  family: "all",
};

export function applyFilters(list: Product[], f: FilterState) {
  return list.filter((p) => {
    if (f.family !== "all" && p.family !== f.family) return false;
    return true;
  });
}

function Chip({
  on,
  children,
  onClick,
}: {
  on: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-sm ${on ? "border-cyan bg-cyan/10 text-cyan" : "border-line text-mute"}`}
    >
      {children}
    </button>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  count,
  mobile,
  onClose,
}: {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  count: number;
  mobile?: boolean;
  onClose?: () => void;
}) {
  return (
    <aside className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold">{count} ürün bulundu</p>
        {mobile ? (
          <button type="button" className="text-sm text-mute" onClick={onClose}>
            Kapat
          </button>
        ) : null}
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Ürün grubu</p>
        <div className="flex flex-wrap gap-2">
          <Chip on={filters.family === "all"} onClick={() => setFilters({ family: "all" })}>
            Tümü
          </Chip>
          {PRODUCT_GROUPS.map((group) => (
            <Chip
              key={group.id}
              on={filters.family === group.id}
              onClick={() => setFilters({ family: group.id })}
            >
              {FAMILY_LABELS[group.id]}
            </Chip>
          ))}
        </div>
      </div>
    </aside>
  );
}
