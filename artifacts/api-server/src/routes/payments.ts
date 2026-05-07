import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { getStripeClient, getStripePublishableKey } from "../lib/stripeClient";
import { leadRateLimit } from "../middleware/leadRateLimit";

const router: IRouter = Router();

const DEPOSIT_AMOUNT_CENTS = 1000;

router.get("/config", async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const publishableKey = await getStripePublishableKey();
    if (!publishableKey) {
      res.json({ available: false, publishableKey: null });
      return;
    }
    res.json({ available: true, publishableKey });
  } catch {
    res.json({ available: false, publishableKey: null });
  }
});

router.post(
  "/repair-deposit/create-intent",
  leadRateLimit("repair-deposit"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stripe = await getStripeClient();
      const intent = await stripe.paymentIntents.create({
        amount: DEPOSIT_AMOUNT_CENTS,
        currency: "usd",
        description: "OK Cellular repair appointment deposit",
        metadata: {
          source: "repair-intake-form",
          depositType: "appointment-hold",
        },
      });
      res.json({ clientSecret: intent.client_secret, intentId: intent.id });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create payment intent";
      res.status(502).json({ error: msg });
      void next;
    }
  },
);

router.post(
  "/repair-deposit/verify",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentIntentId } = req.body as { paymentIntentId?: string };
      if (!paymentIntentId) {
        res.status(400).json({ error: "paymentIntentId is required" });
        return;
      }
      const stripe = await getStripeClient();
      const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
      const paid = intent.status === "succeeded";
      res.json({
        paid,
        status: intent.status,
        amountCents: intent.amount,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to verify payment";
      res.status(502).json({ error: msg });
      void next;
    }
  },
);

export default router;
