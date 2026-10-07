"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { PRODUCT_GROUPS, WHATSAPP_HOTLINE } from "@/lib/catalog";
import { useDispatch } from "@/context/DispatchContext";
import type { ProductFamily } from "@/lib/types";
import {
  PASTA_CONTENT_OPTIONS,
  wizardMeasureMode,
  wizardSkipsContent,
  wizardStep2Title,
  wizardStep3Title,
} from "@/lib/wizard";

const STORAGE_KEY = "coolder-need-wizard-seen";
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CONTENT_OPTIONS = [
  { id: "sut", label: "Süt / süt ürünü" },
  { id: "et", label: "Et" },
  { id: "icecek", label: "İçecek" },
  { id: "sebze", label: "Sebze / meyve" },
  { id: "dondurulmus", label: "Dondurulmuş gıda" },
  { id: "diger", label: "Diğer" },
] as const;

type NeedId = ProductFamily;
type ContentId = (typeof CONTENT_OPTIONS)[number]["id"] | (typeof PASTA_CONTENT_OPTIONS)[number]["id"];

type NeedWizardContextValue = {
  open: boolean;
  intentNeed: ProductFamily | null;
  openWizard: (need?: ProductFamily) => void;
  closeWizard: () => void;
};

const NeedWizardContext = createContext<NeedWizardContextValue | null>(null);

function markSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode */
  }
}

function parseMeters(value: string) {
  const n = Number.parseFloat(value.replace(",", ".").trim());
  return Number.isFinite(n) ? n : NaN;
}

function formatMeters(n: number) {
  return n.toLocaleString("tr-TR", { maximumFractionDigits: 2 });
}

export function NeedWizardProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [intentNeed, setIntentNeed] = useState<ProductFamily | null>(null);

  const value = useMemo<NeedWizardContextValue>(
    () => ({
      open,
      intentNeed,
      openWizard: (need) => {
        setIntentNeed(need ?? null);
        setOpen(true);
      },
      closeWizard: () => {
        markSeen();
        setIntentNeed(null);
        setOpen(false);
      },
    }),
    [open, intentNeed]
  );

  return <NeedWizardContext.Provider value={value}>{children}</NeedWizardContext.Provider>;
}

export function useNeedWizard() {
  const ctx = useContext(NeedWizardContext);
  if (!ctx) throw new Error("useNeedWizard must be used within NeedWizardProvider");
  return ctx;
}

