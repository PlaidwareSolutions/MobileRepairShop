import { type ReactNode } from "react";
import { ActionBar } from "./ActionBar";
import {
  formatRelative,
  isFinancingContactLead,
  looksLikeEmail,
  pickEmail,
} from "./utils";
import {
  STATUS_BADGE_CLASS,
  type AppointmentLead,
  type ContactLead,
  type RepairQuoteLead,
  type ReservationLead,
  type SellPhoneLead,
} from "./types";
import type { MessagingConfig } from "@/lib/api";
import { emailTemplate, smsTemplate } from "./templates";
import { getPlaceholderValues } from "./placeholders";

type CardShellProps = {
  testId: string;
  isNew: boolean;
  status: string;
  id: number;
  createdAt: string;
  primary: ReactNode;
  meta?: ReactNode;
  body?: ReactNode;
  badges?: ReactNode;
  unreadInboundCount?: number;
  actionBar: ReactNode;
};

function CardShell({
  testId,
  isNew,
  id,
  createdAt,
  primary,
  meta,
  body,
  badges,
  unreadInboundCount = 0,
  actionBar,
}: CardShellProps) {
  const hasUnread = unreadInboundCount > 0;
  return (
    <article
      className={`bg-white border rounded-xl shadow-sm p-5 ${
        hasUnread
          ? "border-primary ring-2 ring-primary"
          : isNew
            ? "border-primary"
            : "border-border"
      }`}
      data-testid={testId}
      data-unread-inbound={unreadInboundCount}
    >
      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
        <div>
          <div className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground leading-tight">
            {primary}
          </div>
          {meta && <div className="text-xs text-muted-foreground mt-1">{meta}</div>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
            #{id} · {formatRelative(createdAt)}
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {hasUnread && (
              <span
                className="bg-primary text-white px-2 py-0.5 rounded-full font-semibold uppercase text-[10px] tracking-wide shadow-sm"
                data-testid={`badge-card-reply-${testId}`}
              >
                {unreadInboundCount} REPLY
              </span>
            )}
            {badges}
          </div>
        </div>
      </div>
      {body && <div className="text-sm text-foreground whitespace-pre-wrap break-words">{body}</div>}
      {actionBar}
    </article>
  );
}

function Badge({ children, className = "bg-muted text-foreground border-border" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-0.5 rounded-full border font-semibold uppercase text-[10px] tracking-wide ${className}`}>
      {children}
    </span>
  );
}

type CommonProps = {
  password: string;
  messaging: MessagingConfig | null;
  onChanged: () => void;
  unreadInboundCount?: number;
};

export function RepairQuoteCard({
  lead,
  ...rest
}: CommonProps & { lead: RepairQuoteLead }) {
  const isNew = lead.status === "new";
  const tpl = emailTemplate("repair-quote", lead);
  const sms = smsTemplate("repair-quote", lead);
  const email = pickEmail([lead.email]);
  return (
    <CardShell
      testId={`lead-repairQuotes-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={
        <>
          {lead.brand} {lead.model}
          <span className="block text-sm font-semibold uppercase tracking-wide text-primary mt-1">
            {lead.deviceType}
          </span>
        </>
      }
      meta={
        <>
          <span className="text-foreground font-semibold">{lead.name}</span> ·{" "}
          {lead.phone}
          {email ? ` · ${email}` : ""}
        </>
      }
      badges={
        <>
          {lead.depositPaid && (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-300">
              $10 deposit paid
            </Badge>
          )}
          {lead.source === "mail-in" && (
            <Badge className="bg-blue-50 text-blue-700 border-blue-200">
              mail-in
            </Badge>
          )}
          {lead.urgency && (
            <Badge
              className={
                lead.urgency === "asap"
                  ? "bg-muted/60 text-primary border-primary"
                  : lead.urgency === "today"
                    ? "bg-orange-50 text-orange-600 border-orange-200"
                    : "bg-muted text-foreground border-border"
              }
            >
              {lead.urgency.replaceAll("_", " ")}
            </Badge>
          )}
          {lead.preferredContact && (
            <Badge>prefer {lead.preferredContact}</Badge>
          )}
        </>
      }
      body={
        <div className="space-y-3">
          <div>{lead.problem}</div>
          {lead.source === "mail-in" && lead.returnAddress && (
            <div className="text-xs bg-blue-50 border border-blue-200 px-3 py-2 rounded">
              <div className="font-semibold tracking-wide text-blue-700 mb-1">
                Return shipping address
              </div>
              <div className="whitespace-pre-line text-foreground">
                {lead.returnAddress}
              </div>
            </div>
          )}
          {lead.notes && (
            <div className="text-xs text-muted-foreground italic">Notes: {lead.notes}</div>
          )}
          {lead.photoUrl && (
            <a
              href={lead.photoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={lead.photoUrl}
                alt="Customer attachment"
                className="max-h-32 rounded-md border border-border"
              />
            </a>
          )}
        </div>
      }
      unreadInboundCount={rest.unreadInboundCount ?? 0}
      actionBar={
        <ActionBar
          password={rest.password}
          leadType="repair-quote"
          id={lead.id}
          status={lead.status}
          phone={lead.phone}
          email={email}
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, OK Cellular here regarding your ${lead.brand} ${lead.model} repair request.`}
          emailDefaults={{ to: email ?? "", subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          placeholderValues={getPlaceholderValues("repair-quote", lead)}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

export function SellPhoneCard({
  lead,
  ...rest
}: CommonProps & { lead: SellPhoneLead }) {
  const isNew = lead.status === "new";
  const tpl = emailTemplate("sell-phone", lead);
  const sms = smsTemplate("sell-phone", lead);
  return (
    <CardShell
      testId={`lead-sellPhoneSubmissions-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={
        <>
          {lead.brand} {lead.model}
          {lead.expectedPrice && (
            <span className="block text-sm font-semibold uppercase tracking-wide text-emerald-600 mt-1">
              wants ${lead.expectedPrice}
            </span>
          )}
        </>
      }
      meta={
        <>
          <span className="text-foreground font-semibold">{lead.name}</span> · {lead.phone}
        </>
      }
      badges={
        <>
          {lead.condition && (
            <Badge
              className={
                lead.condition === "mint"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : lead.condition === "broken"
                    ? "bg-muted/60 text-primary border-primary"
                    : "bg-muted text-foreground border-border"
              }
            >
              {lead.condition}
            </Badge>
          )}
          {typeof lead.batteryHealth === "number" && (
            <Badge>bat {lead.batteryHealth}%</Badge>
          )}
          {lead.storage && <Badge>{lead.storage}</Badge>}
          {lead.lockedStatus && <Badge>{lead.lockedStatus}</Badge>}
        </>
      }
      body={
        <div className="space-y-2">
          {lead.carrier && (
            <div className="text-xs text-muted-foreground">Carrier: {lead.carrier}</div>
          )}
          {lead.damageNotes && (
            <div className="text-xs text-muted-foreground italic">Damage: {lead.damageNotes}</div>
          )}
          {lead.photoUrl && (
            <a href={lead.photoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={lead.photoUrl}
                alt="Phone photo"
                className="max-h-32 rounded-md border border-border"
              />
            </a>
          )}
        </div>
      }
      unreadInboundCount={rest.unreadInboundCount ?? 0}
      actionBar={
        <ActionBar
          password={rest.password}
          leadType="sell-phone"
          id={lead.id}
          status={lead.status}
          phone={lead.phone}
          email={null}
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, OK Cellular here about your ${lead.brand} ${lead.model} sell quote.`}
          emailDefaults={{ subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          placeholderValues={getPlaceholderValues("sell-phone", lead)}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

export function AppointmentCard({
  lead,
  ...rest
}: CommonProps & { lead: AppointmentLead }) {
  const isNew = lead.status === "new";
  const tpl = emailTemplate("appointment", lead);
  const sms = smsTemplate("appointment", lead);
  return (
    <CardShell
      testId={`lead-appointments-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={lead.preferredDatetime}
      meta={
        <>
          <span className="text-foreground font-semibold">{lead.name}</span> · {lead.phone}
        </>
      }
      badges={
        <Badge className="bg-blue-50 text-blue-700 border-blue-200">
          {lead.serviceType.replaceAll("-", " ")}
        </Badge>
      }
      body={lead.notes ? <div className="text-sm">{lead.notes}</div> : null}
      unreadInboundCount={rest.unreadInboundCount ?? 0}
      actionBar={
        <ActionBar
          password={rest.password}
          leadType="appointment"
          id={lead.id}
          status={lead.status}
          phone={lead.phone}
          email={null}
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, confirming your ${lead.serviceType.replaceAll("-", " ")} appointment.`}
          emailDefaults={{ subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          placeholderValues={getPlaceholderValues("appointment", lead)}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

export function ContactCard({
  lead,
  ...rest
}: CommonProps & { lead: ContactLead }) {
  const isNew = lead.status === "new";
  const tpl = emailTemplate("contact", lead);
  const sms = smsTemplate("contact", lead);
  const email = looksLikeEmail(lead.contact) ? lead.contact : null;
  const phone = email ? null : lead.contact;
  const isFinancing = isFinancingContactLead(lead);
  return (
    <CardShell
      testId={`lead-contactMessages-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={
        <>
          {lead.name}
          {isFinancing && (
            <span className="block text-sm font-semibold uppercase tracking-wide text-emerald-600 mt-1">
              Financing pre-qualification
            </span>
          )}
        </>
      }
      meta={lead.contact}
      badges={
        isFinancing ? (
          <Badge
            className="bg-emerald-50 text-emerald-700 border-emerald-200"
          >
            <span data-testid={`badge-financing-${lead.id}`}>Financing</span>
          </Badge>
        ) : undefined
      }
      body={<div>{lead.message}</div>}
      unreadInboundCount={rest.unreadInboundCount ?? 0}
      actionBar={
        <ActionBar
          password={rest.password}
          leadType="contact"
          id={lead.id}
          status={lead.status}
          phone={phone}
          email={email}
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, OK Cellular here, replying to your message.`}
          emailDefaults={{ to: email ?? "", subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          placeholderValues={getPlaceholderValues("contact", lead)}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

export function ReservationCard({
  lead,
  ...rest
}: CommonProps & { lead: ReservationLead }) {
  const isNew = lead.status === "new";
  const tpl = emailTemplate("reservation", lead);
  const sms = smsTemplate("reservation", lead);
  return (
    <CardShell
      testId={`lead-itemReservations-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={lead.itemLabel}
      meta={
        <>
          <span className="text-foreground font-semibold">{lead.name}</span> · {lead.phone} · item id{" "}
          <span className="font-mono">{lead.itemId}</span>
        </>
      }
      body={lead.notes ? <div className="text-sm">{lead.notes}</div> : null}
      unreadInboundCount={rest.unreadInboundCount ?? 0}
      actionBar={
        <ActionBar
          password={rest.password}
          leadType="reservation"
          id={lead.id}
          status={lead.status}
          phone={lead.phone}
          email={null}
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, your ${lead.itemLabel} is held for you at OK Cellular.`}
          emailDefaults={{ subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          placeholderValues={getPlaceholderValues("reservation", lead)}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

void STATUS_BADGE_CLASS;
