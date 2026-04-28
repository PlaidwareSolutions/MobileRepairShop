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
  { name: "AT&T Prepaid", logoSrc: CARRIER_LOGOS["AT&T Prepaid"], slug: "att-activation-houston-tx" },
  { name: "Boost Mobile", logoSrc: CARRIER_LOGOS["Boost Mobile"], slug: "boost-mobile-activation-houston-tx" },
  { name: "Verizon Prepaid", logoSrc: CARRIER_LOGOS["Verizon Prepaid"], slug: "verizon-prepaid-activation-houston-tx" },
  { name: "Xfinity Mobile", logoSrc: CARRIER_LOGOS["Xfinity Mobile"], slug: "xfinity-mobile-activation-houston-tx" },
  { name: "Gen Mobile", logoSrc: CARRIER_LOGOS["Gen Mobile"], slug: "gen-mobile-activation-houston-tx" },
  { name: "Simple Mobile", logoSrc: CARRIER_LOGOS["Simple Mobile"], slug: "simple-mobile-activation-houston-tx" },
  { name: "H2O Wireless", logoSrc: CARRIER_LOGOS["H2O Wireless"], slug: "h2o-wireless-activation-houston-tx" },
  { name: "Lyca Mobile", logoSrc: CARRIER_LOGOS["Lyca Mobile"], slug: "lyca-mobile-activation-houston-tx" },
];

const make = (carrier: string, slug: string, isPayment = false): PrepaidData => ({
  slug,
  carrier,
  title: isPayment
    ? `${carrier} Bill Payment Houston`
    : `${carrier} Activation Houston`,
  metaTitle: isPayment
    ? `${carrier} Bill Payment Houston | In-Store Cash | Gadget X`
    : `${carrier} Activation Houston | New Lines, Port-Ins | Gadget X`,
  metaDescription: isPayment
    ? `Pay your ${carrier} bill in cash at our Houston shop. Walk in, pay, and you're done. Open Sun 12–5, Mon–Sat 10–7.`
    : `New ${carrier} activation, port-ins and SIM swaps in Houston. Bring your phone or buy one in-store. Walk in any day.`,
  logoSrc: CARRIER_LOGOS[carrier],
  heroPhoto: isPayment ? CASH_PHOTO : SIM_PHOTO,
  hero: {
    eyebrow: isPayment ? `${carrier} Bill Pay` : `${carrier} Prepaid`,
    h1: isPayment ? `${carrier} Bill Payment in Houston` : `${carrier} Activation in Houston`,
    subhead: isPayment
      ? `Skip the online portal — pay your ${carrier} bill in cash at our Almeda Rd shop in minutes.`
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
  make("Prepaid", "phone-activation-houston-tx"),
  make("All carriers", "bill-payments-houston-tx", true),
  make("Boost Mobile", "boost-mobile-activation-houston-tx"),
  make("AT&T Prepaid", "att-activation-houston-tx"),
  make("Gen Mobile", "gen-mobile-activation-houston-tx"),
  make("Simple Mobile", "simple-mobile-activation-houston-tx"),
  make("Xfinity Mobile", "xfinity-mobile-activation-houston-tx"),
  make("H2O Wireless", "h2o-wireless-activation-houston-tx"),
  make("Lyca Mobile", "lyca-mobile-activation-houston-tx"),
  make("Verizon Prepaid", "verizon-prepaid-activation-houston-tx"),
];

PREPAID_DATA[0].title = "Prepaid Phone Activations in Houston";
PREPAID_DATA[0].metaTitle = "Prepaid Phone Activations Houston | All Carriers | Gadget X";
PREPAID_DATA[0].metaDescription =
  "Prepaid phone activations in Houston for Cricket, Metro by T-Mobile, T-Mobile, AT&T Prepaid, Boost, Gen Mobile, Simple Mobile, H2O, Lyca, Verizon Prepaid and more.";
PREPAID_DATA[0].hero.eyebrow = "Prepaid";
PREPAID_DATA[0].hero.h1 = "Prepaid Phone Activations in Houston";
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

PREPAID_DATA[1].title = "Bill Payments in Houston";
PREPAID_DATA[1].metaTitle = "Cell Phone Bill Payments Houston | Cash | Gadget X";
PREPAID_DATA[1].metaDescription =
  "Pay your prepaid cell phone bill in cash at our Houston shop. Cricket, Metro, T-Mobile, AT&T Prepaid, Boost, Xfinity Mobile, Lyca and more.";
PREPAID_DATA[1].hero.eyebrow = "Bill Payments";
PREPAID_DATA[1].hero.h1 = "Cell Phone Bill Payments in Houston";
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

export const PREPAID_BY_SLUG = Object.fromEntries(PREPAID_DATA.map((p) => [p.slug, p])) as Record<string, PrepaidData>;