export function NeedWizard() {
  const { open, closeWizard, intentNeed } = useNeedWizard();
  const { open: dispatchOpen } = useDispatch();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const [step, setStep] = useState(1);
  const [need, setNeed] = useState<NeedId | null>(null);
  const [content, setContent] = useState<ContentId | null>(null);
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [note, setNote] = useState("");

  const skipContent = wizardSkipsContent(need);
  const measureMode = wizardMeasureMode(need);
  const lengthM = parseMeters(length);
  const widthM = parseMeters(width);
  const area = lengthM > 0 && widthM > 0 ? lengthM * widthM : NaN;
  const liters = lengthM;
  const sizeReady =
    measureMode === "area"
      ? lengthM > 0 && widthM > 0
      : measureMode === "liters"
        ? liters > 0
        : note.trim().length >= 8;
  const totalSteps = skipContent ? 2 : 3;
  const displayStep = skipContent && step === 3 ? 2 : step;
  const contentOptions = need === "yas-pasta" ? PASTA_CONTENT_OPTIONS : CONTENT_OPTIONS;

  const close = useCallback(() => {
    markSeen();
    closeWizard();
  }, [closeWizard]);

  useEffect(() => {
    if (!open) return;
    setContent(null);
    setLength("");
    setWidth("");
    setNote("");
    if (intentNeed) {
      setNeed(intentNeed);
      setStep(wizardSkipsContent(intentNeed) ? 3 : 2);
      return;
    }
    setNeed(null);
    setStep(1);
  }, [open, intentNeed]);

  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panelRef.current)?.focus({ preventScroll: true });
    });
    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = "";
      previousFocus.current?.focus({ preventScroll: true });
      window.scrollTo({ top: y, left: 0, behavior: "auto" });
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (dispatchOpen) return;
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
      );
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, dispatchOpen]);

  if (!open) return null;

  const needLabel = PRODUCT_GROUPS.find((o) => o.id === need)?.label ?? "—";
  const contentLabel =
    CONTENT_OPTIONS.find((o) => o.id === content)?.label ??
    PASTA_CONTENT_OPTIONS.find((o) => o.id === content)?.label ??
    "—";

  const sendWhatsApp = () => {
    if (!sizeReady) return;
    const lines = ["COOLDER teklif talebi", `İhtiyaç: ${needLabel}`];
    if (!skipContent) lines.push(`İçerik: ${contentLabel}`);
    if (measureMode === "liters") {
      lines.push(`Hacim: ${formatMeters(liters)} litre`);
    } else if (measureMode === "area") {
      lines.push(`Ölçü: ${formatMeters(lengthM)} m x ${formatMeters(widthM)} m (${formatMeters(area)} m²)`);
    }
    if (note.trim()) lines.push(`Not: ${note.trim()}`);
    const url = `https://wa.me/${WHATSAPP_HOTLINE}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setStep(1);
    setNeed(null);
    setContent(null);
    setLength("");
    setWidth("");
    setNote("");
    close();
  };

  const goBack = () => {
    if (step === 3 && skipContent) {
      setStep(1);
      return;
    }
    setStep((s) => Math.max(1, s - 1));
  };

  const pickNeed = (id: ProductFamily) => {
    setNeed(id);
    setContent(null);
    if (wizardSkipsContent(id)) setStep(3);
    else setStep(2);
  };

  return (
    <div
      className="fixed inset-0 z-[55] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button type="button" className="absolute inset-0 cursor-default" aria-label="Kapat" onClick={close} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-slate shadow-hud outline-none sm:rounded-3xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div>
            <h2 id={titleId} className="text-xl font-bold">
              {step === 1 && "Neye ihtiyacınız var?"}
              {step === 2 && wizardStep2Title(need)}
              {step === 3 && wizardStep3Title(need)}
            </h2>
            <p className="mt-1 text-sm text-mute">
              Teklif · adım {displayStep} / {totalSteps}
            </p>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-lg text-mute hover:text-frost"
            aria-label="Kapat"
            onClick={close}
          >
            ×
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-5">
          {step === 1 ? (
            <div className="grid gap-2">
              {PRODUCT_GROUPS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => pickNeed(option.id)}
                  className={`min-h-14 rounded-2xl border px-4 py-4 text-left text-base font-medium ${
                    need === option.id ? "border-cyan bg-cyan/10 text-cyan" : "border-line hover:border-mute"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {contentOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setContent(option.id);
                    setStep(3);
                  }}
                  className={`min-h-14 rounded-2xl border px-4 py-4 text-left text-base font-medium ${
                    content === option.id ? "border-cyan bg-cyan/10 text-cyan" : "border-line hover:border-mute"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4">
              {measureMode === "area" ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-2 text-sm font-medium">
                      Uzunluk (m)
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="border border-line bg-obsidian px-3 py-3 text-base"
                        placeholder="örn. 4"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-medium">
                      Genişlik (m)
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0"
                        step="0.01"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="border border-line bg-obsidian px-3 py-3 text-base"
                        placeholder="örn. 3"
                      />
                    </label>
                  </div>
                  <div className="rounded-2xl border border-line bg-obsidian px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-mute">Alan</p>
                    <p className="mt-1 text-2xl font-bold tabular">
                      {Number.isFinite(area) ? `${formatMeters(area)} m²` : "—"}
                    </p>
                  </div>
                </>
              ) : null}

              {measureMode === "liters" ? (
                <label className="grid gap-2 text-sm font-medium">
                  Litre
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="border border-line bg-obsidian px-3 py-3 text-base"
                    placeholder="örn. 1000"
                  />
                </label>
              ) : null}

              <label className="grid gap-2 text-sm font-medium">
                {measureMode === "brief" ? "İhtiyaç notu" : "Kısa not (isteğe bağlı)"}
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={measureMode === "brief" ? 4 : 2}
                  className="border border-line bg-obsidian px-3 py-3"
                  placeholder={
                    measureMode === "brief"
                      ? "Şehir, mevcut sistem, özel istek…"
                      : "Market adı, şehir, özel ölçü…"
                  }
                />
              </label>
            </div>
          ) : null}
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
          <button
            type="button"
            className="text-sm text-mute disabled:opacity-40"
            onClick={goBack}
            disabled={step === 1}
          >
            Geri
          </button>
          {step === 3 ? (
            <button
              type="button"
              disabled={!sizeReady}
              onClick={sendWhatsApp}
              className="btn bg-cyan text-white disabled:opacity-40"
            >
              WhatsApp’tan gönder
            </button>
          ) : (
            <span className="text-sm text-mute">Bir seçenek seçin</span>
          )}
        </footer>
      </div>
    </div>
  );
}
