/**
 * Shared inventory category grouping.
 *
 * Each known group has its own canonical URL (`/inventory/<slug>`) so search
 * engines can index a clean per-category page (Google mostly ignores query
 * strings as canonical URLs). The legacy `/inventory?category=<slug>` form
 * still works — InventoryPage soft-redirects it to the canonical path.
 *
 * Grouping is brand-led (Apple, Samsung, Google) so a shopper looking for any
 * Apple device — iPhones, iPads, Apple Watch, AirPods, MacBooks — lands in
 * one place. Gaming consoles stay as their own brand-agnostic bucket because
 * "PS5 / Xbox / Switch" is a distinct shopper intent that crosses brands.
 *
 * Inventory items are stored with free-form category strings ("Used iPhones",
 * "Refurbished iPhones", "Samsung phones", "Laptops", ...) and a separate
 * `brand` field. To keep the slug -> filter mapping resilient to category
 * renames we map slugs to a *predicate* that gets both fields and uses a
 * case-insensitive keyword match on either, instead of an exact-match table
 * that would silently break the moment someone tweaks a category label in
 * the admin.
 *
 * Per-group SEO metadata (`seo`, `heading`, `intro`) lives here too so that
 * routes-config.ts (which generates the prerender route list and sitemap) and
 * InventoryPage (which renders the page) read from one source of truth — no
 * risk of the title in the sitemap drifting from the title in the rendered
 * page.
 */

export type InventoryMatchInput = { category: string; brand?: string };

export type InventoryGroup = {
  slug: string;
  label: string;
  matches: (input: InventoryMatchInput) => boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  heading: {
    prefix: string;
    highlight: string;
  };
  intro: string;
  /**
   * Long-form, category-specific copy. `paragraphs` is rendered as the body
   * intro section (multiple short paragraphs read better on mobile than a
   * single wall of text and let us name brands/models/condition tiers
   * explicitly so the page can rank for those long-tail queries). `included`
   * is the "what's in the box" bullet list — chargers, warranty, factory
   * reset state, etc. Catch-all groups can omit this field.
   */
  bodyCopy?: {
    paragraphs: string[];
    included: string[];
  };
  /**
   * Category-tuned FAQ entries. Rendered visibly on the page AND emitted as
   * `FAQPage` JSON-LD via `faqJsonLd` so the page can earn FAQ rich
   * results. Keep questions phrased the way a real shopper would search
   * ("Are unlocked phones really unlocked on every carrier?") rather than
   * generic store-policy language.
   */
  faqs?: { q: string; a: string }[];
};

/**
 * Lightweight category-text test for whether a row represents a phone.
 * Used by the financing-pill UI ("from $10 down" pills only appear on
 * phone listings) so the trigger is independent of which brand bucket the
 * item lands in — an unlocked Pixel still shows the financing pill even
 * though its bucket is "google" rather than the old "phones".
 */
export function isPhoneCategory(category: string | null | undefined): boolean {
  return /\bphone|iphone|galaxy|pixel\b/i.test(category ?? "");
}

/**
 * Slug-based companion to {@link isPhoneCategory} for the SalesPage
 * financing pill. The pill should appear on phone-related shop / sell /
 * brand pages (anything with iphone, samsung, pixel, etc. in the slug)
 * but NOT on Apple companion-device pages like ipad / macbook / airpods /
 * apple-watch which now share the same "apple" inventory bucket.
 */
export function isPhonePageSlug(slug: string | null | undefined): boolean {
  const s = (slug ?? "").toLowerCase();
  if (!s) return false;
  if (/\b(ipad|macbook|airpod|apple-watch|tablet|laptop|chromebook)s?\b/.test(s)) {
    return false;
  }
  return /\b(phone|iphone|samsung|galaxy|pixel|google|motorola|revvl)s?\b/.test(s);
}

const APPLE_CATEGORY_RE = /iphone|ipad|macbook|apple watch|airpod/i;
const SAMSUNG_CATEGORY_RE = /samsung|galaxy/i;
const GOOGLE_CATEGORY_RE = /\bgoogle\b|pixel/i;
const CONSOLE_CATEGORY_RE =
  /console|playstation|\bps[2-9]\b|xbox|nintendo|\bswitch\b/i;

