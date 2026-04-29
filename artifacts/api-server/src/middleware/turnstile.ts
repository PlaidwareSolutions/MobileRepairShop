import type { Request, Response, NextFunction } from "express";
import { turnstileEnabled, verifyTurnstileToken } from "../lib/turnstile";

// Generic, friendly error shown to a real customer who happened to fail the
// managed challenge (rare with `appearance: 'interaction-only'`). Worded so they
// know how to recover without exposing implementation details.
const FAILED_MESSAGE =
  "We couldn't verify that submission. Please refresh the page and try again, or call us directly at (346) 623-6898.";

/**
 * Express middleware that requires a valid Cloudflare Turnstile token on the
 * incoming request body (`cfTurnstileToken`). Behaves as a no-op when Turnstile
 * isn't configured (no `TURNSTILE_SECRET_KEY` secret) so the existing honeypot
 * + rate-limit defenses still apply on their own.
 *
 * Unlike the honeypot (which silently 201s), Turnstile failures return a real
 * 400 with a friendly message because real users may legitimately get a managed
 * challenge and need to know how to recover.
 */
export function requireTurnstile(leadType: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    if (!turnstileEnabled) {
      next();
      return;
    }

    const raw = (req.body ?? {}) as { cfTurnstileToken?: unknown };
    const token =
      typeof raw.cfTurnstileToken === "string" ? raw.cfTurnstileToken : null;

    const result = await verifyTurnstileToken(token, req.ip ?? null);
    if (!result.success) {
      req.log.warn(
        {
          leadType,
          ip: req.ip,
          errorCodes: "errorCodes" in result ? result.errorCodes : [],
        },
        "lead.turnstile_failed",
      );
      res.status(400).json({ error: FAILED_MESSAGE });
      return;
    }

    next();
  };
}
