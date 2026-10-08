import Image from "next/image";

export const metadata = {
  title: "Hakkımızda",
};

export default function KurumsalPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">Konya’dan kuruyoruz, bozulursa geliyoruz.</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-mute">
        COOLDER; reyon dolabı, soğuk oda ve tamir işini aynı çatı altında toplar. Ne istediğinizi söyleyin, uygun
        cihazı birlikte seçelim ve yerinizde çalışır halde bırakalım.
      </p>
      <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-tile bg-plate">
        <Image
          src="/images/about/sanayi.webp"
          alt="COOLDER Soğutma merkez binası, Konya"
          fill
          sizes="(max-width: 1024px) 100vw, 72rem"
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          { t: "Seçim", d: "Beygir ve kapasiteyi sizin hesaplamanıza gerek yok; yerinde bakıp uygun cihazı öneririz." },
          { t: "Kurulum", d: "Market sahibine de, fabrikaya da aynı sade anlatım. Montajı biz yaparız." },
          { t: "Servis", d: "Bozulursa 7/24 geliriz. Ürün ısınmasın diye hızlı davranırız." },
        ].map((c) => (
          <article key={c.t} className="card p-5">
            <h2 className="text-xl font-bold">{c.t}</h2>
            <p className="mt-3 text-sm leading-6 text-mute">{c.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
