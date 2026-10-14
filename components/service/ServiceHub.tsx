"use client";

import { useDispatch } from "@/context/DispatchContext";
import { useNeedWizard } from "@/components/layout/NeedWizard";

const PHASES = [
  { n: "1", t: "Keşif", d: "Yerinde bakıp ihtiyaca uygun cihazı birlikte seçeriz." },
  { n: "2", t: "Kurulum", d: "Montaj ve bağlantıları saha ekibimiz yapar." },
  { n: "3", t: "Test", d: "Sıcaklık ve çalışma kontrol edilir." },
  { n: "4", t: "Teslim", d: "Çalışır halde size bırakırız; servis hattımız açık kalır." },
];

export function ServiceHub() {
  const { setOpen } = useDispatch();
  const { openWizard } = useNeedWizard();

  return (
    <section
      id="servis"
      className="scroll-mt-[4.25rem] bg-white pb-10 pt-16 sm:pb-12 sm:pt-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-[38rem] text-center">
          <h2 className="display text-3xl sm:text-4xl">Tamir ve kurulum</h2>
          <p className="mt-5 text-lg leading-8 text-mute">
            Makine bozulduysa hemen gelin. Yeni kurulum varsa uygun cihazı seçip yerinizde çalışır bırakırız.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-[1.15rem] bg-alert/10 px-6 py-7">
            <h3 className="text-2xl font-bold text-frost">7/24 arıza servisi</h3>
            <p className="mt-3 flex-1 text-base leading-7 text-mute">
              Reyon, soğuk oda veya süt tankı ısındıysa ürünler tez bozulur. Bildirin, ekip sizi arasın.
            </p>
            <button type="button" onClick={() => setOpen(true)} className="btn mt-7 self-start bg-alert text-white">
              Arıza bildir
            </button>
          </article>
          <article className="flex flex-col rounded-[1.15rem] bg-cyan/10 px-6 py-7">
            <h3 className="text-2xl font-bold text-frost">Keşif ve montaj</h3>
            <p className="mt-3 flex-1 text-base leading-7 text-mute">
              Ne lazım, içinde ne duracak, yer kaç metrekare — söyleyin, uygun soğutmayı biz belirleyelim.
            </p>
            <button type="button" onClick={() => openWizard()} className="btn mt-7 self-start bg-cyan text-white">
              Teklif al
            </button>
          </article>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-bold">Kurulum nasıl ilerler?</h3>
          <ol className="mt-8 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PHASES.map((p, i) => (
              <li key={p.n} className="flex flex-col items-center text-center">
                <div className="relative flex h-6 w-full items-center justify-center">
                  {i > 0 ? (
                    <span
                      className="absolute right-1/2 top-1/2 hidden h-px w-1/2 -translate-y-1/2 bg-line lg:block"
                      aria-hidden
                    />
                  ) : null}
                  {i < PHASES.length - 1 ? (
                    <span
                      className="absolute left-1/2 top-1/2 hidden h-px w-1/2 -translate-y-1/2 bg-line lg:block"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-10 bg-white px-2.5 tabular text-sm font-bold leading-none text-cyan">
                    {p.n}
                  </span>
                </div>
                <p className="mt-3 font-semibold leading-tight">{p.t}</p>
                <p className="mt-2 max-w-[16rem] text-sm leading-6 text-mute">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
