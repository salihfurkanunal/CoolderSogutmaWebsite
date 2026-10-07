"use client";

import Link from "next/link";
import { DIVISION_LABELS } from "@/lib/catalog";
import type { Product } from "@/lib/types";

export function DataGrid({
  products,
  pinned,
  onPin,
}: {
  products: Product[];
  pinned: string[];
  onPin: (id: string) => void;
}) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-[780px] w-full border-collapse text-left text-sm">
        <caption className="sr-only">Ürün listesi</caption>
        <thead className="bg-steel">
          <tr>
            {["Ürün", "Kod", "Kullanım", "Sıcaklık", "Motor", "Güç", "Karşılaştır"].map((h) => (
              <th key={h} scope="col" className="px-3 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <th scope="row" className="px-3 py-3 font-medium">
                <Link href={`/urunler/${p.slug}`} className="hover:text-cyan">
                  {p.name}
                </Link>
              </th>
              <td className="px-3 py-3 text-mute">{p.model}</td>
              <td className="px-3 py-3">{DIVISION_LABELS[p.division]}</td>
              <td className="px-3 py-3 text-cyan">{p.tempRange}</td>
              <td className="px-3 py-3">{p.motor === "dahili" ? "İçerde" : p.motor === "remote" ? "Dışarıda" : "Ortak"}</td>
              <td className="px-3 py-3">{p.capacityKw} kW</td>
              <td className="px-3 py-3">
                <button
                  type="button"
                  onClick={() => onPin(p.id)}
                  className={`text-sm ${pinned.includes(p.id) ? "text-cyan" : "text-mute"}`}
                >
                  {pinned.includes(p.id) ? "Seçildi" : "Seç"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
