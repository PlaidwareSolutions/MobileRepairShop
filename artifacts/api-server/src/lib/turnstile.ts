import { logger } from "./logger";

// Cloudflare Turnstile is a free, no-account-needed-for-the-shop, invisible-by-default
// CAPTCHA. It's wired in as a defense-in-depth layer on top of the existing honeypot
// + time-trap + per-IP rate limit. If the secret key isn't configured we silently
// disable verification so the site keeps working — the existing defenses still apply.
//
// Docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const SECRET = process.env["TURNSTILE_SECRET_KEY"] ?? "";

export const turnstileEnabled: boolean = SECRET.length > 0;

if (!turnstileEnabled) {
  logger.warn(
    "turnstile.disabled — TURNSTILE_SECRET_KEY not set; lead routes fall back to honeypot + rate limit only",
  );
} else {
  logger.info("turnstile.enabled — lead routes will verify CF Turnstile tokens");
}

export type TurnstileVerifyResult =
  | { configured: false; success: true }
  | { configured: true; success: boolean; errorCodes: string[] };

export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteip: string | null,
): Promise<TurnstileVerifyResult> {
  if (!turnstileEnabled) {
    return { configured: false, success: true };
  }
  if (typeof token !== "string" || token.length === 0) {
    return {
      configured: true,
      success: false,
      errorCodes: ["missing-input-response"],
    };
  }

  const params = new URLSearchParams();
  params.set("secret", SECRET);
  params.set("response", token);
  if (remoteip) params.set("remoteip", remoteip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
      // Don't let a slow Cloudflare response hang the lead submission. 5s is plenty
      // for the siteverify endpoint, which normally returns in <200ms.
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      return {
        configured: true,
        success: false,
        errorCodes: [`http-${res.status}`],
      };
    }
    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };
    return {
      configured: true,
      success: data.success === true,
      errorCodes: data["error-codes"] ?? [],
    };
  } catch (err) {
    logger.warn({ err }, "turnstile.verify_request_failed");
    return {
      configured: true,
      success: false,
      errorCodes: ["network-error"],
    };
  }
}
