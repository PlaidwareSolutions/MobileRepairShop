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
    metaTitle: "Phone Repair Sugar Land | Gadget X Houston (15 min away)",
    metaDescription:
      "Phone, tablet, laptop and console repair for Sugar Land. Just 15 minutes from Sugar Land at our Almeda Rd Houston shop. Same day, walk in.",
    hero: {
      eyebrow: "Sugar Land",
      h1: "Phone & Device Repair for Sugar Land",
      subhead: "We're 15 minutes from Sugar Land — fast same-day repair for cracked screens, dead batteries, broken consoles and more.",
    },
    driveTime: "About 15 minutes via US-59 N / SH-288 N from Sugar Land to our Almeda Rd shop.",
    landmarks: ["Sugar Land Town Square", "First Colony Mall", "Sugar Land Memorial Park"],
    whyUs: services,
  },
  {
    slug: "phone-repair-missouri-city-tx",
    city: "Missouri City",
    title: "Phone Repair Missouri City",
    metaTitle: "Phone Repair Missouri City | Gadget X Houston",
    metaDescription:
      "Phone, tablet, laptop and console repair for Missouri City. Quick drive to our Almeda Rd Houston shop. Same-day repair, walk-ins welcome.",
    hero: {
      eyebrow: "Missouri City",
      h1: "Phone & Device Repair for Missouri City",
      subhead: "Convenient same-day repair for Missouri City residents — we're a short drive up FM-2234 / Beltway 8.",
    },
    driveTime: "About 15–20 minutes via FM-2234 / Beltway 8 from Missouri City to our Almeda Rd shop.",
    landmarks: ["Quail Valley", "Sienna Plantation", "Riverstone"],
    whyUs: services,
  },
  {
    slug: "phone-repair-stafford-tx",
    city: "Stafford",
    title: "Phone Repair Stafford",
    metaTitle: "Phone Repair Stafford TX | Gadget X Houston",
    metaDescription:
      "Phone, tablet, laptop and console repair for Stafford TX. Easy 15–20 minute drive to our Almeda Rd Houston shop. Same day, walk-ins welcome.",
    hero: {
      eyebrow: "Stafford",
      h1: "Phone & Device Repair for Stafford",
      subhead: "Stafford residents — we're a quick drive up US-59 N. Same-day repair for phones, tablets, laptops and consoles.",
    },
    driveTime: "About 15–20 minutes via US-59 N from Stafford to our Almeda Rd shop.",
    landmarks: ["Stafford Centre", "Constellation Field area"],
    whyUs: services,
  },
  {
    slug: "phone-repair-katy-tx",
    city: "Katy",
    title: "Phone Repair Katy",
    metaTitle: "Phone Repair Katy TX | Gadget X Houston",
    metaDescription:
      "Phone, tablet, laptop and console repair for Katy TX. Drop your device off at our Almeda Rd Houston shop. Same-day repair, walk-ins welcome.",
    hero: {
      eyebrow: "Katy",
      h1: "Phone & Device Repair for Katy",
      subhead: "We serve Katy with same-day repair for cracked screens, broken consoles, dead laptops and more.",
    },
    driveTime: "About 30–35 minutes via I-10 E and SH-288 S from Katy to our Almeda Rd shop.",
    landmarks: ["Katy Mills Mall", "LaCenterra at Cinco Ranch", "Cinco Ranch", "Cross Creek Ranch"],
    whyUs: services,
  },
  {
    slug: "phone-repair-alief-tx",
    city: "Alief",
    title: "Phone Repair Alief",
    metaTitle: "Phone Repair Alief Houston | Gadget X",
    metaDescription:
      "Same-day phone, tablet, laptop and console repair for Alief residents. Just minutes from Alief to our Almeda Rd Houston shop.",
    hero: {
      eyebrow: "Alief",
      h1: "Phone & Device Repair for Alief",
      subhead: "Alief — we're 15 minutes away. Same-day phone, tablet, laptop and console repair from $39.",
    },
    driveTime: "About 15 minutes via Bellfort Ave / Beltway 8 from Alief to our Almeda Rd shop.",
    landmarks: ["Alief ISD area", "Alief Community Park", "PlazAmericas Mall"],
    whyUs: services,
  },
  {
    slug: "phone-repair-sharpstown-tx",
    city: "Sharpstown",
    title: "Phone Repair Sharpstown",
    metaTitle: "Phone Repair Sharpstown Houston | Gadget X",
    metaDescription:
      "Same-day phone, tablet, laptop and console repair for Sharpstown residents. Quick drive south to our Almeda Rd Houston shop.",
    hero: {
      eyebrow: "Sharpstown",
      h1: "Phone & Device Repair for Sharpstown",
      subhead: "Sharpstown is 10–15 minutes from our Almeda Rd shop — walk-ins welcome any day.",
    },
    driveTime: "About 10–15 minutes via US-59 S / Bellaire Blvd from Sharpstown to our Almeda Rd shop.",
    landmarks: ["PlazAmericas Mall", "Sharpstown Park"],
    whyUs: services,
  },
];

export const AREAS_BY_SLUG = Object.fromEntries(AREAS_DATA.map((a) => [a.slug, a])) as Record<string, AreaData>;
