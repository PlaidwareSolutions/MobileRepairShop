import type { Photo } from "@/components/PhotoFrame";

export type PrepaidData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  carrier: string;
  logoSrc?: string;
  heroPhoto?: Photo;
  hero: { eyebrow: string; h1: string; subhead: string };
  services: string[];
  notes?: string[];
  faqs: { q: string; a: string }[];
};

const SIM_PHOTO: Photo = {
  src640: "/images/photos/sim-activation-640.jpg",
  src1024: "/images/photos/sim-activation-1024.jpg",
  alt: "Close-up of a hand holding a SIM card next to a smartphone tray, ready for activation.",
};

const CASH_PHOTO: Photo = {
  src640: "/images/photos/cash-payment-640.jpg",
  src1024: "/images/photos/cash-payment-1024.jpg",
  alt: "Close-up of a hand holding cash, ready to pay a phone bill in person.",
};

const CARRIER_LOGOS: Record<string, string> = {
  "Boost Mobile": "/images/carriers/boost-mobile.png",
  "AT&T Prepaid": "/images/carriers/att-prepaid.png",
  "Gen Mobile": "/images/carriers/gen-mobile.png",
  "Simple Mobile": "/images/carriers/simple-mobile.png",
  "Xfinity Mobile": "/images/carriers/xfinity-mobile.png",
  "H2O Wireless": "/images/carriers/h2o-wireless.png",
  "Lyca Mobile": "/images/carriers/lyca-mobile.png",
  "Verizon Prepaid": "/images/carriers/verizon.png",
  "Cricket Wireless": "/images/carriers/cricket.png",
  "Metro by T-Mobile": "/images/carriers/metro-by-tmobile.png",
  "T-Mobile": "/images/carriers/t-mobile.png",
};

export const ALL_CARRIERS: { name: string; logoSrc: string; slug?: string }[] = [
  { name: "Cricket Wireless", logoSrc: CARRIER_LOGOS["Cricket Wireless"] },
  { name: "Metro by T-Mobile", logoSrc: CARRIER_LOGOS["Metro by T-Mobile"] },
  { name: "T-Mobile", logoSrc: CARRIER_LOGOS["T-Mobile"] },
  { name: "AT&T Prepaid", logoSrc: CARRIER_LOGOS["AT&T Prepaid"], slug: "att-activation-humble-tx" },
  { name: "Boost Mobile", logoSrc: CARRIER_LOGOS["Boost Mobile"], slug: "boost-mobile-activation-humble-tx" },
  { name: "Verizon Prepaid", logoSrc: CARRIER_LOGOS["Verizon Prepaid"], slug: "verizon-prepaid-activation-humble-tx" },
  { name: "Xfinity Mobile", logoSrc: CARRIER_LOGOS["Xfinity Mobile"], slug: "xfinity-mobile-activation-humble-tx" },
  { name: "Gen Mobile", logoSrc: CARRIER_LOGOS["Gen Mobile"], slug: "gen-mobile-activation-humble-tx" },
  { name: "Simple Mobile", logoSrc: CARRIER_LOGOS["Simple Mobile"], slug: "simple-mobile-activation-humble-tx" },
  { name: "H2O Wireless", logoSrc: CARRIER_LOGOS["H2O Wireless"], slug: "h2o-wireless-activation-humble-tx" },
  { name: "Lyca Mobile", logoSrc: CARRIER_LOGOS["Lyca Mobile"], slug: "lyca-mobile-activation-humble-tx" },
];

