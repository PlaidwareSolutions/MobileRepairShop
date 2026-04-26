export type SalesData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; h1: string; subhead: string };
  intro: string;
  highlights: string[];
  category?: string;
  faqs: { q: string; a: string }[];
  related: string[];
};

export const SALES_DATA: SalesData[] = [
  {
    slug: "phones-for-sale-houston",
    title: "Phones for Sale in Houston",
    metaTitle: "Phones for Sale Houston | Used, New, Refurbished | Gadget X",
    metaDescription:
      "Phones for sale in Houston: unlocked iPhone, Samsung Galaxy, Google Pixel, Motorola. New, used and refurbished. Tested, warrantied, with prepaid activation.",
    hero: {
      eyebrow: "Phones for Sale",
      h1: "Phones for Sale in Houston",
      subhead:
        "Unlocked iPhones, Samsungs, Pixels and Motorolas. New, used and refurbished — every phone tested and backed by our warranty.",
    },
    intro:
      "Whether you're upgrading, replacing a lost phone, or buying a backup line, our shop carries dozens of phones in stock at any time. Every phone is tested, factory reset, and ready to use on the carrier of your choice.",
    highlights: [
      "Unlocked iPhones from $99",
      "Samsung, Google Pixel and Motorola in stock",
      "All phones tested and warrantied",
      "Free prepaid activation with phone purchase",
      "Trade-in your old phone for credit",
    ],
    faqs: [
      { q: "Are your phones unlocked?", a: "Most are. Each phone is labelled with its carrier compatibility — most are fully unlocked." },
      { q: "Do your phones come with a warranty?", a: "Yes — every used phone comes with a 30-day warranty, and refurbished phones come with 90 days." },
    ],
    related: ["used-phones-houston", "refurbished-phones-houston", "new-phones-houston", "phone-accessories-houston"],
  },
  {
    slug: "used-phones-houston",
    title: "Used Phones Houston",
    metaTitle: "Used Phones Houston | Unlocked iPhone, Samsung, Pixel | Gadget X",
    metaDescription:
      "Used phones in Houston, all tested and unlocked. iPhone, Samsung, Google Pixel, Motorola and more from $99 with 30-day warranty.",
    hero: {
      eyebrow: "Used Phones",
      h1: "Used Phones in Houston",
      subhead:
        "Tested, factory-reset, ready-to-go used phones from $99. Unlocked options on every model.",
    },
    intro:
      "We hand-test every used phone — battery health, screen, charging, cameras, speakers — before it hits the case. If it doesn't pass, we don't sell it.",
    highlights: ["From $99 unlocked", "Battery health checked", "30-day warranty", "Returns within 7 days"],
    faqs: [
      { q: "What does 'good' condition mean?", a: "Good means light wear — minor scuffs but no significant cracks, dents, or screen damage. We grade honestly." },
    ],
    related: ["refurbished-phones-houston", "phones-for-sale-houston", "buy-my-phone-houston"],
  },
  {
    slug: "refurbished-phones-houston",
    title: "Refurbished Phones Houston",
    metaTitle: "Refurbished Phones Houston | iPhone, Samsung | Gadget X",
    metaDescription:
      "Refurbished phones in Houston with 90-day warranty. iPhone, Samsung Galaxy and Google Pixel restored to like-new condition.",
    hero: {
      eyebrow: "Refurbished Phones",
      h1: "Refurbished Phones in Houston",
      subhead:
        "Phones restored to like-new — new screen, new battery, deep cleaned and tested. 90-day warranty.",
    },
    intro:
      "Refurbished phones are used phones we strip down, replace any worn parts (screen, battery), then re-test top to bottom. They look and run like new for a fraction of new prices.",
    highlights: ["New battery, often new screen", "Deep cleaned, factory reset", "90-day warranty", "iPhone, Samsung, Pixel"],
    faqs: [
      { q: "What's the difference between used and refurbished?", a: "Used is tested but original parts. Refurbished gets new wear parts (battery, sometimes screen) and looks like new." },
    ],
    related: ["used-phones-houston", "phones-for-sale-houston", "new-phones-houston"],
  },
  {
    slug: "new-phones-houston",
    title: "New Phones Houston",
    metaTitle: "New Phones Houston | Unlocked & Carrier Phones | Gadget X",
    metaDescription:
      "New unlocked phones in Houston for cash or carrier-financed. iPhone, Samsung, Motorola, prepaid lines included.",
    hero: {
      eyebrow: "New Phones",
      h1: "New Phones in Houston",
      subhead:
        "Brand-new phones — unlocked or carrier — at honest cash prices. Activate any prepaid line on the spot.",
    },
    intro:
      "We carry new unlocked phones for cash buyers and carrier-financed devices for the major prepaid networks. Walk out with a phone activated and a SIM in it the same hour.",
    highlights: ["Unlocked Apple, Samsung, Motorola, Pixel", "Prepaid activations included", "Cash or financing", "Setup and data transfer in store"],
    faqs: [
      { q: "Can I activate a prepaid plan when I buy a new phone?", a: "Yes — Cricket, Metro, T-Mobile, AT&T Prepaid, Boost, Gen Mobile, Simple Mobile and more." },
    ],
    related: ["phones-for-sale-houston", "prepaid-phone-activations-houston", "refurbished-phones-houston"],
  },
  {
    slug: "buy-my-phone-houston",
    title: "We Buy Your Phone in Houston",
    metaTitle: "Sell My Phone Houston | Cash for iPhone, Samsung | Gadget X",
    metaDescription:
      "Sell your phone for cash in Houston. We buy iPhone, Samsung, Google Pixel, Motorola — even with cracked screens. Free quote in minutes.",
    hero: {
      eyebrow: "Sell Your Phone",
      h1: "Sell Your Phone in Houston",
      subhead:
        "We pay cash for working iPhones, Samsungs, Pixels and Motorolas — including phones with cracked screens or bad batteries.",
    },
    intro:
      "Tell us the make, model, storage and condition. We'll quote you on the spot and pay cash today. We even buy phones with cracked screens, dead batteries, or no power — bring it in for an honest assessment.",
    highlights: ["Cash same day", "Cracked & broken phones bought", "iPhone, Samsung, Google Pixel, Motorola", "ID required for resale law compliance"],
    faqs: [
      { q: "Do I need to bring the original box and accessories?", a: "Not required — but they may bump the price up." },
      { q: "Will you buy a phone that's still on a payment plan?", a: "We can only buy phones that are fully paid off and not reported lost or stolen." },
    ],
    related: ["used-phones-houston", "refurbished-phones-houston", "phones-for-sale-houston"],
  },
  {
    slug: "laptops-for-sale-houston",
    title: "Laptops for Sale Houston",
    metaTitle: "Laptops for Sale Houston | Used, Refurbished | Gadget X",
    metaDescription:
      "Used and refurbished laptops in Houston. MacBook, HP, Dell, Lenovo. Tested, warrantied, ready to work or game.",
    hero: {
      eyebrow: "Laptops for Sale",
      h1: "Laptops for Sale in Houston",
      subhead:
        "Refurbished MacBooks, HPs, Dells and Lenovos — tested, warrantied and ready to work the day you take them home.",
    },
    intro:
      "Every laptop in our store gets a fresh OS install, a SSD upgrade where appropriate, a battery health check, and a deep clean. We label specs, condition and warranty clearly.",
    highlights: ["MacBook Air M1 / Pro from $599", "HP, Dell, Lenovo refurbished from $299", "30-day warranty", "Setup help included"],
    faqs: [
      { q: "Will the laptop run my software?", a: "Tell us what you'll use it for — work, school, light gaming — and we'll point you at the right machine for your budget." },
    ],
    related: ["phones-for-sale-houston", "laptop-accessories-houston"],
  },
  {
    slug: "phone-accessories-houston",
    title: "Phone Accessories Houston",
    metaTitle: "Phone Accessories Houston | Cases, Chargers, Cables | Gadget X",
    metaDescription:
      "Phone accessories in Houston — cases, screen protectors, chargers, USB-C and Lightning cables, wall adapters and more.",
    hero: {
      eyebrow: "Accessories",
      h1: "Phone Accessories in Houston",
      subhead:
        "Cases, screen protectors, chargers, cables, wall adapters and more — fitted and warrantied in store.",
    },
    intro:
      "We stock accessories for every phone we repair and sell. Buy a screen protector and we'll install it for you. Buy a case and we'll fit it.",
    highlights: ["Cases for current iPhone, Samsung, Pixel, Moto", "Tempered-glass screen protectors", "USB-C, Lightning and micro-USB cables", "20W and 30W wall chargers"],
    faqs: [
      { q: "Do you install screen protectors?", a: "Yes — every screen protector we sell comes with free installation." },
    ],
    related: ["phones-for-sale-houston", "laptop-accessories-houston"],
  },
  {
    slug: "laptop-accessories-houston",
    title: "Laptop Accessories Houston",
    metaTitle: "Laptop Accessories Houston | Chargers, Cases, Adapters | Gadget X",
    metaDescription:
      "Laptop accessories in Houston — chargers, cases, sleeves, USB-C and HDMI adapters, mice and keyboards.",
    hero: {
      eyebrow: "Laptop Accessories",
      h1: "Laptop Accessories in Houston",
      subhead:
        "Replacement chargers, sleeves, USB-C and HDMI adapters, mice, keyboards — everything to keep your laptop usable.",
    },
    intro:
      "Lost your laptop charger? Need a USB-C hub for your MacBook? We carry it.",
    highlights: ["Universal and OEM laptop chargers", "Sleeves and cases", "USB-C hubs and adapters", "Mice and keyboards"],
    faqs: [
      { q: "Will a universal charger work for my laptop?", a: "Most laptops, yes. We confirm the wattage and tip required for your specific model before selling you one." },
    ],
    related: ["laptops-for-sale-houston", "phone-accessories-houston"],
  },
];

export const SALES_BY_SLUG = Object.fromEntries(SALES_DATA.map((s) => [s.slug, s])) as Record<string, SalesData>;
