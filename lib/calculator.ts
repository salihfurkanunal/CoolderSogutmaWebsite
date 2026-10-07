export type ProductLoad = "et" | "sut" | "mesrubat" | "sebze";

export const PRODUCT_LOADS: { id: ProductLoad; label: string; factor: number; note: string }[] = [
  { id: "et", label: "Et / Kırmızı Et", factor: 1.35, note: "Yüksek solunum + kemik yükü" },
  { id: "sut", label: "Süt / Süt Ürünü", factor: 1.15, note: "Pozitif rejim, sık kapı" },
  { id: "mesrubat", label: "Meşrubat / İçecek", factor: 0.95, note: "Cam vitrin, yüksek ambient" },
  { id: "sebze", label: "Sebze / Meyve", factor: 1.25, note: "Solunum ısısı + nem" },
];

export interface HeatInput {
  length: number;
  width: number;
  height: number;
  product: ProductLoad;
  targetTemp: number;
  ambient: number;
  doorCycles: number;
}

export interface HeatResult {
  volume: number;
  deltaT: number;
  transmissionKw: number;
  infiltrationKw: number;
  productKw: number;
  lightingKw: number;
  totalKw: number;
  recommendedKw: number;
  safety: number;
  regime: "pozitif" | "donuk" | "soklama";
  recommendation: string;
  skuHint: string;
}

export function calcHeatLoad(input: HeatInput): HeatResult {
  const volume = Math.max(0.1, input.length * input.width * input.height);
  const area =
    2 * (input.length * input.width + input.length * input.height + input.width * input.height);
  const deltaT = Math.max(1, input.ambient - input.targetTemp);
  const u = input.targetTemp <= -25 ? 0.22 : input.targetTemp <= -10 ? 0.28 : 0.32;
  const load = PRODUCT_LOADS.find((p) => p.id === input.product) ?? PRODUCT_LOADS[0];

  const transmissionKw = (u * area * deltaT) / 1000;
  const infiltrationKw = (volume * 0.018 * deltaT * (0.6 + input.doorCycles * 0.08)) / 3.6;
  const productKw = volume * 0.042 * load.factor;
  const lightingKw = volume * 0.008;
  const totalKw = transmissionKw + infiltrationKw + productKw + lightingKw;
  const safety = 1.18;
  const recommendedKw = totalKw * safety;

  const regime =
    input.targetTemp <= -30 ? "soklama" : input.targetTemp <= -10 ? "donuk" : "pozitif";

  const recommendation =
    regime === "soklama"
      ? "Şoklama odası ve güçlü soğutma sistemi gerekir."
      : regime === "donuk"
        ? "Dondurucu soğuk oda ve dış ünite uygundur."
        : volume < 40
          ? "Küçük oda veya market dolabı yeterli olur."
          : "Modüler soğuk oda ve ortak soğutma sistemi önerilir.";

  const skuHint =
    regime === "soklama"
      ? "CR-BLAST-40 / RACK-SW-400"
      : regime === "donuk"
        ? "CR-SL-250 / MB-S-18"
        : volume < 40
          ? "MB-W-25 / MD-1800"
          : "CR-MOD-100 / RACK-SC-120";

  return {
    volume,
    deltaT,
    transmissionKw,
    infiltrationKw,
    productKw,
    lightingKw,
    totalKw,
    recommendedKw,
    safety,
    regime,
    recommendation,
    skuHint,
  };
}

export const SPARE_PARTS = [
  { sku: "CMP-SCR-7.5", name: "Scroll Kompresör 7.5 HP", tier: { end: 18400, bayi: 15100, taseron: 16200 }, unit: "adet" },
  { sku: "EEV-14", name: "Elektronik Genleşme Valfi 14 kW", tier: { end: 4200, bayi: 3350, taseron: 3600 }, unit: "adet" },
  { sku: "FAN-EC-450", name: "EC Evaporatör Fan Ø450", tier: { end: 2650, bayi: 2100, taseron: 2280 }, unit: "adet" },
  { sku: "GSK-MD-1800", name: "Sütlük Kapı Contası MD-1800", tier: { end: 890, bayi: 640, taseron: 720 }, unit: "takım" },
  { sku: "COIL-CUAL-3R", name: "Cu-Al Evaporatör Serpantin 3 sıra", tier: { end: 9800, bayi: 7900, taseron: 8500 }, unit: "adet" },
  { sku: "CTRL-PLC-S", name: "Soğuk Oda PLC Kontrolör", tier: { end: 6400, bayi: 5100, taseron: 5450 }, unit: "adet" },
];

export const SERVICE_TICKETS = [
  {
    id: "SRV-24-4412",
    site: "Konya 1. OSB — Merkez Fabrika",
    unit: "RACK-SC-120",
    status: "Yolda",
    eta: "18 dk",
    tech: "M. Kaya",
    opened: "16.09.2026 19:42",
  },
  {
    id: "SRV-24-4398",
    site: "Karatay Hipermarket",
    unit: "MD-2500",
    status: "Teşhis",
    eta: "Sahada",
    tech: "A. Demir",
    opened: "16.09.2026 16:05",
  },
  {
    id: "SRV-24-4371",
    site: "Aksaray Et Entegre",
    unit: "CR-BLAST-40",
    status: "Parça bekleniyor",
    eta: "Yarın 09:00",
    tech: "S. Yıldız",
    opened: "15.09.2026 22:18",
  },
];
