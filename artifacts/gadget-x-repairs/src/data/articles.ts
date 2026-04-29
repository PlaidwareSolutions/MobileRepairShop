export type ArticleData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  intro: string;
  sections: { h2: string; body: string[] }[];
  cta: string;
  related: string[];
  publishedDate: string;
  updatedDate: string;
};

const PUB = "2026-04-01";
const UPD = "2026-04-26";

export const ARTICLES_DATA: ArticleData[] = [
  {
    slug: "iphone-screen-repair-cost-houston-tx",
    title: "How Much Does iPhone Screen Repair Cost in Houston?",
    metaTitle: "iPhone Screen Repair Cost Houston 2026 | GadgetX Repairs",
    metaDescription:
      "Up-to-date 2026 iPhone screen repair pricing in Houston by model — iPhone 6 to 16 Pro Max — from GadgetX Repairs. Honest quotes!",
    excerpt: "Honest 2026 pricing by model for iPhone screen repair in Houston, plus the gotchas to watch out for.",
    intro:
      "iPhone screen repair pricing depends mostly on the model and the panel type. Here's the real-world range you'll see in Houston in 2026, including at our Almeda Rd shop.",
    sections: [
      {
        h2: "Older iPhones (6–8, SE)",
        body: [
          "iPhone 6 / 6s / 7 / 8 and the original SE all use LCD panels with separable glass. These are the cheapest screens to replace — typically $79–$109 in Houston.",
          "If your phone is in this range and the only damage is a cracked screen, repair is almost always worth it over replacing the device.",
        ],
      },
      {
        h2: "iPhone X through iPhone 12",
        body: [
          "These models moved to OLED, which raises the parts cost. Expect $129–$189 for screen replacement in Houston, depending on whether you want incell (LCD-style swap) or true OLED.",
          "True Tone may stop working with non-Apple parts on some models. We tell you up front.",
        ],
      },
      {
        h2: "iPhone 13–16 Pro Max",
        body: [
          "Newer Pro Max models with high-refresh-rate OLED can run $249–$399 for a quality screen replacement. Standard (non-Pro) models cost less.",
          "Face ID is generally preserved with our process, but on a few models a transfer is required — we'll quote both options.",
        ],
      },
      {
        h2: "How to save",
        body: [
          "Get a tempered-glass screen protector and a real case the day you buy a new phone. They cost $25 combined and prevent the most common $200+ repair.",
          "If your screen is cracked but still readable, get it fixed soon — micro-glass keeps shifting and damages the LCD/OLED underneath, turning a glass-only fix into a full-display fix.",
        ],
      },
    ],
    cta: "Get a real iPhone screen quote — call (346) 623-6898 or stop by Almeda Rd.",
    related: ["iphone-repair-houston-tx", "phone-accessories-houston-tx", "battery-replacement-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "ps5-hdmi-port-repair-worth-it-houston-tx",
    title: "Is PS5 HDMI Port Repair Worth It?",
    metaTitle: "PS5 HDMI Port Repair Worth It 2026? | GadgetX Repairs",
    metaDescription:
      "PS5 HDMI port repair at GadgetX Repairs in Houston runs about $99 vs $400+ for a new PS5. When it's worth fixing & what to expect.",
    excerpt: "PS5 HDMI port repair in Houston is around $99 vs. $400+ for a new console. Here's when it's worth doing.",
    intro:
      "Cable got knocked once too many times and now your PS5 has no signal. Should you fix the HDMI port, or buy a new console? Almost always: fix it.",
    sections: [
      {
        h2: "What HDMI port repair actually involves",
        body: [
          "Inside the PS5, the HDMI port is soldered directly to the motherboard. When it breaks, a technician with microsolder gear desolders the broken socket and reflows a new one in. The board itself is fine.",
          "It's a precise job — you want someone with experience, not someone learning on your console — but it's not magic and it's not the same as buying a new console.",
        ],
      },
      {
        h2: "Cost vs. replacement",
        body: [
          "PS5 HDMI port repair in Houston typically runs $99–$129. A new PS5 with disc drive is $400–$500. Even a used PS5 in good shape is $300+.",
          "Unless your PS5 has multiple other problems, the math is obvious.",
        ],
      },
      {
        h2: "How long it takes",
        body: [
          "Most PS5 HDMI repairs are done in 24–72 hours. We carry HDMI sockets in stock and don't have to wait for parts.",
        ],
      },
      {
        h2: "How to prevent it next time",
        body: [
          "Use a 90-degree HDMI adapter or a flexible HDMI cable. Most HDMI breaks come from leverage on a stiff cable that gets bumped or pulled.",
        ],
      },
    ],
    cta: "Bring your PS5 in for a free quote on HDMI repair — most jobs done in 24–72 hours.",
    related: ["ps5-repair-houston-tx", "hdmi-port-repair-houston-tx", "gaming-console-repair-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "repair-or-replace-laptop-houston-tx",
    title: "Repair or Replace Your Laptop?",
    metaTitle: "Repair or Replace Your Laptop? | GadgetX Repairs Houston",
    metaDescription:
      "When laptop repair makes sense & when replacement is smarter — a practical 2026 guide from GadgetX Repairs in Houston TX.",
    excerpt: "A practical guide to deciding whether to repair your laptop or buy something new.",
    intro:
      "It's a question we get a few times a day. Here's how we'd think about it if it were our own laptop.",
    sections: [
      {
        h2: "What's the device worth?",
        body: [
          "Look up your model used. If your laptop is worth $400+ in working condition and the repair is under half that, repair is usually the right call.",
          "If your laptop is 7+ years old and worth less than the repair cost, replacement is probably smarter.",
        ],
      },
      {
        h2: "What's actually wrong?",
        body: [
          "Battery, screen, charging port, keyboard — these are routine repairs and almost always worth doing.",
          "Motherboard, GPU failure on a soldered-down GPU, repeated overheating — these can be fixed but are a closer call.",
          "Liquid damage that already booted is a coin flip; bring it in for a real diagnostic.",
        ],
      },
      {
        h2: "Software vs. hardware",
        body: [
          "Slow Windows, virus, won't boot Windows — these are software problems and almost always cheap to fix.",
          "If your laptop is hardware-broken AND software-broken, fix the hardware first, then the software.",
        ],
      },
    ],
    cta: "Free laptop diagnostic at our Houston shop — bring it in or call (346) 623-6898.",
    related: ["laptop-repair-houston-tx", "macbook-repair-houston-tx", "computer-repair-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "phone-battery-needs-replacement-houston-tx",
    title: "5 Signs Your Phone Battery Needs Replacement",
    metaTitle: "5 Signs Phone Battery Needs Replacing | GadgetX Repairs",
    metaDescription:
      "How to know when your iPhone or Android battery needs replacing — and what it costs at GadgetX Repairs in Houston TX.",
    excerpt: "Quick guide to knowing when it's time to swap your battery — before it leaves you stranded.",
    intro:
      "Phone batteries wear out — every single one. Here's how to spot a worn battery early.",
    sections: [
      {
        h2: "1. Battery health drops below 80%",
        body: ["On iPhone, check Settings → Battery → Battery Health. Below 80%, you'll feel the drain. On Android, you can check via the SIM/network info menu or apps like AccuBattery."],
      },
      {
        h2: "2. Phone shuts off at 30–40%",
        body: ["A dying cell can't deliver enough power, so the phone protects itself by shutting down even when the percentage looks fine."],
      },
      {
        h2: "3. Phone is hot when idle",
        body: ["A failing battery often runs warmer than it should. If the back of your phone is warm without you using it, it's time."],
      },
      {
        h2: "4. Visible swelling",
        body: ["If your screen is being pushed up or your case won't snap on properly, the battery is swollen. Stop using it and bring it in immediately."],
      },
      {
        h2: "5. Charges to 100% in 20 minutes",
        body: ["A worn battery has lower capacity, so it fills up fast — and drains just as fast."],
      },
    ],
    cta: "iPhone batteries from $49, Android from $59. Most done in under an hour.",
    related: ["battery-replacement-houston-tx", "iphone-repair-houston-tx", "phone-repair-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "used-vs-refurbished-phones-houston-tx",
    title: "Used vs Refurbished Phones — What's the Difference?",
    metaTitle: "Used vs Refurbished Phones | GadgetX Repairs Houston",
    metaDescription:
      "Used vs refurbished phones explained — which gives better value & warranty? A Houston buyer's guide from GadgetX Repairs.",
    excerpt: "Two terms that get used loosely. Here's what they mean — and which one to buy.",
    intro:
      "If you're shopping for a phone in Houston, you'll see both 'used' and 'refurbished' labels. They mean different things.",
    sections: [
      {
        h2: "Used",
        body: ["A used phone is sold as-is after a basic test — battery health, screen, charging, cameras, speakers. Price is lower; warranty is shorter (usually 30 days)."],
      },
      {
        h2: "Refurbished",
        body: ["A refurbished phone has had wear parts replaced — at minimum a new battery, often a new screen — then deep cleaned and re-tested. Price is higher; warranty is longer (usually 90 days)."],
      },
      {
        h2: "Which to buy",
        body: [
          "If you want lowest price and you're OK with original wear: used.",
          "If you want a phone that looks and runs like new with a longer warranty: refurbished.",
          "Avoid 'refurbished' from sellers who can't tell you exactly what was replaced. We'll tell you on every phone we sell.",
        ],
      },
    ],
    cta: "Browse our tested used and refurbished phones in store, with prices and condition labelled.",
    related: ["used-phones-houston-tx", "refurbished-phones-houston-tx", "phones-for-sale-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "can-locked-phone-be-unlocked-houston-tx",
    title: "Can a Locked Phone Be Unlocked?",
    metaTitle: "Can a Locked Phone Be Unlocked? | GadgetX Repairs",
    metaDescription:
      "When & how a carrier-locked phone can be unlocked — what GadgetX Repairs in Houston TX can do. Free IMEI eligibility check!",
    excerpt: "Most carrier-locked phones can be unlocked legally — here's what's possible and what isn't.",
    intro:
      "Locked phones come from prepaid carriers (Cricket, Metro, Boost, AT&T Prepaid) and from postpaid devices still on a payment plan.",
    sections: [
      {
        h2: "Carrier-locked vs. blacklisted",
        body: [
          "Carrier-locked: works only on a specific carrier. Usually unlockable.",
          "Blacklisted: reported lost, stolen or fraud. Cannot be unlocked legally — and cannot be activated on any U.S. carrier.",
        ],
      },
      {
        h2: "What's needed for an unlock",
        body: [
          "The IMEI of the phone, the carrier it's locked to, and confirmation that the device is paid off and not blacklisted.",
          "We check eligibility for free before charging anything.",
        ],
      },
      {
        h2: "Cost and time",
        body: ["Most unlocks: $39 and 24–72 hours. Some specific Apple carrier locks cost more — we quote up front."],
      },
    ],
    cta: "Free unlock eligibility check by IMEI — call or stop in.",
    related: ["phone-unlocking-houston-tx", "phone-repair-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "best-prepaid-plans-houston-tx",
    title: "Best Prepaid Plans in Houston for 2026",
    metaTitle: "Best Prepaid Plans Houston 2026 | GadgetX Repairs",
    metaDescription:
      "Honest 2026 picks for the best prepaid plans in Houston — Cricket, Metro, T-Mobile, AT&T, Boost & Gen Mobile — from GadgetX Repairs.",
    excerpt: "We see what plans actually work for our Houston customers — here's how we'd pick.",
    intro:
      "There's no single 'best' prepaid plan. The best plan is the one that gives you the coverage and data you actually use, for the lowest price. Here's how we'd choose in 2026.",
    sections: [
      {
        h2: "If you want the best coverage in Houston",
        body: ["AT&T Prepaid, T-Mobile prepaid (or Metro), and Cricket all give strong Houston coverage. Verizon Prepaid is also solid in Houston suburbs."],
      },
      {
        h2: "If you want the cheapest unlimited",
        body: ["Boost Mobile and Gen Mobile have lower-priced unlimited plans. Speeds may be slightly slower at peak times — fine for most users."],
      },
      {
        h2: "If you mostly use Wi-Fi",
        body: ["A 1–5 GB plan from Cricket, Boost or Gen Mobile is usually plenty and cuts your bill in half."],
      },
      {
        h2: "If you call internationally",
        body: ["Lyca Mobile and H2O Wireless include international calls to many countries in their base plans."],
      },
    ],
    cta: "We help pick plans honestly — no commission. Call or stop by.",
    related: ["phone-activation-houston-tx", "boost-mobile-activation-houston-tx", "att-activation-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "check-before-buying-used-iphone-houston-tx",
    title: "What to Check Before Buying a Used iPhone",
    metaTitle: "What to Check Buying a Used iPhone | GadgetX Repairs",
    metaDescription:
      "A quick checklist for buying a used iPhone in Houston — battery health, iCloud lock & more — from GadgetX Repairs. Walk-ins welcome!",
    excerpt: "Don't buy a used iPhone without checking these. We see the regrets every week.",
    intro:
      "We love a good used iPhone deal, but only if you know what to check. This is the same list we run through on every phone we sell.",
    sections: [
      {
        h2: "1. iCloud lock",
        body: ["If the phone is signed into someone else's Apple ID and locked to their iCloud, you can't use it. Have the seller sign out before you pay."],
      },
      {
        h2: "2. Blacklist / IMEI status",
        body: ["Check the IMEI on a free service or ask us to do it. A blacklisted phone is a paperweight."],
      },
      {
        h2: "3. Battery health",
        body: ["Settings → Battery → Battery Health. Anything under 85% means a battery replacement is in your near future."],
      },
      {
        h2: "4. Touch and Face ID",
        body: ["Lock the phone and try to unlock it with Face ID / Touch ID. Then test every corner of the screen for dead spots."],
      },
      {
        h2: "5. Cameras and ports",
        body: ["Take a photo with both cameras, plug in a charger, plug in headphones (with adapter if needed)."],
      },
    ],
    cta: "Buying from us? We've already checked all of these. Browse in store.",
    related: ["used-phones-houston-tx", "refurbished-phones-houston-tx", "phone-unlocking-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "laptop-not-charging-houston-tx",
    title: "Laptop Not Charging? Here's What to Do",
    metaTitle: "Laptop Not Charging — Diagnose & Fix | GadgetX Repairs",
    metaDescription:
      "Laptop won't charge? Common causes & what GadgetX Repairs in Houston TX can fix — dead chargers to broken jacks. Free diagnostic!",
    excerpt: "Most no-charge problems boil down to four things. Here's how to diagnose yours.",
    intro:
      "Plug in your laptop and nothing happens. Before you buy a new charger or a new laptop, run through this list.",
    sections: [
      {
        h2: "1. Try a different outlet and cable",
        body: ["Sounds obvious, but loose outlets and broken cables are the #1 cause of 'laptop not charging.'"],
      },
      {
        h2: "2. Try a different charger if you have one",
        body: ["Laptop chargers fail more than people realize. Borrow one to confirm yours isn't the problem."],
      },
      {
        h2: "3. Inspect the charging jack",
        body: ["Look inside the charging port for bent pins, lint, or a wobbly connector. A loose jack often means the port has come unsoldered from the board."],
      },
      {
        h2: "4. The battery itself may be dead",
        body: ["If the laptop runs while plugged in but won't run on battery, the battery is dead. Replacement is usually $69–$129."],
      },
      {
        h2: "When to bring it in",
        body: ["If none of the above works, bring it in — most no-charge issues are charger, jack, or battery, all of which we fix in-house."],
      },
    ],
    cta: "Free laptop diagnostic in Houston — most no-charge fixes are same-day.",
    related: ["laptop-repair-houston-tx", "macbook-repair-houston-tx", "battery-replacement-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
  {
    slug: "xbox-hdmi-port-problems-houston-tx",
    title: "Xbox HDMI Port Problems — How We Fix Them",
    metaTitle: "Xbox HDMI Port Problems & Repair | GadgetX Repairs",
    metaDescription:
      "Xbox HDMI port loose or broken? GadgetX Repairs in Houston TX microsolders a new port — about $99, 24–72 hrs. Free quote!",
    excerpt: "Loose Xbox HDMI port? Broken HDMI socket? It's a microsolder fix — and almost always worth it.",
    intro:
      "Xbox HDMI port problems are one of the most common console issues we see. Here's the playbook.",
    sections: [
      {
        h2: "What it looks like",
        body: ["No signal on TV, intermittent flickering, or you can wiggle the HDMI cable and the picture comes back. The port is physically unsoldering from the board, usually after one too many tugs on the cable."],
      },
      {
        h2: "Why a new cable doesn't fix it",
        body: ["Because the problem isn't the cable — it's the port on the console. The pins inside the socket are no longer making solid contact with the board."],
      },
      {
        h2: "How we fix it",
        body: ["We open the Xbox, remove the broken HDMI socket via microsoldering, clean the pads, and reflow a new OEM-grade socket onto the board. The console is whole again."],
      },
      {
        h2: "Cost and turnaround",
        body: ["Around $99 in Houston, 24–72 hours. Same warranty as any console repair we do — 90 days."],
      },
    ],
    cta: "Bring your Xbox in for a free quote — most HDMI repairs done in 2–3 days.",
    related: ["xbox-repair-houston-tx", "hdmi-port-repair-houston-tx", "gaming-console-repair-houston-tx"],
    publishedDate: PUB,
    updatedDate: UPD,
  },
];

export const ARTICLES_BY_SLUG = Object.fromEntries(ARTICLES_DATA.map((a) => [a.slug, a])) as Record<string, ArticleData>;
