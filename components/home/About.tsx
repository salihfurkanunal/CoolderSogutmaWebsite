import Image from "next/image";
import { DISPATCH_PHONE, WHATSAPP_URL } from "@/lib/catalog";

const TRUST = [
  "Profesyonel saha ekibi",
  "7/24 arıza ve montaj desteği",
  "Konya merkezli, net konuşuruz",
];

const PILLARS = [
  {
    title: "Misyonumuz",
    body: "Dürüst ve anlaşılır çalışarak size uygun soğutmayı seçmek, kurmak ve bozulursa yanınızda olmak.",
  },
  {
    title: "Vizyonumuz",
    body: "Konya ve çevresinde güvenilen, hızlı ve net konuşan soğutma ortağı olmak.",
  },
] as const;

export function About() {
  return (
    <section
      id="hakkimizda"
      className="flex min-h-[calc(100svh-4.25rem)] scroll-mt-[4.25rem] flex-col justify-center bg-white py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <h2 className="display max-w-[18ch] text-3xl text-frost sm:text-4xl">
            Doğru soğutmayı seçer, yerinizde çalışır halde bırakırız.
          </h2>
          <p className="mt-6 max-w-[38rem] text-base leading-8 text-mute">
            COOLDER, Konya merkezli bir soğutma firmasıdır. Reyon dolabı, soğuk oda, süt tankı ve chiller işinde
            size uygun cihazı belirler; kurulumu yapar, bozulursa gece gündüz gelir. Karışık jargonsuz, net konuşuruz.
          </p>
          <ul className="mt-8 space-y-3.5">
            {TRUST.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-6 text-frost">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-cyan"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                >
                  <circle cx="10" cy="10" r="9" fill="currentColor" opacity="0.12" />
                  <path
                    d="M6 10.4 8.6 13 14 7.4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-9 inline-flex flex-col rounded-2xl bg-obsidian px-5 py-4"
          >
            <span className="text-sm font-semibold text-cyan">WhatsApp</span>
            <span className="mt-1 text-2xl font-bold tabular text-frost">{DISPATCH_PHONE}</span>
          </a>
        </div>
        <figure
          className="relative isolate overflow-hidden rounded-[1.25rem]"
          style={{ aspectRatio: "4 / 5" }}
        >
          <Image
            src="/images/about/sanayi.webp"
            alt="COOLDER Soğutma merkez binası, Konya"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-center"
          />
        </figure>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-10 border-t border-line px-4 pt-14 sm:px-6 md:grid-cols-2 md:gap-14">
        {PILLARS.map((item) => (
          <div key={item.title} className="text-center md:text-left">
            <h3 className="text-xl font-bold text-frost sm:text-2xl">{item.title}</h3>
            <span className="mt-3 mx-auto block h-0.5 w-12 bg-cyan md:mx-0" aria-hidden />
            <p className="mt-5 max-w-md text-base leading-7 text-mute md:max-w-none">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
