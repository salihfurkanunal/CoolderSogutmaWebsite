import type { Division, ProductFamily, Symptom, SystemType, UserRole } from "./types";

export const CITIES = [
  "Konya",
  "Karaman",
  "Aksaray",
  "Niğde",
  "Ankara",
  "Kayseri",
  "Kırşehir",
  "Nevşehir",
  "Isparta",
  "Afyonkarahisar",
  "Antalya",
  "Mersin",
  "Adana",
  "Gaziantep",
  "İstanbul",
  "İzmir",
  "Bursa",
  "Kocaeli",
  "Samsun",
  "Diyarbakır",
] as const;

export const PRODUCT_GROUPS: {
  id: ProductFamily;
  label: string;
  href: string;
  placeholder: { file: string; subtitle: string };
}[] = [
  {
    id: "endustriyel-sistem",
    label: "Endüstriyel Soğutma Sistemleri",
    href: "/urunler?family=endustriyel-sistem",
    placeholder: {
      file: "GROUP_INDUSTRIAL_COOLING.WEBP",
      subtitle: "Fabrika ve işletme soğutma grubu görseli.",
    },
  },
  {
    id: "ic-unite",
    label: "İç Üniteler (Evaporatör)",
    href: "/urunler?family=ic-unite",
    placeholder: {
      file: "GROUP_EVAPORATOR_UNIT.WEBP",
      subtitle: "Soğuk oda iç ünitesi görseli.",
    },
  },
  {
    id: "merkezi",
    label: "Merkezi Soğutma Sistemleri",
    href: "/urunler?family=merkezi",
    placeholder: {
      file: "GROUP_CENTRAL_RACK.WEBP",
      subtitle: "Merkezi soğutma makinesi görseli.",
    },
  },
  {
    id: "kondenser",
    label: "Kondenser Üniteleri",
    href: "/urunler?family=kondenser",
    placeholder: {
      file: "GROUP_CONDENSER_UNIT.WEBP",
      subtitle: "Dış kondenser ünitesi görseli.",
    },
  },
  {
    id: "chiller",
    label: "Chiller Soğutma Sistemleri",
    href: "/urunler?family=chiller",
    placeholder: {
      file: "GROUP_CHILLER.WEBP",
      subtitle: "Su soğutmalı chiller görseli.",
    },
  },
  {
    id: "monoblok",
    label: "Monoblok Soğutma Sistemleri",
    href: "/urunler?family=monoblok",
    placeholder: {
      file: "GROUP_MONOBLOCK.WEBP",
      subtitle: "Tek parça soğutma ünitesi görseli.",
    },
  },
  {
    id: "sut-tanki",
    label: "Süt soğutma tankı",
    href: "/urunler?family=sut-tanki",
    placeholder: {
      file: "GROUP_MILK_TANK.WEBP",
      subtitle: "Süt soğutma tankı görseli.",
    },
  },
  {
    id: "reyon",
    label: "Reyon dolapları",
    href: "/urunler?family=reyon",
    placeholder: {
      file: "GROUP_DISPLAY_CASE.WEBP",
      subtitle: "Market reyon dolabı görseli.",
    },
  },
  {
    id: "dik-dolap",
    label: "Dik dolap",
    href: "/urunler?family=dik-dolap",
    placeholder: {
      file: "GROUP_UPRIGHT_CABINET.WEBP",
      subtitle: "Cam kapılı dik soğutucu dolap görseli.",
    },
  },
  {
    id: "yas-pasta",
    label: "Yaş pasta dolabı",
    href: "/urunler?family=yas-pasta",
    placeholder: {
      file: "GROUP_CAKE_DISPLAY.WEBP",
      subtitle: "Pastane yaş pasta vitrin dolabı görseli.",
    },
  },
  {
    id: "soguk-oda",
    label: "Soğuk oda sistemleri",
    href: "/urunler?family=soguk-oda",
    placeholder: {
      file: "GROUP_COLD_ROOM.WEBP",
      subtitle: "Soğuk oda paneli ve kapı görseli.",
    },
  },
  {
    id: "morg",
    label: "Morg soğutma sistemi",
    href: "/urunler?family=morg",
    placeholder: {
      file: "GROUP_MORGUE_COOLING.WEBP",
      subtitle: "Morg soğutma ünitesi görseli.",
    },
  },
];

export const FAMILY_LABELS: Record<ProductFamily, string> = Object.fromEntries(
  PRODUCT_GROUPS.map((g) => [g.id, g.label])
) as Record<ProductFamily, string>;

export const SYSTEM_TYPES: { id: SystemType; label: string; spec: string }[] = PRODUCT_GROUPS.map((g) => ({
  id: g.id,
  label: g.label,
  spec: "",
}));

