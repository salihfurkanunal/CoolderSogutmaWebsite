"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";

export function CompareTray({
  items,
  onClear,
  onRemove,
}: {
  items: Product[];
  onClear: () => void;
  onRemove: (id: string) => void;
}) {
  if (items.length === 0) return null;
  const keys: { label: string; get: (p: Product) => string | number }[] = [
    { label: "Sıcaklık", get: (p) => p.tempRange },
    { label: "Motor", get: (p) => (p.motor === "dahili" ? "İçerde" : p.motor === "remote" ? "Dışarıda" : "Ortak") },
    { label: "Güç", get: (p) => `${p.capacityKw} kW` },
    { label: "Ses", get: (p) => `${p.soundDb} dB` },
    { label: "Boyut", get: (p) => `${p.dimensions.w}×${p.dimensions.d}×${p.dimensions.h} mm` },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-slate/95 p-4 shadow-hud">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-semibold">Karşılaştırma ({items.length}/4)</p>
          <button type="button" onClick={onClear} className="text-sm text-mute">
            Temizle
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr>
                <th className="py-2 text-left text-mute">Özellik</th>
                {items.map((p) => (
                  <th key={p.id} className="px-3 py-2 text-left">
                    <Link href={`/urunler/${p.slug}`} className="text-cyan">
                      {p.name}
                    </Link>
                    <button type="button" className="ml-2 text-mute" onClick={() => onRemove(p.id)}>
                      ×
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {keys.map((k) => (
                <tr key={k.label} className="border-t border-line">
                  <th className="py-2 text-left font-normal text-mute">{k.label}</th>
                  {items.map((p) => (
                    <td key={p.id} className="px-3 py-2">
                      {k.get(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
