import { ProductGroupGrid } from "@/components/home/ProductGroupGrid";

export function ProductGroups() {
  return (
    <section
      id="urun-gruplari"
      className="flex min-h-[calc(100svh-4.25rem)] scroll-mt-[4.25rem] flex-col justify-center bg-obsidian py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-[36rem] text-center">
          <h2 className="display text-3xl sm:text-4xl">Soğutma ve depolama</h2>
          <p className="mt-4 text-base leading-7 text-mute">
            İhtiyacınız olan grubu seçin. Uygun cihazı birlikte belirleriz.
          </p>
        </div>
        <div className="mt-12">
          <ProductGroupGrid />
        </div>
      </div>
    </section>
  );
}
