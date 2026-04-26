type AnyLead = Record<string, unknown> & { id: number; name?: string };

const SHOP = {
  name: "Gadget X Repairs",
  phone: "(346) 623-6898",
  hoursLine:
    "Open Sun 12–5pm and Mon–Sat 10am–7pm. Reply here or call us if you need anything.",
};

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function htmlBody(greeting: string, paragraphs: string[]): string {
  const safe = paragraphs
    .map((p) => `<p style="margin:0 0 12px 0;">${escapeHtml(p)}</p>`)
    .join("");
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:14px;color:#111;line-height:1.5;">
<p style="margin:0 0 12px 0;">${escapeHtml(greeting)}</p>
${safe}
<p style="margin:16px 0 0 0;color:#444;">— ${escapeHtml(SHOP.name)}<br/>${escapeHtml(SHOP.phone)}</p>
</div>`;
}

function textBody(greeting: string, paragraphs: string[]): string {
  return `${greeting}\n\n${paragraphs.join("\n\n")}\n\n— ${SHOP.name}\n${SHOP.phone}`;
}

export type EmailTemplate = { subject: string; html: string; text: string };
export type SmsTemplate = { body: string };

function firstName(name?: string): string {
  if (!name) return "there";
  const trimmed = name.trim().split(/\s+/)[0];
  return trimmed || "there";
}

export function emailTemplateFor(
  leadType: string,
  lead: AnyLead,
): EmailTemplate {
  const greeting = `Hi ${firstName(lead.name as string | undefined)},`;
  switch (leadType) {
    case "repair-quote": {
      const brand = (lead.brand as string) ?? "device";
      const model = (lead.model as string) ?? "";
      const problem = (lead.problem as string) ?? "the issue you described";
      const lines = [
        `Thanks for your repair request for your ${brand} ${model}.`,
        `Based on your description ("${problem}"), the estimate is $___ and we can have it ready in ___.`,
        SHOP.hoursLine,
      ];
      return {
        subject: `Your ${brand} ${model} repair quote`,
        html: htmlBody(greeting, lines),
        text: textBody(greeting, lines),
      };
    }
    case "sell-phone": {
      const brand = (lead.brand as string) ?? "device";
      const model = (lead.model as string) ?? "";
      const condition = (lead.condition as string) ?? "the condition you noted";
      const battery = lead.batteryHealth
        ? `, battery ${lead.batteryHealth}%`
        : "";
      const lines = [
        `Thanks for the details on your ${brand} ${model}.`,
        `Based on the condition (${condition}${battery}) we can offer $___.`,
        `Bring it in any time during business hours and we'll pay you on the spot.`,
        SHOP.hoursLine,
      ];
      return {
        subject: `Offer for your ${brand} ${model}`,
        html: htmlBody(greeting, lines),
        text: textBody(greeting, lines),
      };
    }
    case "appointment": {
      const service =
        ((lead.serviceType as string) ?? "service").replaceAll("-", " ");
      const when = (lead.preferredDatetime as string) ?? "your requested time";
      const lines = [
        `Confirming your ${service} appointment for ${when}.`,
        `Reply YES to confirm or call us at ${SHOP.phone} to reschedule.`,
        SHOP.hoursLine,
      ];
      return {
        subject: `Your ${service} appointment`,
        html: htmlBody(greeting, lines),
        text: textBody(greeting, lines),
      };
    }
    case "contact": {
      const original = (lead.message as string) ?? "";
      const lines = [
        `Thanks for reaching out — replying to your message:`,
        `> ${original}`,
        `___`,
        SHOP.hoursLine,
      ];
      return {
        subject: `Re: your message to ${SHOP.name}`,
        html: htmlBody(greeting, lines),
        text: textBody(greeting, lines),
      };
    }
    case "reservation": {
      const item = (lead.itemLabel as string) ?? "your item";
      const lines = [
        `Your ${item} is held for you.`,
        SHOP.hoursLine,
      ];
      return {
        subject: `Your reserved ${item}`,
        html: htmlBody(greeting, lines),
        text: textBody(greeting, lines),
      };
    }
    default:
      return {
        subject: `${SHOP.name}`,
        html: htmlBody(greeting, ["___"]),
        text: textBody(greeting, ["___"]),
      };
  }
}

export function smsTemplateFor(
  leadType: string,
  lead: AnyLead,
): SmsTemplate {
  const fn = firstName(lead.name as string | undefined);
  switch (leadType) {
    case "repair-quote": {
      const brand = (lead.brand as string) ?? "device";
      const model = (lead.model as string) ?? "";
      return {
        body: `Hi ${fn}, ${SHOP.name}: your ${brand} ${model} repair estimate is $___ and we can have it ready in ___. Reply or call ${SHOP.phone}.`,
      };
    }
    case "sell-phone": {
      const brand = (lead.brand as string) ?? "device";
      const model = (lead.model as string) ?? "";
      return {
        body: `Hi ${fn}, ${SHOP.name}: based on the condition of your ${brand} ${model}, we can offer $___. Bring it by during business hours.`,
      };
    }
    case "appointment": {
      const service =
        ((lead.serviceType as string) ?? "service").replaceAll("-", " ");
      const when =
        (lead.preferredDatetime as string) ?? "your requested time";
      return {
        body: `Hi ${fn}, ${SHOP.name}: confirming your ${service} appointment for ${when}. Reply YES to confirm or call ${SHOP.phone}.`,
      };
    }
    case "contact": {
      return {
        body: `Hi ${fn}, ${SHOP.name} here, replying to your message: ___. Call ${SHOP.phone} if easier.`,
      };
    }
    case "reservation": {
      const item = (lead.itemLabel as string) ?? "your item";
      return {
        body: `Hi ${fn}, ${SHOP.name}: your ${item} is held for you. Open Sun 12–5 / Mon–Sat 10–7. ${SHOP.phone}.`,
      };
    }
    default:
      return { body: `Hi ${fn}, ${SHOP.name}: ___. Call ${SHOP.phone}.` };
  }
}
