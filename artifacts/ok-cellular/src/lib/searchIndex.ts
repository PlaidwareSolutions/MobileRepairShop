export type ResultCategory =
  | "Repair"
  | "Buy"
  | "Sell"
  | "Accessories"
  | "Prepaid"
  | "Inventory"
  | "Guides"
  | "Other";

export type SearchEntry = { keywords: string[]; to: string; label: string };

export const SEARCH_INDEX: SearchEntry[] = [
  // iPhone — per model
  { keywords: ["iphone 16 pro max"], to: "/iphone-16-pro-max-repair-humble-tx", label: "iPhone 16 Pro Max Repair" },
  { keywords: ["iphone 16 pro"], to: "/iphone-16-pro-repair-humble-tx", label: "iPhone 16 Pro Repair" },
  { keywords: ["iphone 16"], to: "/iphone-16-repair-humble-tx", label: "iPhone 16 Repair" },
  { keywords: ["iphone 15 pro"], to: "/iphone-15-pro-repair-humble-tx", label: "iPhone 15 Pro Repair" },
  { keywords: ["iphone 15"], to: "/iphone-15-repair-humble-tx", label: "iPhone 15 Repair" },
  { keywords: ["iphone 14"], to: "/iphone-14-repair-humble-tx", label: "iPhone 14 Repair" },
  { keywords: ["iphone 13"], to: "/iphone-13-repair-humble-tx", label: "iPhone 13 Repair" },
  { keywords: ["iphone 12"], to: "/iphone-12-repair-humble-tx", label: "iPhone 12 Repair" },
  { keywords: ["iphone 11"], to: "/iphone-11-repair-humble-tx", label: "iPhone 11 Repair" },
  { keywords: ["iphone xr", "iphone xs", "iphone x"], to: "/iphone-x-repair-humble-tx", label: "iPhone X / XS / XR Repair" },
  { keywords: ["iphone se"], to: "/iphone-se-repair-humble-tx", label: "iPhone SE Repair" },
  { keywords: ["iphone 8", "iphone 6"], to: "/iphone-8-repair-humble-tx", label: "iPhone 8 / 6 Repair" },
  { keywords: ["iphone 7", "iphone 7 repair"], to: "/iphone-7-repair-humble-tx", label: "iPhone 7 Repair" },
  // iPhone — repair types
  { keywords: ["iphone screen", "iphone glass", "cracked iphone", "iphone display"], to: "/iphone-screen-repair-humble-tx", label: "iPhone Screen Repair" },
  { keywords: ["iphone battery", "iphone replacement battery"], to: "/iphone-battery-replacement-humble-tx", label: "iPhone Battery Replacement" },
  { keywords: ["iphone charging", "iphone charge port", "iphone won't charge"], to: "/iphone-charging-port-repair-humble-tx", label: "iPhone Charging Port" },
  { keywords: ["iphone back glass", "back glass"], to: "/iphone-back-glass-repair-humble-tx", label: "iPhone Back Glass" },
  { keywords: ["iphone water", "water damage"], to: "/iphone-water-damage-repair-humble-tx", label: "iPhone Water Damage" },
  { keywords: ["iphone camera"], to: "/iphone-repair-humble-tx", label: "iPhone Camera Repair" },
  { keywords: ["iphone"], to: "/iphone-repair-humble-tx", label: "iPhone Repair" },
  // Samsung — per model
  { keywords: ["galaxy s24", "samsung s24"], to: "/samsung-galaxy-s24-repair-humble-tx", label: "Galaxy S24 Repair" },
  { keywords: ["galaxy s23", "samsung s23"], to: "/samsung-galaxy-s23-repair-humble-tx", label: "Galaxy S23 Repair" },
  { keywords: ["galaxy s22", "samsung s22"], to: "/samsung-galaxy-s22-repair-humble-tx", label: "Galaxy S22 Repair" },
  { keywords: ["galaxy s21", "samsung s21"], to: "/samsung-galaxy-s21-repair-humble-tx", label: "Galaxy S21 Repair" },
  { keywords: ["galaxy a54", "a54"], to: "/samsung-galaxy-a54-repair-humble-tx", label: "Galaxy A54 Repair" },
  { keywords: ["galaxy a35", "a35"], to: "/samsung-galaxy-a35-repair-humble-tx", label: "Galaxy A35 Repair" },
  { keywords: ["galaxy a15", "a15"], to: "/samsung-galaxy-a15-repair-humble-tx", label: "Galaxy A15 Repair" },
  { keywords: ["galaxy note 20", "note 20"], to: "/samsung-galaxy-note-20-repair-humble-tx", label: "Galaxy Note 20 Repair" },
  { keywords: ["galaxy note 10", "note 10"], to: "/samsung-galaxy-note-10-repair-humble-tx", label: "Galaxy Note 10 Repair" },
  // Samsung — repair types
  { keywords: ["samsung screen", "galaxy screen"], to: "/samsung-screen-repair-humble-tx", label: "Samsung Screen Repair" },
  { keywords: ["samsung battery", "galaxy battery"], to: "/samsung-battery-replacement-humble-tx", label: "Samsung Battery Replacement" },
  { keywords: ["galaxy", "samsung"], to: "/samsung-repair-humble-tx", label: "Samsung Repair" },
  // Google Pixel
  { keywords: ["pixel 9"], to: "/google-pixel-repair-humble-tx", label: "Pixel 9 Repair" },
  { keywords: ["pixel 8"], to: "/google-pixel-repair-humble-tx", label: "Pixel 8 Repair" },
  { keywords: ["pixel 7"], to: "/google-pixel-repair-humble-tx", label: "Pixel 7 Repair" },
  { keywords: ["pixel", "google pixel"], to: "/google-pixel-repair-humble-tx", label: "Google Pixel Repair" },
  // Other brands
  { keywords: ["motorola", "moto"], to: "/motorola-repair-humble-tx", label: "Motorola Repair" },
  { keywords: ["revvl", "t-mobile revvl"], to: "/revvl-repair-humble-tx", label: "T-Mobile Revvl Repair" },
  // Tablets
  { keywords: ["ipad pro"], to: "/ipad-pro-repair-humble-tx", label: "iPad Pro Repair" },
  { keywords: ["ipad air"], to: "/ipad-air-repair-humble-tx", label: "iPad Air Repair" },
  { keywords: ["ipad repair"], to: "/ipad-repair-humble-tx", label: "iPad Repair" },
  { keywords: ["samsung tablet"], to: "/samsung-tablet-repair-humble-tx", label: "Samsung Tablet Repair" },
  { keywords: ["tablet screen"], to: "/tablet-screen-repair-humble-tx", label: "Tablet Screen Repair" },
  { keywords: ["ipad", "tablet"], to: "/tablet-repair-humble-tx", label: "iPad / Tablet Repair" },
  // Laptops
  { keywords: ["macbook"], to: "/macbook-repair-humble-tx", label: "MacBook Repair" },
  { keywords: ["laptop battery"], to: "/laptop-battery-replacement-humble-tx", label: "Laptop Battery Replacement" },
  { keywords: ["laptop screen"], to: "/laptop-screen-repair-humble-tx", label: "Laptop Screen Repair" },
  { keywords: ["hp laptop repair", "hp laptop"], to: "/hp-laptop-repair-humble-tx", label: "HP Laptop Repair" },
  { keywords: ["dell laptop repair", "dell laptop"], to: "/dell-laptop-repair-humble-tx", label: "Dell Laptop Repair" },
  { keywords: ["lenovo laptop repair", "lenovo laptop"], to: "/lenovo-laptop-repair-humble-tx", label: "Lenovo Laptop Repair" },
  { keywords: ["laptop motherboard", "laptop logic board"], to: "/laptop-motherboard-repair-humble-tx", label: "Laptop Motherboard Repair" },
  { keywords: ["laptop keyboard", "keyboard repair"], to: "/laptop-keyboard-repair-humble-tx", label: "Laptop Keyboard Repair" },
  { keywords: ["computer repair", "pc repair", "desktop repair"], to: "/computer-repair-humble-tx", label: "Computer Repair" },
  { keywords: ["laptop accessories", "laptop accessory"], to: "/laptop-accessories-humble-tx", label: "Laptop Accessories" },
  { keywords: ["laptop", "computer"], to: "/laptop-repair-humble-tx", label: "Laptop Repair" },
  // Gaming consoles
  { keywords: ["ps5 hdmi", "playstation hdmi"], to: "/ps5-hdmi-repair-humble-tx", label: "PS5 HDMI Repair" },
  { keywords: ["ps5", "playstation 5", "playstation"], to: "/ps5-repair-humble-tx", label: "PS5 Repair" },
  { keywords: ["xbox"], to: "/xbox-repair-humble-tx", label: "Xbox Repair" },
  { keywords: ["hdmi port", "hdmi"], to: "/hdmi-port-repair-humble-tx", label: "HDMI Port Repair" },
  { keywords: ["controller repair", "controller", "game controller"], to: "/controller-repair-humble-tx", label: "Controller Repair" },
  { keywords: ["motherboard repair", "motherboard"], to: "/motherboard-repair-humble-tx", label: "Motherboard Repair" },
  { keywords: ["gaming console", "console"], to: "/gaming-console-repair-humble-tx", label: "Gaming Console Repair" },
  // Other repairs
  { keywords: ["battery replacement", "battery"], to: "/battery-replacement-humble-tx", label: "Battery Replacement" },
  { keywords: ["tablet battery", "tablet won't charge"], to: "/tablet-battery-replacement-humble-tx", label: "Tablet Battery Replacement" },
  { keywords: ["tablet charging", "tablet charge port"], to: "/tablet-charging-port-repair-humble-tx", label: "Tablet Charging Port" },
  { keywords: ["unlock", "phone unlock"], to: "/phone-unlocking-humble-tx", label: "Phone Unlocking" },
  { keywords: ["google lock", "frp", "google account"], to: "/google-lock-removal-humble-tx", label: "Google Lock Removal" },
  // Shop / Buy pages
  { keywords: ["buy iphone"], to: "/buy-iphone-humble-tx", label: "Buy iPhone" },
  { keywords: ["buy samsung", "buy galaxy"], to: "/buy-samsung-phones-humble-tx", label: "Buy Samsung Galaxy" },
  { keywords: ["buy galaxy s22"], to: "/buy-samsung-galaxy-s22-humble-tx", label: "Buy Galaxy S22" },
  { keywords: ["buy galaxy s21"], to: "/buy-samsung-galaxy-s21-humble-tx", label: "Buy Galaxy S21" },
  { keywords: ["buy galaxy a54"], to: "/buy-samsung-galaxy-a54-humble-tx", label: "Buy Galaxy A54" },
  { keywords: ["buy galaxy a35"], to: "/buy-samsung-galaxy-a35-humble-tx", label: "Buy Galaxy A35" },
  { keywords: ["buy galaxy a15"], to: "/buy-samsung-galaxy-a15-humble-tx", label: "Buy Galaxy A15" },
  { keywords: ["buy galaxy note 20", "buy note 20"], to: "/buy-samsung-galaxy-note-20-humble-tx", label: "Buy Galaxy Note 20" },
  { keywords: ["buy galaxy note 10", "buy note 10"], to: "/buy-samsung-galaxy-note-10-humble-tx", label: "Buy Galaxy Note 10" },
  { keywords: ["buy pixel", "buy google"], to: "/buy-google-pixel-phones-humble-tx", label: "Buy Google Pixel" },
  { keywords: ["buy motorola"], to: "/buy-motorola-phones-humble-tx", label: "Buy Motorola" },
  { keywords: ["buy revvl"], to: "/buy-revvl-phones-humble-tx", label: "Buy Revvl" },
  { keywords: ["buy macbook"], to: "/buy-macbook-humble-tx", label: "Buy MacBook" },
  { keywords: ["buy hp laptop"], to: "/buy-hp-laptops-humble-tx", label: "Buy HP Laptop" },
  { keywords: ["buy dell"], to: "/buy-dell-laptops-humble-tx", label: "Buy Dell Laptop" },
  { keywords: ["buy lenovo"], to: "/buy-lenovo-laptops-humble-tx", label: "Buy Lenovo Laptop" },
  { keywords: ["phones for sale", "buy phones"], to: "/phones-for-sale-humble-tx", label: "Phones for Sale" },
  { keywords: ["used phones", "used phone"], to: "/used-phones-humble-tx", label: "Used Phones" },
  { keywords: ["refurbished phones", "refurbished phone"], to: "/refurbished-phones-humble-tx", label: "Refurbished Phones" },
  { keywords: ["new phones", "new phone"], to: "/new-phones-humble-tx", label: "New Phones" },
  { keywords: ["laptops for sale"], to: "/laptops-for-sale-humble-tx", label: "Laptops for Sale" },
  // Sell
  { keywords: ["sell iphone"], to: "/sell-iphone-humble-tx", label: "Sell iPhone" },
  { keywords: ["sell samsung"], to: "/sell-samsung-phone-humble-tx", label: "Sell Samsung" },
  { keywords: ["sell phone", "sell my phone", "sell"], to: "/sell-phone-humble-tx", label: "Sell Your Phone" },
  // Accessories — keep specific route as primary target for each keyword cluster
  { keywords: ["otterbox", "otterbox case"], to: "/otterbox-cases-humble-tx", label: "OtterBox Cases" },
  { keywords: ["iphone case", "phone case", "case"], to: "/iphone-cases-humble-tx", label: "iPhone Cases" },
  { keywords: ["phone cases"], to: "/phone-cases-humble-tx", label: "Phone Cases" },
  { keywords: ["iphone screen protector"], to: "/iphone-screen-protectors-humble-tx", label: "iPhone Screen Protectors" },
  { keywords: ["screen protector", "screen protectors"], to: "/screen-protectors-humble-tx", label: "Screen Protectors" },
  { keywords: ["iphone charger", "lightning charger"], to: "/iphone-chargers-humble-tx", label: "iPhone Chargers" },
  { keywords: ["phone charger", "charger"], to: "/phone-chargers-humble-tx", label: "Phone Chargers" },
  { keywords: ["phone cable", "phone cables"], to: "/phone-cables-humble-tx", label: "Phone Cables" },
  { keywords: ["charging cable", "usb cable", "lightning cable"], to: "/charging-cables-humble-tx", label: "Charging Cables" },
  { keywords: ["wall adapter", "wall charger", "plug adapter"], to: "/wall-adapters-humble-tx", label: "Wall Adapters" },
  { keywords: ["wireless charger"], to: "/wireless-chargers-humble-tx", label: "Wireless Chargers" },
  { keywords: ["hdmi cable", "hdmi cables"], to: "/hdmi-cables-humble-tx", label: "HDMI Cables" },
  { keywords: ["power bank", "portable charger"], to: "/power-banks-humble-tx", label: "Power Banks" },
  { keywords: ["car charger", "car adapter"], to: "/car-chargers-humble-tx", label: "Car Chargers" },
  { keywords: ["car holder", "car mount", "car phone holder"], to: "/car-phone-holders-humble-tx", label: "Car Phone Holders" },
  { keywords: ["airpods"], to: "/airpods-humble-tx", label: "AirPods" },
  { keywords: ["wireless earbuds"], to: "/wireless-earbuds-humble-tx", label: "Wireless Earbuds" },
  { keywords: ["earbuds"], to: "/earbuds-humble-tx", label: "Earbuds" },
  { keywords: ["wired headphones"], to: "/wired-headphones-humble-tx", label: "Wired Headphones" },
  { keywords: ["headphones"], to: "/headphones-humble-tx", label: "Headphones" },
  { keywords: ["bluetooth speaker"], to: "/bluetooth-speakers-humble-tx", label: "Bluetooth Speakers" },
  { keywords: ["apple watch"], to: "/apple-watch-humble-tx", label: "Apple Watch" },
  { keywords: ["watch band"], to: "/watch-bands-humble-tx", label: "Watch Bands" },
  { keywords: ["smart watch band", "smartwatch band"], to: "/smart-watch-bands-humble-tx", label: "Smart Watch Bands" },
  { keywords: ["camera lens"], to: "/camera-lenses-humble-tx", label: "Camera Lenses" },
  { keywords: ["ipad accessory", "ipad accessories"], to: "/ipad-accessories-humble-tx", label: "iPad Accessories" },
  { keywords: ["apple accessory", "apple accessories"], to: "/apple-accessories-humble-tx", label: "Apple Accessories" },
  { keywords: ["samsung accessory", "samsung accessories"], to: "/samsung-accessories-humble-tx", label: "Samsung Accessories" },
  { keywords: ["ncc", "ncc accessories"], to: "/ncc-accessories-humble-tx", label: "NCC Accessories" },
  { keywords: ["esoulk"], to: "/esoulk-accessories-humble-tx", label: "Esoulk Accessories" },
  { keywords: ["third party accessories", "third-party accessories"], to: "/third-party-accessories-humble-tx", label: "Third-Party Accessories" },
  { keywords: ["accessories"], to: "/phone-accessories-humble-tx", label: "Phone Accessories" },
  // Prepaid & billing
  { keywords: ["boost mobile", "boost"], to: "/boost-mobile-activation-humble-tx", label: "Boost Mobile Activation" },
  { keywords: ["at&t prepaid", "att prepaid", "att activation"], to: "/att-activation-humble-tx", label: "AT&T Prepaid Activation" },
  { keywords: ["gen mobile"], to: "/gen-mobile-activation-humble-tx", label: "Gen Mobile Activation" },
  { keywords: ["simple mobile"], to: "/simple-mobile-activation-humble-tx", label: "Simple Mobile Activation" },
  { keywords: ["xfinity mobile"], to: "/xfinity-mobile-activation-humble-tx", label: "Xfinity Mobile Activation" },
  { keywords: ["h2o wireless", "h2o"], to: "/h2o-wireless-activation-humble-tx", label: "H2O Wireless Activation" },
  { keywords: ["lyca mobile", "lyca"], to: "/lyca-mobile-activation-humble-tx", label: "Lyca Mobile Activation" },
  { keywords: ["verizon prepaid"], to: "/verizon-prepaid-activation-humble-tx", label: "Verizon Prepaid Activation" },
  { keywords: ["activation", "prepaid", "cricket", "metro", "t-mobile"], to: "/phone-activation-humble-tx", label: "Prepaid Activation" },
  { keywords: ["bill payment", "bill pay", "bill"], to: "/bill-payments-humble-tx", label: "Bill Payments" },
  // Core / hub pages
  { keywords: ["phone repair", "cell phone repair", "phone fix"], to: "/phone-repair-humble-tx", label: "Phone Repair Humble" },
  { keywords: ["phone cases", "all cases"], to: "/phone-cases-humble-tx", label: "Phone Cases" },
  { keywords: ["mail in", "mail-in", "ship repair", "ship my phone"], to: "/mail-in-repair-humble-tx", label: "Mail-In Repair" },
  { keywords: ["financing", "finance", "$10 down", "no credit", "lease to own"], to: "/financing-humble-tx", label: "Phone Financing" },
  { keywords: ["inventory", "in stock", "what's in stock"], to: "/inventory", label: "Browse Inventory" },
  { keywords: ["about", "about us"], to: "/about", label: "About OK Cellular" },
  { keywords: ["contact", "address", "directions", "location", "hours"], to: "/contact-humble-tx", label: "Contact & Directions" },
  { keywords: ["reviews", "testimonials", "rating"], to: "/reviews-humble-tx", label: "Customer Reviews" },
  { keywords: ["repair services", "all repairs"], to: "/repair-services-humble-tx", label: "All Repair Services" },
  { keywords: ["shop", "store"], to: "/shop-humble-tx", label: "Shop Index" },
  // Inventory category pages
  { keywords: ["apple inventory", "iphone inventory", "ipad inventory", "macbook inventory", "airpods inventory", "apple devices"], to: "/inventory/apple", label: "Apple Inventory" },
  { keywords: ["samsung inventory", "galaxy inventory", "samsung phones inventory"], to: "/inventory/samsung", label: "Samsung Inventory" },
  { keywords: ["google inventory", "pixel inventory", "google phones inventory"], to: "/inventory/google", label: "Google Inventory" },
  { keywords: ["console inventory", "ps5 inventory", "xbox inventory", "gaming inventory", "game console inventory"], to: "/inventory/consoles", label: "Gaming Consoles Inventory" },
  // Area pages
  { keywords: ["sugar land", "sugarland"], to: "/phone-repair-sugar-land-tx", label: "Phone Repair — Sugar Land" },
  { keywords: ["missouri city"], to: "/phone-repair-missouri-city-tx", label: "Phone Repair — Missouri City" },
  { keywords: ["stafford"], to: "/phone-repair-stafford-tx", label: "Phone Repair — Stafford" },
  { keywords: ["katy"], to: "/phone-repair-katy-tx", label: "Phone Repair — Katy" },
  { keywords: ["alief"], to: "/phone-repair-alief-tx", label: "Phone Repair — Alief" },
  { keywords: ["sharpstown"], to: "/phone-repair-sharpstown-tx", label: "Phone Repair — Sharpstown" },
  // Articles / guides
  { keywords: ["iphone screen cost", "iphone screen price", "how much iphone screen", "iphone screen repair cost"], to: "/articles/iphone-screen-repair-cost-humble-tx", label: "Guide: iPhone Screen Repair Cost" },
  { keywords: ["ps5 hdmi worth it", "ps5 hdmi repair cost", "ps5 hdmi port"], to: "/articles/ps5-hdmi-port-repair-worth-it-humble-tx", label: "Guide: PS5 HDMI Repair — Worth It?" },
  { keywords: ["repair or replace laptop", "laptop repair or buy new"], to: "/articles/repair-or-replace-laptop-humble-tx", label: "Guide: Repair or Replace Your Laptop?" },
  { keywords: ["battery needs replacement", "phone battery low", "battery draining fast", "battery health"], to: "/articles/phone-battery-needs-replacement-humble-tx", label: "Guide: Does Your Phone Battery Need Replacing?" },
  { keywords: ["used vs refurbished", "refurbished vs used phone"], to: "/articles/used-vs-refurbished-phones-humble-tx", label: "Guide: Used vs Refurbished Phones" },
  { keywords: ["locked phone unlocked", "can locked phone be unlocked", "unlock carrier"], to: "/articles/can-locked-phone-be-unlocked-humble-tx", label: "Guide: Can a Locked Phone Be Unlocked?" },
  { keywords: ["best prepaid plans", "cheapest prepaid", "prepaid plan humble"], to: "/articles/best-prepaid-plans-humble-tx", label: "Guide: Best Prepaid Plans in Humble" },
  { keywords: ["check used iphone", "buying used iphone", "used iphone checklist"], to: "/articles/check-before-buying-used-iphone-humble-tx", label: "Guide: What to Check Before Buying a Used iPhone" },
  { keywords: ["laptop not charging", "laptop won't charge", "laptop charging problem"], to: "/articles/laptop-not-charging-humble-tx", label: "Guide: Laptop Not Charging — Fixes" },
  { keywords: ["xbox hdmi", "xbox no display", "xbox hdmi problems"], to: "/articles/xbox-hdmi-port-problems-humble-tx", label: "Guide: Xbox HDMI Port Problems" },
];

