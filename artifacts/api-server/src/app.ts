import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import webhooksRouter from "./routes/webhooks";
import { logger } from "./lib/logger";
import { getStripeClient, getStripeWebhookSecret } from "./lib/stripeClient";

const app: Express = express();

// Trust exactly one upstream proxy hop (the Replit edge proxy that fronts
// every workspace and deployment). With this set, req.ip resolves to the
// real client IP from X-Forwarded-For so per-IP rate limiting actually
// throttles individual abusers instead of every visitor sharing the proxy IP.
app.set("trust proxy", 1);

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());

// Webhooks must be mounted BEFORE express.json() so handlers can access raw bodies
// for signature verification (Resend uses Svix; Telnyx uses ed25519).
app.use("/api/webhooks", webhooksRouter);

// Stripe webhook — also needs raw body for signature verification.
// Mounted before express.json() for the same reason.
app.post(
  "/api/webhooks/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature) {
      res.status(400).json({ error: "Missing stripe-signature" });
      return;
    }
    const sig = Array.isArray(signature) ? signature[0] : signature;
    try {
      const webhookSecret = await getStripeWebhookSecret();
      if (!webhookSecret) {
        res.status(200).json({ received: true, note: "no webhook secret configured" });
        return;
      }
      const stripe = await getStripeClient();
      const event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
      // For now just acknowledge — future handlers can process specific event types
      logger.info({ type: event.type }, "stripe.webhook.received");
      res.status(200).json({ received: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Webhook error";
      logger.error({ err }, "stripe.webhook.error");
      res.status(400).json({ error: msg });
    }
  },
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
