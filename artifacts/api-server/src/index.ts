import app from "./app";
import { logger } from "./lib/logger";
import { seedInventoryIfEmpty } from "./lib/seedInventory";

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

async function start() {
  await seedWithRetry();
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }
    logger.info({ port }, "Server listening");
  });
}

start();
