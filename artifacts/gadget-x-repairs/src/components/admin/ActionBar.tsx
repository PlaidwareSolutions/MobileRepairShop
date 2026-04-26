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
      <div className="flex flex-wrap gap-2 items-center pt-3 mt-3 border-t border-zinc-800">
        {STATUSES.map((s) => (
          <span
            key={`b-${s}`}
            className={`hidden ${STATUS_BADGE_CLASS[s]}`}
          />
        ))}
        <span
          className={`px-2 py-1 font-black uppercase text-[10px] tracking-widest ${
            STATUS_BADGE_CLASS[status] ?? "bg-zinc-700 text-zinc-300"
          }`}
          data-testid={`badge-status-${leadType}-${id}`}
        >
          {STATUS_LABEL[status] ?? status.toUpperCase()}
        </span>

        <a
          href={canCall ? telLink(phone!) : undefined}
          aria-disabled={!canCall}
          className={`inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 ${
            canCall
              ? "bg-zinc-900 border-zinc-700 text-white hover:border-red-500"
              : "bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed"
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
          className={`inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 ${
            canWhatsapp
              ? "bg-zinc-900 border-zinc-700 text-white hover:border-green-500"
              : "bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed"
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
          className={`inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 ${
            canEmail
              ? "bg-zinc-900 border-zinc-700 text-white hover:border-yellow-400"
              : "bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed"
          }`}
          data-testid={`action-email-${leadType}-${id}`}
        >
          <Mail className="w-3 h-3" /> Email
        </button>

        <button
          type="button"
          disabled={!canSms}
          onClick={() => setComposer("sms")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 ${
            canSms
              ? "bg-zinc-900 border-zinc-700 text-white hover:border-blue-400"
              : "bg-zinc-950 border-zinc-900 text-zinc-700 cursor-not-allowed"
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
              className="inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 bg-zinc-900 border-zinc-700 text-blue-300 hover:border-blue-400"
              data-testid={`action-in-progress-${leadType}-${id}`}
            >
              <PlayCircle className="w-3 h-3" /> In Progress
            </button>
          )}
          {status !== "done" && (
            <button
              type="button"
              onClick={() => handleStatus("done")}
              className="inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 bg-zinc-900 border-zinc-700 text-green-300 hover:border-green-400"
              data-testid={`action-done-${leadType}-${id}`}
            >
              <CheckCircle2 className="w-3 h-3" /> Done
            </button>
          )}
          {status !== "archived" && (
            <button
              type="button"
              onClick={() => handleStatus("archived")}
              className="inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
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
            className="inline-flex items-center gap-1 px-3 py-1.5 font-black uppercase text-xs tracking-widest border-2 bg-zinc-900 border-zinc-700 text-zinc-300 hover:border-white"
            data-testid={`action-activity-${leadType}-${id}`}
          >
            <ActivityIcon className="w-3 h-3" /> {showActivity ? "Hide" : "Activity"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-3 bg-red-500 text-white px-3 py-2 font-black uppercase text-xs">{error}</div>
      )}
      {success && (
        <div className="mt-3 bg-green-500 text-white px-3 py-2 font-black uppercase text-xs">{success}</div>
      )}

      {showActivity && (
        <Activity password={password} leadType={leadType} id={id} refreshKey={activityKey} />
      )}

      {composer === "email" && (
        <Composer
          open={true}
          mode="email"
          fromLabel={messaging?.mailFrom ?? "shop email"}
          password={password}
          leadType={leadType}
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
