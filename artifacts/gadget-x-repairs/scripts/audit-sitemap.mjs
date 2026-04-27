#!/usr/bin/env node
/**
 * Post-build sitemap & robots audit. Runs after audit-seo and verifies the
 * crawler-facing manifest files the build wrote:
 *
 *   - dist/public/sitemap.xml
 *   - dist/public/robots.txt
 *
 * The build (scripts/build-seo.mjs) generates these from `SITE_URL` (see
 * scripts/seo-config.mjs) and `SITEMAP_ROUTES` (see src/routes-config.ts), but
 * nothing currently checks the produced files agree with those sources after
 * the fact. A bad SITE_URL env at build time, a typo in route generation, or
 * a future drift between build-seo and the route config could silently submit
 * the wrong host or the wrong path set to search engines.
 *
 * For sitemap.xml we verify:
 *   - The file exists and has at least one <loc>.
 *   - Every <loc> is a well-formed absolute URL.
 *   - Every <loc> starts with SITE_URL (so we can never ship a sitemap that
 *     points crawlers at the wrong domain — e.g. a stale staging host).
 *   - The set of paths in the sitemap (loc minus SITE_URL prefix) equals the
 *     set of paths in SITEMAP_ROUTES exactly: no missing paths, no extras,
 *     no duplicates.
 *
 * For robots.txt we verify:
 *   - The file exists.
 *   - There is exactly one `Sitemap:` directive.
 *   - That directive points at `${SITE_URL}/sitemap.xml` — so robots.txt and
 *     the sitemap itself agree on the canonical host.
 *
 * Any violation exits non-zero with a clear message so the build fails before
 * the wrong manifest reaches search engines.
 */
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { SITE_URL } from "./seo-config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_DIR, "dist", "public");
const SITEMAP_PATH = path.join(DIST_DIR, "sitemap.xml");
const ROBOTS_PATH = path.join(DIST_DIR, "robots.txt");

// Decode the small set of HTML/XML entities the sitemap generator (see
// scripts/build-seo.mjs) could conceivably emit inside a <loc>. URLs in
// SITEMAP_ROUTES today don't contain & < > " ', but if a future route adds a
// query string with `&` the sitemap will encode it as `&amp;` and a raw string
// compare against SITEMAP_ROUTES would spuriously fail.
function decodeXmlEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

async function loadSitemapRoutes() {
  const url = pathToFileURL(path.join(PROJECT_DIR, "src", "routes-config.ts")).href;
  const mod = await import(url);
  if (!Array.isArray(mod.SITEMAP_ROUTES)) {
    throw new Error("routes-config.ts did not export an array SITEMAP_ROUTES");
  }
  return mod.SITEMAP_ROUTES;
}

const LOC_PATTERN = /<loc>([\s\S]*?)<\/loc>/gi;

function extractLocs(xml) {
  const out = [];
  let m;
  LOC_PATTERN.lastIndex = 0;
  while ((m = LOC_PATTERN.exec(xml)) !== null) {
    out.push(decodeXmlEntities(m[1].trim()));
  }
  return out;
}

