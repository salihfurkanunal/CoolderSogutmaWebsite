"use client";

import { EmergencyBar } from "./EmergencyBar";
import { DispatchModal } from "./DispatchModal";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { NeedWizard, NeedWizardProvider } from "./NeedWizard";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <NeedWizardProvider>
      <Nav />
      <main id="icerik" className="min-h-dvh pt-[4.25rem]">
        {children}
        <Footer />
      </main>
      <EmergencyBar />
      <NeedWizard />
      <DispatchModal />
    </NeedWizardProvider>
  );
}
