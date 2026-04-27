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
  new: "bg-red-500 text-black",
  in_progress: "bg-blue-500 text-zinc-900",
  done: "bg-green-500 text-zinc-900",
  archived: "bg-zinc-300 text-zinc-700",
};
