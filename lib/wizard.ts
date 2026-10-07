import type { ProductFamily } from "./types";

export type WizardMeasureMode = "area" | "liters" | "brief";

/** İçerik (süt/et/…) adımı anlamlı olan gruplar */
export const WIZARD_CONTENT_FAMILIES: ProductFamily[] = [
  "reyon",
  "dik-dolap",
  "yas-pasta",
  "soguk-oda",
  "monoblok",
];

export function wizardSkipsContent(need: ProductFamily | null): boolean {
  if (!need) return false;
  return !WIZARD_CONTENT_FAMILIES.includes(need);
}

export function wizardMeasureMode(need: ProductFamily | null): WizardMeasureMode {
  if (need === "sut-tanki") return "liters";
  if (
    need === "kondenser" ||
    need === "ic-unite" ||
    need === "chiller" ||
    need === "merkezi" ||
    need === "endustriyel-sistem" ||
    need === "morg"
  ) {
    return "brief";
  }
  return "area";
}

export function wizardStep2Title(need: ProductFamily | null): string {
  if (need === "yas-pasta") return "Vitrinde ne duracak?";
  if (need === "soguk-oda" || need === "monoblok") return "Odada hangi ürün olacak?";
  return "İçinde hangi ürün bulundurulacak?";
}

export function wizardStep3Title(need: ProductFamily | null): string {
  const mode = wizardMeasureMode(need);
  if (mode === "liters") return "Tank yaklaşık kaç litre?";
  if (mode === "brief") return "Kısaca ihtiyacınızı yazın";
  if (need === "reyon" || need === "dik-dolap" || need === "yas-pasta") {
    return "Dolabın yeri yaklaşık kaç metre?";
  }
  return "Yer yaklaşık kaç metrekare?";
}

export const PASTA_CONTENT_OPTIONS = [
  { id: "pasta", label: "Yaş pasta / tatlı" },
  { id: "icecek", label: "İçecek" },
  { id: "diger", label: "Diğer" },
] as const;
