import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Caveat, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SITE_URL } from "@/lib/site";

const plex = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const script = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "COOLDER — Soğutma Sistemleri",
    template: "%s · COOLDER",
  },
  description:
    "Konya’dan reyon dolabı, soğuk oda, süt tankı, montaj ve 7/24 tamir. Sade, hızlı, anlaşılır soğutma çözümü.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "COOLDER",
    title: "COOLDER — Soğutma Sistemleri",
    description:
      "Konya’dan reyon dolabı, soğuk oda, süt tankı, montaj ve 7/24 tamir.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#eef3f7",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${plex.variable} ${script.variable}`}>
      <body className="bg-obsidian text-frost antialiased">
        <Script
          id="pin-home-scroll"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration" in history)history.scrollRestoration="manual";if(!location.hash||location.hash==="#ana-sayfa"){if(location.hash==="#ana-sayfa")history.replaceState(null,"",location.pathname+(location.search||""));scrollTo(0,0);}}catch(e){}`,
          }}
        />
        <a className="skip-link" href="#icerik">
          İçeriğe geç
        </a>
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