const make = (carrier: string, slug: string, isPayment = false): PrepaidData => ({
  slug,
  carrier,
  title: isPayment
    ? `${carrier} Bill Payment Humble`
    : `${carrier} Activation Humble`,
  metaTitle: isPayment
    ? `${carrier} Bill Payment Humble | In-Store Cash | OK Cellular`
    : `${carrier} Activation Humble | New Lines, Port-Ins | OK Cellular`,
  metaDescription: isPayment
    ? `Pay your ${carrier} bill in cash at our Humble shop. Walk in, pay, and you're done. Open Sun 11–7:30, Mon–Sat 10–8:30.`
    : `New ${carrier} activation, port-ins and SIM swaps in Humble. Bring your phone or buy one in-store. Walk in any day.`,
  logoSrc: CARRIER_LOGOS[carrier],
  heroPhoto: isPayment ? CASH_PHOTO : SIM_PHOTO,
  hero: {
    eyebrow: isPayment ? `${carrier} Bill Pay` : `${carrier} Prepaid`,
    h1: isPayment ? `${carrier} Bill Payment in Humble` : `${carrier} Activation in Humble`,
    subhead: isPayment
      ? `Skip the online portal — pay your ${carrier} bill in cash at our Will Clayton Pkwy shop in minutes.`
      : `New ${carrier} line, transfer your number from another carrier, or swap a SIM card — done in store, same visit.`,
  },
  services: isPayment
    ? [
        `Pay your ${carrier} bill with cash`,
        "Avoid online or app fees",
        "Same-day reactivation",
        "We can also activate new lines and ports",
      ]
    : [
        `New ${carrier} prepaid line`,
        "Port your number from another carrier",
        "Physical and eSIM activations",
        "Phone configuration done for you",
        "Plan recommendation based on your usage",
      ],
  faqs: isPayment
    ? [
        { q: `What do I need to bring to pay my ${carrier} bill?`, a: "Just your phone number or account number, and the cash amount you want to pay." },
        { q: "Is there a service fee?", a: "We charge a small service fee that's almost always less than the carrier's online convenience fee." },
      ]
    : [
        { q: `Can you transfer my number to ${carrier}?`, a: "Yes — bring your existing phone, the SIM/account info, and an ID. Most ports complete in 1–2 hours." },
        { q: `Do you sell ${carrier} phones?`, a: "We sell new and unlocked phones that work on most carriers, including ${carrier}." },
      ],
});

export const PREPAID_DATA: PrepaidData[] = [
  make("Prepaid", "phone-activation-humble-tx"),
  make("All carriers", "bill-payments-humble-tx", true),
  make("Boost Mobile", "boost-mobile-activation-humble-tx"),
  make("AT&T Prepaid", "att-activation-humble-tx"),
  make("Gen Mobile", "gen-mobile-activation-humble-tx"),
  make("Simple Mobile", "simple-mobile-activation-humble-tx"),
  make("Xfinity Mobile", "xfinity-mobile-activation-humble-tx"),
  make("H2O Wireless", "h2o-wireless-activation-humble-tx"),
  make("Lyca Mobile", "lyca-mobile-activation-humble-tx"),
  make("Verizon Prepaid", "verizon-prepaid-activation-humble-tx"),
];

PREPAID_DATA[0].title = "Prepaid Phone Activations in Humble";
PREPAID_DATA[0].metaTitle = "Phone Activation Humble TX | OK Cellular";
PREPAID_DATA[0].metaDescription =
  "Quick phone & carrier activation in Humble TX. Boost Mobile, AT&T, Verizon & more. Fast setup at OK Cellular. Walk-ins welcome.";
PREPAID_DATA[0].hero.eyebrow = "Prepaid";
PREPAID_DATA[0].hero.h1 = "Prepaid Phone Activations in Humble";
PREPAID_DATA[0].hero.subhead = "We activate every major prepaid carrier — bring your phone or buy one from us.";
PREPAID_DATA[0].logoSrc = undefined;
PREPAID_DATA[0].heroPhoto = SIM_PHOTO;
PREPAID_DATA[0].services = [
  "Cricket Wireless activations & ports",
  "Metro by T-Mobile activations & ports",
  "T-Mobile prepaid",
  "AT&T Prepaid",
  "Boost Mobile",
  "Gen Mobile",
  "Simple Mobile",
  "Xfinity Mobile",
  "H2O Wireless",
  "Lyca Mobile",
  "Verizon Prepaid",
];
PREPAID_DATA[0].faqs = [
  { q: "Which prepaid carrier should I pick?", a: "We help you compare based on your data needs, coverage where you live and work, and budget. No commission — we recommend honestly." },
  { q: "Can you port my number?", a: "Yes — most ports complete in 1–2 hours. Bring your old SIM, account info or phone, and a photo ID." },
];