function isWellFormedUrl(s) {
  try {
    // new URL throws on relative or malformed input. We only accept absolute
    // http(s) URLs in a sitemap — search engines reject relative <loc>s.
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

// Diff two string sets, returning paths present in `actual` but not `expected`
// (extras) and paths present in `expected` but not `actual` (missing). We list
// up to 20 of each to keep the failure log readable; the count is reported
// separately so a huge diff still shows the magnitude.
function diffSets(actual, expected) {
  const missing = [];
  const extras = [];
  for (const p of expected) {
    if (!actual.has(p)) missing.push(p);
  }
  for (const p of actual) {
    if (!expected.has(p)) extras.push(p);
  }
  missing.sort();
  extras.sort();
  return { missing, extras };
}

function formatList(items, cap = 20) {
  if (items.length === 0) return "";
  const shown = items.slice(0, cap).map((x) => `      - ${x}`).join("\n");
  const more = items.length > cap ? `\n      … and ${items.length - cap} more` : "";
  return `${shown}${more}`;
}

async function auditSitemap(errors) {
  if (!existsSync(SITEMAP_PATH)) {
    errors.push(`sitemap.xml not found at ${SITEMAP_PATH}`);
    return;
  }
  const xml = await readFile(SITEMAP_PATH, "utf8");
  const locs = extractLocs(xml);
  if (locs.length === 0) {
    errors.push("sitemap.xml contains zero <loc> entries");
    return;
  }

  const expectedRoutes = await loadSitemapRoutes();
  const expectedPaths = new Set(expectedRoutes.map((r) => r.path));

  // Per-loc structural checks first. Bail out of the set diff if any loc is
  // malformed or points at the wrong host — the diff would otherwise produce
  // confusing "extra path" entries that are really the same routes mis-hosted.
  const wrongHost = [];
  const malformed = [];
  const actualPaths = new Set();
  const duplicates = new Set();

  for (const loc of locs) {
    if (!isWellFormedUrl(loc)) {
      malformed.push(loc);
      continue;
    }
    if (!loc.startsWith(SITE_URL)) {
      wrongHost.push(loc);
      continue;
    }
    const tail = loc.slice(SITE_URL.length);
    // A correct entry is exactly SITE_URL + a path that begins with "/".
    // Anything else (no leading slash, or SITE_URL with no tail) means the
    // sitemap generator is misusing SITE_URL — flag it as malformed rather
    // than silently de-duplicating.
    if (tail.length === 0 || !tail.startsWith("/")) {
      malformed.push(loc);
      continue;
    }
    if (actualPaths.has(tail)) {
      duplicates.add(tail);
    } else {
      actualPaths.add(tail);
    }
  }

  if (malformed.length) {
    errors.push(
      `sitemap.xml has ${malformed.length} malformed <loc> entr${malformed.length === 1 ? "y" : "ies"} (must be absolute http(s) URLs of the form SITE_URL + "/path"):\n${formatList(malformed)}`,
    );
  }
  if (wrongHost.length) {
    errors.push(
      `sitemap.xml has ${wrongHost.length} <loc> entr${wrongHost.length === 1 ? "y" : "ies"} that do not start with SITE_URL (${SITE_URL}) — crawlers would be pointed at the wrong host:\n${formatList(wrongHost)}`,
    );
  }
  if (duplicates.size) {
    errors.push(
      `sitemap.xml has duplicate <loc> entries for the following path(s):\n${formatList([...duplicates])}`,
    );
  }

  // Only run the set comparison once per-entry checks pass — otherwise a
  // wrong-host loc would also show up as "missing" + "extra", drowning the
  // real signal. The host/format errors above are the more useful diagnostic.
  if (malformed.length === 0 && wrongHost.length === 0) {
    const { missing, extras } = diffSets(actualPaths, expectedPaths);
    if (missing.length || extras.length) {
      const parts = [
        `sitemap.xml path set does not match SITEMAP_ROUTES from src/routes-config.ts`,
      ];
      if (missing.length) {
        parts.push(
          `    ${missing.length} path(s) in SITEMAP_ROUTES but missing from sitemap.xml:\n${formatList(missing)}`,
        );
      }
      if (extras.length) {
        parts.push(
          `    ${extras.length} path(s) in sitemap.xml but not in SITEMAP_ROUTES:\n${formatList(extras)}`,
        );
      }
      errors.push(parts.join("\n"));
    }
  }
}

const SITEMAP_DIRECTIVE_PATTERN = /^[ \t]*Sitemap:[ \t]*(\S+)[ \t]*$/gim;

async function auditRobots(errors) {
  if (!existsSync(ROBOTS_PATH)) {
    errors.push(`robots.txt not found at ${ROBOTS_PATH}`);
    return;
  }
  const txt = await readFile(ROBOTS_PATH, "utf8");
  const found = [];
  let m;
  SITEMAP_DIRECTIVE_PATTERN.lastIndex = 0;
  while ((m = SITEMAP_DIRECTIVE_PATTERN.exec(txt)) !== null) {
    found.push(m[1]);
  }

  if (found.length === 0) {
    errors.push("robots.txt has no `Sitemap:` directive");
    return;
  }
  if (found.length > 1) {
    errors.push(
      `robots.txt has ${found.length} \`Sitemap:\` directives (expected exactly 1): ${found.map((u) => JSON.stringify(u)).join(", ")}`,
    );
    return;
  }

  const expected = `${SITE_URL}/sitemap.xml`;
  if (found[0] !== expected) {
    errors.push(
      `robots.txt \`Sitemap:\` directive is "${found[0]}" but expected "${expected}" (must use SITE_URL so robots.txt and the sitemap agree on the canonical host)`,
    );
  }
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`audit-sitemap: dist directory not found at ${DIST_DIR}. Run vite build first.`);
    process.exit(1);
  }

  const errors = [];
  await auditSitemap(errors);
  await auditRobots(errors);

  if (errors.length) {
    console.error(`audit-sitemap: FAILED — ${errors.length} issue(s):\n`);
    for (const e of errors) {
      console.error(`  - ${e}\n`);
    }
    process.exit(1);
  }

  console.log(
    `audit-sitemap: passed — sitemap.xml and robots.txt agree with SITE_URL (${SITE_URL}) and SITEMAP_ROUTES.`,
  );
}

main().catch((e) => {
  console.error("audit-sitemap failed:", e);
  process.exit(1);
});