export function categoryForEntry(entry: SearchEntry): ResultCategory {
  const { to } = entry;
  if (to.startsWith("/sell-")) return "Sell";
  if (
    to.startsWith("/buy-") ||
    to.includes("phones-for-sale") ||
    to.includes("laptops-for-sale") ||
    to.includes("used-phones") ||
    to.includes("refurbished-phones") ||
    to.includes("new-phones")
  ) return "Buy";
  if (to.startsWith("/inventory")) return "Inventory";
  if (to.includes("-activation") || to.includes("bill-payments")) return "Prepaid";
  if (to.startsWith("/articles/")) return "Guides";
  const accessorySlugFragments = [
    "cases", "protector", "charger", "cable", "earbuds",
    "headphones", "speaker", "airpods", "watch-band", "power-bank",
    "car-charger", "car-phone-holder", "wall-adapter", "accessori",
    "otterbox", "camera-lens",
  ];
  if (accessorySlugFragments.some((f) => to.includes(f))) return "Accessories";
  if (
    to.includes("repair") ||
    to.includes("replacement") ||
    to.includes("removal") ||
    to.includes("unlocking") ||
    to.includes("damage")
  ) return "Repair";
  return "Other";
}

export function findSearchMatch(raw: string): SearchEntry | null {
  const q = raw.trim().toLowerCase();
  if (!q) return null;
  for (const entry of SEARCH_INDEX) {
    if (entry.keywords.some((kw) => q.includes(kw) || kw.includes(q))) return entry;
  }
  return null;
}

