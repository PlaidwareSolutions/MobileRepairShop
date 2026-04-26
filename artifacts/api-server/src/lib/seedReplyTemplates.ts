import { sql } from "drizzle-orm";
import { db, leadReplyTemplatesTable } from "@workspace/db";

type SeedTemplate = {
  name: string;
  channel: "email" | "sms";
  subject: string | null;
  body: string;
};

const STARTER_TEMPLATES: SeedTemplate[] = [
  {
    name: "Quote Ready",
    channel: "email",
    subject: "Your Gadget X Repairs quote is ready",
    body:
      "Hi there,\n\nYour repair quote is ready. Please reply to this email to approve and we'll get started right away.\n\nThanks,\nGadget X Repairs",
  },
  {
    name: "Running Late",
    channel: "email",
    subject: "Quick update on your repair",
    body:
      "Hi there,\n\nJust a quick heads up — your repair is taking a little longer than expected. We'll have it ready as soon as possible and will reach out the moment it's done.\n\nThanks for your patience,\nGadget X Repairs",
  },
  {
    name: "Ready for Pickup",
    channel: "email",
    subject: "Your device is ready for pickup",
    body:
      "Hi there,\n\nGreat news — your device is repaired and ready for pickup at Gadget X Repairs. We're open during normal business hours.\n\nSee you soon,\nGadget X Repairs",
  },
  {
    name: "Couldn't Reach You",
    channel: "email",
    subject: "Tried reaching you about your repair",
    body:
      "Hi there,\n\nWe tried to contact you about your repair but couldn't get through. Please call us back at (346) 623-6898 or reply to this email when you have a moment.\n\nThanks,\nGadget X Repairs",
  },
  {
    name: "Quote Ready",
    channel: "sms",
    subject: null,
    body:
      "Gadget X Repairs: your repair quote is ready. Reply YES to approve and we'll get started.",
  },
  {
    name: "Running Late",
    channel: "sms",
    subject: null,
    body:
      "Gadget X Repairs: your repair is taking a bit longer than expected. We'll be in touch as soon as it's ready.",
  },
  {
    name: "Ready for Pickup",
    channel: "sms",
    subject: null,
    body:
      "Gadget X Repairs: your device is ready for pickup! See you during normal business hours.",
  },
  {
    name: "Couldn't Reach You",
    channel: "sms",
    subject: null,
    body:
      "Gadget X Repairs: we tried to reach you about your repair. Please call us back at (346) 623-6898.",
  },
];

/**
 * On first run, populate lead_reply_templates with a handful of common starter
 * snippets so the Saved Replies picker is usable on day one. Idempotent: skips
 * entirely if any rows already exist, so admin edits are never overwritten.
 */
export async function seedReplyTemplatesIfEmpty(): Promise<{ inserted: number }> {
  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(leadReplyTemplatesTable);

  if (count > 0) return { inserted: 0 };

  const rows = STARTER_TEMPLATES.map((tpl, idx) => ({
    name: tpl.name,
    channel: tpl.channel,
    leadType: null,
    subject: tpl.subject,
    body: tpl.body,
    sortOrder: (idx + 1) * 10,
  }));

  if (rows.length === 0) return { inserted: 0 };
  await db.insert(leadReplyTemplatesTable).values(rows);
  return { inserted: rows.length };
}