export const INVENTORY_GROUPS: InventoryGroup[] = [
  {
    slug: "apple",
    label: "Apple",
    matches: ({ category, brand }) =>
      /\bapple\b/i.test(brand ?? "") || APPLE_CATEGORY_RE.test(category),
    seo: {
      metaTitle: "Apple iPhones, iPads & MacBooks Houston | GadgetX Repairs",
      metaDescription:
        "Shop used & refurbished Apple devices at GadgetX Repairs in Houston TX — iPhones, iPads, MacBooks, Apple Watch & AirPods. 90-day warranty.",
    },
    heading: { prefix: "Apple", highlight: "Inventory" },
    intro:
      "Used and refurbished Apple devices in one place — iPhones, iPads, MacBooks, Apple Watch and AirPods. Tested in-shop, signed out of the previous owner's Apple ID, and backed by our 90-day warranty.",
    bodyCopy: {
      paragraphs: [
        "Our Apple inventory in Houston covers the full Apple lineup we see come through trade-ins and bulk buys: unlocked iPhones (typically iPhone 11 through the latest generation in stock), iPad / iPad Air / iPad Pro tablets in both Wi-Fi and cellular configurations, MacBook Air and MacBook Pro laptops (Intel and Apple Silicon M1 / M2 generations as available), Apple Watch (SE, Series 7 / 8 / 9 and Ultra when in stock) and AirPods (2nd gen, 3rd gen, AirPods Pro and AirPods Max).",
        "Every Apple device is graded the same way: Excellent (minimal wear, 90%+ battery health on iPhones), Very Good (light cosmetic marks, clean screen, strong battery) or Good (working daily driver, visible wear, priced accordingly). Battery health is disclosed on every iPhone listing; iPad and MacBook batteries get a calibrated diagnostic and are replaced if below threshold before resale.",
        "Activation Lock (iCloud) is cleared with documentation before any iPhone, iPad, MacBook or Apple Watch goes on the floor — you will never get a 'cannot activate' or 'this Apple Watch is linked to an Apple ID' surprise after you take one home. Sign in with your own Apple ID on first boot the same way you would with a brand-new device.",
      ],
      included: [
        "Compatible Apple charging cable (Lightning, USB-C or MagSafe as appropriate)",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Factory reset and signed out of the previous owner's Apple ID — Activation Lock cleared",
        "Original Apple box, AppleCare paperwork, EarPods, Pencil or Smart Keyboard only when explicitly noted on the listing",
      ],
    },
    faqs: [
      {
        q: "Will the device be locked to the previous owner's Apple ID?",
        a: "No. Activation Lock is removed on every iPhone, iPad, MacBook and Apple Watch before it goes on sale. You sign in with your own Apple ID on first boot, the same as a brand-new device.",
      },
      {
        q: "Are unlocked iPhones really unlocked on every U.S. carrier?",
        a: "Yes. Anything we sell as 'Unlocked' has been tested with active SIMs on AT&T and T-Mobile, and Verizon-compatible models are confirmed against Verizon's IMEI check. We disclose any carrier-specific bands or eSIM-only limitations on the listing before you buy.",
      },
      {
        q: "What's the battery health like on used iPhones and MacBooks?",
        a: "iPhone listings disclose the exact battery health percentage shown in iOS Settings. MacBooks and iPads get a calibrated battery diagnostic and we disclose the result on the listing — anything below our threshold is replaced before resale.",
      },
      {
        q: "Do refurbished MacBooks come with macOS already installed?",
        a: "Yes. Every MacBook ships with a clean install of the latest macOS version Apple supports for that model, signed out of the previous owner's Apple ID. You set up your own Apple ID on first boot the same way you would on a brand-new MacBook.",
      },
      {
        q: "Are the AirPods and Apple Watch ones I can pair with my iPhone right away?",
        a: "Yes. AirPods are reset to factory pairing mode and Apple Watch is unpaired and erased before resale. Open the case (AirPods) or hold the Apple Watch near your iPhone — the standard pairing prompt appears just like with a new unit.",
      },
      {
        q: "What's covered under the 90-day warranty?",
        a: "Hardware faults that aren't accidental damage — failed batteries, dead speakers, port failures, swollen MacBook batteries, etc. Drop damage, cracked screens and liquid damage aren't covered, but you're welcome to bring it in for a repair quote.",
      },
    ],
  },
  {
    slug: "samsung",
    label: "Samsung",
    matches: ({ category, brand }) =>
      /samsung/i.test(brand ?? "") || SAMSUNG_CATEGORY_RE.test(category),
    seo: {
      metaTitle: "Used Samsung Galaxy Phones & Tablets Houston | GadgetX",
      metaDescription:
        "Shop used & refurbished Samsung Galaxy phones, tablets and Galaxy Watch at GadgetX Repairs in Houston TX. Tested, unlocked, 90-day warranty.",
    },
    heading: { prefix: "Samsung", highlight: "Inventory" },
    intro:
      "Used and refurbished Samsung Galaxy devices — flagship S and Note phones, mid-range A series, Galaxy Tab tablets and Galaxy Watch. Unlocked, tested in-shop, 90-day warranty.",
    bodyCopy: {
      paragraphs: [
        "Our Samsung inventory in Houston is mostly Galaxy phones — the Galaxy S series flagships (S21 through the current generation), the value-priced Galaxy A series (A15 / A35 / A54 and similar), and the Galaxy Note line while it was being made (Note 10 and Note 20). Galaxy Tab tablets and Galaxy Watch wearables show up regularly too.",
        "Every Samsung phone is graded into Excellent, Very Good or Good condition tiers. We test the cellular radios, Wi-Fi, Bluetooth, fingerprint sensor, cameras, speakers, microphones and USB-C port before the device hits the floor. Battery diagnostics are run with the manufacturer-equivalent test, and any battery below our threshold is replaced.",
        "Carrier locks are clearly marked. Most of what we sell is unlocked and confirmed working on AT&T, T-Mobile, Verizon, Cricket, Metro and Mint. Samsung-specific protections (Knox e-fuse status, Reactivation Lock and the Find My Mobile lock) are all cleared with documentation before sale — no surprises after you take one home.",
      ],
      included: [
        "USB-C charging cable",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Factory reset and signed out of the previous owner's Samsung Account and Google Account",
        "S Pen included on Note and Ultra models when noted; Galaxy Buds, charging brick or original box only when explicitly listed",
      ],
    },
    faqs: [
      {
        q: "Are your unlocked Samsung phones really unlocked on every U.S. carrier?",
        a: "Yes. Every 'Unlocked' Samsung is tested with active SIMs on AT&T and T-Mobile, and Verizon-compatible models pass Verizon's IMEI check before going on the floor. We disclose any band or eSIM limitations on the listing.",
      },
      {
        q: "Will the phone be locked to the previous owner's Samsung Account or Google Account?",
        a: "No. Both Samsung's Reactivation Lock / Find My Mobile and Google's FRP (Factory Reset Protection) are cleared before sale. You set up the phone with your own accounts on first boot.",
      },
      {
        q: "What does the condition grade actually mean?",
        a: "Excellent: minimal or no visible wear, strong battery. Very Good: light cosmetic marks, clean screen, strong battery. Good: working daily driver with visible wear, priced accordingly. The grade and a battery health note are disclosed on every listing.",
      },
      {
        q: "Do the cameras and S Pen still work fully?",
        a: "Yes. Every camera lens (wide, ultrawide, telephoto on flagship models) is tested before listing. On Note and Galaxy S Ultra models the S Pen is paired, calibrated and functional — pressure sensitivity and the side button included.",
      },
      {
        q: "Do you sell Galaxy Tab tablets and Galaxy Watch wearables too?",
        a: "Yes — when in stock. Galaxy Tab tablets get the same testing as our iPad inventory (screen, touch digitiser, Wi-Fi, cellular if applicable, charging, battery). Galaxy Watch is reset, unpaired and ready to pair with your phone on first boot.",
      },
      {
        q: "What's covered under the 90-day warranty?",
        a: "Hardware faults that aren't accidental damage — failed batteries, dead speakers, port failures, etc. Drop damage, cracked screens and liquid damage aren't covered, but you're welcome to bring it in for a repair quote.",
      },
    ],
  },
  {
    slug: "google",
    label: "Google",
    matches: ({ category, brand }) =>
      /\bgoogle\b/i.test(brand ?? "") || GOOGLE_CATEGORY_RE.test(category),
    seo: {
      metaTitle: "Used Google Pixel Phones Houston TX | GadgetX Repairs",
      metaDescription:
        "Shop used & refurbished Google Pixel phones at GadgetX Repairs in Houston TX. Unlocked, tested, FRP cleared, backed by our 90-day warranty.",
    },
    heading: { prefix: "Google", highlight: "Inventory" },
    intro:
      "Used and refurbished Google Pixel handsets — unlocked, FRP cleared, tested in-shop and backed by our 90-day warranty. Stock changes weekly; call to confirm or reserve.",
    bodyCopy: {
      paragraphs: [
        "Our Google Pixel inventory in Houston covers the Pixel phone line we see most often through trade-ins — typically Pixel 6 and 6a through the current generation, with the occasional Pixel 5 / 5a still in rotation. Most are unlocked and work on AT&T, T-Mobile, Verizon, Cricket, Metro and Mint Mobile.",
        "Every Pixel is graded the same way as our other phones (Excellent / Very Good / Good) and we disclose battery health and any cosmetic notes on every listing. The fingerprint sensor (under-display on Pixel 6 and later, capacitive on older models), face unlock, cameras, speakers and USB-C port are all tested before the phone hits the floor.",
        "Google's FRP (Factory Reset Protection) lock is cleared on every device before sale. You sign in with your own Google Account on first boot and the phone behaves exactly like a new Pixel — including ongoing OS and security updates from Google for the model's supported window.",
      ],
      included: [
        "USB-C charging cable",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Factory reset, FRP cleared and signed out of the previous owner's Google Account",
        "Original Pixel box, charging brick or fabric case only when explicitly noted on the listing",
      ],
    },
    faqs: [
      {
        q: "Will the Pixel be locked to the previous owner's Google Account?",
        a: "No. Google's FRP (Factory Reset Protection) is cleared on every Pixel before sale. You sign in with your own Google Account on first boot, the same as a brand-new Pixel.",
      },
      {
        q: "Are your unlocked Pixels really unlocked on every U.S. carrier?",
        a: "Yes. Every 'Unlocked' Pixel is tested with active SIMs on AT&T and T-Mobile, and Verizon-compatible models pass Verizon's IMEI check before going on the floor. eSIM is supported on Pixel 6 and later — we'll help you provision yours in-shop.",
      },
      {
        q: "Will the phone still get OS and security updates from Google?",
        a: "Yes — for the model's supported window. Google publishes a guaranteed update window per Pixel model (Pixel 8 and later get 7 years of OS + security updates). We list the phone's expected end-of-support date on the listing so you know what you're buying.",
      },
      {
        q: "What's the battery health like?",
        a: "We disclose a battery diagnostic result on every listing. Pixel doesn't expose a battery health percentage in Settings the way iPhone does, so our techs run a calibrated test and either pass the device or replace the battery before resale.",
      },
      {
        q: "Do you sell Pixel Buds or Pixel Watch?",
        a: "Sometimes. They show up through trade-ins and we list them separately when in stock. Pixel Watch is unpaired and reset before sale; Pixel Buds are reset to factory pairing mode.",
      },
      {
        q: "What's covered under the 90-day warranty?",
        a: "Hardware faults that aren't accidental damage — failed batteries, dead speakers, USB-C port failures, etc. Drop damage, cracked screens and liquid damage aren't covered, but you're welcome to bring it in for a repair quote.",
      },
    ],
  },
  {
    slug: "consoles",
    label: "Gaming Consoles",
    matches: ({ category }) => CONSOLE_CATEGORY_RE.test(category),
    seo: {
      metaTitle:
        "Used PlayStation, Xbox & Switch Houston | GadgetX Repairs",
      metaDescription:
        "Used & refurbished PS4, PS5, Xbox One, Series X|S & Nintendo Switch boxes at GadgetX Repairs in Houston TX. Tested with our 90-day warranty.",
    },
    heading: { prefix: "Gaming", highlight: "Consoles" },
    intro:
      "PlayStation, Xbox and Nintendo Switch console boxes we've cleaned, tested and warrantied in-shop. Controllers and cables included unless noted.",
    bodyCopy: {
      paragraphs: [
        "Our refurbished console stock in Houston covers Sony PlayStation 4 (slim and Pro) and PlayStation 5, Microsoft Xbox One, Series S and Series X, and Nintendo Switch in all three flavours (original, OLED and Switch Lite). Disc-drive vs. digital-edition variants are clearly labelled on each listing.",
        "Every console is opened up, deep-cleaned of dust, has its thermal paste replaced if temperatures look high, and is stress-tested for at least 30 minutes under load. We confirm the disc drive reads original retail discs, HDMI output works at the console's native resolution, controller pairing works, and the system is fully updated to the latest firmware.",
        "Switch consoles get a specific joycon-drift check on both sticks, a dock and HDMI-out test, and a battery diagnostic. PlayStation and Xbox controllers are inspected for stick drift, trigger response and bumper click before being included in the box.",
      ],
      included: [
        "1 OEM controller, paired and tested",
        "Power cable and HDMI cable (Switch dock for Switch consoles)",
        "Console fully wiped — no previous owner accounts, profiles or saved data",
        "Latest system firmware installed",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
      ],
    },
    faqs: [
      {
        q: "Do your used consoles come with a controller?",
        a: "Yes. Every console ships with one OEM controller that we've tested for stick drift, trigger response and pairing. Extra controllers can be added at the counter — we usually have a stock of tested OEM PS4, PS5, Xbox One, Xbox Series and Nintendo Switch joycons.",
      },
      {
        q: "Are the consoles wiped of the previous owner's account and saves?",
        a: "Yes. Every console is factory-reset, signed out of the previous owner's PSN / Xbox Live / Nintendo Account, and updated to the latest system firmware before it leaves the shop. You set up your own profile on first boot.",
      },
      {
        q: "Will the console play discs from any region?",
        a: "PlayStation 4, PlayStation 5 and current Xbox consoles are region-free for game discs. Nintendo Switch is also region-free. Older Xbox 360 / PS3 stock (when in inventory) can be region-locked — we note it on the listing.",
      },
      {
        q: "Has the joycon drift been checked on Switch consoles?",
        a: "Yes. Both sticks on every Switch we sell are tested for drift through the system menu and an in-game test. If a stick fails the test we replace the joycon (or repair the stick on a Switch Lite) before listing the console.",
      },
      {
        q: "What about HDD / SSD condition on PS4 and Xbox One?",
        a: "Internal drives are tested with a SMART check and a full read pass before resale. If the drive is failing or running slowly we replace it with a tested SSD and disclose the upgrade on the listing.",
      },
      {
        q: "Do you take game and accessory trade-ins?",
        a: "Yes. Bring in your old console, controllers and game discs and we'll quote a trade-in credit on the spot — even consoles that don't power on are worth something for parts.",
      },
    ],
  },
];

