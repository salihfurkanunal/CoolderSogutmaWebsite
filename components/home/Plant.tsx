import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";

export function Plant() {
  return (
    <section className="bg-obsidian pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl sm:text-4xl">Konya’dan, sizin işinize.</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-mute">
              Market sahibine de, fabrikaya da aynı netlikte anlatıyoruz: hangi dolap, hangi oda, ne kadar soğutur.
              Uygun cihazı birlikte seçeriz.
            </p>
            <dl className="mt-8 grid grid-cols-3 gap-4">
              <div>
                <dt className="text-sm text-mute">Merkez</dt>
                <dd className="mt-1 text-2xl font-bold">Konya</dd>
              </div>
              <div>
                <dt className="text-sm text-mute">Servis</dt>
                <dd className="mt-1 text-2xl font-bold">7/24</dd>
              </div>
              <div>
                <dt className="text-sm text-mute">Bölge</dt>
                <dd className="mt-1 text-2xl font-bold">Türkiye</dd>
              </div>
            </dl>
          </div>
          <MediaPlaceholder
            file="KONYA_OSB_FABRICATION_FLOOR.WEBP"
            subtitle="Kurulum ve servis ekibimizden bir kare."
            ratio="4 / 3"
          />
        </div>
      </div>
    </section>
  );
}
