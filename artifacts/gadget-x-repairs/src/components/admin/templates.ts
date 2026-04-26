type EmailTpl = { subject: string; html: string; text: string };
type SmsTpl = { body: string };

const SHOP = "Gadget X Repairs";
const SIGN = `— ${SHOP}`;

function firstName(name: string | undefined | null): string {
  if (!name) return "there";
  return name.split(" ")[0] ?? "there";
}

function htmlWrap(body: string): string {
  return `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">${body}<p style="margin-top:24px">${SIGN}</p></div>`;
}

export function emailTemplate(
  type:
    | "repair-quote"
    | "sell-phone"
    | "appointment"
    | "contact"
    | "reservation",
  lead: any,
): EmailTpl {
  const name = firstName(lead.name);
  switch (type) {
    case "repair-quote": {
      const subject = `Your ${lead.brand} ${lead.model} repair quote`;
      const text = `Hi ${name},\n\nThanks for sending your ${lead.deviceType} repair request for the ${lead.brand} ${lead.model}. Based on the details you shared ("${lead.problem}"), our quote is $___ and turnaround is approximately ___.\n\nReply to this email to schedule, or text us back to confirm.\n\n${SIGN}`;
      const html = htmlWrap(
        `<p>Hi ${name},</p><p>Thanks for sending your <strong>${lead.deviceType}</strong> repair request for the <strong>${lead.brand} ${lead.model}</strong>. Based on the details you shared (<em>"${lead.problem}"</em>), our quote is <strong>$___</strong> and turnaround is approximately <strong>___</strong>.</p><p>Reply to this email to schedule, or text us back to confirm.</p>`,
      );
      return { subject, html, text };
    }
    case "sell-phone": {
      const subject = `Your ${lead.brand} ${lead.model} sell quote`;
      const text = `Hi ${name},\n\nThanks for sending the details on your ${lead.brand} ${lead.model}${lead.condition ? ` (condition: ${lead.condition})` : ""}. We can offer $___ today, contingent on inspection at the shop.\n\nLet us know if that works and we'll set a quick visit.\n\n${SIGN}`;
      const html = htmlWrap(
        `<p>Hi ${name},</p><p>Thanks for sending the details on your <strong>${lead.brand} ${lead.model}</strong>${lead.condition ? ` (condition: ${lead.condition})` : ""}. We can offer <strong>$___</strong> today, contingent on inspection at the shop.</p><p>Let us know if that works and we'll set a quick visit.</p>`,
      );
      return { subject, html, text };
    }
    case "appointment": {
      const subject = `Confirming your ${lead.serviceType?.replaceAll("-", " ") ?? "appointment"}`;
      const text = `Hi ${name},\n\nConfirming your ${lead.serviceType?.replaceAll("-", " ")} appointment for ${lead.preferredDatetime}. Reply YES to confirm or suggest a better time.\n\n${SIGN}`;
      const html = htmlWrap(
        `<p>Hi ${name},</p><p>Confirming your <strong>${lead.serviceType?.replaceAll("-", " ")}</strong> appointment for <strong>${lead.preferredDatetime}</strong>. Reply YES to confirm or suggest a better time.</p>`,
      );
      return { subject, html, text };
    }
    case "contact": {
      const subject = `Re: your message to ${SHOP}`;
      const text = `Hi ${name},\n\nThanks for reaching out. Quick reply about your message: "${lead.message?.slice(0, 120)}${(lead.message?.length ?? 0) > 120 ? "..." : ""}"\n\n___\n\n${SIGN}`;
      const html = htmlWrap(
        `<p>Hi ${name},</p><p>Thanks for reaching out. Quick reply about your message:</p><blockquote style="border-left:3px solid #eee;padding-left:12px;color:#555">${(lead.message ?? "").slice(0, 240)}${(lead.message?.length ?? 0) > 240 ? "..." : ""}</blockquote><p>___</p>`,
      );
      return { subject, html, text };
    }
    case "reservation": {
      const subject = `Your hold: ${lead.itemLabel}`;
      const text = `Hi ${name},\n\nYour ${lead.itemLabel} is on hold for you at ${SHOP}. We'll keep it for 48 hours. Reply to confirm pickup time.\n\n${SIGN}`;
      const html = htmlWrap(
        `<p>Hi ${name},</p><p>Your <strong>${lead.itemLabel}</strong> is on hold for you at ${SHOP}. We'll keep it for 48 hours. Reply to confirm pickup time.</p>`,
      );
      return { subject, html, text };
    }
  }
}

export function smsTemplate(
  type:
    | "repair-quote"
    | "sell-phone"
    | "appointment"
    | "contact"
    | "reservation",
  lead: any,
): SmsTpl {
  const name = firstName(lead.name);
  switch (type) {
    case "repair-quote":
      return {
        body: `Hi ${name}, ${SHOP}: quote on your ${lead.brand} ${lead.model} is $___, turnaround ___. Reply to schedule.`,
      };
    case "sell-phone":
      return {
        body: `Hi ${name}, ${SHOP}: we can offer $___ for your ${lead.brand} ${lead.model}, pending inspection. Reply to set a visit.`,
      };
    case "appointment":
      return {
        body: `Hi ${name}, ${SHOP}: confirming your ${lead.serviceType?.replaceAll("-", " ")} on ${lead.preferredDatetime}. Reply YES to confirm.`,
      };
    case "contact":
      return {
        body: `Hi ${name}, ${SHOP}: thanks for reaching out. ___`,
      };
    case "reservation":
      return {
        body: `Hi ${name}, ${SHOP}: your ${lead.itemLabel} is on hold for 48h. Reply to confirm pickup.`,
      };
  }
}
