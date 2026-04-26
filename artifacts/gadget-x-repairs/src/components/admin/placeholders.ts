import type {
  AnyLead,
  AppointmentLead,
  ContactLead,
  RepairQuoteLead,
  ReservationLead,
  SellPhoneLead,
} from "./types";

export type PlaceholderValues = Record<string, string>;

export const COMMON_PLACEHOLDER_KEYS = ["firstName", "name"] as const;

export const PLACEHOLDER_KEYS_BY_TYPE: Record<string, readonly string[]> = {
  "repair-quote": [
    "firstName",
    "name",
    "brand",
    "model",
    "deviceType",
    "phone",
    "email",
  ],
  "sell-phone": [
    "firstName",
    "name",
    "brand",
    "model",
    "condition",
    "phone",
    "expectedPrice",
  ],
  appointment: [
    "firstName",
    "name",
    "serviceType",
    "preferredDatetime",
    "phone",
  ],
  contact: ["firstName", "name", "contact"],
  reservation: ["firstName", "name", "itemLabel", "itemId", "phone"],
};

function firstNameOf(name: string | undefined | null): string {
  if (!name) return "";
  const first = name.trim().split(/\s+/)[0];
  return first ?? "";
}

function str(value: unknown): string {
  if (value == null) return "";
  return String(value);
}

export function getPlaceholderValues(
  leadType: string,
  lead: AnyLead | Record<string, unknown>,
): PlaceholderValues {
  const l = lead as Record<string, unknown>;
  const name = str(l.name);
  const base: PlaceholderValues = {
    firstName: firstNameOf(name),
    name,
  };
  switch (leadType) {
    case "repair-quote": {
      const r = lead as RepairQuoteLead;
      return {
        ...base,
        brand: str(r.brand),
        model: str(r.model),
        deviceType: str(r.deviceType),
        phone: str(r.phone),
        email: str(r.email),
      };
    }
    case "sell-phone": {
      const r = lead as SellPhoneLead;
      return {
        ...base,
        brand: str(r.brand),
        model: str(r.model),
        condition: str(r.condition),
        phone: str(r.phone),
        expectedPrice: str(r.expectedPrice),
      };
    }
    case "appointment": {
      const r = lead as AppointmentLead;
      return {
        ...base,
        serviceType: str(r.serviceType),
        preferredDatetime: str(r.preferredDatetime),
        phone: str(r.phone),
      };
    }
    case "contact": {
      const r = lead as ContactLead;
      return {
        ...base,
        contact: str(r.contact),
      };
    }
    case "reservation": {
      const r = lead as ReservationLead;
      return {
        ...base,
        itemLabel: str(r.itemLabel),
        itemId: str(r.itemId),
        phone: str(r.phone),
      };
    }
    default:
      return base;
  }
}

export function applyPlaceholders(
  text: string,
  values: PlaceholderValues,
): string {
  return text.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key: string) => {
    if (Object.prototype.hasOwnProperty.call(values, key)) {
      return values[key];
    }
    return match;
  });
}

export function placeholderKeysForScope(scope: string): readonly string[] {
  if (scope && PLACEHOLDER_KEYS_BY_TYPE[scope]) {
    return PLACEHOLDER_KEYS_BY_TYPE[scope];
  }
  return COMMON_PLACEHOLDER_KEYS;
}
