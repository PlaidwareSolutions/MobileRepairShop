import Stripe from "stripe";

type StripeCredentials = {
  secretKey: string;
  publishableKey: string | null;
  webhookSecret: string | null;
};

async function getStripeCredentials(): Promise<StripeCredentials> {
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY
    ? "repl " + process.env.REPL_IDENTITY
    : process.env.WEB_REPL_RENEWAL
      ? "depl " + process.env.WEB_REPL_RENEWAL
      : null;

  if (!hostname || !xReplitToken) {
    throw new Error(
      "Missing Replit environment variables. " +
        "Ensure the Stripe integration is connected via the Integrations tab.",
    );
  }

  const resp = await fetch(
    `https://${hostname}/api/v2/connection?include_secrets=true&connector_names=stripe`,
    {
      headers: { Accept: "application/json", X_REPLIT_TOKEN: xReplitToken },
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!resp.ok) {
    throw new Error(
      `Failed to fetch Stripe credentials: ${resp.status} ${resp.statusText}`,
    );
  }

  const data = (await resp.json()) as {
    items?: { settings?: { secret_key?: string; publishable_key?: string; webhook_secret?: string } }[];
  };
  const settings = data.items?.[0]?.settings;

  if (!settings?.secret_key) {
    throw new Error(
      "Stripe integration not connected or missing secret key. " +
        "Connect Stripe via the Integrations tab first.",
    );
  }

  return {
    secretKey: settings.secret_key,
    publishableKey: settings.publishable_key ?? null,
    webhookSecret: settings.webhook_secret ?? null,
  };
}

export async function getStripeClient(): Promise<Stripe> {
  const { secretKey } = await getStripeCredentials();
  return new Stripe(secretKey);
}

export async function getStripePublishableKey(): Promise<string | null> {
  try {
    const { publishableKey } = await getStripeCredentials();
    return publishableKey;
  } catch {
    return null;
  }
}

export async function getStripeWebhookSecret(): Promise<string | null> {
  try {
    const { webhookSecret } = await getStripeCredentials();
    return webhookSecret;
  } catch {
    return null;
  }
}
