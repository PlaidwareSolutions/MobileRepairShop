export type AreaData = {
  slug: string;
  city: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; h1: string; subhead: string };
  driveTime: string;
  landmarks: string[];
  whyUs: string[];
};

const services = [
  "iPhone, Samsung, Pixel and Motorola repair",
  "iPad, MacBook and laptop repair",
  "PS5, Xbox and Nintendo Switch repair",
  "Phone unlocking and prepaid activations",
  "Used and refurbished phones for sale",
];

export const AREAS_DATA: AreaData[] = [
  {
    slug: "phone-repair-sugar-land-tx",
    city: "Sugar Land",
    title: "Phone Repair Sugar Land",
    metaTitle: "Phone Repair Sugar Land TX | OK Cellular (Humble)",
    metaDescription:
      "Phone, tablet, laptop & console repair for Sugar Land at OK Cellular in Humble TX. Same-day fixes, mail-in option, walk-ins welcome!",
    hero: {
      eyebrow: "Sugar Land",
      h1: "Phone & Device Repair for Sugar Land",
      subhead:
        "Sugar Land — same-day repair for cracked screens, dead batteries and broken consoles. Drive over for a free walk-in quote, or mail-in for door-to-door service.",
    },
    driveTime:
      "About 40–50 minutes via Beltway 8 / US-59 from Sugar Land to our Humble shop on Will Clayton Pkwy. Mail-in service available if the drive is too far.",
    landmarks: ["Sugar Land Town Square", "First Colony Mall", "Sugar Land Memorial Park"],
    whyUs: services,
  },
  {
    slug: "phone-repair-missouri-city-tx",
    city: "Missouri City",
    title: "Phone Repair Missouri City",
    metaTitle: "Phone Repair Missouri City TX | OK Cellular (Humble)",
    metaDescription:
      "Phone, tablet, laptop & console repair for Missouri City TX at OK Cellular in Humble. Same-day fixes, mail-in option, walk-ins welcome!",
    hero: {
      eyebrow: "Missouri City",
      h1: "Phone & Device Repair for Missouri City",
      subhead:
        "Same-day repair for Missouri City residents — drive up Beltway 8 for a walk-in fix, or mail your device in and we'll ship it back.",
    },
    driveTime:
      "About 45–55 minutes via Beltway 8 from Missouri City to our Humble shop on Will Clayton Pkwy. Mail-in service available.",
    landmarks: ["Quail Valley", "Sienna Plantation", "Riverstone"],
    whyUs: services,
  },
  {
    slug: "phone-repair-stafford-tx",
    city: "Stafford",
    title: "Phone Repair Stafford",
    metaTitle: "Phone Repair Stafford TX | OK Cellular (Humble)",
    metaDescription:
      "Phone, tablet, laptop & console repair for Stafford TX at OK Cellular in Humble. Same-day fixes, mail-in option, walk-ins welcome!",
    hero: {
      eyebrow: "Stafford",
      h1: "Phone & Device Repair for Stafford",
      subhead:
        "Stafford residents — same-day repair for phones, tablets, laptops and consoles. Drive up Beltway 8 or use our mail-in service.",
    },
    driveTime:
      "About 40–50 minutes via Beltway 8 from Stafford to our Humble shop on Will Clayton Pkwy. Mail-in service available.",
    landmarks: ["Stafford Centre", "Constellation Field area"],
    whyUs: services,
  },
  {
    slug: "phone-repair-katy-tx",
    city: "Katy",
    title: "Phone Repair Katy",
    metaTitle: "Phone Repair Katy TX | OK Cellular (Humble)",
    metaDescription:
      "Phone, tablet, laptop & console repair for Katy TX at OK Cellular in Humble — drive in for same-day or use our mail-in service. Walk-ins welcome!",
    hero: {
      eyebrow: "Katy",
      h1: "Phone & Device Repair for Katy",
      subhead:
        "We serve Katy with same-day repair for cracked screens, broken consoles and dead laptops. Drive across town or mail your device in.",
    },
    driveTime:
      "About 45–55 minutes via Beltway 8 N / I-10 E from Katy to our Humble shop on Will Clayton Pkwy. Mail-in service available.",
    landmarks: ["Katy Mills Mall", "LaCenterra at Cinco Ranch", "Cinco Ranch", "Cross Creek Ranch"],
    whyUs: services,
  },
  {
    slug: "phone-repair-alief-tx",
    city: "Alief",
    title: "Phone Repair Alief",
    metaTitle: "Phone Repair Alief Houston | OK Cellular (Humble)",
    metaDescription:
      "Same-day phone, tablet, laptop & console repair for Alief at OK Cellular in Humble TX. Drive in or mail-in. Walk-ins welcome!",
    hero: {
      eyebrow: "Alief",
      h1: "Phone & Device Repair for Alief",
      subhead:
        "Alief — same-day phone, tablet, laptop and console repair from $39. Drive up Beltway 8 or use our mail-in service.",
    },
    driveTime:
      "About 40–50 minutes via Beltway 8 from Alief to our Humble shop on Will Clayton Pkwy. Mail-in service available.",
    landmarks: ["Alief ISD area", "Alief Community Park", "PlazAmericas Mall"],
    whyUs: services,
  },
  {
    slug: "phone-repair-sharpstown-tx",
    city: "Sharpstown",
    title: "Phone Repair Sharpstown",
    metaTitle: "Phone Repair Sharpstown Houston | OK Cellular (Humble)",
    metaDescription:
      "Same-day phone, tablet, laptop & console repair for Sharpstown at OK Cellular in Humble TX. Drive in or mail-in. Walk-ins welcome!",
    hero: {
      eyebrow: "Sharpstown",
      h1: "Phone & Device Repair for Sharpstown",
      subhead:
        "Sharpstown — same-day repair for phones, tablets, laptops and consoles. Drive up Beltway 8 / US-59 or use our mail-in service.",
    },
    driveTime:
      "About 35–45 minutes via Beltway 8 / US-59 N from Sharpstown to our Humble shop on Will Clayton Pkwy. Mail-in service available.",
    landmarks: ["PlazAmericas Mall", "Sharpstown Park"],
    whyUs: services,
  },
];

export const AREAS_BY_SLUG = Object.fromEntries(AREAS_DATA.map((a) => [a.slug, a])) as Record<string, AreaData>;
