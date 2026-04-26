import { type ReactNode } from "react";
import { ActionBar } from "./ActionBar";
import { formatRelative, looksLikeEmail, pickEmail } from "./utils";
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
      className={`bg-black border-2 p-5 ${
        hasUnread
          ? "border-yellow-400 ring-2 ring-yellow-400/40"
          : isNew
            ? "border-yellow-400"
            : "border-zinc-800"
      }`}
      data-testid={testId}
      data-unread-inbound={unreadInboundCount}
    >
      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
        <div>
          <div className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
            {primary}
          </div>
          {meta && <div className="text-xs text-zinc-400 mt-1">{meta}</div>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            #{id} · {formatRelative(createdAt)}
          </div>
          <div className="flex flex-wrap gap-1 justify-end">
            {hasUnread && (
              <span
                className="bg-yellow-400 text-black px-2 py-0.5 font-black uppercase text-[10px] tracking-widest"
                data-testid={`badge-card-reply-${testId}`}
              >
                {unreadInboundCount} REPLY
              </span>
            )}
            {badges}
          </div>
        </div>
      </div>
      {body && <div className="text-sm text-zinc-200 whitespace-pre-wrap break-words">{body}</div>}
      {actionBar}
    </article>
  );
}

function Badge({ children, className = "bg-zinc-800 text-zinc-200" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`px-2 py-0.5 font-black uppercase text-[10px] tracking-widest ${className}`}>
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
          <span className="block text-sm font-bold uppercase tracking-widest text-red-400 mt-1">
            {lead.deviceType}
          </span>
        </>
      }
      meta={
        <>
          <span className="text-white font-black">{lead.name}</span> ·{" "}
          {lead.phone}
          {email ? ` · ${email}` : ""}
        </>
      }
      badges={
        <>
          {lead.urgency && (
            <Badge
              className={
                lead.urgency === "asap"
                  ? "bg-red-500 text-white"
                  : lead.urgency === "today"
                    ? "bg-orange-500 text-white"
                    : "bg-zinc-800 text-zinc-200"
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
          {lead.notes && (
            <div className="text-xs text-zinc-400 italic">Notes: {lead.notes}</div>
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
                className="max-h-32 border-2 border-zinc-800"
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
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, Gadget X Repairs here regarding your ${lead.brand} ${lead.model} repair request.`}
          emailDefaults={{ to: email ?? "", subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
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
            <span className="block text-sm font-bold uppercase tracking-widest text-green-400 mt-1">
              wants ${lead.expectedPrice}
            </span>
          )}
        </>
      }
      meta={
        <>
          <span className="text-white font-black">{lead.name}</span> · {lead.phone}
        </>
      }
      badges={
        <>
          {lead.condition && (
            <Badge
              className={
                lead.condition === "mint"
                  ? "bg-green-500 text-white"
                  : lead.condition === "broken"
                    ? "bg-red-500 text-white"
                    : "bg-zinc-800 text-zinc-200"
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
            <div className="text-xs text-zinc-400">Carrier: {lead.carrier}</div>
          )}
          {lead.damageNotes && (
            <div className="text-xs text-zinc-400 italic">Damage: {lead.damageNotes}</div>
          )}
          {lead.photoUrl && (
            <a href={lead.photoUrl} target="_blank" rel="noopener noreferrer">
              <img
                src={lead.photoUrl}
                alt="Phone photo"
                className="max-h-32 border-2 border-zinc-800"
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
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, Gadget X Repairs here about your ${lead.brand} ${lead.model} sell quote.`}
          emailDefaults={{ subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
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
          <span className="text-white font-black">{lead.name}</span> · {lead.phone}
        </>
      }
      badges={
        <Badge className="bg-blue-500 text-white">
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
  return (
    <CardShell
      testId={`lead-contactMessages-${lead.id}`}
      isNew={isNew}
      status={lead.status}
      id={lead.id}
      createdAt={lead.createdAt}
      primary={lead.name}
      meta={lead.contact}
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
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, Gadget X Repairs here, replying to your message.`}
          emailDefaults={{ to: email ?? "", subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
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
          <span className="text-white font-black">{lead.name}</span> · {lead.phone} · item id{" "}
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
          whatsappPrefill={`Hi ${lead.name?.split(" ")[0] ?? "there"}, your ${lead.itemLabel} is held for you at Gadget X Repairs.`}
          emailDefaults={{ subject: tpl.subject, html: tpl.html, text: tpl.text }}
          smsDefaults={{ body: sms.body }}
          messaging={rest.messaging}
          onChanged={rest.onChanged}
        />
      }
    />
  );
}

void STATUS_BADGE_CLASS;
