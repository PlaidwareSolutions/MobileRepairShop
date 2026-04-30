export const BUSINESS = {
  name: "Gadget X Repairs",
  tagline:
    "Cellphone, iPhone, iPad, MacBook, Laptop, Gaming Console & Accessories — We Sell and Repair",
  phoneDisplay: "+1 (346) 623-6898",
  phoneTel: "tel:+13466236898",
  whatsapp: "https://wa.me/13466236898",
  sms: "sms:+13466236898",
  addressLine1: "8389 Almeda Rd, Suite J-2",
  addressLine2: "Houston, TX 77054",
  addressFull: "8389 Almeda Rd, Suite J-2, Houston, TX 77054",
  mapsLink: "https://maps.app.goo.gl/ALRF73zPbrG9qndz8",
  mapsEmbed:
    "https://maps.google.com/maps?q=8389%20Almeda%20Rd%20Suite%20J-2%20Houston%20TX%2077054&t=&z=15&ie=UTF8&iwloc=&output=embed",
  hoursShort: "Sun 12–5 PM | Mon–Sat 10 AM–7 PM",
  hours: [
    { day: "Sunday", time: "12:00 PM – 5:00 PM" },
    { day: "Monday", time: "10:00 AM – 7:00 PM" },
    { day: "Tuesday", time: "10:00 AM – 7:00 PM" },
    { day: "Wednesday", time: "10:00 AM – 7:00 PM" },
    { day: "Thursday", time: "10:00 AM – 7:00 PM" },
    { day: "Friday", time: "10:00 AM – 7:00 PM" },
    { day: "Saturday", time: "10:00 AM – 7:00 PM" },
  ],
  yearsInBusiness: 15,
  logo: "/images/gadget-x-logo-transparent.png?v=2026-04-28",
  logoOfficial: "/images/gadget-x-logo-transparent.png?v=2026-04-28",
};

export const HERO = {
  badgeRepairTime: "Most repairs in 15-20 min",
  badgeYears: "15 Years in Houston",
  h1: "Fast Phone, Tablet, Laptop & Game Console Repair in Houston",
  subhead:
    "15 years of trusted repairs. Most fixes done the same day. All major brands welcome — walk-ins always welcome.",
  ctas: [
    { label: "Call Now", href: "tel:+13466236898", kind: "primary" as const, icon: "phone" as const },
    { label: "Get Repair Quote", href: "#quote", kind: "secondary" as const, icon: "wrench" as const },
    { label: "Directions", href: "https://maps.app.goo.gl/ALRF73zPbrG9qndz8", kind: "tertiary" as const, icon: "map" as const },
  ],
};

export const PROMO_BANNER = {
  text: "We match & beat any price — show us a competitor's quote and we'll beat it.",
};

export const SHIPPING = {
  shortLabel: "We Ship",
  desc: "Mail in your device for repair, or buy a phone and we'll ship it to you.",
  mailInTitle: "Mail-in repairs welcome",
  // Canonical slug for the dedicated mail-in repair landing page. Linked from
  // the home-page "We Ship" tile, the contact-page mail-in callout, and the
  // ticker so out-of-area visitors land on a page that actually accepts an
  // online intake instead of a generic call-to-action.
  mailInSlug: "/mail-in-repair-houston-tx",
  // Quoted, conservative turnaround used in the customer-facing page copy and
  // the success message. Mail-in repairs realistically take a few business
  // days end-to-end (transit + repair + return transit), so we set
  // expectations explicitly rather than implying same-day.
  turnaroundDays: "3–5 business days",
};

export const FINANCING = {
  shortLabel: "Easy Financing",
  desc: "Phones from $10–$80 down. Walk out with your phone today.",
  pillLabel: "Financing from $10 down",
  pageSlug: "financing-houston-tx",
  pagePath: "/financing-houston-tx",
};

export const FINANCING_PAGE = {
  hero: {
    eyebrow: "Phone Financing",
    h1: "Phone Financing in Houston — From $10 Down",
    subhead:
      "Walk out the same day with an unlocked iPhone, Samsung or Pixel. Our lease-to-own partner runs a soft check that won't touch your credit score, and most shoppers are approved in minutes.",
  },
  // No specific lender brand named on purpose — the task is explicit that real
  // lender API integration is out of scope and that APR/rate disclosure should
  // not appear unless the owner provides exact terms. We describe the program
  // generically and let the customer ask in store.
  partnerLabel: "Through our lease-to-own financing partner",
  downRange: "$10 – $80",
  programHighlights: [
    "Down payments from $10 to $80, depending on the phone and approval tier",
    "Soft pre-qualification — no impact on your credit score",
    "Walk out with the phone the same day, set up and ready to use",
    "All unlocked phones in our shop are eligible — iPhone, Samsung, Pixel and more",
    "90-day repair warranty on every phone, just like a cash purchase",
  ],
  eligibility: [
    "You're 18 or older",
    "Valid government-issued photo ID (driver's license, state ID, passport)",
    "Proof of income — recent pay stub, bank statement or benefits letter",
    "Active checking account (debit card or routing/account number)",
    "Working phone number and email for account setup",
  ],
  steps: [
    {
      title: "Pre-qualify online",
      desc: "Tell us your name, callback number, the phone you want and a budget. Takes about 60 seconds.",
    },
    {
      title: "We text you back",
      desc: "We'll confirm the phone is in stock, share the down payment range, and book a walk-in time if you want one.",
    },
    {
      title: "Finish in store",
      desc: "Bring your ID, proof of income and debit card. The lender's soft check happens in-store and takes a few minutes.",
    },
    {
      title: "Walk out with your phone",
      desc: "We activate your line, transfer your data, and you leave with the phone the same day.",
    },
  ],
  eligibleDevicesNote:
    "Phones only — iPhone, Samsung Galaxy, Google Pixel, Motorola and OnePlus models in our inventory all qualify. Tablets, laptops and consoles aren't part of the financing program today.",
  faqs: [
    {
      q: "Is this a credit card or a loan?",
      a: "Neither — it's a lease-to-own agreement. You make scheduled payments and own the phone outright at the end of the term, or you can pay it off early with no penalty.",
    },
    {
      q: "Will pre-qualifying hurt my credit score?",
      a: "No. Pre-qualification uses a soft check that doesn't affect your credit score. You'll see whether you're likely approved before any hard inquiry.",
    },
    {
      q: "How much will my payments be?",
      a: "It depends on the phone, your down payment and your approval tier. We'll show you the exact schedule in store before you sign anything — no surprises.",
    },
    {
      q: "Which phones can I finance?",
      a: "Any unlocked phone in our shop — iPhone, Samsung Galaxy, Google Pixel, Motorola and more. Tablets, laptops and gaming consoles aren't part of the program right now.",
    },
    {
      q: "What if I'm denied?",
      a: "You can still walk out with the phone for cash, debit or zero-interest layaway. Call us at +1 (346) 623-6898 and we'll help you find an option that works.",
    },
  ],
};

