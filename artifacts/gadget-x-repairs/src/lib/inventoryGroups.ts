/**
 * Shared inventory category grouping.
 *
 * Each known group has its own canonical URL (`/inventory/<slug>`) so search
 * engines can index a clean per-category page (Google mostly ignores query
 * strings as canonical URLs). The legacy `/inventory?category=<slug>` form
 * still works — InventoryPage soft-redirects it to the canonical path.
 *
 * Inventory items are stored with free-form category strings ("Used iPhones",
 * "Refurbished iPhones", "Samsung phones", "Laptops", ...) that change over
 * time as stock is renamed or re-categorised. To keep the slug -> filter
 * mapping resilient to those renames we map slugs to a *predicate* over the
 * item's category string (case-insensitive keyword match) instead of an
 * exact-match table that would silently break the moment someone tweaks a
 * category label in the admin.
 *
 * Per-group SEO metadata (`seo`, `heading`, `intro`) lives here too so that
 * routes-config.ts (which generates the prerender route list and sitemap) and
 * InventoryPage (which renders the page) read from one source of truth — no
 * risk of the title in the sitemap drifting from the title in the rendered
 * page.
 */

export type InventoryGroup = {
  slug: string;
  label: string;
  matches: (category: string) => boolean;
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

export const INVENTORY_GROUPS: InventoryGroup[] = [
  {
    slug: "phones",
    label: "Phones",
    matches: (c) => /phone|iphone|galaxy|pixel/i.test(c),
    seo: {
      metaTitle: "Used & Refurbished Phones Houston TX | GadgetX Repairs",
      metaDescription:
        "Shop unlocked iPhones, Samsung Galaxy & Pixel phones at GadgetX Repairs in Houston TX. Tested, warrantied refurbished & used from $99.",
    },
    heading: { prefix: "Used", highlight: "Phones" },
    intro:
      "Unlocked iPhones, Samsung Galaxy and Google Pixel handsets — tested, cleaned and backed by our 90-day warranty. Stock changes daily; call to confirm or reserve.",
    bodyCopy: {
      paragraphs: [
        "Our used and refurbished phone inventory rotates weekly and is the same stock our walk-in customers in Houston buy from. We carry unlocked iPhones (typically iPhone 11 through the latest generation in stock), Samsung Galaxy S and Note flagships, and Google Pixel handsets. Carrier-locked devices are clearly marked — most of what we sell is unlocked and works on AT&T, T-Mobile, Verizon, Cricket, Metro and Mint.",
        "Every phone is graded by our techs into one of three condition tiers. Excellent means minimal to no visible wear and 90%+ battery health. Very Good has light cosmetic marks but a clean screen and strong battery. Good is a working daily driver with visible wear that we've priced accordingly. We disclose the grade on every listing and you're welcome to inspect the actual device in-shop before you pay.",
        "Before a phone hits the floor we wipe it, verify the IMEI is clean (no carrier blacklist, no iCloud / FRP lock), test the cellular radios, Wi-Fi, Bluetooth, cameras, speakers, microphones, charging port and Face ID / Touch ID, and replace the battery if health is below our threshold.",
      ],
      included: [
        "USB charging cable (Lightning or USB-C as appropriate)",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Factory reset and signed out of the previous owner's Apple / Google account",
        "Original box only when noted on the listing — most are bare-device sales",
      ],
    },
    faqs: [
      {
        q: "Are unlocked phones really unlocked on every U.S. carrier?",
        a: "Yes. Anything we sell as 'Unlocked' has been tested with active SIMs on AT&T and T-Mobile, and Verizon-compatible models are confirmed against Verizon's IMEI check. We disclose any carrier-specific bands or eSIM-only limitations on the listing before you buy.",
      },
      {
        q: "Do your used iPhones still work with iMessage and FaceTime?",
        a: "Yes. iMessage and FaceTime are tied to your Apple ID, not the previous owner's. Once you sign in with your own Apple ID after the factory reset, both work normally.",
      },
      {
        q: "What does the condition grade actually mean?",
        a: "Excellent: minimal or no visible wear, 90%+ battery health. Very Good: light cosmetic marks, clean screen, strong battery. Good: working daily driver with visible wear, priced accordingly. The grade and battery health are disclosed on every listing.",
      },
      {
        q: "Is the IMEI clean? Can it be activated?",
        a: "Every phone is checked against carrier blacklists and iCloud / Google FRP before it goes on the floor. If a phone fails the check we don't sell it. You're welcome to run your own IMEI check in-shop before paying.",
      },
      {
        q: "Do you take trade-ins toward a used phone?",
        a: "Yes. Bring your current phone in and we'll quote a trade-in credit on the spot. Devices that don't power on are still worth something for parts — bring it in either way.",
      },
      {
        q: "What's the warranty if something fails?",
        a: "All used phones come with a 90-day in-shop warranty covering hardware faults that aren't accidental damage (drops, water, cracked screens). If the device fails inside that window, bring it in and we'll repair or replace it.",
      },
    ],
  },
  {
    slug: "tablets",
    label: "Tablets",
    matches: (c) => /tablet|ipad/i.test(c),
    seo: {
      metaTitle: "Used & Refurbished Tablets Houston TX | GadgetX Repairs",
      metaDescription:
        "Refurbished iPads & Android tablets at GadgetX Repairs in Houston TX — Wi-Fi & cellular models, tested with our 90-day warranty.",
    },
    heading: { prefix: "Used", highlight: "Tablets" },
    intro:
      "iPads and Android tablets we've tested and refurbished in-shop. Wi-Fi and cellular models, all backed by our 90-day warranty. Call to confirm or reserve.",
    bodyCopy: {
      paragraphs: [
        "Our used and refurbished tablet inventory in Houston is mostly Apple iPads — typically iPad (9th and 10th gen), iPad Air and iPad Pro models — alongside a rotating selection of Samsung Galaxy Tab and Amazon Fire tablets. Both Wi-Fi-only and Wi-Fi + Cellular configurations show up; cellular models are unlocked unless the listing says otherwise.",
        "Every tablet is graded the same way as our phones: Excellent, Very Good or Good. Battery health is checked, the screen is inspected for dead pixels and pressure marks, the touch digitiser is tested edge-to-edge, and Wi-Fi, Bluetooth, cameras, speakers and the charging port are confirmed working before the device hits the floor.",
        "Tablets that have been Activation-Locked (iCloud) or stuck on a previous owner's Google account are not put on sale until the lock is properly cleared with documentation — you will never get a 'cannot activate' surprise after you take one home.",
      ],
      included: [
        "Charging cable (USB-C or Lightning as appropriate)",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Factory reset and signed out of the previous owner's Apple ID / Google account",
        "Apple Pencil, keyboard or case only when explicitly noted on the listing",
      ],
    },
    faqs: [
      {
        q: "Can I activate a cellular iPad on my carrier?",
        a: "Yes. Our cellular iPads are sold unlocked unless the listing says otherwise. Bring an active nano-SIM or eSIM-capable line and we can usually get it on cellular data in-shop before you leave.",
      },
      {
        q: "Will the iPad be locked to the previous owner's Apple ID?",
        a: "No. Activation Lock is removed before any iPad goes on sale. You sign in with your own Apple ID on first boot, the same as a new device.",
      },
      {
        q: "How is the battery on a used iPad?",
        a: "iPads don't expose a built-in battery health percentage like iPhones do, so our techs run a calibrated battery diagnostic and disclose the result on the listing. We replace batteries that don't meet our threshold before resale.",
      },
      {
        q: "Do refurbished iPads support the latest iPadOS?",
        a: "Most do, but it depends on the model. Check Apple's iPadOS compatibility list — for example, an iPad Air 2 will not run the current iPadOS. We list the model and generation on every listing so you can confirm before buying.",
      },
      {
        q: "Do you sell Apple Pencils or keyboards with the tablets?",
        a: "Sometimes. We list the Pencil or keyboard separately when it's included. Most tablet sales are bare-device. We carry compatible third-party styluses and cases in the shop if you want to add one.",
      },
      {
        q: "Is the warranty the same as on phones?",
        a: "Yes — 90 days, in-shop, hardware faults that aren't accidental damage. Cracked screens, drop damage and liquid damage aren't covered, but we can quote you a repair if it happens.",
      },
    ],
  },
  {
    slug: "laptops",
    label: "Laptops",
    matches: (c) => /laptop|macbook|chromebook|notebook/i.test(c),
    seo: {
      metaTitle: "Refurbished MacBooks & Laptops Houston | GadgetX Repairs",
      metaDescription:
        "Refurbished MacBooks & Windows laptops at GadgetX Repairs in Houston TX — HP, Dell, Lenovo, ASUS, Acer & Chromebooks. 90-day warranty.",
    },
    heading: { prefix: "Refurbished", highlight: "Laptops" },
    intro:
      "MacBooks, Windows laptops and Chromebooks we've cleaned, tested and warrantied in-shop. Stock changes daily; call to confirm or reserve.",
    bodyCopy: {
      paragraphs: [
        "Our refurbished laptop inventory in Houston spans Apple MacBook Air and MacBook Pro (both Intel and Apple Silicon M1 / M2 generations when available), Windows laptops from HP, Dell, Lenovo, ASUS and Acer, and a steady rotation of Chromebooks for shoppers who just need a browser-and-email machine.",
        "Every laptop is opened up on the bench: we run a memory test, a SMART check on the SSD, confirm the battery design capacity vs. current full-charge capacity (and disclose it on the listing), test all USB / HDMI / SD ports, the camera, microphone, speakers, Wi-Fi, Bluetooth and the keyboard key by key. Hinges, screen lid alignment and any dead pixels are noted.",
        "Spec tiers and condition tiers are listed clearly. We don't relabel a 4 GB / 128 GB Chromebook as a 'productivity laptop' — what's on the listing is what the device actually is, and we'll happily walk you through whether it fits your use case in the shop before you pay.",
      ],
      included: [
        "Compatible charger / power adapter for the model",
        "90-day in-shop warranty on hardware faults that aren't accidental damage",
        "Freshly installed OS — current macOS for MacBooks, Windows 11 (when supported) for Windows laptops, ChromeOS reset for Chromebooks",
        "Laptop sleeve, mouse or external accessories only when noted on the listing",
      ],
    },
    faqs: [
      {
        q: "Do refurbished MacBooks come with macOS already installed?",
        a: "Yes. Every MacBook ships with a clean install of the latest macOS version Apple supports for that model, signed out of the previous owner's Apple ID. You set up your own Apple ID on first boot the same way you would on a brand-new MacBook.",
      },
      {
        q: "Will Windows 11 run on the laptop?",
        a: "Where the hardware meets Microsoft's Windows 11 requirements (TPM 2.0, supported CPU, 4 GB RAM, 64 GB storage), we install Windows 11. Older models that only support Windows 10 ship with Windows 10 and we say so on the listing.",
      },
      {
        q: "What's the battery health like on used laptops?",
        a: "We measure the battery's current full-charge capacity against its design capacity and disclose the percentage (or 'replaced — new third-party cell') on every listing. If a battery is below our threshold and we can source a replacement, we replace it before resale.",
      },
      {
        q: "Can I upgrade the RAM or SSD after I buy?",
        a: "On many Windows laptops, yes — and we offer the upgrade in-shop. On most modern MacBooks (and any Apple Silicon model) RAM and storage are soldered to the logic board and cannot be upgraded. We'll tell you up front whether the model you're looking at is upgradeable.",
      },
      {
        q: "Will I be locked out by the previous owner's password or Activation Lock?",
        a: "No. Every laptop is wiped, reinstalled and signed out of the previous owner's account before sale. MacBooks have Activation Lock cleared, Windows laptops have a fresh local install, and Chromebooks are deprovisioned from any prior management.",
      },
      {
        q: "What's covered under the 90-day warranty?",
        a: "Hardware faults that aren't accidental damage — failed SSDs, dead keyboards, port failures, swollen batteries, etc. Drop damage, cracked screens and liquid damage aren't covered, but you're welcome to bring it in for a repair quote.",
      },
    ],
  },
  {
    slug: "consoles",
    label: "Consoles",
    matches: (c) =>
      /console|playstation|\bps[2-9]\b|xbox|nintendo|\bswitch\b/i.test(c),
    seo: {
      metaTitle:
        "PlayStation, Xbox & Switch Houston | GadgetX Repairs",
      metaDescription:
        "Used & refurbished PS4, PS5, Xbox One, Series X|S & Nintendo Switch at GadgetX Repairs in Houston TX. Tested with our 90-day warranty.",
    },
    heading: { prefix: "Refurbished", highlight: "Consoles" },
    intro:
      "PlayStation, Xbox and Nintendo Switch consoles we've cleaned, tested and warrantied in-shop. Controllers and cables included unless noted.",
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
  matches: (c) => !INVENTORY_GROUPS.some((g) => g.matches(c)),
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
 * Resolve which inventory group a free-form category string will land in.
 *
 * Mirrors the same keyword-based matching the shopper-facing inventory page
 * uses, so admin staff can preview the bucket their item will appear under
 * before saving. Falls back to {@link OTHER_GROUP} when no group matches —
 * that means the item won't be reachable from the "We Sell Too" tile filters.
 */
export function inventoryGroupForCategory(
  category: string | null | undefined,
): InventoryGroup {
  const c = (category ?? "").trim();
  if (!c) return OTHER_GROUP;
  return INVENTORY_GROUPS.find((g) => g.matches(c)) ?? OTHER_GROUP;
}

/**
 * Resolve which inventory group a service or sales page slug should cross-link
 * to. Used by service detail pages ("Looking to buy instead?" callout) and
 * sales pages ("View Inventory" button) so they deep-link to the relevant
 * `/inventory/<group>` page instead of the generic `/inventory` index.
 *
 * Returns `null` when the slug has no clear device class (e.g. generic
 * "battery-replacement-houston-tx" or accessory pages) — callers should fall
 * back to the generic inventory link in that case.
 *
 * Order matters: tablet/laptop/console keywords are checked before "phone"
 * because some slugs (e.g. "phone-accessories-houston-tx") would otherwise
 * incorrectly resolve to the phones group.
 */
export function inventoryGroupSlugForPageSlug(
  slug: string | null | undefined,
): InventoryGroup["slug"] | null {
  const s = (slug ?? "").toLowerCase();
  if (!s) return null;
  if (/\b(ipad|tablet)s?\b/.test(s)) return "tablets";
  if (/\b(macbook|laptop|chromebook|notebook)s?\b/.test(s)) return "laptops";
  if (/\b(ps[2-9]|xbox|console|controller|nintendo|switch|playstation)s?\b/.test(s)) {
    return "consoles";
  }
  if (/\b(iphone|samsung|pixel|motorola|revvl|phone)s?\b/.test(s)) return "phones";
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
 * bucket); callers should hide the callout in that case.
 */
export type InventoryServiceHub = { path: string; label: string };

const SERVICE_HUB_BY_GROUP_SLUG: Record<string, InventoryServiceHub> = {
  phones: { path: "/phone-repair-houston-tx", label: "Phone Repair" },
  tablets: { path: "/tablet-repair-houston-tx", label: "Tablet Repair" },
  laptops: { path: "/laptop-repair-houston-tx", label: "Laptop Repair" },
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
