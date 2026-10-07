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
          <ol className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PHASES.map((p, i) => (
              <li key={p.n} className="relative text-center lg:text-left">
                {i < PHASES.length - 1 ? (
                  <span
                    className="pointer-events-none absolute top-3 left-10 hidden h-px w-[calc(100%-0.5rem)] bg-line lg:block"
                    aria-hidden
                  />
                ) : null}
                <p className="tabular text-sm font-bold text-cyan">{p.n}</p>
                <p className="mt-3 font-semibold">{p.t}</p>
                <p className="mt-2 text-sm leading-6 text-mute">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