export const TICKER = {
  items: [
    "Most Repairs in 15-20 Min",
    "We Match & Beat Any Price",
    "Mail-In Repairs Welcome",
    "Phones from $10 Down",
    "15 Years in Houston",
  ],
};

export const TRUST_POINTS = [
  { label: "15+ Years in Houston", icon: "star" as const },
  { label: "Same-Day Repair", icon: "zap" as const },
  { label: "90-Day Warranty", icon: "shield" as const },
  { label: "5-Star Reviews", icon: "star" as const },
  { label: "All Brands Welcome", icon: "smartphone" as const },
];

export const SERVICES = [
  { name: "iPhone Repair", desc: "Screen, battery, charging port.", icon: "smartphone" as const },
  { name: "Android & Cellphone Repair", desc: "Samsung, Google, Motorola & more.", icon: "smartphone" as const },
  { name: "iPad Repair", desc: "Glass, LCD, battery replacement.", icon: "tablet" as const },
  { name: "Tablet Repair", desc: "Samsung, Amazon, Lenovo tablets.", icon: "tablet" as const },
  { name: "MacBook Repair", desc: "Screen, keyboard, logic board.", icon: "laptop" as const },
  { name: "Laptop Repair", desc: "Windows PCs and Chromebooks.", icon: "laptop" as const },
  { name: "PlayStation Repair", desc: "HDMI port, disc drive, no power.", icon: "gamepad" as const },
  { name: "Xbox Repair", desc: "Power issues, HDMI, disc drive.", icon: "gamepad" as const },
  { name: "Nintendo Switch Repair", desc: "Screen, joycons, charging.", icon: "gamepad" as const },
  { name: "Accessories", desc: "Cases, chargers, screen protectors.", icon: "headphones" as const },
];

export const WHY_CHOOSE = [
  { title: "15 Years Heritage", desc: "Houston's trusted repair shop since 2010.", icon: "star" as const },
  { title: "Same-Day Turnaround", desc: "Most repairs completed in 1–2 hours while you wait.", icon: "zap" as const },
  { title: "Certified Technicians", desc: "Skilled techs who know every device, inside and out.", icon: "shield" as const },
  { title: "90-Day Warranty", desc: "Every repair is backed by our 90-day warranty.", icon: "check" as const },
];

export const FEATURED_OFFERS = [
  { title: "iPhone Screen Replacement", price: "from $79", note: "Most models in stock", icon: "smartphone" as const },
  { title: "Battery Replacement", price: "from $49", note: "Phones, tablets, laptops", icon: "battery" as const },
  { title: "HDMI Port Repair", price: "from $89", note: "PlayStation, Xbox, Switch", icon: "gamepad" as const },
  { title: "Used Phones for Sale", price: "starting at $99", note: "Unlocked, tested, warrantied", icon: "smartphone" as const },
  { title: "Prepaid Activation", price: "Free with new phone", note: "Cricket • Metro • T-Mobile • AT&T", icon: "wifi" as const },
];

export const SELL_PRODUCTS = [
  { name: "Unlocked Phones", desc: "Apple, Samsung, Google, more", icon: "smartphone" as const },
  { name: "iPads & Tablets", desc: "Cellular and Wi-Fi models", icon: "tablet" as const },
  { name: "MacBooks & Laptops", desc: "Refurbished and tested", icon: "laptop" as const },
  { name: "Gaming Consoles", desc: "PlayStation, Xbox, Nintendo", icon: "gamepad" as const },
  { name: "Accessories", desc: "Cases, chargers, audio, more", icon: "headphones" as const },
];

export const PREPAID_CARRIERS = ["Cricket", "Metro by T-Mobile", "T-Mobile", "AT&T Prepaid"];

export const SERVICE_AREAS = [
  "Houston",
  "Sugar Land",
  "Missouri City",
  "Stafford",
  "Katy",
  "Alief",
  "Sharpstown",
];

export const FOOTER_LINKS = {
  repair: ["iPhone Repair", "Android Repair", "iPad Repair", "MacBook Repair", "PlayStation Repair", "Xbox Repair"],
  shop: ["Phones", "Tablets", "Laptops", "Consoles", "Accessories"],
  prepaid: ["Cricket", "Metro by T-Mobile", "T-Mobile", "AT&T Prepaid"],
  company: ["About", "Locations", "Contact", "Reviews"],
};

export const COPYRIGHT = "© 2026 Gadget X Repairs. 15 years repairing Houston's devices.";
