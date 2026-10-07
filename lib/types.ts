export type Division = "ticari" | "depolama" | "endustriyel";
export type TempRegime = "pozitif" | "donuk" | "soklama";
export type MotorType = "dahili" | "remote" | "merkezi";
export type CompressorPlatform = "scroll" | "semi-hermetic" | "screw";
export type Refrigerant = "R290" | "R744" | "R448A" | "R449A" | "R404A";
export type ProductFamily =
  | "endustriyel-sistem"
  | "ic-unite"
  | "merkezi"
  | "kondenser"
  | "chiller"
  | "monoblok"
  | "sut-tanki"
  | "reyon"
  | "dik-dolap"
  | "yas-pasta"
  | "soguk-oda"
  | "morg";

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  model: string;
  family: ProductFamily;
  division: Division;
  short: string;
  description: string;
  tempRegime: TempRegime;
  tempRange: string;
  motor: MotorType;
  compressor: CompressorPlatform;
  refrigerant: Refrigerant;
  capacityKw: number;
  capacityBtu: number;
  soundDb: number;
  cop: number;
  voltage: string;
  dimensions: { w: number; d: number; h: number };
  weightKg: number;
  ambientMax: number;
  glass?: string;
  insulation?: string;
  highlights: string[];
  placeholder: {
    file: string;
    subtitle: string;
    ratio: string;
  };
}

export type UserRole =
  | "market"
  | "bayi"
  | "taseron"
  | "teknisyen";

export type SystemType = ProductFamily;

export type Symptom =
  | "gaz-kacagi"
  | "kompresor"
  | "sicaklik"
  | "defrost"
  | "fan"
  | "titresim"
  | "su-sizintisi"
  | "alarm"
  | "elektrik"
  | "diger";
