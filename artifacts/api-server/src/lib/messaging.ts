import { Resend } from "resend";
import Telnyx from "telnyx";
import { logger } from "./logger";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TELNYX_API_KEY = process.env.TELNYX_API_KEY;
const TELNYX_MESSAGING_PROFILE_ID = process.env.TELNYX_MESSAGING_PROFILE_ID;
const MAIL_FROM_EMAIL = process.env.MAIL_FROM_EMAIL ?? "support@gadgetxrepairs.com";
const SMS_FROM_NUMBER = process.env.SMS_FROM_NUMBER ?? "+13466236898";

type TelnyxClient = InstanceType<typeof Telnyx>;

let resendClient: Resend | null = null;
let telnyxClient: TelnyxClient | null = null;

function getResend(): Resend {
  if (!RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!resendClient) {
    resendClient = new Resend(RESEND_API_KEY);
  }
  return resendClient;
}

function getTelnyx(): TelnyxClient {
  if (!TELNYX_API_KEY) {
    throw new Error("TELNYX_API_KEY is not configured");
  }
  if (!telnyxClient) {
    telnyxClient = new Telnyx({ apiKey: TELNYX_API_KEY });
  }
  return telnyxClient;
}

export type SendResult = {
  providerMessageId: string | null;
  status: "queued" | "sent" | "failed";
  error?: string;
};

export type SendEmailArgs = {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
};

export async function sendEmail(args: SendEmailArgs): Promise<SendResult> {
  const resend = getResend();
  try {
    const html = args.html ?? `<pre>${args.text ?? ""}</pre>`;
    const result = await resend.emails.send({
      from: MAIL_FROM_EMAIL,
      to: args.to,
      subject: args.subject,
      html,
      text: args.text,
      ...(args.replyTo ? { replyTo: args.replyTo } : {}),
    });
    if (result.error) {
      logger.error({ err: result.error }, "messaging.email.failed");
      return {
        providerMessageId: null,
        status: "failed",
        error: result.error.message,
      };
    }
    return {
      providerMessageId: result.data?.id ?? null,
      status: "queued",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    logger.error({ err }, "messaging.email.error");
    return { providerMessageId: null, status: "failed", error: message };
  }
}

export type SendSmsArgs = {
  to: string;
  body: string;
};

export async function sendSms(args: SendSmsArgs): Promise<SendResult> {
  const telnyx = getTelnyx();
  if (!TELNYX_MESSAGING_PROFILE_ID) {
    return {
      providerMessageId: null,
      status: "failed",
      error: "TELNYX_MESSAGING_PROFILE_ID not configured",
    };
  }
  try {
    const result = await telnyx.messages.send({
      from: SMS_FROM_NUMBER,
      to: args.to,
      text: args.body,
      messaging_profile_id: TELNYX_MESSAGING_PROFILE_ID,
    });
    const data = (result as { data?: { id?: string } }).data;
    return {
      providerMessageId: data?.id ?? null,
      status: "queued",
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown SMS error";
    logger.error({ err }, "messaging.sms.error");
    return { providerMessageId: null, status: "failed", error: message };
  }
}

export const messagingConfig = {
  mailFrom: MAIL_FROM_EMAIL,
  smsFrom: SMS_FROM_NUMBER,
  emailEnabled: Boolean(RESEND_API_KEY),
  smsEnabled: Boolean(TELNYX_API_KEY && TELNYX_MESSAGING_PROFILE_ID),
};