// Catch-all bucket for anything that doesn't match the well-known groups above.
// Intentionally kept out of the prerendered route list / sitemap — "other" has
// no stable user intent worth ranking for, and the chip is only shown when the
// inventory actually contains uncategorised items.
export const OTHER_GROUP: InventoryGroup = {
  slug: "other",
  label: "Other",
  matches: (input) => !INVENTORY_GROUPS.some((g) => g.matches(input)),
  seo: {
    metaTitle: "Other Inventory | GadgetX Repairs Houston TX",
    metaDescription:
      "Other tested, warrantied gadgets in stock at GadgetX Repairs in Houston TX.",
  },
  heading: { prefix: "Other", highlight: "Inventory" },
  intro: "Other tested gadgets currently in stock at our Houston shop.",
};

export const ALL_FILTER_SLUG = "all";

export function inventoryGroupBySlug(
  slug: string | null | undefined,
): InventoryGroup | null {
  if (!slug) return null;
  if (slug === OTHER_GROUP.slug) return OTHER_GROUP;
  return INVENTORY_GROUPS.find((g) => g.slug === slug) ?? null;
}

/**
 * Resolve which inventory group a free-form item (category + optional brand)
 * will land in.
 *
 * Mirrors the same matching the shopper-facing inventory page uses, so admin
 * staff can preview the bucket their item will appear under before saving.
 * Falls back to {@link OTHER_GROUP} when no group matches — that means the
 * item won't be reachable from the "We Sell Too" tile filters.
 */