export function findAllSearchMatches(raw: string): SearchEntry[] {
  const q = raw.trim().toLowerCase();
  if (q.length < 2) return [];
  const seen = new Set<string>();
  const exact: SearchEntry[] = [];
  const startsWith: SearchEntry[] = [];
  const contains: SearchEntry[] = [];
  for (const entry of SEARCH_INDEX) {
    if (seen.has(entry.to)) continue;
    const labelL = entry.label.toLowerCase();
    const hit =
      labelL === q || entry.keywords.some((kw) => kw === q)
        ? "exact"
        : labelL.startsWith(q) || entry.keywords.some((kw) => kw.startsWith(q))
        ? "startsWith"
        : labelL.includes(q) || entry.keywords.some((kw) => kw.includes(q) || q.includes(kw))
        ? "contains"
        : null;
    if (!hit) continue;
    seen.add(entry.to);
    if (hit === "exact") exact.push(entry);
    else if (hit === "startsWith") startsWith.push(entry);
    else contains.push(entry);
  }
  return [...exact, ...startsWith, ...contains];
}

export function buildSuggestions(value: string): SearchEntry[] {
  const q = value.trim().toLowerCase();
  if (q.length < 2) return [];
  const seen = new Set<string>();
  const exact: SearchEntry[] = [];
  const startsWith: SearchEntry[] = [];
  const contains: SearchEntry[] = [];
  for (const entry of SEARCH_INDEX) {
    if (seen.has(entry.to)) continue;
    const labelL = entry.label.toLowerCase();
    if (labelL === q || entry.keywords.some((kw) => kw === q)) {
      seen.add(entry.to);
      exact.push(entry);
    } else if (labelL.startsWith(q) || entry.keywords.some((kw) => kw.startsWith(q))) {
      seen.add(entry.to);
      startsWith.push(entry);
    } else if (labelL.includes(q) || entry.keywords.some((kw) => kw.includes(q) || q.includes(kw))) {
      seen.add(entry.to);
      contains.push(entry);
    }
  }
  return [...exact, ...startsWith, ...contains].slice(0, 8);
}
