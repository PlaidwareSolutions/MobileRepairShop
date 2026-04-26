#!/usr/bin/env node
/**
 * Post-build SEO generation:
 * 1. Reads dist/public/index.html (built SPA shell)
 * 2. For each route in routes-config, writes dist/public/<slug>/index.html
 *    with per-route <title>, <meta name="description"> and <link rel="canonical">.
 *    This gives crawlers route-specific SEO signals before any client-side
 *    JavaScript executes (the SPA still hydrates to the correct route).
 * 3. Generates dist/public/sitemap.xml and dist/public/robots.txt.
 *
 * Note: This is meta-tag prerendering — the page body is still the SPA shell
 * which hydrates client-side. Route-specific titles, descriptions and
 * canonical URLs are guaranteed to be in the served HTML for crawlers.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_DIR = path.resolve(__dirname, "..");
const DIST_DIR = path.join(PROJECT_DIR, "dist", "public");

const SITE_URL = process.env.VITE_SITE_URL || process.env.SITE_URL || "https://gadget-x-repairs.replit.app";

function escape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

async function loadRoutes() {
  // Use the runtime tsx loader (registered in package.json script) or fall back
  // to a JIT-compiled import via ts-node-style approach. We import the TS module
  // directly since this script is run via `tsx`.
  const routesUrl = pathToFileURL(path.join(PROJECT_DIR, "src", "routes-config.ts")).href;
  const mod = await import(routesUrl);
  return { all: mod.ALL_ROUTES, sitemap: mod.SITEMAP_ROUTES };
}

function injectSeo(html, route) {
  const canonical = `${SITE_URL}${route.path}`;
  const titleTag = `<title>${escape(route.metaTitle)}</title>`;
  const descTag = `<meta name="description" content="${escape(route.metaDescription)}" />`;
  const ogTitleTag = `<meta property="og:title" content="${escape(route.metaTitle)}" />`;
  const ogDescTag = `<meta property="og:description" content="${escape(route.metaDescription)}" />`;
  const ogUrlTag = `<meta property="og:url" content="${canonical}" />`;
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`;
  const twTitleTag = `<meta name="twitter:title" content="${escape(route.metaTitle)}" />`;
  const twDescTag = `<meta name="twitter:description" content="${escape(route.metaDescription)}" />`;

  let out = html.replace(/<title>[\s\S]*?<\/title>/, titleTag);

  // Replace existing description meta if present
  if (/<meta\s+name=["']description["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+name=["']description["'][^>]*>/i, descTag);
  } else {
    out = out.replace("</head>", `${descTag}\n</head>`);
  }

  // Replace existing OG tags if present
  if (/<meta\s+property=["']og:title["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+property=["']og:title["'][^>]*>/i, ogTitleTag);
  } else {
    out = out.replace("</head>", `${ogTitleTag}\n</head>`);
  }
  if (/<meta\s+property=["']og:description["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+property=["']og:description["'][^>]*>/i, ogDescTag);
  } else {
    out = out.replace("</head>", `${ogDescTag}\n</head>`);
  }
  if (/<meta\s+property=["']og:url["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+property=["']og:url["'][^>]*>/i, ogUrlTag);
  } else {
    out = out.replace("</head>", `${ogUrlTag}\n</head>`);
  }
  if (/<meta\s+name=["']twitter:title["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+name=["']twitter:title["'][^>]*>/i, twTitleTag);
  } else {
    out = out.replace("</head>", `${twTitleTag}\n</head>`);
  }
  if (/<meta\s+name=["']twitter:description["'][^>]*>/i.test(out)) {
    out = out.replace(/<meta\s+name=["']twitter:description["'][^>]*>/i, twDescTag);
  } else {
    out = out.replace("</head>", `${twDescTag}\n</head>`);
  }

  // Replace existing canonical or insert
  if (/<link\s+rel=["']canonical["'][^>]*>/i.test(out)) {
    out = out.replace(/<link\s+rel=["']canonical["'][^>]*>/i, canonicalTag);
  } else {
    out = out.replace("</head>", `${canonicalTag}\n</head>`);
  }

  // For non-indexed routes (admin) inject noindex
  if (route.path.startsWith("/admin")) {
    if (/<meta\s+name=["']robots["'][^>]*>/i.test(out)) {
      out = out.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="noindex, nofollow" />`);
    } else {
      out = out.replace("</head>", `<meta name="robots" content="noindex, nofollow" />\n</head>`);
    }
  }

  return out;
}

async function writeRouteHtml(route, baseHtml) {
  const html = injectSeo(baseHtml, route);
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
      if (r.path === "/") {
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
  const { all, sitemap } = await loadRoutes();
  console.log(`build-seo: writing per-route HTML for ${all.length} routes…`);
  for (const route of all) {
    await writeRouteHtml(route, baseHtml);
  }
  await writeFile(path.join(DIST_DIR, "sitemap.xml"), buildSitemap(sitemap), "utf8");
  await writeFile(path.join(DIST_DIR, "robots.txt"), buildRobots(), "utf8");
  console.log(`build-seo: wrote ${sitemap.length} sitemap entries and robots.txt.`);
}

main().catch((e) => {
  console.error("build-seo failed:", e);
  process.exit(1);
});