export function inventoryGroupForCategory(
  category: string | null | undefined,
  brand?: string | null,
): InventoryGroup {
  const c = (category ?? "").trim();
  const b = (brand ?? "").trim();
  if (!c && !b) return OTHER_GROUP;
  const input: InventoryMatchInput = { category: c, brand: b || undefined };
  return INVENTORY_GROUPS.find((g) => g.matches(input)) ?? OTHER_GROUP;
}

/**
 * Resolve which inventory group a service or sales page slug should cross-link
 * to. Used by service detail pages ("Looking to buy instead?" callout) and
 * sales pages ("View Inventory" button) so they deep-link to the relevant
 * `/inventory/<group>` page instead of the generic `/inventory` index.
 *
 * Returns `null` when the slug has no clear bucket (e.g. generic
 * "battery-replacement-houston-tx" or accessory pages, or non-Apple/Samsung/
 * Google laptops like HP/Dell/Lenovo) — callers should fall back to the
 * generic inventory link in that case.
 *
 * Order matters: console keywords are checked first because "console" is
 * brand-agnostic; then brand-specific keywords (apple/samsung/google); then
 * generic Apple device keywords (ipad/macbook/iphone) so a slug like
 * `/buy-iphone-houston-tx` lands in the apple bucket without needing the
 * literal word "apple" in it.
 */
