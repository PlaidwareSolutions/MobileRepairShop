#!/usr/bin/env node
/**
 * Post-build SEO audit. Walks every prerendered index.html under dist/public
 * and verifies the head/body tag invariants the prerender pipeline is
 * supposed to maintain (see scripts/build-seo.mjs and src/entry-server.tsx).
 *
 * For every customer-facing prerendered page (legacy redirect stubs that
 * contain <meta http-equiv="refresh" ...> are skipped):
 *   - <head> must contain exactly one of each:
 *       <title>, <link rel="canonical">,
 *       og:title, og:description, og:url, og:type, og:image, og:site_name,
 *       twitter:card, twitter:title, twitter:description, twitter:image,
 *       and a <meta name="robots"> tag.
 *   - <div id="root"> (the body) must contain zero <title>, <meta>,
 *     <link rel="canonical">, or <script type="application/ld+json"> tags —
 *     these belong in <head>. (This is the regression Task #30 fixed.)
 *   - /admin/* pages must declare robots="noindex, nofollow"; everything
 *     else must declare robots="index, follow".
 *   - Every <script type="application/ld+json"> in <head> must contain valid
 *     JSON and a non-empty "@context" + "@type". The LocalBusiness /
 *     ElectronicsStore block (the one that powers Google rich results) must
 *     additionally include "name", "address", and "telephone", and at least
 *     one such block must be present. Admin pages (noindex) are exempt from
 *     the JSON-LD checks.
 *
 * Exits non-zero with a clear, file-by-file message when any assertion is
 * violated so the build fails before broken HTML reaches search engines.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_DIR, "dist", "public");

const SINGLE_HEAD_TAGS = [
  { name: "<title>", pattern: /<title\b[^>]*>[\s\S]*?<\/title>/gi },
  { name: '<link rel="canonical">', pattern: /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi },
  { name: 'meta property="og:title"', pattern: /<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/gi },
  { name: 'meta property="og:description"', pattern: /<meta\b[^>]*\bproperty=["']og:description["'][^>]*>/gi },
  { name: 'meta property="og:url"', pattern: /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi },
  { name: 'meta property="og:type"', pattern: /<meta\b[^>]*\bproperty=["']og:type["'][^>]*>/gi },
  { name: 'meta property="og:image"', pattern: /<meta\b[^>]*\bproperty=["']og:image["'][^>]*>/gi },
  { name: 'meta property="og:site_name"', pattern: /<meta\b[^>]*\bproperty=["']og:site_name["'][^>]*>/gi },
  { name: 'meta name="twitter:card"', pattern: /<meta\b[^>]*\bname=["']twitter:card["'][^>]*>/gi },
  { name: 'meta name="twitter:title"', pattern: /<meta\b[^>]*\bname=["']twitter:title["'][^>]*>/gi },
  { name: 'meta name="twitter:description"', pattern: /<meta\b[^>]*\bname=["']twitter:description["'][^>]*>/gi },
  { name: 'meta name="twitter:image"', pattern: /<meta\b[^>]*\bname=["']twitter:image["'][^>]*>/gi },
  { name: 'meta name="robots"', pattern: /<meta\b[^>]*\bname=["']robots["'][^>]*>/gi },
];

const FORBIDDEN_BODY_TAGS = [
  { name: "<title>", pattern: /<title\b[^>]*>[\s\S]*?<\/title>/gi },
  { name: "<meta>", pattern: /<meta\b[^>]*>/gi },
  { name: '<link rel="canonical">', pattern: /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi },
  {
    name: '<script type="application/ld+json">',
    pattern: /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi,
  },
];

const ROBOTS_META_PATTERN = /<meta\b[^>]*\bname=["']robots["'][^>]*>/i;
const CONTENT_ATTR_PATTERN = /\bcontent=["']([^"']*)["']/i;

const LD_JSON_SCRIPT_PATTERN =
  /<script\b[^>]*\btype=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
const LOCAL_BUSINESS_TYPES = new Set([
  "LocalBusiness",
  "ElectronicsStore",
]);
const REQUIRED_LOCAL_BUSINESS_FIELDS = ["name", "address", "telephone"];

function isLocalBusinessType(typeValue) {
  if (!typeValue) return false;
  if (typeof typeValue === "string") return LOCAL_BUSINESS_TYPES.has(typeValue);
  if (Array.isArray(typeValue)) {
    return typeValue.some((t) => typeof t === "string" && LOCAL_BUSINESS_TYPES.has(t));
  }
  return false;
}

function hasNonEmpty(value) {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

async function* walkIndexHtml(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkIndexHtml(full);
    } else if (entry.isFile() && entry.name === "index.html") {
      yield full;
    }
  }
}

function extractHead(html) {
  const m = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  return m ? m[1] : null;
}

function extractRootBody(html) {
  // From the opening <div id="root"> tag through </body>. We don't try to
  // balance nested </div>s — anything between root open and </body> is the
  // rendered React body and must not contain head-only tags.
  const open = html.match(/<div\s+id=["']root["'][^>]*>/i);
  if (!open) return null;
  const start = open.index + open[0].length;
  const lower = html.toLowerCase();
  const endIdx = lower.indexOf("</body>", start);
  return endIdx < 0 ? html.slice(start) : html.slice(start, endIdx);
}

function countMatches(str, pattern) {
  const m = str.match(pattern);
  return m ? m.length : 0;
}

function normaliseRobots(value) {
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function auditOne(html, relPath) {
  // Skip legacy redirect stubs — they intentionally have a tiny <head>.
  if (/http-equiv=["']refresh["']/i.test(html)) {
    return { skipped: true };
  }

  const errors = [];

  const head = extractHead(html);
  if (head === null) {
    errors.push("missing <head> block");
    return { errors };
  }

  for (const { name, pattern } of SINGLE_HEAD_TAGS) {
    const c = countMatches(head, pattern);
    if (c !== 1) {
      errors.push(`expected exactly 1 ${name} in <head>, found ${c}`);
    }
  }

  const body = extractRootBody(html);
  if (body === null) {
    errors.push('missing <div id="root"> block');
  } else {
    for (const { name, pattern } of FORBIDDEN_BODY_TAGS) {
      const c = countMatches(body, pattern);
      if (c !== 0) {
        errors.push(`expected 0 ${name} inside <div id="root">, found ${c}`);
      }
    }
  }

  const isAdmin = relPath.split(path.sep).join("/").startsWith("admin/");
  const expected = isAdmin ? "noindex, nofollow" : "index, follow";
  const robotsTag = head.match(ROBOTS_META_PATTERN);
  if (robotsTag) {
    const contentMatch = robotsTag[0].match(CONTENT_ATTR_PATTERN);
    const value = contentMatch ? contentMatch[1] : "";
    if (normaliseRobots(value) !== normaliseRobots(expected)) {
      errors.push(
        `expected robots content "${expected}" (${isAdmin ? "admin" : "non-admin"} page), found "${value}"`,
      );
    }
  }

  if (!isAdmin) {
    auditJsonLd(head, errors);
  }

  return { errors };
}

function auditJsonLd(head, errors) {
  const blocks = [];
  let m;
  LD_JSON_SCRIPT_PATTERN.lastIndex = 0;
  while ((m = LD_JSON_SCRIPT_PATTERN.exec(head)) !== null) {
    blocks.push(m[1]);
  }

  let localBusinessFound = false;

  for (let i = 0; i < blocks.length; i++) {
    const label = `<script type="application/ld+json"> #${i + 1} in <head>`;
    const raw = blocks[i].trim();
    if (raw.length === 0) {
      errors.push(`${label} is empty`);
      continue;
    }
    let obj;
    try {
      obj = JSON.parse(raw);
    } catch (e) {
      errors.push(`${label} failed to parse as JSON: ${e.message}`);
      continue;
    }
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      errors.push(`${label} is not a JSON object`);
      continue;
    }
    if (!hasNonEmpty(obj["@context"])) {
      errors.push(`${label} is missing required field "@context"`);
    }
    if (!hasNonEmpty(obj["@type"])) {
      errors.push(`${label} is missing required field "@type"`);
    }
    if (isLocalBusinessType(obj["@type"])) {
      localBusinessFound = true;
      for (const field of REQUIRED_LOCAL_BUSINESS_FIELDS) {
        if (!hasNonEmpty(obj[field])) {
          errors.push(
            `${label} (LocalBusiness/${obj["@type"]}) is missing required field "${field}"`,
          );
        }
      }
    }
  }

  if (!localBusinessFound) {
    errors.push(
      'no LocalBusiness/ElectronicsStore <script type="application/ld+json"> block found in <head>',
    );
  }
}

async function main() {
  const failures = [];
  let scanned = 0;
  let skipped = 0;

  for await (const file of walkIndexHtml(DIST_DIR)) {
    const rel = path.relative(DIST_DIR, file);
    const html = await readFile(file, "utf8");
    const result = auditOne(html, rel);
    if (result.skipped) {
      skipped++;
      continue;
    }
    scanned++;
    if (result.errors.length) {
      failures.push({ file: rel, errors: result.errors });
    }
  }

  if (failures.length) {
    console.error(
      `audit-seo: FAILED — ${failures.length} of ${scanned} prerendered HTML file(s) violate SEO invariants:`,
    );
    for (const f of failures) {
      console.error(`\n  ${f.file}`);
      for (const e of f.errors) {
        console.error(`    - ${e}`);
      }
    }
    console.error(`\naudit-seo: skipped ${skipped} legacy redirect stub(s).`);
    process.exit(1);
  }

  console.log(
    `audit-seo: passed — ${scanned} prerendered HTML file(s) checked, ${skipped} legacy redirect stub(s) skipped.`,
  );
}

main().catch((e) => {
  console.error("audit-seo failed:", e);
  process.exit(1);
});
