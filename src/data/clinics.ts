export type ClinicId = "liteh" | "kids" | "detox";

export type Clinic = {
  id: ClinicId;
  name: string;
  shortName: string;
  address: string;
};

export const CLINICS: Record<ClinicId, Clinic> = {
  liteh: {
    id: "liteh",
    name: "Литех / Амадея",
    shortName: "45 Параллель, 2",
    address: "ул. 45-я Параллель, д. 2",
  },
  kids: {
    id: "kids",
    name: "Амадея Kids",
    shortName: "45 Параллель, 26",
    address: "Ставрополь, ул. 45 Параллель, д. 26",
  },
  detox: {
    id: "detox",
    name: "Амадея Детокс",
    shortName: "Каховский, 26А",
    address: "пер. Каховский, д. 26а",
  },
};

export const CLINIC_IDS: ClinicId[] = ["liteh", "kids", "detox"];