export function inventoryGroupSlugForPageSlug(
  slug: string | null | undefined,
): InventoryGroup["slug"] | null {
  const s = (slug ?? "").toLowerCase();
  if (!s) return null;
  if (/\b(ps[2-9]|xbox|console|controller|nintendo|switch|playstation)s?\b/.test(s)) {
    return "consoles";
  }
  if (/\b(samsung|galaxy)\b/.test(s)) return "samsung";
  if (/\b(google|pixel)\b/.test(s)) return "google";
  if (/\b(apple|iphone|ipad|macbook|airpod|apple-watch)s?\b/.test(s)) return "apple";
  return null;
}

/**
 * Reverse of {@link inventoryGroupSlugForPageSlug}: given an inventory group
 * slug, return the matching repair service hub (path + display label) so the
 * `/inventory/<group>` page can link back to the corresponding service hub.
 *
 * Centralising the slug pairs here means the inventory page and the service
 * page reference the same source of truth — rename a hub and only this map
 * needs to change.
 *
 * Returns `null` for groups with no matching hub (e.g. the catch-all "other"
 * bucket); callers should hide the callout in that case. The Apple bucket
 * spans phones / tablets / laptops / wearables so we point it at the broad
 * iPhone-repair hub which is the highest-volume Apple repair page — visitors
 * coming from iPad or MacBook listings will still find their device on the
 * sitewide nav.
 */
export type InventoryServiceHub = { path: string; label: string };

const SERVICE_HUB_BY_GROUP_SLUG: Record<string, InventoryServiceHub> = {
  apple: { path: "/iphone-repair-houston-tx", label: "iPhone & Apple Repair" },
  samsung: { path: "/samsung-repair-houston-tx", label: "Samsung Repair" },
  google: { path: "/google-pixel-repair-houston-tx", label: "Google Pixel Repair" },
  consoles: {
    path: "/gaming-console-repair-houston-tx",
    label: "Gaming Console Repair",
  },
};

export function inventoryServiceHubForGroupSlug(
  slug: string | null | undefined,
): InventoryServiceHub | null {
  if (!slug) return null;
  return SERVICE_HUB_BY_GROUP_SLUG[slug] ?? null;
}
