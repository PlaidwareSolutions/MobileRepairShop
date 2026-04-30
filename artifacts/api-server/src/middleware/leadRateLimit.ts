import type { Request, Response, NextFunction } from "express";
import { checkRateLimit } from "../lib/rate-limit";
import { recordBlockEvent } from "../lib/blockEvents";

const SHORT_WINDOW_MS = 10 * 60 * 1000;
const SHORT_MAX = 5;
const LONG_WINDOW_MS = 24 * 60 * 60 * 1000;
const LONG_MAX = 20;

function clientIpKey(req: Request): string {
  const ip = req.ip ?? req.socket.remoteAddress ?? "unknown";
  return ip;
}

export function leadRateLimit(leadType: string) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const ipKey = clientIpKey(req);
    try {
      const shortKey = `lead-ip:short:${ipKey}`;
      const longKey = `lead-ip:long:${ipKey}`;

      const shortCheck = await checkRateLimit(shortKey, SHORT_MAX, SHORT_WINDOW_MS);
      if (!shortCheck.allowed) {
        req.log.warn(
          { leadType, ip: ipKey, retryAfterSeconds: shortCheck.retryAfterSeconds },
          "lead.rate_limited",
        );
        recordBlockEvent("rate_limited", leadType, req.log);
        res.set("Retry-After", String(shortCheck.retryAfterSeconds));
        res
          .status(429)
          .json({ error: "Too many submissions from your network. Please try again in a few minutes or call us." });
        return;
      }

      const longCheck = await checkRateLimit(longKey, LONG_MAX, LONG_WINDOW_MS);
      if (!longCheck.allowed) {
        req.log.warn(
          { leadType, ip: ipKey, retryAfterSeconds: longCheck.retryAfterSeconds },
          "lead.rate_limited_daily",
        );
        recordBlockEvent("rate_limited", leadType, req.log);
        res.set("Retry-After", String(longCheck.retryAfterSeconds));
        res
          .status(429)
          .json({ error: "Daily submission limit reached for your network. Please call us instead." });
        return;
      }

      next();
    } catch (err) {
      // Don't let a rate-limit DB hiccup block legitimate submissions.
      req.log.warn({ err, leadType, ip: ipKey }, "lead.rate_limit_check_failed");
      next();
    }
  };
}
