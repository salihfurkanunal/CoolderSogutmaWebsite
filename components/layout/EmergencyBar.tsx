"use client";

import { DISPATCH_PHONE, INSTAGRAM_URL, WHATSAPP_URL } from "@/lib/catalog";
import { useDispatch } from "@/context/DispatchContext";
import { useNeedWizard } from "./NeedWizard";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.27-.72.9-.88 1.08-.16.18-.33.2-.61.07-.28-.14-1.18-.43-2.25-1.39-.83-.74-1.39-1.65-1.55-1.93-.16-.27-.02-.42.12-.56.13-.12.28-.33.42-.5.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3s.98 2.67 1.12 2.85c.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
      <path d="M12.04 2C6.58 2 2.15 6.42 2.15 11.87c0 1.75.46 3.45 1.34 4.95L2 22l5.34-1.4a9.9 9.9 0 0 0 4.7 1.2h.01c5.46 0 9.89-4.42 9.89-9.87C22 6.42 17.5 2 12.04 2Zm0 18.05h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.17.83.85-3.09-.2-.32a8.18 8.18 0 0 1-1.26-4.37c0-4.53 3.7-8.21 8.26-8.21 4.55 0 8.25 3.68 8.25 8.21 0 4.53-3.7 8.28-8.24 8.28Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function EmergencyBar() {
  const { setOpen } = useDispatch();
  const { openWizard } = useNeedWizard();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-4">
      <div className="pointer-events-auto mx-auto flex max-w-3xl items-stretch overflow-hidden rounded-2xl border border-white/15 bg-frost/95 text-white shadow-[0_12px_40px_rgba(16,28,36,0.35)] backdrop-blur-md">
        <div className="hidden min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:flex">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-white/55">
            7/24 hat
          </p>
          <p className="truncate text-sm font-semibold tabular text-white">{DISPATCH_PHONE}</p>
        </div>

        <div className="flex flex-1 items-stretch sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex flex-1 flex-col items-center justify-center gap-1 bg-alert px-3 py-2.5 text-center transition-colors hover:bg-alert/90 sm:min-w-[7.5rem] sm:px-4"
            aria-label="Arıza bildir"
          >
            <span className="text-xs font-bold sm:text-sm">Arıza</span>
            <span className="hidden text-[0.65rem] text-white/80 sm:block">Hemen bildir</span>
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-2.5 text-center transition-colors hover:bg-white/10 sm:min-w-[7rem] sm:px-4"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-5 w-5" />
            <span className="text-[0.7rem] font-semibold sm:text-xs">WhatsApp</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 flex-col items-center justify-center gap-1 px-3 py-2.5 text-center transition-colors hover:bg-white/10 sm:min-w-[7rem] sm:px-4"
            aria-label="Instagram — coolder_sogutma"
          >
            <InstagramIcon className="h-5 w-5" />
            <span className="text-[0.7rem] font-semibold sm:text-xs">Instagram</span>
          </a>

          <button
            type="button"
            onClick={() => openWizard()}
            className="flex flex-1 flex-col items-center justify-center gap-1 border-l border-white/10 bg-cyan px-3 py-2.5 text-center transition-colors hover:bg-sky sm:min-w-[7.5rem] sm:px-4"
            aria-label="Teklif al"
          >
            <span className="text-xs font-bold sm:text-sm">Teklif</span>
            <span className="hidden text-[0.65rem] text-white/85 sm:block">Hızlı sor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
