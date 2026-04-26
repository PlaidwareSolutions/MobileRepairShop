import { Helmet } from "react-helmet-async";
import { BUSINESS } from "@/content";

type Props = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
};

const SITE_URL =
  (typeof import.meta !== "undefined" && (import.meta.env?.VITE_SITE_URL as string | undefined)) ||
  "https://gadget-x-repairs.replit.app";

export function SEO({ title, description, path, type = "website", jsonLd, noindex }: Props) {
  const url = `${SITE_URL}${path}`;
  const jsonLdArray = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:image" content={`${SITE_URL}${BUSINESS.logo}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${BUSINESS.logo}`} />
      {jsonLdArray.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    name: BUSINESS.name,
    image: `${SITE_URL}${BUSINESS.logo}`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: BUSINESS.phoneDisplay,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.addressLine1,
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77054",
      addressCountry: "US",
    },
    areaServed: ["Houston", "Sugar Land", "Missouri City", "Stafford", "Katy", "Alief", "Sharpstown"],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "12:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" },
    ],
    sameAs: [BUSINESS.mapsLink],
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    provider: {
      "@type": "ElectronicsStore",
      name: BUSINESS.name,
      telephone: BUSINESS.phoneDisplay,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.addressLine1,
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77054",
        addressCountry: "US",
      },
    },
    areaServed: { "@type": "City", name: "Houston" },
    description,
    url: `${SITE_URL}${path}`,
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(opts: { title: string; description: string; path: string; published: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.published,
    dateModified: opts.updated,
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    author: { "@type": "Organization", name: BUSINESS.name },
    publisher: {
      "@type": "Organization",
      name: BUSINESS.name,
      logo: { "@type": "ImageObject", url: `${SITE_URL}${BUSINESS.logo}` },
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${SITE_URL}${it.path}`,
    })),
  };
}