PREPAID_DATA[1].title = "Bill Payments in Humble";
PREPAID_DATA[1].metaTitle = "Bill Payments Humble TX | OK Cellular";
PREPAID_DATA[1].metaDescription =
  "Pay your phone bill conveniently at OK Cellular in Humble TX. Multiple carriers accepted. Fast, hassle-free bill payment. Walk-ins welcome!";
PREPAID_DATA[1].hero.eyebrow = "Bill Payments";
PREPAID_DATA[1].hero.h1 = "Cell Phone Bill Payments in Humble";
PREPAID_DATA[1].hero.subhead =
  "Skip the app — bring cash. We accept payments for every major prepaid carrier and most resellers.";
PREPAID_DATA[1].logoSrc = undefined;
PREPAID_DATA[1].heroPhoto = CASH_PHOTO;
PREPAID_DATA[1].services = [
  "Cash payments for all major prepaid carriers",
  "Same-day reactivation",
  "Account lookup by phone number",
  "Receipt provided",
];

const META_OVERRIDES: Record<string, { metaTitle: string; metaDescription: string }> = {
  "boost-mobile-activation-humble-tx": {
    metaTitle: "Boost Mobile Activation Humble TX | OK Cellular",
    metaDescription:
      "Activate your Boost Mobile plan in Humble TX. Fast, hassle-free setup at OK Cellular. New activations & plan upgrades. Walk-ins welcome!",
  },
  "att-activation-humble-tx": {
    metaTitle: "AT&T Activation Humble TX | OK Cellular",
    metaDescription:
      "Get your AT&T plan activated fast in Humble TX. New lines, upgrades & prepaid plans available. Quick setup at OK Cellular. Walk-ins welcome!",
  },
  "gen-mobile-activation-humble-tx": {
    metaTitle: "Gen Mobile Activation Humble TX | OK Cellular",
    metaDescription:
      "Activate your Gen Mobile plan in Humble TX. Fast & easy setup at OK Cellular. New activations & plan changes. Walk-ins welcome.",
  },
  "simple-mobile-activation-humble-tx": {
    metaTitle: "Simple Mobile Activation Humble TX | OK Cellular",
    metaDescription:
      "Simple Mobile activation in Humble TX. Get your plan set up fast at OK Cellular. New lines & upgrades. Walk-ins welcome anytime!",
  },
  "xfinity-mobile-activation-humble-tx": {
    metaTitle: "Xfinity Mobile Activation Humble TX | OK Cellular",
    metaDescription:
      "Activate your Xfinity Mobile plan in Humble TX. Fast & easy setup at OK Cellular. New activations & plan upgrades. Walk-ins welcome!",
  },
  "h2o-wireless-activation-humble-tx": {
    metaTitle: "H2O Wireless Activation Humble TX | OK Cellular",
    metaDescription:
      "Activate your H2O Wireless plan in Humble TX. Quick & easy setup at OK Cellular. New activations & plan changes. Walk-ins welcome!",
  },
  "lyca-mobile-activation-humble-tx": {
    metaTitle: "Lyca Mobile Activation Humble TX | OK Cellular",
    metaDescription:
      "Lyca Mobile activation in Humble TX. Fast, hassle-free plan setup at OK Cellular. New lines & upgrades available. Walk-ins welcome!",
  },
  "verizon-prepaid-activation-humble-tx": {
    metaTitle: "Verizon Prepaid Activation Humble TX | OK Cellular",
    metaDescription:
      "Activate your Verizon Prepaid plan in Humble TX. Quick & easy setup at OK Cellular. New activations & upgrades. Walk-ins welcome.",
  },
};

for (const entry of PREPAID_DATA) {
  const ov = META_OVERRIDES[entry.slug];
  if (ov) {
    entry.metaTitle = ov.metaTitle;
    entry.metaDescription = ov.metaDescription;
  }
}

export const PREPAID_BY_SLUG = Object.fromEntries(PREPAID_DATA.map((p) => [p.slug, p])) as Record<string, PrepaidData>;
