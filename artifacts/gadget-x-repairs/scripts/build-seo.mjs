#!/usr/bin/env node
/**
 * Post-build static pre-rendering:
 * 1. Reads dist/public/index.html (the built SPA shell with hashed asset URLs)
 * 2. Imports dist/server/entry-server.mjs (a Node-loadable SSR build of the
 *    React tree compiled by Vite)
 * 3. For each route in routes-config, calls render(path) which returns
 *    { html, head } via ReactDOMServer.renderToString. The body html is
 *    injected into <div id="root">…</div>; the head string contains all
 *    <title>, <meta>, <link>, and <script type="application/ld+json"> tags
 *    emitted by react-helmet-async during render.
 * 4. Writes dist/public/<slug>/index.html — fully rendered HTML the crawler
 *    sees before any client JS runs.
 * 5. Generates dist/public/sitemap.xml and dist/public/robots.txt.
 *
 * The SPA still mounts on top of the rendered DOM via createRoot (replacing
 * server markup); this is "SSG without hydration" — correct for SEO.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_DIR, "dist", "public");
const SERVER_BUNDLE = path.join(PROJECT_DIR, "dist", "server", "entry-server.mjs");

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || "https://gadget-x-repairs.replit.app";

function escape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function loadRoutes() {
  const routesUrl = pathToFileURL(path.join(PROJECT_DIR, "src", "routes-config.ts")).href;
  const mod = await import(routesUrl);
  return { all: mod.ALL_ROUTES, sitemap: mod.SITEMAP_ROUTES };
}

async function loadLegacyRedirects() {
  const url = pathToFileURL(path.join(PROJECT_DIR, "src", "legacy-redirects.ts")).href;
  const mod = await import(url);
  return mod.LEGACY_REDIRECTS;
}

function redirectHtml(toPath) {
  const dest = `${SITE_URL}${toPath}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Page Moved | Gadget X Repairs</title>
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="${dest}">
<meta http-equiv="refresh" content="0; url=${toPath}">
<script>window.location.replace(${JSON.stringify(toPath)});</script>
</head>
<body>
<p>This page has moved to <a href="${toPath}">${dest}</a>.</p>
</body>
</html>
`;
}

async function writeLegacyRedirect(fromPath, toPath) {
  const dir = path.join(DIST_DIR, fromPath.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), redirectHtml(toPath), "utf8");
}

async function loadRender() {
  if (!existsSync(SERVER_BUNDLE)) {
    throw new Error(`SSR bundle not found at ${SERVER_BUNDLE}. Did the SSR build step fail?`);
  }
  const mod = await import(pathToFileURL(SERVER_BUNDLE).href);
  if (typeof mod.render !== "function") {
    throw new Error(`SSR bundle does not export render()`);
  }
  return mod.render;
}

function injectRendered(baseHtml, route, rendered) {
  const canonical = `${SITE_URL}${route.path}`;
  let out = baseHtml;
  const headStr = rendered.head || "";

  // Strip placeholder/static head tags that Helmet now owns per route.
  out = out.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
  out = out.replace(/<meta\s+name=["']description["'][^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+property=["']og:title["'][^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+property=["']og:description["'][^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+property=["']og:url["'][^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+name=["']twitter:title["'][^>]*>\s*/gi, "");
  out = out.replace(/<meta\s+name=["']twitter:description["'][^>]*>\s*/gi, "");
  out = out.replace(/<link\s+rel=["']canonical["'][^>]*>\s*/gi, "");

  // Inject rendered head (title, meta, link, script JSON-LD) just before </head>.
  const headBlock = headStr ? `${headStr}\n` : "";

  // Safety nets if SEO component didn't emit a tag for some reason.
  const safetyTags = [];
  if (!/<link[^>]*rel=["']canonical["'][^>]*>/i.test(headStr)) {
    safetyTags.push(`<link rel="canonical" href="${canonical}" />`);
  }
  if (!/<meta[^>]*property=["']og:url["'][^>]*>/i.test(headStr)) {
    safetyTags.push(`<meta property="og:url" content="${canonical}" />`);
  }
  if (!/<meta[^>]*property=["']og:title["'][^>]*>/i.test(headStr)) {
    safetyTags.push(`<meta property="og:title" content="${escape(route.metaTitle)}" />`);
  }
  if (!/<meta[^>]*property=["']og:description["'][^>]*>/i.test(headStr)) {
    safetyTags.push(`<meta property="og:description" content="${escape(route.metaDescription)}" />`);
  }
  if (route.path.startsWith("/admin")) {
    out = out.replace(/<meta\s+name=["']robots["'][^>]*>\s*/gi, "");
    safetyTags.push(`<meta name="robots" content="noindex, nofollow" />`);
  }

  out = out.replace("</head>", `${headBlock}${safetyTags.join("\n")}\n</head>`);

  // Inject rendered body into <div id="root"></div>
  if (/<div\s+id=["']root["']\s*>\s*<\/div>/i.test(out)) {
    out = out.replace(/<div\s+id=["']root["']\s*>\s*<\/div>/i, `<div id="root">${rendered.html}</div>`);
  } else {
    out = out.replace(/(<div\s+id=["']root["'][^>]*>)([\s\S]*?)(<\/div>)/i, `$1${rendered.html}$3`);
  }

  return out;
}

async function writeRouteHtml(route, baseHtml, render) {
  let rendered;
  try {
    rendered = render(route.path);
  } catch (e) {
    console.warn(`build-seo: render failed for ${route.path}:`, e.message);
    rendered = { html: "", head: "" };
  }
  const html = injectRendered(baseHtml, route, rendered);
  if (route.path === "/") {
    await writeFile(path.join(DIST_DIR, "index.html"), html, "utf8");
    return;
  }
  const routeDir = path.join(DIST_DIR, route.path.replace(/^\//, ""));
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html, "utf8");
}

function buildSitemap(routes) {
  const today = new Date().toISOString().split("T")[0];
  const urls = routes
    .map((r) => {
      let priority = "0.6";
      let changefreq = "monthly";
      if (r.path === "/phone-repair-houston-tx") {
        priority = "1.0";
        changefreq = "weekly";
      } else if (r.path.startsWith("/articles/")) {
        priority = "0.5";
      } else if (r.path === "/inventory") {
        priority = "0.7";
        changefreq = "daily";
      } else {
        priority = "0.8";
      }
      return `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${SITE_URL}/sitemap.xml
`;
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error(`build-seo: dist directory not found at ${DIST_DIR}. Run vite build first.`);
    process.exit(1);
  }
  const baseHtml = await readFile(path.join(DIST_DIR, "index.html"), "utf8");
  const [{ all, sitemap }, render, legacy] = await Promise.all([
    loadRoutes(),
    loadRender(),
    loadLegacyRedirects(),
  ]);
  console.log(`build-seo: pre-rendering ${all.length} routes…`);
  for (const route of all) {
    await writeRouteHtml(route, baseHtml, render);
  }
  const legacyEntries = Object.entries(legacy);
  for (const [from, to] of legacyEntries) {
    await writeLegacyRedirect(from, to);
  }
  await writeFile(path.join(DIST_DIR, "sitemap.xml"), buildSitemap(sitemap), "utf8");
  await writeFile(path.join(DIST_DIR, "robots.txt"), buildRobots(), "utf8");
  console.log(
    `build-seo: wrote ${all.length} HTML files, ${legacyEntries.length} legacy redirects, ${sitemap.length} sitemap entries, robots.txt.`,
  );
}

main().catch((e) => {
  console.error("build-seo failed:", e);
  process.exit(1);
});
