/**
 * Shared SEO configuration consumed by both scripts/build-seo.mjs (which writes
 * the prerendered HTML) and scripts/audit-seo.mjs (which verifies it after the
 * build). Keeping these constants in one module guarantees the audit checks the
 * same SITE_URL / canonical-override rules the build actually applied — without
 * this, a future change to one file could silently disagree with the other.
 */

export const SITE_URL =
  process.env.VITE_SITE_URL || process.env.SITE_URL || "https://gadgetxrepairs.com";

// Routes that share the same canonical URL as another route (i.e. they render the
// same component but live at multiple paths). The home page is rendered at both `/`
// and `/phone-repair-houston-tx`; the latter is the canonical SEO URL, so when we
// prerender `/` the <link rel="canonical"> and og:url must still point at
// /phone-repair-houston-tx — otherwise crawlers would see two competing canonicals.
export const CANONICAL_OVERRIDES = {
  "/": "/phone-repair-houston-tx",
};
