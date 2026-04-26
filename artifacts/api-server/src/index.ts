import app from "./app";
import { logger } from "./lib/logger";
import { seedInventoryIfEmpty } from "./lib/seedInventory";
import { seedReplyTemplatesIfEmpty } from "./lib/seedReplyTemplates";
import { cleanupExpiredRateLimits } from "./lib/rate-limit";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function seedWithRetry(attempts = 3): Promise<void> {
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      const { inserted } = await seedInventoryIfEmpty();
      if (inserted > 0) logger.info({ inserted }, "inventory.seeded");
      return;
    } catch (err) {
      lastErr = err;
      logger.warn({ err, attempt: i, attempts }, "inventory.seed_attempt_failed");
      if (i < attempts) await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
  // In production we treat a hard seeding failure as fatal so the orchestrator
  // restarts us and we don't quietly serve a missing inventory. In development
  // we log and continue so engineers can fix the DB without a crash loop.
  if (process.env.NODE_ENV === "production") {
    logger.error({ err: lastErr }, "inventory.seed_failed");
    process.exit(1);
  }
  logger.error({ err: lastErr }, "inventory.seed_failed");
}

async function seedReplyTemplatesWithRetry(attempts = 3): Promise<void> {
  // Reply templates are non-essential at boot — admins can always add them
  // later via the UI — so a failure here logs and continues even in prod.
  let lastErr: unknown;
  for (let i = 1; i <= attempts; i++) {
    try {
      const { inserted } = await seedReplyTemplatesIfEmpty();
      if (inserted > 0) logger.info({ inserted }, "reply_templates.seeded");
      return;
    } catch (err) {
      lastErr = err;
      logger.warn(
        { err, attempt: i, attempts },
        "reply_templates.seed_attempt_failed",
      );
      if (i < attempts) await new Promise((r) => setTimeout(r, 500 * i));
    }
  }
  logger.error({ err: lastErr }, "reply_templates.seed_failed");
}

async function start() {
  await seedWithRetry();
  await seedReplyTemplatesWithRetry();
  // Best-effort: drop any rate-limit rows whose windows expired more than the
  // grace period ago. We don't block startup on the result, so a transient DB
  // hiccup here can never prevent the server from accepting traffic.
  cleanupExpiredRateLimits()
    .then((deleted) => {
      if (deleted > 0) logger.info({ deleted }, "rate_limit.cleanup_startup");
    })
    .catch((err) => {
      logger.warn({ err }, "rate_limit.cleanup_startup_failed");
    });
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}

start();
