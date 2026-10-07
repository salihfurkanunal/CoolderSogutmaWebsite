export function ComponentExplorer() {
  const steps = [
    { n: "1", t: "Seçiyoruz", d: "İhtiyacınıza bakıp uygun soğutmayı birlikte belirleriz." },
    { n: "2", t: "Kuruyoruz", d: "Yerinizde montajı yapıp çalışır halde teslim ediyoruz." },
    { n: "3", t: "Bozulursa geliyoruz", d: "Gece gündüz arıza ekibi. Ürünler ısınmadan müdahale ediyoruz." },
  ];
  return (
    <section id="kesif" className="bg-obsidian pb-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="display text-3xl sm:text-4xl">Nasıl çalışıyoruz?</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <article key={s.n} className="card p-6">
              <p className="text-3xl font-bold text-cyan">{s.n}</p>
              <h3 className="mt-3 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-sm leading-6 text-mute">{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
