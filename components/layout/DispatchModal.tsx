"use client";

import { useEffect, useRef, useState } from "react";
import {
  CITIES,
  DISPATCH_PHONE,
  FAMILY_LABELS,
  dispatchSymptomsFor,
  SYSTEM_TYPES,
  WHATSAPP_HOTLINE,
  WHATSAPP_URL,
} from "@/lib/catalog";
import { useDispatch } from "@/context/DispatchContext";
import type { Symptom, SystemType } from "@/lib/types";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function resetForm() {
  return {
    step: 1 as 1 | 2 | 3,
    system: null as SystemType | null,
    symptoms: [] as Symptom[],
    otherDetail: "",
    city: "Konya",
    phone: "",
    note: "",
  };
}

export function DispatchModal() {
  const { open, setOpen } = useDispatch();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [system, setSystem] = useState<SystemType | null>(null);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [otherDetail, setOtherDetail] = useState("");
  const [city, setCity] = useState("Konya");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const otherSelected = symptoms.includes("diger");
  const otherReady = !otherSelected || otherDetail.trim().length > 0;
  const step2Ready = symptoms.length > 0 && otherReady;
  const phoneReady = phone.trim().length >= 10;

  useEffect(() => {
    if (!open) return;
    const next = resetForm();
    setStep(next.step);
    setSystem(next.system);
    setSymptoms(next.symptoms);
    setOtherDetail(next.otherDetail);
    setCity(next.city);
    setPhone(next.phone);
    setNote(next.note);
  }, [open]);

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
        e.preventDefault();
        setOpen(false);
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
  }, [open, setOpen]);

  if (!open) return null;

  const systemLabel = system ? FAMILY_LABELS[system] : "-";
  const symptomLabels = symptoms
    .map((id) => {
      if (id === "diger") {
        const detail = otherDetail.trim();
        return detail ? `Diğer: ${detail}` : "Diğer";
      }
      return dispatchSymptomsFor(system).find((s) => s.id === id)?.label ?? id;
    })
    .join(", ");

  const sendWhatsApp = () => {
    if (!system || !step2Ready || !phoneReady) return;
    const lines = [
      "COOLDER arıza kaydı",
      `Cihaz: ${systemLabel}`,
      `Sorun: ${symptomLabels}`,
      `Şehir: ${city}`,
      `Tel: ${phone.trim()}`,
    ];
    if (note.trim()) lines.push(`Not: ${note.trim()}`);
    const url = `https://wa.me/${WHATSAPP_HOTLINE}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <button className="absolute inset-0 cursor-default" aria-label="Kapat" onClick={() => setOpen(false)} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dispatch-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-xl rounded-t-3xl bg-slate shadow-hud outline-none sm:max-h-[90vh] sm:overflow-auto sm:rounded-3xl"
      >
        <header className="flex items-center justify-between border-b border-line px-5 py-4">
          <div>
            <h2 id="dispatch-title" className="text-xl font-bold">
              Soğutmanız mı bozuldu?
            </h2>
            <p className="mt-1 text-sm text-mute">7/24 acil servis</p>
          </div>
          <button type="button" className="rounded-full px-3 py-1 text-mute" onClick={() => setOpen(false)}>
            Kapat
          </button>
        </header>

        <div className="px-5 py-6">
          <p className="mb-5 text-sm text-mute">Adım {step} / 3</p>

          {step === 1 ? (
            <>
              <p className="mb-3 font-semibold">Hangi cihaz bozuldu?</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {SYSTEM_TYPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setSystem(s.id);
                      setSymptoms([]);
                      setOtherDetail("");
                    }}
                    className={`rounded-2xl border px-4 py-4 text-left ${system === s.id ? "border-cyan bg-cyan/10" : "border-line hover:border-mute"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <p className="mb-3 font-semibold">Sorun ne? (birden fazla seçebilirsiniz)</p>
              <div className="flex flex-wrap gap-2">
                {dispatchSymptomsFor(system).map((s) => {
                  const on = symptoms.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        if (on) {
                          setSymptoms((prev) => prev.filter((x) => x !== s.id));
                          if (s.id === "diger") setOtherDetail("");
                        } else {
                          setSymptoms((prev) => [...prev, s.id]);
                        }
                      }}
                      className={`rounded-full border px-4 py-2 text-sm ${on ? "border-amber bg-amber/10 text-amber" : "border-line text-mute"}`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {otherSelected ? (
                <label className="mt-4 grid gap-2 text-sm font-medium">
                  Sorununuzu yazın
                  <textarea
                    value={otherDetail}
                    onChange={(e) => setOtherDetail(e.target.value)}
                    rows={3}
                    className="border border-line bg-obsidian px-3 py-3"
                    placeholder="Kısaca ne olduğunu yazın…"
                    autoFocus
                  />
                </label>
              ) : null}
            </>
          ) : null}

          {step === 3 ? (
            <div className="grid gap-4">
              <label className="grid gap-2 text-sm font-medium">
                Şehir
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="border border-line bg-obsidian px-3 py-3"
                >
                  {CITIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Telefon numaranız
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="05xx xxx xx xx"
                  className="border border-line bg-obsidian px-3 py-3"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Kısa not (isteğe bağlı)
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  className="border border-line bg-obsidian px-3 py-3"
                  placeholder="Market adı, dolap yeri, sıcaklık kaç derece…"
                />
              </label>
              <p className="text-sm text-mute">
                Gönderince WhatsApp açılır; kayıt oradan ekibe iletilir. Acil için{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="font-semibold text-cyan">
                  {DISPATCH_PHONE}
                </a>
              </p>
            </div>
          ) : null}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              className="text-sm text-mute disabled:opacity-40"
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
              disabled={step === 1}
            >
              Geri
            </button>
            {step < 3 ? (
              <button
                type="button"
                disabled={(step === 1 && !system) || (step === 2 && !step2Ready)}
                onClick={() => setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))}
                className="btn bg-frost text-white disabled:opacity-40"
              >
                Devam
              </button>
            ) : (
              <button
                type="button"
                disabled={!phoneReady}
                onClick={sendWhatsApp}
                className="btn bg-alert text-white disabled:opacity-40"
              >
                WhatsApp’tan gönder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