const SYMPTOM_META: Record<Symptom, { label: string; severity: "crit" | "warn" | "info" }> = {
  "gaz-kacagi": { label: "Gaz kaçağı kokusu", severity: "crit" },
  kompresor: { label: "Motor çalışmıyor", severity: "crit" },
  sicaklik: { label: "Sıcaklık yükseliyor / ısınıyor", severity: "crit" },
  defrost: { label: "Buzlanma / çözülme sorunu", severity: "warn" },
  fan: { label: "Fan dönmüyor", severity: "warn" },
  titresim: { label: "Aşırı ses veya titreme", severity: "info" },
  "su-sizintisi": { label: "Su kaçağı / sızıntı", severity: "crit" },
  alarm: { label: "Alarm / hata kodu", severity: "warn" },
  elektrik: { label: "Elektrik kesildi / sigorta atıyor", severity: "crit" },
  diger: { label: "Diğer", severity: "info" },
};

export const SYMPTOMS: { id: Symptom; label: string; severity: "crit" | "warn" | "info" }[] = Object.entries(
  SYMPTOM_META
).map(([id, meta]) => ({ id: id as Symptom, ...meta }));

const TICARI_SYMPTOMS: Symptom[] = ["gaz-kacagi", "kompresor", "sicaklik", "defrost", "fan", "titresim", "diger"];
const ENDUSTRIYEL_SYMPTOMS: Symptom[] = [
  "kompresor",
  "sicaklik",
  "fan",
  "gaz-kacagi",
  "su-sizintisi",
  "alarm",
  "elektrik",
  "titresim",
  "diger",
];
const MORG_SYMPTOMS: Symptom[] = ["sicaklik", "alarm", "kompresor", "fan", "elektrik", "titresim", "diger"];

export function dispatchSymptomsFor(system: SystemType | null) {
  let ids: Symptom[];
  if (!system) ids = TICARI_SYMPTOMS;
  else if (system === "morg") ids = MORG_SYMPTOMS;
  else if (
    system === "chiller" ||
    system === "endustriyel-sistem" ||
    system === "merkezi" ||
    system === "kondenser" ||
    system === "ic-unite" ||
    system === "monoblok" ||
    system === "soguk-oda"
  ) {
    ids = ENDUSTRIYEL_SYMPTOMS;
  } else if (system === "sut-tanki") {
    ids = ["sicaklik", "kompresor", "alarm", "elektrik", "titresim", "diger"];
  } else {
    ids = TICARI_SYMPTOMS;
  }
  return ids.map((id) => ({ id, ...SYMPTOM_META[id] }));
}

export const ROLES: { id: UserRole; label: string; code: string }[] = [
  { id: "market", label: "Market / dükkan sahibi", code: "END-USER" },
  { id: "bayi", label: "Bayi", code: "DEALER" },
  { id: "taseron", label: "Montaj / taahhüt firması", code: "CONTRACTOR" },
  { id: "teknisyen", label: "Servis teknisyeni", code: "FIELD" },
];

export const DIVISION_LABELS: Record<Division, string> = {
  ticari: "Market",
  depolama: "Depolama",
  endustriyel: "Üniteler",
};

export const FAMILIES_BY_DIVISION: Record<Division, ProductFamily[]> = {
  ticari: ["reyon", "dik-dolap", "yas-pasta"],
  depolama: ["soguk-oda", "sut-tanki", "morg"],
  endustriyel: ["endustriyel-sistem", "ic-unite", "merkezi", "kondenser", "chiller", "monoblok"],
};

const LEGACY_FAMILY: Record<string, ProductFamily> = {
  sutluk: "reyon",
  sarkuteri: "reyon",
  mesrubat: "reyon",
  ada: "reyon",
};

export function isDivision(value: string | null): value is Division {
  return value === "ticari" || value === "depolama" || value === "endustriyel";
}

export function isProductFamily(value: string | null): value is ProductFamily {
  return value !== null && value in FAMILY_LABELS;
}

export function resolveProductFamily(value: string | null): ProductFamily | null {
  if (!value) return null;
  if (isProductFamily(value)) return value;
  return LEGACY_FAMILY[value] ?? null;
}

/** Dosya adı değişince (önbellek kırılınca) buraya yazın. */
const PRODUCT_IMAGE_FILE: Partial<Record<ProductFamily, string>> = {
  "endustriyel-sistem": "endustriyel-sistem-b.webp",
};

export function productGroupImage(id: ProductFamily): string {
  const file = PRODUCT_IMAGE_FILE[id] ?? `${id}.webp`;
  return `/images/products/${file}`;
}

export const WHATSAPP_HOTLINE = "905051367272";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_HOTLINE}`;
export const DISPATCH_PHONE = "+90 505 136 72 72";
export const PLANT_ADDRESS = "1. Organize Sanayi Bölgesi, Konya";
