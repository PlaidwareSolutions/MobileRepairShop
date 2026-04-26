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
    slug: "phones-for-sale-houston-tx",
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
    related: ["used-phones-houston-tx", "refurbished-phones-houston-tx", "new-phones-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "used-phones-houston-tx",
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
    related: ["refurbished-phones-houston-tx", "phones-for-sale-houston-tx", "sell-phone-houston-tx"],
  },
  {
    slug: "refurbished-phones-houston-tx",
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
    related: ["used-phones-houston-tx", "phones-for-sale-houston-tx", "new-phones-houston-tx"],
  },
  {
    slug: "new-phones-houston-tx",
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
    related: ["phones-for-sale-houston-tx", "phone-activation-houston-tx", "refurbished-phones-houston-tx"],
  },
  {
    slug: "sell-phone-houston-tx",
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
    related: ["used-phones-houston-tx", "refurbished-phones-houston-tx", "phones-for-sale-houston-tx"],
  },
  {
    slug: "laptops-for-sale-houston-tx",
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
    related: ["phones-for-sale-houston-tx", "laptop-accessories-houston-tx"],
  },
  {
    slug: "phone-accessories-houston-tx",
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
    related: ["phones-for-sale-houston-tx", "laptop-accessories-houston-tx"],
  },
  {
    slug: "laptop-accessories-houston-tx",
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
    related: ["laptops-for-sale-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "shop-houston-tx",
    title: "Shop Gadget X Houston",
    metaTitle: "Shop Houston | Phones, Laptops, Accessories | Gadget X",
    metaDescription:
      "Shop unlocked phones, refurbished laptops, accessories, prepaid SIMs and more at Gadget X in Houston. 8389 Almeda Rd, 15 years in business.",
    hero: {
      eyebrow: "Shop Gadget X",
      h1: "Shop Gadget X Houston",
      subhead:
        "Everything we sell — phones, laptops, accessories, prepaid SIMs and bill payments — all in one Houston shop on Almeda Rd.",
    },
    intro:
      "Gadget X is your one-stop shop in Houston for unlocked phones, refurbished laptops, cases, chargers, screen protectors, prepaid activations and bill payments. Walk in any day and we'll set you up.",
    highlights: [
      "Unlocked iPhones from $99 — Samsung, Pixel, Motorola too",
      "Refurbished MacBooks, HP, Dell and Lenovo laptops",
      "Cases, chargers, cables, wireless chargers, power banks",
      "Prepaid SIMs and activations for every major carrier",
      "We buy phones — even cracked ones — for cash",
    ],
    faqs: [
      { q: "Do I need to make an appointment?", a: "Walk in any day. Sundays 12–5, Mon–Sat 10–7." },
      { q: "Do you take trade-ins?", a: "Yes — bring your old phone or laptop and we'll quote you on the spot." },
    ],
    related: ["phones-for-sale-houston-tx", "laptops-for-sale-houston-tx", "phone-accessories-houston-tx", "phone-activation-houston-tx"],
  },
  {
    slug: "buy-iphone-houston-tx",
    title: "Buy iPhone in Houston",
    metaTitle: "Buy iPhone Houston | Unlocked Used & Refurbished | Gadget X",
    metaDescription:
      "Buy unlocked iPhone in Houston — used and refurbished iPhone 8 through iPhone 15 Pro Max from $99. Tested, warrantied, ready to activate.",
    hero: {
      eyebrow: "Buy iPhone",
      h1: "Buy iPhone in Houston",
      subhead:
        "Unlocked iPhones from $99 — every model from iPhone 8 to iPhone 15 Pro Max. Tested, factory reset, ready to activate on the carrier of your choice.",
    },
    intro:
      "We carry dozens of unlocked iPhones at any time. Every iPhone is hand-tested, factory reset and battery-checked. Used carries a 30-day warranty; refurbished carries 90 days.",
    highlights: [
      "Used iPhones from $99 — every major model",
      "Refurbished iPhones with new battery and 90-day warranty",
      "Unlocked for any carrier (AT&T, T-Mobile, Verizon, prepaid)",
      "iCloud cleared, factory reset, ready to activate",
      "Trade in your old phone for credit",
    ],
    faqs: [
      { q: "Are your iPhones unlocked?", a: "Most are fully unlocked — we label compatibility on every phone." },
      { q: "Do they come with a charger?", a: "Most include a USB cable. Wall adapters available in store." },
    ],
    related: ["used-phones-houston-tx", "refurbished-phones-houston-tx", "buy-samsung-phones-houston-tx", "iphone-repair-houston-tx"],
  },
  {
    slug: "buy-samsung-phones-houston-tx",
    title: "Buy Samsung Phones in Houston",
    metaTitle: "Buy Samsung Phones Houston | Unlocked Galaxy | Gadget X",
    metaDescription:
      "Buy unlocked Samsung Galaxy phones in Houston — Galaxy A, S and Note series, used and refurbished. Tested, warrantied, ready to activate.",
    hero: {
      eyebrow: "Buy Samsung",
      h1: "Buy Samsung Phones in Houston",
      subhead:
        "Unlocked Galaxy A, S, and Note series — used and refurbished, every Samsung tested and warrantied.",
    },
    intro:
      "Samsung Galaxy is the most popular Android in Houston, and we keep a deep selection. Every Galaxy is battery-checked, screen-tested, factory reset and ready to use.",
    highlights: [
      "Galaxy A series from $99",
      "Galaxy S and Note flagships in stock",
      "Refurbished Galaxy with new battery, 90-day warranty",
      "Unlocked for any carrier",
      "Free prepaid activation with phone purchase",
    ],
    faqs: [
      { q: "Do you have the latest Galaxy S series?", a: "We carry recent Galaxy S models when supply allows. Call (346) 623-6898 for current inventory." },
    ],
    related: ["buy-iphone-houston-tx", "used-phones-houston-tx", "refurbished-phones-houston-tx", "samsung-repair-houston-tx"],
  },
  {
    slug: "buy-motorola-phones-houston-tx",
    title: "Buy Motorola Phones in Houston",
    metaTitle: "Buy Motorola Phones Houston | Moto G, Edge, Razr | Gadget X",
    metaDescription:
      "Buy unlocked Motorola phones in Houston — Moto G, Moto E, Edge and Razr. Tested, warrantied, ready to activate on any prepaid carrier.",
    hero: {
      eyebrow: "Buy Motorola",
      h1: "Buy Motorola Phones in Houston",
      subhead:
        "Moto G, Moto E, Edge and Razr — affordable unlocked Android phones with prepaid activation included.",
    },
    intro:
      "Motorola Moto G is one of the best value-for-money phones in Houston. We carry new and used Moto G, Moto E, Edge and Razr, all unlocked.",
    highlights: [
      "Moto G series from $79",
      "Moto E for budget shoppers",
      "Razr foldable in stock when available",
      "Unlocked for any prepaid carrier",
      "Free prepaid activation with phone purchase",
    ],
    faqs: [
      { q: "What's the cheapest Motorola you carry?", a: "Moto E and lower-tier Moto G models start around $79 used." },
    ],
    related: ["buy-iphone-houston-tx", "buy-samsung-phones-houston-tx", "used-phones-houston-tx", "motorola-repair-houston-tx"],
  },
  {
    slug: "buy-google-pixel-phones-houston-tx",
    title: "Buy Google Pixel Phones in Houston",
    metaTitle: "Buy Google Pixel Houston | Unlocked Pixel 6, 7, 8 | Gadget X",
    metaDescription:
      "Buy unlocked Google Pixel phones in Houston — Pixel 5, 6, 7, 8 series. Tested, warrantied, ready to activate on any carrier.",
    hero: {
      eyebrow: "Buy Pixel",
      h1: "Buy Google Pixel Phones in Houston",
      subhead:
        "Unlocked Pixel 5 through Pixel 8 series — clean Android, great cameras, ready to activate on any carrier.",
    },
    intro:
      "Google Pixel is the cleanest Android experience you can buy. We carry recent Pixel series unlocked, tested and battery-checked.",
    highlights: [
      "Pixel 5, 6, 7, 8 series in stock",
      "Unlocked for any carrier",
      "Tested cameras, sensors, fingerprint",
      "Refurbished Pixel with 90-day warranty",
      "Free prepaid activation included",
    ],
    faqs: [
      { q: "Do you have Pixel A-series for less?", a: "Yes — Pixel 6a, 7a and 8a are some of our best value Pixels. In stock when supply allows." },
    ],
    related: ["buy-iphone-houston-tx", "buy-samsung-phones-houston-tx", "google-pixel-repair-houston-tx", "used-phones-houston-tx"],
  },
  {
    slug: "buy-hp-laptops-houston-tx",
    title: "Buy HP Laptops in Houston",
    metaTitle: "Buy HP Laptops Houston | Pavilion, Envy, Elitebook | Gadget X",
    metaDescription:
      "Buy refurbished HP laptops in Houston — Pavilion, Envy, Elitebook, Probook. Tested, fresh OS, 30-day warranty.",
    hero: {
      eyebrow: "Buy HP Laptop",
      h1: "Buy HP Laptops in Houston",
      subhead:
        "Refurbished HP Pavilion, Envy, Elitebook and Probook — tested, fresh OS install, ready to work or study.",
    },
    intro:
      "Every HP laptop in our store gets a fresh Windows install, an SSD if needed, a battery health check and a deep clean. Specs and condition labelled clearly.",
    highlights: [
      "HP Pavilion from $299",
      "HP Envy and Elitebook in stock",
      "SSD upgrade where appropriate",
      "Fresh Windows install, ready to use",
      "30-day warranty",
    ],
    faqs: [
      { q: "Will the HP run Microsoft Office?", a: "Yes — every laptop we sell handles Office, web, video calls and light gaming." },
    ],
    related: ["laptops-for-sale-houston-tx", "buy-dell-laptops-houston-tx", "buy-lenovo-laptops-houston-tx", "hp-laptop-repair-houston-tx"],
  },
  {
    slug: "buy-dell-laptops-houston-tx",
    title: "Buy Dell Laptops in Houston",
    metaTitle: "Buy Dell Laptops Houston | Latitude, Inspiron, XPS | Gadget X",
    metaDescription:
      "Buy refurbished Dell laptops in Houston — Latitude, Inspiron, XPS. Tested, fresh OS, 30-day warranty. From $349.",
    hero: {
      eyebrow: "Buy Dell Laptop",
      h1: "Buy Dell Laptops in Houston",
      subhead:
        "Refurbished Dell Latitude, Inspiron and XPS — tested, SSD upgraded where needed, ready to work the day you take it home.",
    },
    intro:
      "Dell Latitude is one of the most reliable business laptops we resell. We test every Dell, replace any failing parts, install a fresh Windows and label specs honestly.",
    highlights: [
      "Dell Latitude from $349",
      "Dell Inspiron consumer laptops",
      "Dell XPS (when available) for light creative work",
      "Fresh Windows install and SSD upgrade",
      "30-day warranty",
    ],
    faqs: [
      { q: "Will the Dell come with a charger?", a: "Yes — every laptop sale includes a working charger." },
    ],
    related: ["laptops-for-sale-houston-tx", "buy-hp-laptops-houston-tx", "buy-lenovo-laptops-houston-tx", "dell-laptop-repair-houston-tx"],
  },
  {
    slug: "buy-lenovo-laptops-houston-tx",
    title: "Buy Lenovo Laptops in Houston",
    metaTitle: "Buy Lenovo Laptops Houston | ThinkPad, IdeaPad, Yoga | Gadget X",
    metaDescription:
      "Buy refurbished Lenovo laptops in Houston — ThinkPad, IdeaPad, Yoga. Tested, fresh OS, 30-day warranty. From $299.",
    hero: {
      eyebrow: "Buy Lenovo Laptop",
      h1: "Buy Lenovo Laptops in Houston",
      subhead:
        "Refurbished Lenovo ThinkPad, IdeaPad and Yoga 2-in-1 — tested, fresh OS install, ready to work or study.",
    },
    intro:
      "Lenovo ThinkPad is the workhorse laptop we recommend most often. We test every Lenovo, install a fresh Windows, upgrade the SSD where appropriate and price it honestly.",
    highlights: [
      "ThinkPad from $299",
      "IdeaPad consumer laptops",
      "Yoga 2-in-1 with touchscreen",
      "Fresh Windows install, SSD upgrade",
      "30-day warranty",
    ],
    faqs: [
      { q: "Are ThinkPads good for school?", a: "Yes — durable, easy keyboard, light enough to carry, and most run Microsoft Office and Zoom flawlessly." },
    ],
    related: ["laptops-for-sale-houston-tx", "buy-hp-laptops-houston-tx", "buy-dell-laptops-houston-tx", "lenovo-laptop-repair-houston-tx"],
  },
  {
    slug: "buy-macbook-houston-tx",
    title: "Buy MacBook in Houston",
    metaTitle: "Buy MacBook Houston | Refurbished Air, Pro, M-series | Gadget X",
    metaDescription:
      "Buy refurbished MacBook in Houston — MacBook Air M1/M2, MacBook Pro Intel and Apple Silicon. Tested, 30-day warranty.",
    hero: {
      eyebrow: "Buy MacBook",
      h1: "Buy MacBook in Houston",
      subhead:
        "Refurbished MacBook Air M1 / M2 and MacBook Pro — tested, battery-checked, fresh macOS install, ready to use.",
    },
    intro:
      "We resell MacBook Air M1 and M2 alongside MacBook Pro Intel and M-series. Each MacBook is tested top to bottom, battery health is checked, and a fresh macOS is installed.",
    highlights: [
      "MacBook Air M1 from $599",
      "MacBook Air M2 and M3 when available",
      "MacBook Pro 13/14/16 in stock",
      "Battery health checked and labelled",
      "30-day warranty",
    ],
    faqs: [
      { q: "Will the MacBook run the latest macOS?", a: "M1 and newer MacBooks support all current macOS versions. We can upgrade or downgrade at your request before pickup." },
    ],
    related: ["laptops-for-sale-houston-tx", "macbook-repair-houston-tx", "buy-hp-laptops-houston-tx"],
  },
  {
    slug: "sell-iphone-houston-tx",
    title: "Sell My iPhone in Houston",
    metaTitle: "Sell My iPhone Houston | Cash for Used iPhone | Gadget X",
    metaDescription:
      "Sell your iPhone for cash in Houston. We buy iPhone 8 through iPhone 16 Pro Max — even with cracked screens. Free quote in minutes.",
    hero: {
      eyebrow: "Sell iPhone",
      h1: "Sell Your iPhone in Houston",
      subhead:
        "We pay cash for working iPhones — even with cracked screens or bad batteries. Free quote in minutes, cash same day.",
    },
    intro:
      "Tell us the model, storage and condition. We'll quote on the spot and pay cash today. We even buy iPhones with cracked screens, dead batteries or no power.",
    highlights: [
      "Cash same day",
      "Cracked iPhones still bought",
      "Every model from iPhone 8 to iPhone 16 Pro Max",
      "ID required for resale law compliance",
      "Free in-store quote",
    ],
    faqs: [
      { q: "Will you buy an iPhone that's iCloud locked?", a: "We can only buy iPhones that are signed out of iCloud and not reported lost or stolen. Bring it signed out." },
      { q: "Do I need the original box?", a: "Not required — but it may bump the price up." },
    ],
    related: ["sell-phone-houston-tx", "sell-samsung-phone-houston-tx", "used-phones-houston-tx", "iphone-repair-houston-tx"],
  },
  {
    slug: "sell-samsung-phone-houston-tx",
    title: "Sell My Samsung Phone in Houston",
    metaTitle: "Sell My Samsung Phone Houston | Cash for Galaxy | Gadget X",
    metaDescription:
      "Sell your Samsung Galaxy for cash in Houston. We buy Galaxy A, S, Note and Z series — even cracked. Free quote in minutes.",
    hero: {
      eyebrow: "Sell Samsung",
      h1: "Sell Your Samsung Galaxy in Houston",
      subhead:
        "We pay cash for working Samsung Galaxy phones — Galaxy A, S, Note and Z series — even with cracked screens or bad batteries.",
    },
    intro:
      "Tell us the Galaxy model, storage and condition. We'll quote on the spot and pay cash today. We buy phones with cracked screens, dead batteries or no power.",
    highlights: [
      "Cash same day",
      "Cracked Galaxy still bought",
      "Galaxy A, S, Note and Z series",
      "ID required for resale law compliance",
      "Free in-store quote",
    ],
    faqs: [
      { q: "Will you buy a Galaxy that's still on a payment plan?", a: "We can only buy Galaxy phones that are fully paid off and not reported lost or stolen." },
    ],
    related: ["sell-phone-houston-tx", "sell-iphone-houston-tx", "samsung-repair-houston-tx", "used-phones-houston-tx"],
  },
  {
    slug: "phone-cases-houston-tx",
    title: "Phone Cases Houston",
    metaTitle: "Phone Cases Houston | iPhone, Samsung, Pixel | Gadget X",
    metaDescription:
      "Phone cases in Houston for current iPhone, Samsung Galaxy, Google Pixel and Motorola. Slim, rugged, OtterBox-style and clear.",
    hero: {
      eyebrow: "Phone Cases",
      h1: "Phone Cases in Houston",
      subhead:
        "Slim, rugged, clear and wallet cases for every current iPhone, Galaxy and Pixel. Fitted in store the day you buy.",
    },
    intro:
      "We stock cases for every phone we repair and sell. Buy a case and we'll fit it before you walk out — no mystery online sizing.",
    highlights: [
      "Slim and rugged cases",
      "Clear cases that show off your phone",
      "Wallet cases with card slots",
      "OtterBox-style heavy-duty options",
      "Fitted in store, included in price",
    ],
    faqs: [
      { q: "Do you have cases for the newest iPhone?", a: "Yes — we stock cases for every current iPhone within days of release." },
    ],
    related: ["phone-accessories-houston-tx", "screen-protectors-houston-tx", "otterbox-cases-houston-tx", "phones-for-sale-houston-tx"],
  },
  {
    slug: "screen-protectors-houston-tx",
    title: "Screen Protectors Houston",
    metaTitle: "Screen Protectors Houston | Tempered Glass | Free Install | Gadget X",
    metaDescription:
      "Tempered glass screen protectors in Houston for iPhone, Samsung Galaxy, Pixel and Motorola. Free professional installation included.",
    hero: {
      eyebrow: "Screen Protectors",
      h1: "Screen Protectors in Houston",
      subhead:
        "Tempered glass screen protectors for every current iPhone, Galaxy and Pixel. We install it for you, free, every time.",
    },
    intro:
      "A $20 screen protector saves a $200 repair. Every screen protector we sell comes with free professional installation — no bubbles, no dust.",
    highlights: [
      "Tempered glass for every current model",
      "Privacy and matte options available",
      "Free installation, always",
      "Replacements at a discount if your protector cracks",
      "Compatible with cases we sell",
    ],
    faqs: [
      { q: "What if my screen protector cracks?", a: "If you bought it from us, we replace it at a steep discount and reinstall it free." },
      { q: "Do screen protectors interfere with Face ID?", a: "No — our standard tempered glass works fine with Face ID." },
    ],
    related: ["phone-cases-houston-tx", "phone-accessories-houston-tx", "phones-for-sale-houston-tx"],
  },
  {
    slug: "phone-chargers-houston-tx",
    title: "Phone Chargers Houston",
    metaTitle: "Phone Chargers Houston | USB-C, Lightning, MagSafe | Gadget X",
    metaDescription:
      "Phone chargers in Houston — USB-C, Lightning, MagSafe and wireless wall chargers. 20W, 30W and 65W options.",
    hero: {
      eyebrow: "Phone Chargers",
      h1: "Phone Chargers in Houston",
      subhead:
        "Wall chargers for every phone — 20W, 30W and 65W USB-C, Lightning bundles and MagSafe pucks.",
    },
    intro:
      "Lost or fried your charger? We stock fast-charging wall adapters and cables for every phone we sell.",
    highlights: [
      "20W and 30W USB-C wall chargers",
      "Lightning and USB-C cables",
      "MagSafe-compatible wireless chargers",
      "65W chargers for laptops and phones",
      "Brand-name and budget options",
    ],
    faqs: [
      { q: "Will any USB-C charger fast-charge my phone?", a: "Most modern USB-C PD chargers will fast-charge any phone — but we'll match the right wattage to your model." },
    ],
    related: ["charging-cables-houston-tx", "wireless-chargers-houston-tx", "wall-adapters-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "charging-cables-houston-tx",
    title: "Charging Cables Houston",
    metaTitle: "Charging Cables Houston | USB-C, Lightning, Micro-USB | Gadget X",
    metaDescription:
      "Charging cables in Houston — USB-C, Lightning and micro-USB. Braided, 6ft and reinforced cables for every phone.",
    hero: {
      eyebrow: "Charging Cables",
      h1: "Charging Cables in Houston",
      subhead:
        "USB-C, Lightning and micro-USB cables — short, long and braided. We pair them with the right wall adapter for your phone.",
    },
    intro:
      "Cheap cables fail and damage your charging port. We stock reinforced, braided and OEM-style cables that last.",
    highlights: [
      "USB-C to USB-C, USB-C to Lightning, USB-A to all",
      "1ft, 3ft, 6ft and 10ft lengths",
      "Reinforced braided cables for daily wear",
      "OEM-style for iPhones",
      "Bulk multi-packs available",
    ],
    faqs: [
      { q: "Why do my cables keep breaking?", a: "Most cable failures are at the connector — pick a braided or reinforced cable and don't yank from the cord." },
    ],
    related: ["phone-chargers-houston-tx", "wireless-chargers-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "wall-adapters-houston-tx",
    title: "Wall Adapters Houston",
    metaTitle: "USB-C Wall Adapters Houston | 20W, 30W, 65W | Gadget X",
    metaDescription:
      "USB-C wall adapters in Houston — 20W, 30W, 45W and 65W fast chargers for iPhone, Samsung, Pixel and laptops.",
    hero: {
      eyebrow: "Wall Adapters",
      h1: "Wall Adapters in Houston",
      subhead:
        "20W, 30W, 45W and 65W USB-C wall adapters — fast charge any modern phone or compatible laptop.",
    },
    intro:
      "USB-C PD wall adapters fast-charge nearly every modern phone, tablet and many laptops. We stock the right wattage for your device.",
    highlights: [
      "20W for iPhone fast charge",
      "30W for iPhone Pro / Pro Max",
      "45W and 65W for laptops",
      "Single and dual-port options",
      "GaN compact chargers in stock",
    ],
    faqs: [
      { q: "Can a 65W charger charge my phone?", a: "Yes — USB-C PD chargers downshift to your phone's safe charging speed." },
    ],
    related: ["phone-chargers-houston-tx", "charging-cables-houston-tx", "laptop-accessories-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "wireless-chargers-houston-tx",
    title: "Wireless Chargers Houston",
    metaTitle: "Wireless Chargers Houston | Qi, MagSafe Compatible | Gadget X",
    metaDescription:
      "Wireless chargers in Houston — Qi pads, MagSafe-compatible pucks and 3-in-1 stands for iPhone, Samsung Galaxy and AirPods.",
    hero: {
      eyebrow: "Wireless Chargers",
      h1: "Wireless Chargers in Houston",
      subhead:
        "Qi wireless pads, MagSafe-compatible pucks and 3-in-1 stands for phone, watch and earbuds.",
    },
    intro:
      "Wireless charging keeps your charging port healthy and your bedside table cleaner. We stock Qi pads, MagSafe pucks and 3-in-1 charging stands.",
    highlights: [
      "Qi 10W and 15W charging pads",
      "MagSafe-compatible pucks for iPhone",
      "3-in-1 stands for phone, watch, earbuds",
      "Fast wireless charging for Galaxy",
      "Includes wall adapter where needed",
    ],
    faqs: [
      { q: "Will MagSafe-compatible work with iPhone 12 and newer?", a: "Yes — every MagSafe-compatible puck we sell snaps onto iPhone 12 and newer." },
    ],
    related: ["phone-chargers-houston-tx", "charging-cables-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "power-banks-houston-tx",
    title: "Power Banks Houston",
    metaTitle: "Power Banks Houston | 10K, 20K mAh, USB-C PD | Gadget X",
    metaDescription:
      "Power banks in Houston — 10,000 / 20,000 mAh portable chargers with USB-C PD fast charging for iPhone, Samsung and laptops.",
    hero: {
      eyebrow: "Power Banks",
      h1: "Power Banks in Houston",
      subhead:
        "Portable USB-C PD power banks — 10,000 to 20,000 mAh — with fast charging for phones, tablets and even laptops.",
    },
    intro:
      "Travel-friendly power banks with USB-C PD fast charging. We stock 10K and 20K mAh, plus MagSafe-compatible pucks.",
    highlights: [
      "10,000 mAh slim power banks",
      "20,000 mAh travel power banks",
      "USB-C PD fast charging",
      "MagSafe-compatible wireless power banks",
      "TSA-approved capacity",
    ],
    faqs: [
      { q: "Can I take a power bank on a plane?", a: "Yes — both 10K and 20K mAh power banks are TSA-approved for carry-on (under 100Wh)." },
    ],
    related: ["phone-chargers-houston-tx", "wireless-chargers-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "earbuds-houston-tx",
    title: "Earbuds Houston",
    metaTitle: "Earbuds Houston | True Wireless, Galaxy Buds, AirPods Style | Gadget X",
    metaDescription:
      "True wireless earbuds in Houston — AirPods-style, Galaxy Buds and budget options. Bluetooth, charging case included.",
    hero: {
      eyebrow: "Earbuds",
      h1: "Earbuds in Houston",
      subhead:
        "True wireless Bluetooth earbuds — AirPods-style, Galaxy Buds and budget options for under $30.",
    },
    intro:
      "True wireless earbuds at every budget. Test the sound in store before you buy.",
    highlights: [
      "Budget true-wireless from $19",
      "Mid-range with active noise cancellation",
      "AirPods-style for iPhone users",
      "Galaxy Buds-style for Samsung users",
      "Charging case included",
    ],
    faqs: [
      { q: "Will the earbuds work with iPhone and Android?", a: "Yes — every Bluetooth earbud we sell pairs with both iPhone and Android." },
    ],
    related: ["headphones-houston-tx", "bluetooth-speakers-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "headphones-houston-tx",
    title: "Headphones Houston",
    metaTitle: "Headphones Houston | Wireless, Wired, Over-Ear | Gadget X",
    metaDescription:
      "Wireless and wired headphones in Houston — over-ear and on-ear, Bluetooth and 3.5mm. From budget picks to premium ANC.",
    hero: {
      eyebrow: "Headphones",
      h1: "Headphones in Houston",
      subhead:
        "Wireless over-ear and on-ear headphones, plus wired 3.5mm options. Active noise cancellation available.",
    },
    intro:
      "From budget Bluetooth to premium ANC over-ear, we stock headphones for every use — gaming, calls, music, travel.",
    highlights: [
      "Wireless Bluetooth headphones from $29",
      "Active noise cancellation models",
      "Wired 3.5mm headphones",
      "Gaming headsets with mic",
      "USB-C and Lightning adapters in stock",
    ],
    faqs: [
      { q: "Do you sell headphones with a mic for video calls?", a: "Yes — every wireless headphone we stock includes a built-in mic for calls." },
    ],
    related: ["earbuds-houston-tx", "bluetooth-speakers-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "bluetooth-speakers-houston-tx",
    title: "Bluetooth Speakers Houston",
    metaTitle: "Bluetooth Speakers Houston | Portable, Waterproof | Gadget X",
    metaDescription:
      "Portable Bluetooth speakers in Houston — waterproof, party-size and travel options for iPhone and Android.",
    hero: {
      eyebrow: "Bluetooth Speakers",
      h1: "Bluetooth Speakers in Houston",
      subhead:
        "Portable Bluetooth speakers for travel, pool, beach and party. Waterproof and rugged options in stock.",
    },
    intro:
      "Portable Bluetooth speakers from compact travel models to party-size boom boxes. Waterproof and rugged options for outdoor use.",
    highlights: [
      "Compact travel Bluetooth speakers",
      "Waterproof speakers for pool / beach",
      "Party-size with light show",
      "Pairs with iPhone, Android, laptop",
      "Rechargeable USB-C battery",
    ],
    faqs: [
      { q: "Are the waterproof speakers really waterproof?", a: "Our IPX7-rated speakers handle full submersion. We label water-resistance clearly on each model." },
    ],
    related: ["headphones-houston-tx", "earbuds-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "car-chargers-houston-tx",
    title: "Car Chargers Houston",
    metaTitle: "Car Chargers Houston | USB-C, Cigarette Lighter | Gadget X",
    metaDescription:
      "Car chargers in Houston — USB-C PD, dual-port, cigarette lighter adapters and wireless car mounts for iPhone and Samsung.",
    hero: {
      eyebrow: "Car Chargers",
      h1: "Car Chargers in Houston",
      subhead:
        "USB-C PD car chargers, dual-port adapters and wireless car mounts. Fast charge any phone in your car.",
    },
    intro:
      "Stop running out of charge on the road. We stock USB-C PD car chargers, dual-port adapters and MagSafe-compatible wireless car mounts.",
    highlights: [
      "USB-C PD car chargers (20W / 30W)",
      "Dual-port for two devices",
      "MagSafe-compatible wireless car mounts",
      "Includes USB-C and Lightning cables",
      "Compact GaN options available",
    ],
    faqs: [
      { q: "Do you sell wireless car chargers for iPhone?", a: "Yes — MagSafe-compatible wireless car chargers and mounts for iPhone 12 and newer." },
    ],
    related: ["phone-chargers-houston-tx", "wireless-chargers-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "smart-watch-bands-houston-tx",
    title: "Smart Watch Bands Houston",
    metaTitle: "Apple Watch & Galaxy Watch Bands Houston | Gadget X",
    metaDescription:
      "Apple Watch and Galaxy Watch bands in Houston — sport, leather, metal and Milanese loops. Every Apple Watch size and Galaxy Watch model.",
    hero: {
      eyebrow: "Smart Watch Bands",
      h1: "Apple Watch & Galaxy Watch Bands in Houston",
      subhead:
        "Sport, leather, metal and Milanese loops for every Apple Watch size and Galaxy Watch model.",
    },
    intro:
      "Switch up your Apple Watch or Galaxy Watch look. We stock sport, leather, metal and Milanese bands in every common size.",
    highlights: [
      "Apple Watch bands — every size from 38mm to 49mm Ultra",
      "Galaxy Watch bands for all generations",
      "Sport, leather, metal and Milanese styles",
      "Quick-release pins for easy swap",
      "Multi-packs available",
    ],
    faqs: [
      { q: "Will a 42mm band fit my 44mm Apple Watch?", a: "Yes — Apple Watch bands are interchangeable across the 38/40/41mm group and the 42/44/45/49mm group." },
    ],
    related: ["phone-accessories-houston-tx", "phone-cases-houston-tx", "phones-for-sale-houston-tx"],
  },
  {
    slug: "otterbox-cases-houston-tx",
    title: "OtterBox Cases Houston",
    metaTitle: "OtterBox Cases Houston | Defender, Symmetry, Commuter | Gadget X",
    metaDescription:
      "OtterBox cases in Houston — Defender, Symmetry and Commuter for iPhone and Samsung Galaxy. Heavy-duty drop protection.",
    hero: {
      eyebrow: "OtterBox Cases",
      h1: "OtterBox Cases in Houston",
      subhead:
        "Authentic OtterBox Defender, Symmetry and Commuter cases for current iPhone and Galaxy models. Heavy-duty drop protection.",
    },
    intro:
      "When your phone needs serious protection, OtterBox is the standard. We stock Defender, Symmetry and Commuter for current iPhone and Galaxy.",
    highlights: [
      "Defender — maximum drop protection",
      "Symmetry — slim with serious protection",
      "Commuter — slim everyday protection",
      "iPhone and Galaxy current models",
      "Authentic OtterBox warranty",
    ],
    faqs: [
      { q: "Is OtterBox really worth the price?", a: "If your phone needs to survive a real drop, yes. We sell OtterBox alongside cheaper rugged options so you can compare." },
    ],
    related: ["phone-cases-houston-tx", "screen-protectors-houston-tx", "phone-accessories-houston-tx"],
  },
  {
    slug: "apple-accessories-houston-tx",
    title: "Apple Accessories Houston",
    metaTitle: "Apple Accessories Houston | MagSafe, AirPods, Cables | Gadget X",
    metaDescription:
      "Apple accessories in Houston — MagSafe-compatible chargers, USB-C cables, AirPods-style earbuds, Lightning adapters.",
    hero: {
      eyebrow: "Apple Accessories",
      h1: "Apple Accessories in Houston",
      subhead:
        "MagSafe-compatible chargers, USB-C and Lightning cables, AirPods-style earbuds, dongles and adapters for every iPhone, iPad and MacBook.",
    },
    intro:
      "We carry Apple-compatible accessories — chargers, cables, MagSafe pucks, AirPods-style earbuds and the dongles you'll inevitably need.",
    highlights: [
      "MagSafe-compatible wireless chargers",
      "USB-C and Lightning cables",
      "AirPods-style true wireless earbuds",
      "Lightning to 3.5mm dongles",
      "MacBook USB-C hubs and adapters",
    ],
    faqs: [
      { q: "Are these Apple-branded?", a: "We carry both Apple-branded and quality third-party Apple-compatible accessories. Pricing labelled clearly on each." },
    ],
    related: ["phone-accessories-houston-tx", "wireless-chargers-houston-tx", "earbuds-houston-tx", "buy-iphone-houston-tx"],
  },
];

export const SALES_BY_SLUG = Object.fromEntries(SALES_DATA.map((s) => [s.slug, s])) as Record<string, SalesData>;
