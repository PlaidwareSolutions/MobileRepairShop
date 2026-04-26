export type ServiceData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  hero: { eyebrow: string; h1: string; subhead: string };
  problems: string[];
  brands?: string[];
  process: { step: string; detail: string }[];
  pricing: { label: string; price: string; note?: string }[];
  faqs: { q: string; a: string }[];
  serviceType: string;
  related: string[];
};

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "phone-repair-houston-tx",
    title: "Phone Repair Houston",
    metaTitle: "Phone Repair Houston, TX | Same-Day Cellphone Fix | Gadget X",
    metaDescription:
      "Same-day phone repair in Houston for iPhone, Samsung, Google Pixel, Motorola and more. Screen, battery, charging port, water damage. 90-day warranty. Walk in or call (346) 623-6898.",
    hero: {
      eyebrow: "Cellphone Repair",
      h1: "Phone Repair in Houston",
      subhead:
        "Whatever brand, whatever the damage — we fix phones the same day. 15 years repairing Houston's devices from our Almeda Rd shop.",
    },
    problems: [
      "Cracked or shattered screen",
      "Battery that dies fast or won't charge",
      "Charging port loose or not detecting cable",
      "Water or liquid damage",
      "Front or rear camera not working",
      "Speaker, mic or earpiece issues",
      "Phone stuck in boot loop or won't turn on",
      "Buttons stuck or unresponsive",
    ],
    brands: ["Apple iPhone", "Samsung Galaxy", "Google Pixel", "Motorola", "OnePlus", "TCL", "T-Mobile Revvl"],
    process: [
      { step: "Free diagnostic", detail: "Bring it in or call. We tell you what's wrong and what it costs before any work begins." },
      { step: "Same-day repair", detail: "Most phone repairs are done in 30–90 minutes while you wait." },
      { step: "Quality parts", detail: "OEM-grade screens, batteries and parts — no bargain knockoffs." },
      { step: "90-day warranty", detail: "If our repair fails, we make it right. Period." },
    ],
    pricing: [
      { label: "Phone screen replacement", price: "from $69", note: "Glass + LCD/OLED. Most models." },
      { label: "Battery replacement", price: "from $49" },
      { label: "Charging port repair", price: "from $59" },
      { label: "Water damage diagnostic", price: "$25 (waived if repaired)" },
      { label: "Camera replacement", price: "from $69" },
    ],
    faqs: [
      { q: "How long does phone repair take?", a: "Screen and battery replacements are usually done in 30–60 minutes. More complex board work may take 1–3 business days." },
      { q: "Do you fix water-damaged phones?", a: "Yes — bring it in fast and powered off. We charge a flat $25 diagnostic that's waived if you proceed with the repair." },
      { q: "Do I need an appointment?", a: "Walk-ins are always welcome. If you want a guaranteed slot, call ahead at (346) 623-6898." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-houston-tx", "samsung-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "iphone-repair-houston-tx",
    title: "iPhone Repair Houston",
    metaTitle: "iPhone Repair Houston | Screen, Battery, Port — Same Day | Gadget X",
    metaDescription:
      "Same-day iPhone repair in Houston for every model from iPhone 6 through iPhone 16 Pro Max. Screen, battery, charging port, camera, back glass. 90-day warranty.",
    hero: {
      eyebrow: "Apple iPhone Repair",
      h1: "iPhone Repair in Houston, TX",
      subhead:
        "Cracked screen, swollen battery, dead Lightning or USB-C port — we repair every iPhone model, same day, from our shop on Almeda Rd.",
    },
    problems: [
      "Cracked screen, dead pixels or no display",
      "True Tone or Face ID not working after a previous repair",
      "Battery health dropped, swollen battery",
      "Lightning / USB-C port not charging or loose",
      "Front camera, rear camera or flashlight failed",
      "Earpiece, loudspeaker or microphone weak",
      "Back glass cracked",
      "Won't turn on, stuck on Apple logo, recovery loop",
    ],
    brands: [
      "iPhone 6 / 6s / 6 Plus",
      "iPhone 7 / 7 Plus",
      "iPhone 8 / 8 Plus / SE",
      "iPhone X / XR / XS / XS Max",
      "iPhone 11 / 11 Pro / Pro Max",
      "iPhone 12 / mini / Pro / Pro Max",
      "iPhone 13 / mini / Pro / Pro Max",
      "iPhone 14 / Plus / Pro / Pro Max",
      "iPhone 15 / Plus / Pro / Pro Max",
      "iPhone 16 / Plus / Pro / Pro Max",
    ],
    process: [
      { step: "Free quote", detail: "Tell us your model and the symptom. We give you a firm price." },
      { step: "Same-day fix", detail: "Most iPhone screens and batteries done in 30–60 minutes." },
      { step: "Quality parts", detail: "OEM-grade screens preserve True Tone where possible." },
      { step: "90-day warranty", detail: "We back every iPhone repair." },
    ],
    pricing: [
      { label: "iPhone screen replacement", price: "from $79", note: "Older models. Pro / Pro Max higher." },
      { label: "iPhone battery replacement", price: "from $49" },
      { label: "iPhone charging port", price: "from $69" },
      { label: "iPhone back glass", price: "from $89" },
      { label: "iPhone camera", price: "from $79" },
    ],
    faqs: [
      { q: "Does iPhone screen repair void my warranty?", a: "Apple's standard warranty is generally only valid for one year and most iPhones we see are out of warranty. We use OEM-grade parts and back our repair with a 90-day guarantee." },
      { q: "Will Face ID still work after screen repair?", a: "On most models we can preserve Face ID. Some models require a transferred component to keep it functioning — we tell you up front." },
      { q: "Can you fix a swollen iPhone battery?", a: "Yes — and you should not keep using a phone with a swollen battery. Power it off and bring it in." },
    ],
    serviceType: "screen-repair",
    related: ["battery-replacement-houston-tx", "phone-repair-houston-tx", "tablet-repair-houston-tx"],
  },
  {
    slug: "samsung-repair-houston-tx",
    title: "Samsung Phone Repair Houston",
    metaTitle: "Samsung Galaxy Repair Houston | Screen, Battery, Port | Gadget X",
    metaDescription:
      "Same-day Samsung Galaxy repair in Houston. Galaxy S, Note, A and Z series. Cracked screen, battery, charging port, back glass. 90-day warranty. Call (346) 623-6898.",
    hero: {
      eyebrow: "Samsung Galaxy Repair",
      h1: "Samsung Galaxy Repair in Houston",
      subhead:
        "From budget A-series to flagship S Ultra and Z Fold, we repair every Galaxy model with quality parts and a 90-day warranty.",
    },
    problems: [
      "Cracked AMOLED display or green/pink lines",
      "Battery drains fast, won't hold charge",
      "USB-C port loose or won't charge",
      "Back glass shattered",
      "Cameras not focusing",
      "Won't power on or boot loop",
      "Z Fold / Z Flip hinge or inner-screen damage",
    ],
    brands: ["Galaxy S series", "Galaxy Note series", "Galaxy A series", "Galaxy Z Fold / Flip", "Galaxy J & M series"],
    process: [
      { step: "Free diagnostic", detail: "Tell us the model and symptom for a same-day quote." },
      { step: "Same-day fix", detail: "Most Galaxy screens and batteries done in 1–2 hours." },
      { step: "Quality AMOLED parts", detail: "We source AMOLED panels that match factory color and brightness." },
      { step: "90-day warranty", detail: "Every Samsung repair backed by our 90-day guarantee." },
    ],
    pricing: [
      { label: "Galaxy screen (A-series)", price: "from $99" },
      { label: "Galaxy screen (S-series)", price: "from $179" },
      { label: "Galaxy battery", price: "from $59" },
      { label: "Charging port", price: "from $69" },
      { label: "Back glass", price: "from $79" },
    ],
    faqs: [
      { q: "Do you repair Galaxy Z Fold inner screens?", a: "Yes. Inner foldable screens are pricier than rigid AMOLED — we'll quote your specific model after diagnostic." },
      { q: "Will the fingerprint sensor still work after a Samsung screen repair?", a: "On most models, yes. We calibrate the in-display sensor as part of the repair." },
    ],
    serviceType: "screen-repair",
    related: ["phone-repair-houston-tx", "battery-replacement-houston-tx", "google-pixel-repair-houston-tx"],
  },
  {
    slug: "google-pixel-repair-houston-tx",
    title: "Google Pixel Repair Houston",
    metaTitle: "Google Pixel Repair Houston | Screen, Battery, Port | Gadget X",
    metaDescription:
      "Same-day Google Pixel repair in Houston. Pixel 3 through Pixel 9 Pro. Screen, battery, charging port, back glass. 90-day warranty.",
    hero: {
      eyebrow: "Google Pixel Repair",
      h1: "Google Pixel Repair in Houston",
      subhead:
        "We repair every Pixel from Pixel 3 to the latest Pixel 9 Pro — screen, battery, charging port and more, same day.",
    },
    problems: ["Cracked display", "Battery health failing", "USB-C port loose", "Back glass cracked", "Camera failed", "No power"],
    brands: ["Pixel 3 / 3 XL / 3a", "Pixel 4 / 4 XL / 4a", "Pixel 5 / 5a", "Pixel 6 / 6 Pro / 6a", "Pixel 7 / 7 Pro / 7a", "Pixel 8 / 8 Pro / 8a", "Pixel 9 / 9 Pro"],
    process: [
      { step: "Free diagnostic", detail: "We test the device and quote you in minutes." },
      { step: "Same-day repair", detail: "Most Pixel screens and batteries done in 1–2 hours." },
      { step: "Quality parts", detail: "OEM-grade OLEDs and batteries." },
      { step: "90-day warranty", detail: "All Pixel repairs warrantied." },
    ],
    pricing: [
      { label: "Pixel screen replacement", price: "from $129" },
      { label: "Pixel battery", price: "from $59" },
      { label: "Charging port", price: "from $69" },
    ],
    faqs: [
      { q: "Can you repair a Pixel that won't turn on?", a: "Yes — bring it in for a free diagnostic. Most no-power issues come down to battery, charging port or board-level work, all of which we handle." },
    ],
    serviceType: "screen-repair",
    related: ["phone-repair-houston-tx", "samsung-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "motorola-repair-houston-tx",
    title: "Motorola Phone Repair Houston",
    metaTitle: "Motorola Phone Repair Houston | Moto G, Edge, Razr | Gadget X",
    metaDescription:
      "Same-day Motorola repair in Houston. Moto G, Moto E, Edge and Razr. Screen, battery, charging port repair. 90-day warranty.",
    hero: {
      eyebrow: "Motorola Repair",
      h1: "Motorola Phone Repair in Houston",
      subhead:
        "Moto G, Moto E, Edge, Razr — we fix every Motorola, including the popular prepaid models, same day.",
    },
    problems: ["Cracked screen", "Battery won't hold charge", "USB-C charging port loose", "No power", "Speaker / mic failure", "Razr foldable hinge or inner screen"],
    brands: ["Moto G series", "Moto G Power", "Moto G Stylus", "Moto E series", "Edge series", "Razr foldable"],
    process: [
      { step: "Free diagnostic", detail: "Quick check, firm quote." },
      { step: "Same-day fix", detail: "Screens and batteries usually 1–2 hours." },
      { step: "Quality parts", detail: "OEM-grade replacements." },
      { step: "90-day warranty", detail: "Backed by our standard warranty." },
    ],
    pricing: [
      { label: "Moto screen replacement", price: "from $89" },
      { label: "Moto battery", price: "from $49" },
      { label: "Charging port", price: "from $59" },
    ],
    faqs: [
      { q: "Do you fix Razr foldable screens?", a: "Yes. The inner foldable display is more expensive than a rigid Moto screen — we quote on the spot after diagnostic." },
    ],
    serviceType: "screen-repair",
    related: ["phone-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "tablet-repair-houston-tx",
    title: "iPad & Tablet Repair Houston",
    metaTitle: "iPad & Tablet Repair Houston | Glass, LCD, Battery | Gadget X",
    metaDescription:
      "iPad, Galaxy Tab, Amazon Fire and Lenovo tablet repair in Houston. Glass, LCD, charging port and battery replacement. 90-day warranty.",
    hero: {
      eyebrow: "Tablet Repair",
      h1: "iPad & Tablet Repair in Houston",
      subhead:
        "Cracked glass, dead LCD, weak battery, broken Lightning or USB-C port — we repair every major tablet at our Houston shop.",
    },
    problems: ["Cracked front glass", "Dead or lined LCD", "Battery worn out", "Charging port loose or won't charge", "Home button not working", "Stuck on logo / no power"],
    brands: ["iPad / iPad Air / iPad mini / iPad Pro", "Samsung Galaxy Tab", "Amazon Fire HD", "Lenovo Tab", "Microsoft Surface (select models)"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs. We quote first, then proceed." },
      { step: "Same-day or next-day", detail: "Many iPad and Galaxy Tab repairs are done same day." },
      { step: "Quality parts", detail: "OEM-grade glass, LCD and batteries." },
      { step: "90-day warranty", detail: "All tablet repairs warrantied." },
    ],
    pricing: [
      { label: "iPad glass-only", price: "from $99" },
      { label: "iPad LCD + glass", price: "from $169" },
      { label: "Tablet battery", price: "from $69" },
      { label: "Charging port", price: "from $79" },
    ],
    faqs: [
      { q: "Can you do glass-only on an iPad?", a: "On most iPad models with separate glass and LCD, yes. On newer fused-display iPad Pros, the entire assembly must be replaced." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "laptop-repair-houston-tx",
    title: "Laptop Repair Houston",
    metaTitle: "Laptop Repair Houston | Screen, Battery, Keyboard | Gadget X",
    metaDescription:
      "Houston laptop repair for HP, Dell, Lenovo, ASUS, Acer and more. Screen, keyboard, battery, charging port and motherboard repair.",
    hero: {
      eyebrow: "Laptop Repair",
      h1: "Laptop Repair in Houston",
      subhead:
        "We repair every major laptop brand — Windows, Chromebook, even older systems — from screen swaps to motherboard work.",
    },
    problems: [
      "Cracked or black laptop screen",
      "Won't turn on or shows blue/black screen",
      "Battery won't charge or holds no charge",
      "Keys stuck, missing or whole keyboard dead",
      "Trackpad not responding",
      "Loud fan, overheating, random shutdowns",
      "Liquid spill",
      "Slow Windows / virus / data recovery",
    ],
    brands: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "Toshiba", "MSI", "Razer", "Microsoft Surface"],
    process: [
      { step: "Diagnostic", detail: "We confirm the issue first — no guesswork charges." },
      { step: "Same-day where possible", detail: "Screens and batteries often same day; motherboard work 2–5 days." },
      { step: "Quality parts", detail: "OEM-grade screens, batteries and keyboards." },
      { step: "90-day warranty", detail: "All laptop repairs warrantied." },
    ],
    pricing: [
      { label: "Laptop screen replacement", price: "from $99" },
      { label: "Laptop battery", price: "from $69" },
      { label: "Keyboard replacement", price: "from $89" },
      { label: "Power jack repair", price: "from $79" },
      { label: "Diagnostic + tune-up", price: "$49" },
    ],
    faqs: [
      { q: "Do you repair liquid-damaged laptops?", a: "Yes — bring it in powered off. Liquid damage is highly variable; we open and clean the board, then quote based on what's salvageable." },
      { q: "Can you recover data from a dead laptop?", a: "In most cases yes. We can pull data from the drive even if the laptop won't boot." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["macbook-repair-houston-tx", "computer-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "computer-repair-houston-tx",
    title: "Computer Repair Houston",
    metaTitle: "Computer Repair Houston | Desktop, Laptop, PC Tune-Up | Gadget X",
    metaDescription:
      "Computer repair in Houston for desktops, laptops and all-in-ones. Slow PC, virus removal, hardware upgrades, no-boot diagnostics. Walk in any day.",
    hero: {
      eyebrow: "Computer Repair",
      h1: "Computer Repair in Houston",
      subhead:
        "Slow Windows, virus, no boot, dead power supply, failed hard drive — we diagnose and repair desktops, laptops and all-in-ones.",
    },
    problems: ["Slow PC, freezing, crashing", "Virus / malware / pop-ups", "No boot, blue screen, no power", "Failed hard drive — data recovery", "Hardware upgrade — RAM, SSD, GPU", "Wi-Fi or networking issues"],
    brands: ["Custom builds", "HP, Dell, Lenovo desktops", "iMac and MacBook"],
    process: [
      { step: "Diagnostic", detail: "$49 flat fee, applied to repair if you proceed." },
      { step: "Quote first", detail: "We always tell you the cost before doing the work." },
      { step: "Quality parts", detail: "OEM and reputable third-party components." },
      { step: "90-day warranty", detail: "All computer repairs warrantied." },
    ],
    pricing: [
      { label: "PC tune-up + virus removal", price: "from $79" },
      { label: "SSD upgrade + clone", price: "from $149" },
      { label: "Power supply replacement", price: "from $89" },
      { label: "Diagnostic", price: "$49" },
    ],
    faqs: [
      { q: "Can you build a custom PC?", a: "We can spec, source and assemble a custom desktop. Pricing depends on the parts list — bring us your budget and target use." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-houston-tx", "macbook-repair-houston-tx"],
  },
  {
    slug: "macbook-repair-houston-tx",
    title: "MacBook Repair Houston",
    metaTitle: "MacBook Repair Houston | Screen, Battery, Logic Board | Gadget X",
    metaDescription:
      "MacBook repair in Houston for MacBook Air, MacBook Pro and MacBook. Screen, keyboard, battery, logic board and liquid damage. 90-day warranty.",
    hero: {
      eyebrow: "Apple Laptop Repair",
      h1: "MacBook Repair in Houston",
      subhead:
        "MacBook Air, MacBook Pro and older MacBooks — Intel and Apple Silicon. Screen, battery, keyboard, logic board, spill cleanup.",
    },
    problems: ["Cracked Retina display", "Battery health degraded or swollen", "Keyboard or trackpad failure", "Won't turn on / no chime", "Liquid spill", "Stuck on Apple logo or kernel panic"],
    brands: ["MacBook Air (M1, M2, M3, Intel)", "MacBook Pro 13/14/15/16 (M-series and Intel)", "MacBook Retina 12"],
    process: [
      { step: "Free quote", detail: "Tell us your model and symptom — we'll quote in minutes." },
      { step: "Most repairs 1–3 days", detail: "Some logic-board work takes longer; we keep you updated." },
      { step: "Quality parts", detail: "OEM-grade displays, batteries and keyboards." },
      { step: "90-day warranty", detail: "All MacBook repairs warrantied." },
    ],
    pricing: [
      { label: "MacBook battery", price: "from $129" },
      { label: "MacBook screen", price: "from $349" },
      { label: "MacBook keyboard", price: "from $199" },
      { label: "Logic-board diagnostic", price: "$79" },
    ],
    faqs: [
      { q: "Do you repair Apple Silicon MacBooks?", a: "Yes — M1, M2 and M3 MacBook Air and MacBook Pro screens, batteries and keyboards are all repairable in our shop." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-houston-tx", "battery-replacement-houston-tx"],
  },
  {
    slug: "hp-laptop-repair-houston-tx",
    title: "HP Laptop Repair Houston",
    metaTitle: "HP Laptop Repair Houston | Pavilion, Envy, Elitebook | Gadget X",
    metaDescription:
      "HP laptop repair in Houston for Pavilion, Envy, Elitebook, Spectre, Probook and HP Stream. Screen, battery, keyboard, charging port.",
    hero: {
      eyebrow: "HP Laptop Repair",
      h1: "HP Laptop Repair in Houston",
      subhead:
        "We repair every major HP laptop family — Pavilion, Envy, Elitebook, Spectre, Probook, and HP Stream — with quality parts and 90-day warranty.",
    },
    problems: ["Cracked screen", "Won't power on", "Battery dead or swollen", "Keyboard keys not working", "Charging jack loose", "Overheating / loud fan"],
    brands: ["HP Pavilion", "HP Envy", "HP Spectre", "HP Elitebook", "HP Probook", "HP Stream", "HP Omen"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "Same-day where possible", detail: "Most HP screens / batteries done in a day." },
      { step: "Quality parts", detail: "OEM-grade replacements." },
      { step: "90-day warranty", detail: "All HP laptop repairs warrantied." },
    ],
    pricing: [
      { label: "HP laptop screen", price: "from $99" },
      { label: "HP battery", price: "from $69" },
      { label: "HP keyboard", price: "from $89" },
      { label: "Charging jack", price: "from $79" },
    ],
    faqs: [
      { q: "Can you fix an HP laptop that won't turn on?", a: "Yes — most no-power issues come down to charging jack, battery, or motherboard. We diagnose first, then quote." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-houston-tx", "computer-repair-houston-tx"],
  },
  {
    slug: "dell-laptop-repair-houston-tx",
    title: "Dell Laptop Repair Houston",
    metaTitle: "Dell Laptop Repair Houston | Latitude, Inspiron, XPS | Gadget X",
    metaDescription:
      "Dell laptop repair in Houston for Latitude, Inspiron, XPS, Precision and Vostro. Screen, battery, keyboard, motherboard.",
    hero: {
      eyebrow: "Dell Laptop Repair",
      h1: "Dell Laptop Repair in Houston",
      subhead:
        "Latitude, Inspiron, XPS, Precision, Vostro — every Dell line repaired in our Houston shop.",
    },
    problems: ["Black or cracked screen", "No boot", "Battery worn out", "Keyboard / trackpad failure", "Charging port loose", "Hard-drive failure"],
    brands: ["Dell Latitude", "Dell Inspiron", "Dell XPS", "Dell Precision", "Dell Vostro", "Dell Alienware"],
    process: [
      { step: "Diagnostic", detail: "We confirm the issue first." },
      { step: "Same-day where possible", detail: "Screens and batteries usually 1 day." },
      { step: "Quality parts", detail: "OEM-grade replacements." },
      { step: "90-day warranty", detail: "All Dell laptop repairs warrantied." },
    ],
    pricing: [
      { label: "Dell laptop screen", price: "from $109" },
      { label: "Dell battery", price: "from $79" },
      { label: "Keyboard", price: "from $89" },
    ],
    faqs: [
      { q: "Can you replace a Dell XPS touchscreen?", a: "Yes. XPS touch displays are higher-cost than non-touch — we'll quote based on your exact model." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-houston-tx", "computer-repair-houston-tx"],
  },
  {
    slug: "lenovo-laptop-repair-houston-tx",
    title: "Lenovo Laptop Repair Houston",
    metaTitle: "Lenovo Laptop Repair Houston | ThinkPad, IdeaPad, Yoga | Gadget X",
    metaDescription:
      "Lenovo laptop repair in Houston. ThinkPad, IdeaPad, Yoga, Legion and Chromebooks. Screen, battery, keyboard, charging port.",
    hero: {
      eyebrow: "Lenovo Repair",
      h1: "Lenovo Laptop Repair in Houston",
      subhead:
        "ThinkPad, IdeaPad, Yoga 2-in-1, Legion gaming and Chromebooks — every Lenovo we see, we repair.",
    },
    problems: ["Cracked or dead screen", "Battery degraded", "Hinge broken or wobbly", "Keyboard not working", "Charging not detecting", "Slow boot / Windows issue"],
    brands: ["ThinkPad", "IdeaPad", "Yoga 2-in-1", "Legion gaming", "Lenovo Chromebook"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "Same-day where possible", detail: "Most screens, batteries and keyboards done in a day." },
      { step: "Quality parts", detail: "OEM-grade replacements." },
      { step: "90-day warranty", detail: "All Lenovo repairs warrantied." },
    ],
    pricing: [
      { label: "Lenovo laptop screen", price: "from $99" },
      { label: "Lenovo battery", price: "from $69" },
      { label: "Hinge replacement", price: "from $89" },
    ],
    faqs: [
      { q: "Do you fix Lenovo Yoga 360 hinges?", a: "Yes. Hinge failures are common on 2-in-1 Yogas. We replace the hinge assembly and reinforce the surrounding plastics." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-houston-tx", "computer-repair-houston-tx"],
  },
  {
    slug: "gaming-console-repair-houston-tx",
    title: "Gaming Console Repair Houston",
    metaTitle: "Gaming Console Repair Houston | PS5, Xbox, Switch | Gadget X",
    metaDescription:
      "Gaming console repair in Houston for PS5, PS4, Xbox Series X/S, Xbox One, Nintendo Switch and Switch OLED. HDMI port, disc drive, no power, controllers.",
    hero: {
      eyebrow: "Console Repair",
      h1: "Gaming Console Repair in Houston",
      subhead:
        "PlayStation, Xbox and Nintendo Switch — broken HDMI, won't read discs, won't power on, overheating, controller failure. We fix it.",
    },
    problems: ["No video output / broken HDMI port", "Won't read or eject discs", "Won't turn on or shuts down randomly", "Overheating / loud fan", "Controller drift, broken triggers, failed buttons", "Switch joycon drift", "Switch won't dock"],
    brands: ["PS5 / PS4 / PS4 Pro / PS4 Slim", "Xbox Series X / Series S", "Xbox One / One S / One X", "Nintendo Switch / Switch OLED / Switch Lite"],
    process: [
      { step: "Diagnostic", detail: "$25 flat — waived if you proceed with the repair." },
      { step: "Same-day where possible", detail: "Most HDMI port replacements are 24–72 hours." },
      { step: "Quality parts", detail: "OEM-grade HDMI ports and disc drives." },
      { step: "90-day warranty", detail: "All console repairs warrantied." },
    ],
    pricing: [
      { label: "PS5 / Xbox HDMI port", price: "from $99" },
      { label: "Disc drive replacement", price: "from $129" },
      { label: "Console deep clean + thermal paste", price: "$59" },
      { label: "Controller stick / trigger repair", price: "from $39" },
    ],
    faqs: [
      { q: "How long does a PS5 HDMI repair take?", a: "Usually 24–72 hours from drop-off. We microsolder a new HDMI port — no replacing the whole console needed." },
    ],
    serviceType: "hdmi-repair",
    related: ["ps5-repair-houston-tx", "xbox-repair-houston-tx", "controller-repair-houston-tx", "hdmi-port-repair-houston-tx"],
  },
  {
    slug: "ps5-repair-houston-tx",
    title: "PS5 Repair Houston",
    metaTitle: "PS5 Repair Houston | HDMI, Disc Drive, No Power | Gadget X",
    metaDescription:
      "Sony PS5 repair in Houston. HDMI port replacement, disc drive, no power, overheating, controller drift. Same-day diagnostic.",
    hero: {
      eyebrow: "PlayStation 5 Repair",
      h1: "PS5 Repair in Houston",
      subhead:
        "Broken HDMI from a fall, no display, won't take discs, fan howling — we fix every PS5 problem in our Houston shop.",
    },
    problems: ["Broken HDMI port — no video", "Disc drive won't read or eject", "Won't turn on or shuts off", "Loud fan / overheating", "Controller drift / broken trigger"],
    brands: ["PS5 Disc edition", "PS5 Digital edition", "PS5 Slim"],
    process: [
      { step: "Diagnostic", detail: "$25, waived if you repair." },
      { step: "HDMI: 24–72h", detail: "Microsolder of new HDMI port — no need to replace your console." },
      { step: "Quality parts", detail: "OEM-grade HDMI sockets and disc drives." },
      { step: "90-day warranty", detail: "All PS5 repairs warrantied." },
    ],
    pricing: [
      { label: "PS5 HDMI port", price: "from $99" },
      { label: "PS5 disc drive", price: "from $149" },
      { label: "Deep clean + thermal paste", price: "$59" },
      { label: "DualSense stick replacement", price: "from $39" },
    ],
    faqs: [
      { q: "Is it worth repairing my PS5 HDMI port?", a: "Almost always yes. A new PS5 is $400+; an HDMI repair is around $99 with a 90-day warranty." },
    ],
    serviceType: "hdmi-repair",
    related: ["gaming-console-repair-houston-tx", "xbox-repair-houston-tx", "hdmi-port-repair-houston-tx", "controller-repair-houston-tx"],
  },
  {
    slug: "xbox-repair-houston-tx",
    title: "Xbox Repair Houston",
    metaTitle: "Xbox Repair Houston | Series X, Series S, Xbox One | Gadget X",
    metaDescription:
      "Xbox repair in Houston for Series X, Series S, Xbox One X/S. HDMI port, disc drive, won't power on, overheating, controller fix.",
    hero: {
      eyebrow: "Xbox Repair",
      h1: "Xbox Repair in Houston",
      subhead:
        "Series X, Series S, Xbox One — busted HDMI, won't read discs, no power, overheating, controller drift. We fix Xbox the same week, often same day.",
    },
    problems: ["Broken HDMI port", "Disc drive grinding or won't read", "Won't power on", "Overheating / loud fan", "E-codes on screen", "Controller drift / button failure"],
    brands: ["Xbox Series X", "Xbox Series S", "Xbox One X", "Xbox One S", "Xbox One"],
    process: [
      { step: "Diagnostic", detail: "$25, waived if you repair." },
      { step: "HDMI: 24–72h", detail: "Microsolder of new HDMI port." },
      { step: "Quality parts", detail: "OEM-grade HDMI sockets and disc drives." },
      { step: "90-day warranty", detail: "All Xbox repairs warrantied." },
    ],
    pricing: [
      { label: "Xbox HDMI port", price: "from $99" },
      { label: "Xbox disc drive", price: "from $129" },
      { label: "Deep clean + thermal paste", price: "$59" },
      { label: "Controller stick / trigger", price: "from $39" },
    ],
    faqs: [
      { q: "Why does my Xbox keep overheating?", a: "Usually dust buildup and dried thermal paste. Our $59 deep clean fixes most overheating cases." },
    ],
    serviceType: "hdmi-repair",
    related: ["gaming-console-repair-houston-tx", "ps5-repair-houston-tx", "hdmi-port-repair-houston-tx", "controller-repair-houston-tx"],
  },
  {
    slug: "controller-repair-houston-tx",
    title: "Controller Repair Houston",
    metaTitle: "Controller Repair Houston | Stick Drift, Triggers | Gadget X",
    metaDescription:
      "Game controller repair in Houston for PS5 DualSense, Xbox, Switch joycons and Pro controller. Stick drift, broken triggers, button failure.",
    hero: {
      eyebrow: "Controller Repair",
      h1: "Controller Repair in Houston",
      subhead:
        "DualSense drift, Xbox triggers, Switch joycon drift — controller repair from $39 with a 90-day warranty.",
    },
    problems: ["Joystick drift (DualSense / Xbox / Joycon)", "Broken trigger or shoulder button", "Buttons stuck or unresponsive", "USB-C charging port loose", "Joycon won't slide off Switch"],
    brands: ["PS5 DualSense", "PS4 DualShock", "Xbox Series controller", "Xbox One controller", "Switch joycons", "Switch Pro Controller"],
    process: [
      { step: "Same-day", detail: "Most controller fixes done while you wait." },
      { step: "Quality parts", detail: "OEM-grade thumbsticks and triggers." },
      { step: "90-day warranty", detail: "All controller repairs warrantied." },
    ],
    pricing: [
      { label: "Single thumbstick replacement", price: "from $39" },
      { label: "Both thumbsticks", price: "from $59" },
      { label: "Trigger / shoulder button", price: "from $35" },
      { label: "USB-C port", price: "from $49" },
    ],
    faqs: [
      { q: "Can you fix joycon drift on the spot?", a: "In most cases, yes — bring both joycons in and we'll usually have them back to you the same day." },
    ],
    serviceType: "hdmi-repair",
    related: ["ps5-repair-houston-tx", "xbox-repair-houston-tx", "gaming-console-repair-houston-tx"],
  },
  {
    slug: "hdmi-port-repair-houston-tx",
    title: "HDMI Port Repair Houston",
    metaTitle: "HDMI Port Repair Houston | PS5, Xbox, TV, Laptop | Gadget X",
    metaDescription:
      "HDMI port repair in Houston for PS5, Xbox, Nintendo Switch dock, laptops and TVs. Broken HDMI socket microsoldered for $99.",
    hero: {
      eyebrow: "HDMI Port Repair",
      h1: "HDMI Port Repair in Houston",
      subhead:
        "Broken HDMI socket on your PS5, Xbox, Switch dock or laptop? We microsolder a new port — usually 24–72 hours.",
    },
    problems: ["No video output", "HDMI cable falls out / loose", "HDMI port physically broken or pushed in", "Visible bent pins inside the socket"],
    brands: ["PS5", "Xbox Series X / S / One", "Nintendo Switch dock", "Laptops (HP, Dell, Lenovo, MacBook)", "TVs (most major brands)"],
    process: [
      { step: "Diagnostic", detail: "$25, waived if you repair." },
      { step: "Microsolder repair", detail: "We desolder the broken socket and reflow a new one." },
      { step: "24–72h turnaround", detail: "Most HDMI repairs done in a few days." },
      { step: "90-day warranty", detail: "All HDMI repairs warrantied." },
    ],
    pricing: [
      { label: "Console HDMI port (PS5 / Xbox)", price: "from $99" },
      { label: "Laptop HDMI port", price: "from $99" },
      { label: "Switch dock HDMI", price: "from $79" },
    ],
    faqs: [
      { q: "Why does HDMI break so easily?", a: "Most HDMI ports break from leverage on the plugged-in cable — pets, kids, kicking the cable. The repair is straightforward; the trick is microsoldering experience." },
    ],
    serviceType: "hdmi-repair",
    related: ["ps5-repair-houston-tx", "xbox-repair-houston-tx", "gaming-console-repair-houston-tx", "motherboard-repair-houston-tx"],
  },
  {
    slug: "motherboard-repair-houston-tx",
    title: "Motherboard Repair Houston",
    metaTitle: "Motherboard Repair Houston | Microsolder, Logic Board | Gadget X",
    metaDescription:
      "Phone, laptop and console motherboard repair in Houston. Microsolder, BGA reflow, charging IC, audio IC, no-power and water-damage board work.",
    hero: {
      eyebrow: "Board-level Repair",
      h1: "Motherboard / Logic-Board Repair in Houston",
      subhead:
        "When your phone, laptop or console won't turn on after a fall, spill or charging-port damage, board-level work is usually what brings it back. We do it.",
    },
    problems: ["Phone or laptop won't turn on after liquid", "iPhone stuck on Apple logo / boot loop", "MacBook with no power, no chime", "Charging IC failure — won't charge with new battery / port", "Audio IC failure on iPhone 7", "Backlight failure"],
    brands: ["iPhone", "iPad", "MacBook", "Most laptops", "PS5 / Xbox HDMI IC"],
    process: [
      { step: "Diagnostic", detail: "$79 — applied to repair if you proceed." },
      { step: "Microsolder repair", detail: "Done in-house with the right tools — no shipping out." },
      { step: "3–7 days typical", detail: "Board work takes time; we keep you updated." },
      { step: "90-day warranty", detail: "All board work warrantied." },
    ],
    pricing: [
      { label: "Diagnostic", price: "$79" },
      { label: "Charging IC / port reflow", price: "from $129" },
      { label: "iPhone audio IC", price: "from $129" },
      { label: "MacBook no-power / liquid", price: "from $199" },
    ],
    faqs: [
      { q: "When is board repair worth it vs. replacing the device?", a: "If the device is recent enough that replacement is over $300, board repair is almost always worth it. We give you a clear quote before any work begins." },
    ],
    serviceType: "motherboard-repair",
    related: ["macbook-repair-houston-tx", "iphone-repair-houston-tx", "hdmi-port-repair-houston-tx"],
  },
  {
    slug: "battery-replacement-houston-tx",
    title: "Battery Replacement Houston",
    metaTitle: "Battery Replacement Houston | Phone, Laptop, Tablet | Gadget X",
    metaDescription:
      "Same-day battery replacement in Houston for iPhone, Android, iPad, MacBook and laptops. From $49. 90-day warranty.",
    hero: {
      eyebrow: "Battery Replacement",
      h1: "Battery Replacement in Houston",
      subhead:
        "If your phone dies by lunch or your laptop won't unplug, you need a new battery. We swap them same day from $49.",
    },
    problems: ["Battery health under 80% (iPhone / Android)", "Battery drains in a few hours", "Phone shuts off when battery says 30–40%", "Battery is swollen / pushing screen up", "Laptop won't run on battery"],
    brands: ["iPhone (every model)", "Samsung Galaxy", "Google Pixel", "Motorola", "iPad / iPad Pro", "MacBook Air / Pro", "HP, Dell, Lenovo, ASUS laptops"],
    process: [
      { step: "Same-day", detail: "Most phone batteries swapped in 30–60 minutes; laptop batteries in 1–2 hours." },
      { step: "Quality cells", detail: "OEM-grade cells with full battery health reporting on iPhones." },
      { step: "90-day warranty", detail: "All battery work warrantied." },
    ],
    pricing: [
      { label: "iPhone battery", price: "from $49" },
      { label: "Samsung battery", price: "from $59" },
      { label: "iPad battery", price: "from $89" },
      { label: "MacBook battery", price: "from $129" },
      { label: "Laptop battery (most brands)", price: "from $69" },
    ],
    faqs: [
      { q: "Is a swollen battery dangerous?", a: "Yes. Power off the device immediately, do not charge it, and bring it in for replacement." },
    ],
    serviceType: "battery-replacement",
    related: ["iphone-repair-houston-tx", "macbook-repair-houston-tx", "laptop-repair-houston-tx"],
  },
  {
    slug: "phone-unlocking-houston-tx",
    title: "Phone Unlocking Houston",
    metaTitle: "Phone Unlocking Houston | Carrier Unlock | Gadget X",
    metaDescription:
      "Phone unlocking in Houston. AT&T, T-Mobile, Cricket, Verizon, Boost and prepaid carrier unlocks. Use any SIM, anywhere in the world.",
    hero: {
      eyebrow: "Phone Unlocking",
      h1: "Phone Unlocking in Houston",
      subhead:
        "Travelling, switching carriers or selling your phone? We unlock most major carrier locks so you can use any SIM card.",
    },
    problems: ["Want to use a different SIM card", "Travelling internationally", "Selling your phone — unlocked sells for more", "Stuck on a carrier lock screen"],
    brands: ["iPhone (most carriers)", "Samsung Galaxy", "Most Android brands", "AT&T, T-Mobile, Cricket, Metro, Boost, Verizon prepaid devices"],
    process: [
      { step: "Eligibility check", detail: "Free check by IMEI to confirm we can unlock your model." },
      { step: "Unlock", detail: "Most carrier unlocks done in 24–72 hours." },
      { step: "Lifetime", detail: "Once unlocked, your phone stays unlocked." },
    ],
    pricing: [
      { label: "Most carrier unlocks", price: "from $39" },
      { label: "Premium / locked Apple devices", price: "from $79" },
    ],
    faqs: [
      { q: "Will unlocking my phone delete my data?", a: "No — carrier unlocking does not affect your data, photos or apps." },
      { q: "Is it legal to unlock my phone?", a: "Yes. In the U.S., once your contract or device payment is complete, you have the right to unlock your device." },
    ],
    serviceType: "phone-unlocking",
    related: ["phone-repair-houston-tx", "iphone-repair-houston-tx"],
  },
];

export const SERVICES_BY_SLUG = Object.fromEntries(SERVICES_DATA.map((s) => [s.slug, s])) as Record<string, ServiceData>;
