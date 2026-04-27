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
 *   - The <link rel="canonical"> href and the og:url content are byte-identical
 *     (after HTML-entity decoding), so search engines and social platforms
 *     consolidate signals onto a single URL instead of splitting them across
 *     two competing variants.
 *   - That shared URL equals SITE_URL + the page's path on disk, with
 *     CANONICAL_OVERRIDES (see scripts/seo-config.mjs) applied — e.g. the
 *     prerendered `/index.html` must canonicalise to
 *     SITE_URL + /phone-repair-houston-tx, not SITE_URL + /.
 *   - The <title> text, og:title content, and twitter:title content are equal
 *     (after HTML-entity decoding), so the headline a user sees in the browser
 *     tab matches what's shared to Facebook/X/LinkedIn previews.
 *
 * Exits non-zero with a clear, file-by-file message when any assertion is
 * violated so the build fails before broken HTML reaches search engines.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_URL, CANONICAL_OVERRIDES } from "./seo-config.mjs";

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
const HREF_ATTR_PATTERN = /\bhref=["']([^"']*)["']/i;
const CANONICAL_LINK_PATTERN = /<link\b[^>]*\brel=["']canonical["'][^>]*>/i;
const OG_URL_META_PATTERN = /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/i;
const OG_TITLE_META_PATTERN = /<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/i;
const TWITTER_TITLE_META_PATTERN = /<meta\b[^>]*\bname=["']twitter:title["'][^>]*>/i;
const TITLE_TAG_PATTERN = /<title\b[^>]*>([\s\S]*?)<\/title>/i;

// Decode the small set of HTML entities that <SEO>/Helmet and the build's
// safety-net escape() function can emit in title / meta / link attributes:
// & < > " ' (named + the most common numeric forms). Comparing decoded text
// avoids false mismatches when one tag uses &#x27; and another uses &#39; for
// the same apostrophe, etc.
function decodeHtmlEntities(s) {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function attrValueDecoded(tagHtml, pattern) {
  if (!tagHtml) return null;
  const m = tagHtml.match(pattern);
  return m ? decodeHtmlEntities(m[1]) : null;
}

// Raw (un-decoded) attribute value, used for canonical href / og:url where the
// task spec calls for a byte-identical comparison of what's actually in the
// HTML. URLs shouldn't contain HTML entities anyway, so a raw mismatch here is
// always either a real disagreement or an unexpected escaping change worth
// catching.
function attrValueRaw(tagHtml, pattern) {
  if (!tagHtml) return null;
  const m = tagHtml.match(pattern);
  return m ? m[1] : null;
}

// Map a prerendered file's path on disk (relative to dist/public) back to the
// route path the build wrote it for, then apply CANONICAL_OVERRIDES. This is
// what every canonical / og:url on that page is required to point at.
function expectedCanonicalForFile(relPath) {
  const parts = relPath.split(path.sep);
  // dist/public/index.html  -> route "/"
  // dist/public/<a>/<b>/index.html -> route "/<a>/<b>"
  let routePath;
  if (parts.length === 1 && parts[0] === "index.html") {
    routePath = "/";
  } else if (parts[parts.length - 1] === "index.html") {
    routePath = "/" + parts.slice(0, -1).join("/");
  } else {
    routePath = "/" + parts.join("/");
  }
  const canonicalPath = CANONICAL_OVERRIDES[routePath] || routePath;
  return `${SITE_URL}${canonicalPath}`;
}

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

  // Canonical / og:url cross-checks. We only run these when SINGLE_HEAD_TAGS
  // already confirmed exactly one canonical link and exactly one og:url tag.
  // If a page has zero or two of either, the earlier "expected exactly 1"
  // error is the more useful diagnostic and these follow-on checks would just
  // pile on noisy failures with the wrong root cause.
  const canonicalCount = countMatches(head, /<link\b[^>]*\brel=["']canonical["'][^>]*>/gi);
  const ogUrlCount = countMatches(head, /<meta\b[^>]*\bproperty=["']og:url["'][^>]*>/gi);
  if (canonicalCount === 1 && ogUrlCount === 1) {
    const canonicalTag = head.match(CANONICAL_LINK_PATTERN);
    const ogUrlTag = head.match(OG_URL_META_PATTERN);
    // Byte-identical comparison: the spec calls for the raw href and content
    // attribute values to match exactly. URLs shouldn't have HTML entities, so
    // any escaping difference here is itself a regression worth catching.
    const canonicalHrefRaw = attrValueRaw(canonicalTag[0], HREF_ATTR_PATTERN);
    const ogUrlRaw = attrValueRaw(ogUrlTag[0], CONTENT_ATTR_PATTERN);
    if (canonicalHrefRaw !== ogUrlRaw) {
      errors.push(
        `canonical href and og:url disagree (byte comparison) — canonical="${canonicalHrefRaw}", og:url="${ogUrlRaw}" (they must point at the same URL or search/social signals split)`,
      );
    }
    const expectedUrl = expectedCanonicalForFile(relPath);
    if (canonicalHrefRaw !== expectedUrl) {
      errors.push(
        `canonical href "${canonicalHrefRaw}" does not match expected URL "${expectedUrl}" for file path "${relPath}" (SITE_URL + path, with CANONICAL_OVERRIDES applied)`,
      );
    }
    if (ogUrlRaw !== expectedUrl) {
      errors.push(
        `og:url "${ogUrlRaw}" does not match expected URL "${expectedUrl}" for file path "${relPath}" (SITE_URL + path, with CANONICAL_OVERRIDES applied)`,
      );
    }
  }

  // <title> / og:title / twitter:title must agree so the browser tab and the
  // social share preview show the same headline. Same gating: only when each
  // involved tag appears exactly once. We compare decoded text so an apostrophe
  // emitted as `&#x27;` in one tag and `&#39;` in another doesn't trigger a
  // spurious mismatch — the rendered headline a user sees is what matters.
  const titleCount = countMatches(head, /<title\b[^>]*>[\s\S]*?<\/title>/gi);
  const ogTitleCount = countMatches(head, /<meta\b[^>]*\bproperty=["']og:title["'][^>]*>/gi);
  const twitterTitleCount = countMatches(head, /<meta\b[^>]*\bname=["']twitter:title["'][^>]*>/gi);

  if (titleCount === 1 && ogTitleCount === 1 && twitterTitleCount === 1) {
    const titleMatch = head.match(TITLE_TAG_PATTERN);
    const ogTitleTag = head.match(OG_TITLE_META_PATTERN);
    const twitterTitleTag = head.match(TWITTER_TITLE_META_PATTERN);
    const titleText = decodeHtmlEntities(titleMatch[1]).trim();
    const ogTitle = attrValueDecoded(ogTitleTag[0], CONTENT_ATTR_PATTERN);
    const twitterTitle = attrValueDecoded(twitterTitleTag[0], CONTENT_ATTR_PATTERN);

    if (titleText !== ogTitle) {
      errors.push(
        `<title> and og:title disagree — title="${titleText}", og:title="${ogTitle}"`,
      );
    }
    if (titleText !== twitterTitle) {
      errors.push(
        `<title> and twitter:title disagree — title="${titleText}", twitter:title="${twitterTitle}"`,
      );
    }
    if (ogTitle !== twitterTitle) {
      errors.push(
        `og:title and twitter:title disagree — og:title="${ogTitle}", twitter:title="${twitterTitle}"`,
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
