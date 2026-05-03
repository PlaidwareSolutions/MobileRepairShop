import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  CheckCircle2,
  Archive,
  PlayCircle,
  Activity as ActivityIcon,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Composer, type ComposerMode } from "./Composer";
import { Activity } from "./Activity";
import {
  adminSendEmail,
  adminSendSms,
  adminUpdateStatus,
  type MessagingConfig,
} from "@/lib/api";
import { telLink, whatsappLink, normalizeUsPhone } from "./utils";
import { STATUS_BADGE_CLASS, STATUS_LABEL, STATUSES } from "./types";
import type { PlaceholderValues } from "./placeholders";

export type ActionBarProps = {
  password: string;
  leadType: string;
  id: number;
  status: string;
  phone?: string | null;
  email?: string | null;
  whatsappPrefill: string;
  emailDefaults: { to?: string; subject: string; html: string; text: string };
  smsDefaults: { to?: string; body: string };
  messaging: MessagingConfig | null;
  placeholderValues?: PlaceholderValues;
  onChanged: () => void;
};

export function ActionBar({
  password,
  leadType,
  id,
  status,
  phone,
  email,
  whatsappPrefill,
  emailDefaults,
  smsDefaults,
  messaging,
  placeholderValues,
  onChanged,
}: ActionBarProps) {
  const [composer, setComposer] = useState<ComposerMode | null>(null);
  const [activityKey, setActivityKey] = useState(0);
  const [showActivity, setShowActivity] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const normPhone = normalizeUsPhone(phone);
  const canCall = Boolean(phone);
  const canWhatsapp = Boolean(phone);
  const canSms = Boolean(normPhone) && messaging?.smsEnabled !== false;
  const canEmail = Boolean(email) && messaging?.emailEnabled !== false;

  async function handleStatus(next: string) {
    setError(null);
    try {
      await adminUpdateStatus(password, leadType, id, next);
      onChanged();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    }
  }

  async function handleEmailSend(payload: {
    to: string;
    subject?: string;
    body: string;
  }) {
    setError(null);
    setSuccess(null);
    const res = await adminSendEmail(password, leadType, id, {
      to: payload.to,
      subject: payload.subject ?? "(no subject)",
      html: payload.body,
      text: stripHtml(payload.body),
    });
    if (!res.ok) {
      throw new Error(res.error ?? "Email send failed");
    }
    setSuccess("Email queued.");
    setActivityKey((k) => k + 1);
    setShowActivity(true);
    onChanged();
  }

  async function handleSmsSend(payload: { to: string; body: string }) {
    setError(null);
    setSuccess(null);
    const res = await adminSendSms(password, leadType, id, {
      to: payload.to,
      body: payload.body,
    });
    if (!res.ok) {
      throw new Error(res.error ?? "SMS send failed");
    }
    setSuccess("SMS queued.");
    setActivityKey((k) => k + 1);
    setShowActivity(true);
    onChanged();
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 items-center pt-3 mt-3 border-t border-zinc-200">
        {STATUSES.map((s) => (
          <span
            key={`b-${s}`}
            className={`hidden ${STATUS_BADGE_CLASS[s]}`}
          />
        ))}
        <span
          className={`px-2 py-1 rounded-full font-semibold uppercase text-[10px] tracking-wide ${
            STATUS_BADGE_CLASS[status] ?? "bg-zinc-100 text-zinc-700 border border-zinc-200"
          }`}
          data-testid={`badge-status-${leadType}-${id}`}
        >
          {STATUS_LABEL[status] ?? status.toUpperCase()}
        </span>

        <a
          href={canCall ? telLink(phone!) : undefined}
          aria-disabled={!canCall}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border ${
            canCall
              ? "bg-white border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
          data-testid={`action-call-${leadType}-${id}`}
          onClick={(e) => {
            if (!canCall) e.preventDefault();
          }}
        >
          <Phone className="w-3 h-3" /> Call
        </a>

        <a
          href={canWhatsapp ? whatsappLink(phone!, whatsappPrefill) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!canWhatsapp}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border ${
            canWhatsapp
              ? "bg-white border-zinc-200 text-zinc-700 hover:border-emerald-500 hover:text-emerald-600"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
          data-testid={`action-whatsapp-${leadType}-${id}`}
          onClick={(e) => {
            if (!canWhatsapp) e.preventDefault();
          }}
        >
          <FaWhatsapp className="w-3 h-3" /> WhatsApp
        </a>

        <button
          type="button"
          disabled={!canEmail}
          onClick={() => setComposer("email")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border ${
            canEmail
              ? "bg-white border-zinc-200 text-zinc-700 hover:border-red-500 hover:text-red-600"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
          data-testid={`action-email-${leadType}-${id}`}
        >
          <Mail className="w-3 h-3" /> Email
        </button>

        <button
          type="button"
          disabled={!canSms}
          onClick={() => setComposer("sms")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border ${
            canSms
              ? "bg-white border-zinc-200 text-zinc-700 hover:border-blue-500 hover:text-blue-600"
              : "bg-zinc-50 border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
          data-testid={`action-sms-${leadType}-${id}`}
        >
          <MessageSquare className="w-3 h-3" /> SMS
        </button>

        <div className="ml-auto flex flex-wrap gap-2">
          {status !== "in_progress" && (
            <button
              type="button"
              onClick={() => handleStatus("in_progress")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100"
              data-testid={`action-in-progress-${leadType}-${id}`}
            >
              <PlayCircle className="w-3 h-3" /> In Progress
            </button>
          )}
          {status !== "done" && (
            <button
              type="button"
              onClick={() => handleStatus("done")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              data-testid={`action-done-${leadType}-${id}`}
            >
              <CheckCircle2 className="w-3 h-3" /> Done
            </button>
          )}
          {status !== "archived" && (
            <button
              type="button"
              onClick={() => handleStatus("archived")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400"
              data-testid={`action-archive-${leadType}-${id}`}
            >
              <Archive className="w-3 h-3" /> Archive
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setShowActivity((v) => !v);
              if (!showActivity) setActivityKey((k) => k + 1);
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold uppercase text-xs tracking-wide border bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400"
            data-testid={`action-activity-${leadType}-${id}`}
          >
            <ActivityIcon className="w-3 h-3" /> {showActivity ? "Hide" : "Activity"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg font-semibold text-xs">{error}</div>
      )}
      {success && (
        <div className="mt-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-lg font-semibold text-xs">{success}</div>
      )}

      {showActivity && (
        <Activity
          password={password}
          leadType={leadType}
          id={id}
          refreshKey={activityKey}
          onRead={onChanged}
        />
      )}

      {composer === "email" && (
        <Composer
          open={true}
          mode="email"
          fromLabel={messaging?.mailFrom ?? "shop email"}
          password={password}
          leadType={leadType}
          placeholderValues={placeholderValues}
          initial={{
            to: emailDefaults.to ?? email ?? "",
            subject: emailDefaults.subject,
            body: emailDefaults.html,
          }}
          onClose={() => setComposer(null)}
          onSend={handleEmailSend}
        />
      )}
      {composer === "sms" && (
        <Composer
          open={true}
          mode="sms"
          fromLabel={messaging?.smsFrom ?? "shop number"}
          password={password}
          leadType={leadType}
          placeholderValues={placeholderValues}
          initial={{
            to: smsDefaults.to ?? normPhone ?? phone ?? "",
            body: smsDefaults.body,
          }}
          onClose={() => setComposer(null)}
          onSend={handleSmsSend}
        />
      )}
    </>
  );
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}
