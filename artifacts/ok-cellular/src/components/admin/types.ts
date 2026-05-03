export type LeadType =
  | "repair-quote"
  | "sell-phone"
  | "appointment"
  | "contact"
  | "reservation";

export type LeadStatus = "new" | "in_progress" | "done" | "archived";

export type BaseLead = {
  id: number;
  status: LeadStatus | string;
  createdAt: string;
  updatedAt: string;
};

export type RepairQuoteLead = BaseLead & {
  name: string;
  phone: string;
  email?: string | null;
  deviceType: string;
  brand: string;
  model: string;
  problem: string;
  preferredContact?: string | null;
  urgency?: string | null;
  notes?: string | null;
  photoUrl?: string | null;
  // Whether the customer dropped the device off in the shop or shipped it
  // for the dedicated mail-in flow. Defaults to "in-store" on legacy rows
  // that pre-date the column.
  source?: "in-store" | "mail-in" | string | null;
  // Where to ship the repaired device back. Required by the API for
  // mail-in submissions, never set for in-store ones.
  returnAddress?: string | null;
};

export type SellPhoneLead = BaseLead & {
  name: string;
  phone: string;
  brand: string;
  model: string;
  storage?: string | null;
  carrier?: string | null;
  lockedStatus?: string | null;
  condition?: string | null;
  batteryHealth?: number | null;
  damageNotes?: string | null;
  expectedPrice?: string | null;
  photoUrl?: string | null;
};

export type AppointmentLead = BaseLead & {
  name: string;
  phone: string;
  serviceType: string;
  preferredDatetime: string;
  notes?: string | null;
};

export type ContactLead = BaseLead & {
  name: string;
  contact: string;
  message: string;
  // Where the contact lead came from — "contact" (generic Contact Us form)
  // or "financing" (phone-financing pre-qualification). Optional in the
  // type because the API treats it as optional on input, but every row
  // returned from the admin endpoint will have a value (DB column has a
  // "contact" default). Strings other than the two known values are
  // accepted defensively so a future source doesn't break the UI.
  source?: "contact" | "financing" | string | null;
};

export type ReservationLead = BaseLead & {
  name: string;
  phone: string;
  itemId: string;
  itemLabel: string;
  notes?: string | null;
};

export type AnyLead =
  | RepairQuoteLead
  | SellPhoneLead
  | AppointmentLead
  | ContactLead
  | ReservationLead;

export type AllLeads = {
  repairQuotes: RepairQuoteLead[];
  sellPhoneSubmissions: SellPhoneLead[];
  appointments: AppointmentLead[];
  contactMessages: ContactLead[];
  itemReservations: ReservationLead[];
};

export const STATUSES: LeadStatus[] = [
  "new",
  "in_progress",
  "done",
  "archived",
];

export const STATUS_LABEL: Record<string, string> = {
  new: "NEW",
  in_progress: "IN PROGRESS",
  done: "DONE",
  archived: "ARCHIVED",
};

export const STATUS_BADGE_CLASS: Record<string, string> = {
  new: "bg-red-50 text-red-600 border border-red-200",
  in_progress: "bg-blue-50 text-blue-700 border border-blue-200",
  done: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  archived: "bg-zinc-100 text-zinc-600 border border-zinc-200",
};
