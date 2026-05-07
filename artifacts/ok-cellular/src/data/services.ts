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
  /**
   * Optional cross-link to a model-specific shop page. When set, a
   * "Looking to upgrade instead?" callout renders on the repair page so a
   * customer who landed for a fix can jump straight to buying that exact
   * model. Used on per-model Samsung Galaxy / iPhone repair pages that have
   * a matching `buy-...-humble-tx` SALES_DATA entry.
   */
  upgradeTo?: { slug: string; label: string };
};

export const SERVICES_DATA: ServiceData[] = [
  {
    slug: "phone-repair-humble-tx",
    title: "Phone Repair Humble",
    metaTitle: "Phone Repair Humble, TX | Same-Day Cellphone Fix | OK Cellular",
    metaDescription:
      "Same-day phone repair in Humble for iPhone, Samsung, Pixel and Motorola. Screen, battery, charging port, water damage. 90-day warranty. (281) 446-2166.",
    hero: {
      eyebrow: "Cellphone Repair",
      h1: "Phone Repair in Humble",
      subhead:
        "Whatever brand, whatever the damage — we fix phones the same day. 5+ years repairing Humble's devices from our Will Clayton Pkwy shop.",
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
      { q: "Do I need an appointment?", a: "Walk-ins are always welcome. If you want a guaranteed slot, call ahead at (281) 446-2166." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "samsung-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "iphone-repair-humble-tx",
    title: "iPhone Repair Humble",
    metaTitle: "iPhone Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert iPhone repair in Humble TX. Screen, battery, back glass & more. All models serviced. Fast turnaround & warranty. Visit OK Cellular!",
    hero: {
      eyebrow: "Apple iPhone Repair",
      h1: "iPhone Repair in Humble, TX",
      subhead:
        "Cracked screen, swollen battery, dead Lightning or USB-C port — we repair every iPhone model, same day, from our shop on Will Clayton Pkwy.",
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
    related: ["battery-replacement-humble-tx", "phone-repair-humble-tx", "tablet-repair-humble-tx"],
  },
  {
    slug: "samsung-repair-humble-tx",
    title: "Samsung Phone Repair Humble",
    metaTitle: "Samsung Repair Humble TX | OK Cellular",
    metaDescription:
      "Trusted Samsung repair in Humble TX. Screen, battery & more for all Galaxy models. Fast turnaround, warranty included. Visit OK Cellular!",
    hero: {
      eyebrow: "Samsung Galaxy Repair",
      h1: "Samsung Galaxy Repair in Humble",
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
    related: ["phone-repair-humble-tx", "battery-replacement-humble-tx", "google-pixel-repair-humble-tx"],
  },
  {
    slug: "google-pixel-repair-humble-tx",
    title: "Google Pixel Repair Humble",
    metaTitle: "Google Pixel Repair Humble TX | OK Cellular",
    metaDescription:
      "Trusted Google Pixel repair in Humble TX. Screen, battery & more fixed by expert techs. Fast service, warranty included. Visit OK Cellular!",
    hero: {
      eyebrow: "Google Pixel Repair",
      h1: "Google Pixel Repair in Humble",
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
    related: ["phone-repair-humble-tx", "samsung-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "motorola-repair-humble-tx",
    title: "Motorola Phone Repair Humble",
    metaTitle: "Motorola Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable Motorola phone repair in Humble TX. Screen, battery & charging port fixes. Fast service with warranty. Walk-in at OK Cellular!",
    hero: {
      eyebrow: "Motorola Repair",
      h1: "Motorola Phone Repair in Humble",
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
    related: ["phone-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "tablet-repair-humble-tx",
    title: "iPad & Tablet Repair Humble",
    metaTitle: "Tablet Repair Humble TX | OK Cellular",
    metaDescription:
      "Professional tablet repair in Humble TX. iPad, Samsung & more. Screen, battery & charging fixes. Fast turnaround at OK Cellular. Walk-ins welcome!",
    hero: {
      eyebrow: "Tablet Repair",
      h1: "iPad & Tablet Repair in Humble",
      subhead:
        "Cracked glass, dead LCD, weak battery, broken Lightning or USB-C port — we repair every major tablet at our Humble shop.",
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
    related: ["iphone-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "laptop-repair-humble-tx",
    title: "Laptop Repair Humble",
    metaTitle: "Laptop Repair Humble TX | OK Cellular",
    metaDescription:
      "Professional laptop repair in Humble TX. MacBook, HP, Dell & Lenovo. Screen, battery, keyboard & more. Fast service at OK Cellular!",
    hero: {
      eyebrow: "Laptop Repair",
      h1: "Laptop Repair in Humble",
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
    related: ["macbook-repair-humble-tx", "computer-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "computer-repair-humble-tx",
    title: "Computer Repair Humble",
    metaTitle: "Computer Repair Humble TX | OK Cellular",
    metaDescription:
      "Professional computer repair in Humble TX. Desktops & laptops. Hardware, software & virus removal. Fast, affordable service at OK Cellular!",
    hero: {
      eyebrow: "Computer Repair",
      h1: "Computer Repair in Humble",
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
    related: ["laptop-repair-humble-tx", "macbook-repair-humble-tx"],
  },
  {
    slug: "macbook-repair-humble-tx",
    title: "MacBook Repair Humble",
    metaTitle: "MacBook Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert MacBook repair in Humble TX. Screen, battery, keyboard & motherboard fixes. Fast diagnostics & warranty. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "Apple Laptop Repair",
      h1: "MacBook Repair in Humble",
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
    related: ["laptop-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "hp-laptop-repair-humble-tx",
    title: "HP Laptop Repair Humble",
    metaTitle: "HP Laptop Repair Humble TX | OK Cellular",
    metaDescription:
      "Trusted HP laptop repair in Humble TX. Screen, battery, keyboard & motherboard fixed by experts. Fast turnaround. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "HP Laptop Repair",
      h1: "HP Laptop Repair in Humble",
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
    related: ["laptop-repair-humble-tx", "computer-repair-humble-tx"],
  },
  {
    slug: "dell-laptop-repair-humble-tx",
    title: "Dell Laptop Repair Humble",
    metaTitle: "Dell Laptop Repair Humble TX | OK Cellular",
    metaDescription:
      "Reliable Dell laptop repair in Humble TX. Screen, battery, keyboard & more. Certified technicians & warranty. Walk-in at OK Cellular!",
    hero: {
      eyebrow: "Dell Laptop Repair",
      h1: "Dell Laptop Repair in Humble",
      subhead:
        "Latitude, Inspiron, XPS, Precision, Vostro — every Dell line repaired in our Humble shop.",
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
    related: ["laptop-repair-humble-tx", "computer-repair-humble-tx"],
  },
  {
    slug: "lenovo-laptop-repair-humble-tx",
    title: "Lenovo Laptop Repair Humble",
    metaTitle: "Lenovo Laptop Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert Lenovo laptop repair in Humble TX. Screen, battery, keyboard & motherboard fixes. Quick turnaround & warranty. Visit OK Cellular!",
    hero: {
      eyebrow: "Lenovo Repair",
      h1: "Lenovo Laptop Repair in Humble",
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
    related: ["laptop-repair-humble-tx", "computer-repair-humble-tx"],
  },
  {
    slug: "gaming-console-repair-humble-tx",
    title: "Gaming Console Repair Humble",
    metaTitle: "Gaming Console Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert gaming console repair in Humble TX. PS5, Xbox & controllers. Fast diagnostics & affordable fixes. Walk-in at OK Cellular.",
    hero: {
      eyebrow: "Console Repair",
      h1: "Gaming Console Repair in Humble",
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
    related: ["ps5-repair-humble-tx", "xbox-repair-humble-tx", "controller-repair-humble-tx", "hdmi-port-repair-humble-tx"],
  },
  {
    slug: "ps5-repair-humble-tx",
    title: "PS5 Repair Humble",
    metaTitle: "PS5 Repair Humble TX | OK Cellular",
    metaDescription:
      "PS5 not working? Get expert PS5 repair in Humble TX. HDMI, disc drive & more fixed fast. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "PlayStation 5 Repair",
      h1: "PS5 Repair in Humble",
      subhead:
        "Broken HDMI from a fall, no display, won't take discs, fan howling — we fix every PS5 problem in our Humble shop.",
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
    related: ["gaming-console-repair-humble-tx", "xbox-repair-humble-tx", "hdmi-port-repair-humble-tx", "controller-repair-humble-tx"],
  },
  {
    slug: "xbox-repair-humble-tx",
    title: "Xbox Repair Humble",
    metaTitle: "Xbox Repair Humble TX | OK Cellular",
    metaDescription:
      "Xbox not working? Get expert Xbox repair in Humble TX. Power, disc drive & controller issues fixed fast. Affordable & warrantied at OK Cellular!",
    hero: {
      eyebrow: "Xbox Repair",
      h1: "Xbox Repair in Humble",
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
    related: ["gaming-console-repair-humble-tx", "ps5-repair-humble-tx", "hdmi-port-repair-humble-tx", "controller-repair-humble-tx"],
  },
  {
    slug: "controller-repair-humble-tx",
    title: "Controller Repair Humble",
    metaTitle: "Controller Repair Humble TX | OK Cellular",
    metaDescription:
      "Broken game controller? Get it repaired fast in Humble TX. PS5 & Xbox controllers fixed. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "Controller Repair",
      h1: "Controller Repair in Humble",
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
    related: ["ps5-repair-humble-tx", "xbox-repair-humble-tx", "gaming-console-repair-humble-tx"],
  },
  {
    slug: "hdmi-port-repair-humble-tx",
    title: "HDMI Port Repair Humble",
    metaTitle: "HDMI Port Repair Humble | PS5, Xbox, TV | OK Cellular",
    metaDescription:
      "HDMI port repair in Humble for PS5, Xbox, Nintendo Switch dock, laptops and TVs. Broken HDMI socket microsoldered for $99.",
    hero: {
      eyebrow: "HDMI Port Repair",
      h1: "HDMI Port Repair in Humble",
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
    related: ["ps5-repair-humble-tx", "xbox-repair-humble-tx", "gaming-console-repair-humble-tx", "motherboard-repair-humble-tx"],
  },
  {
    slug: "motherboard-repair-humble-tx",
    title: "Motherboard Repair Humble",
    metaTitle: "Motherboard Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert motherboard repair in Humble TX. Phones, laptops & consoles. Complex board-level fixes by certified technicians. Visit OK Cellular!",
    hero: {
      eyebrow: "Board-level Repair",
      h1: "Motherboard / Logic-Board Repair in Humble",
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
    related: ["macbook-repair-humble-tx", "iphone-repair-humble-tx", "hdmi-port-repair-humble-tx"],
  },
  {
    slug: "battery-replacement-humble-tx",
    title: "Battery Replacement Humble",
    metaTitle: "Battery Replacement Humble TX | OK Cellular",
    metaDescription:
      "Phone, tablet & laptop battery replacement in Humble TX. All brands & models covered. Fast, affordable service with warranty at OK Cellular!",
    hero: {
      eyebrow: "Battery Replacement",
      h1: "Battery Replacement in Humble",
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
    related: ["iphone-repair-humble-tx", "macbook-repair-humble-tx", "laptop-repair-humble-tx"],
  },
  {
    slug: "phone-unlocking-humble-tx",
    title: "Phone Unlocking Humble",
    metaTitle: "Phone Unlocking Humble TX | OK Cellular",
    metaDescription:
      "Unlock your phone in Humble TX. All carriers & brands supported. Fast & reliable unlocking service at OK Cellular. Walk-ins welcome!",
    hero: {
      eyebrow: "Phone Unlocking",
      h1: "Phone Unlocking in Humble",
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
    related: ["phone-repair-humble-tx", "iphone-repair-humble-tx"],
  },
  {
    slug: "repair-services-humble-tx",
    title: "Repair Services Humble",
    metaTitle: "Repair Services Humble TX | OK Cellular",
    metaDescription:
      "Professional repair services for phones, tablets, laptops & consoles in Humble TX. Same-day service available. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "All Repair Services",
      h1: "Repair Services in Humble",
      subhead:
        "Everything we fix, in one place. Phones, tablets, laptops, MacBooks, PS5, Xbox, Switch, controllers, HDMI ports and motherboards — all in our Will Clayton Pkwy shop.",
    },
    problems: [
      "iPhone, Samsung, Pixel, Motorola and Revvl phone repair",
      "iPad, Galaxy Tab, Fire HD and Lenovo tablet repair",
      "HP, Dell, Lenovo, ASUS and MacBook laptop repair",
      "PS5, Xbox, Nintendo Switch and controller repair",
      "HDMI port microsolder for consoles and laptops",
      "Phone unlocking, Google account removal, carrier unlocks",
      "Battery replacement on every device we sell",
      "Same-day diagnostic, 90-day warranty on every repair",
    ],
    brands: ["Apple", "Samsung", "Google Pixel", "Motorola", "T-Mobile Revvl", "HP", "Dell", "Lenovo", "Sony PlayStation", "Microsoft Xbox", "Nintendo"],
    process: [
      { step: "Bring it in", detail: "Walk in any day or call (281) 446-2166 ahead." },
      { step: "Free diagnostic", detail: "Most repairs include a free diagnostic — we quote before any work." },
      { step: "Same-day where possible", detail: "Phone screens, batteries and controllers are usually done same day." },
      { step: "90-day warranty", detail: "Every repair we do is backed for 90 days." },
    ],
    pricing: [
      { label: "Phone screen", price: "from $69" },
      { label: "Phone battery", price: "from $49" },
      { label: "Tablet glass / LCD", price: "from $99" },
      { label: "Laptop screen", price: "from $99" },
      { label: "MacBook battery", price: "from $129" },
      { label: "Console HDMI port", price: "from $99" },
      { label: "Phone unlock", price: "from $39" },
    ],
    faqs: [
      { q: "What devices do you repair?", a: "Phones (iPhone, Samsung, Pixel, Moto, Revvl), tablets (iPad, Galaxy Tab, Fire), laptops (HP, Dell, Lenovo, ASUS, MacBook), and consoles (PS5, Xbox, Switch). If it has a screen and a battery, we probably fix it." },
      { q: "Do I need an appointment?", a: "Walk-ins are always welcome. If you want a guaranteed slot, call (281) 446-2166." },
    ],
    serviceType: "screen-repair",
    related: ["phone-repair-humble-tx", "tablet-repair-humble-tx", "laptop-repair-humble-tx", "gaming-console-repair-humble-tx"],
  },
  {
    slug: "iphone-14-repair-humble-tx",
    title: "iPhone 14 Repair Humble",
    metaTitle: "iPhone 14 Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 14 repair in Humble TX. Screen, battery, back glass & charging port. Experienced techs & warranty. Visit OK Cellular!",
    hero: {
      eyebrow: "iPhone 14 Repair",
      h1: "iPhone 14 Repair in Humble",
      subhead:
        "iPhone 14, 14 Plus, 14 Pro, 14 Pro Max — cracked OLED, dying battery, broken Lightning port, back glass. Most fixes done in 60 minutes.",
    },
    problems: ["Cracked OLED display", "Battery health below 80%", "Lightning port not charging", "Back glass cracked", "Camera lens cracked", "Won't turn on after a fall"],
    brands: ["iPhone 14", "iPhone 14 Plus", "iPhone 14 Pro", "iPhone 14 Pro Max"],
    process: [
      { step: "Free quote", detail: "Tell us your model and symptom for a firm price up front." },
      { step: "Same-day fix", detail: "Most iPhone 14 screens and batteries done in 60 minutes." },
      { step: "Quality OLED", detail: "OEM-grade OLED that preserves True Tone where possible." },
      { step: "90-day warranty", detail: "Every iPhone 14 repair backed by us." },
    ],
    pricing: [
      { label: "iPhone 14 screen", price: "from $179" },
      { label: "iPhone 14 Pro / Pro Max screen", price: "from $269" },
      { label: "iPhone 14 battery", price: "from $69" },
      { label: "iPhone 14 charging port", price: "from $79" },
      { label: "iPhone 14 back glass", price: "from $99" },
    ],
    faqs: [
      { q: "Will Face ID still work after iPhone 14 screen repair?", a: "On most iPhone 14 repairs we preserve Face ID. We tell you up front if your specific repair needs a component transfer." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-15-repair-humble-tx"],
  },
  {
    slug: "iphone-15-repair-humble-tx",
    title: "iPhone 15 Repair Humble",
    metaTitle: "iPhone 15 Repair Humble TX | OK Cellular",
    metaDescription:
      "Quick & affordable iPhone 15 repair in Humble TX. Screen replacement, battery & more. Walk-ins welcome at OK Cellular. Get a free quote!",
    hero: {
      eyebrow: "iPhone 15 Repair",
      h1: "iPhone 15 Repair in Humble",
      subhead:
        "iPhone 15, 15 Plus, 15 Pro, 15 Pro Max — cracked Super Retina display, USB-C port damage, battery, back glass. We fix all of them.",
    },
    problems: ["Cracked Super Retina XDR OLED", "USB-C port not charging", "Battery degraded fast", "Titanium frame cracked", "Back glass shattered", "Action button stuck (Pro)"],
    brands: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    process: [
      { step: "Free quote", detail: "Firm price after a quick look." },
      { step: "Same-day fix", detail: "Most iPhone 15 screens and batteries done in 60 minutes." },
      { step: "Quality OLED", detail: "OEM-grade ProMotion OLED on Pro models." },
      { step: "90-day warranty", detail: "All iPhone 15 repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 15 screen", price: "from $199" },
      { label: "iPhone 15 Pro / Pro Max screen", price: "from $299" },
      { label: "iPhone 15 USB-C port", price: "from $89" },
      { label: "iPhone 15 battery", price: "from $79" },
      { label: "iPhone 15 back glass", price: "from $109" },
    ],
    faqs: [
      { q: "Did Apple fix the iPhone 15 USB-C port to be more durable?", a: "It's similar to other USB-C devices — durable in normal use but vulnerable to leverage. We replace damaged ports for around $89." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-charging-port-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-16-repair-humble-tx"],
  },
  {
    slug: "iphone-16-repair-humble-tx",
    title: "iPhone 16 Repair Humble",
    metaTitle: "iPhone 16 Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 16 repair in Humble TX. Cracked screen, battery & charging issues fixed fast. Certified technicians. Free quote on request.",
    hero: {
      eyebrow: "iPhone 16 Repair",
      h1: "iPhone 16 Repair in Humble",
      subhead:
        "Brand new iPhone, brand new break. iPhone 16 and 16 Plus screen, battery, USB-C and back glass repair, same week or sooner.",
    },
    problems: ["Cracked Super Retina XDR OLED", "USB-C charging port damage", "Battery health dropped early", "Camera Control button unresponsive", "Back glass cracked", "Won't turn on after a fall"],
    brands: ["iPhone 16", "iPhone 16 Plus"],
    process: [
      { step: "Free quote", detail: "Firm price after a 5-minute check." },
      { step: "Same-day fix where possible", detail: "Newest models sometimes need next-day parts." },
      { step: "Quality OLED", detail: "OEM-grade OLED panels." },
      { step: "90-day warranty", detail: "All iPhone 16 repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 16 screen", price: "from $219" },
      { label: "iPhone 16 USB-C port", price: "from $99" },
      { label: "iPhone 16 battery", price: "from $89" },
      { label: "iPhone 16 back glass", price: "from $119" },
    ],
    faqs: [
      { q: "Do you have iPhone 16 parts in stock?", a: "Most days yes. If we don't have your specific color back glass on hand, parts arrive within 1–2 business days." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-16-pro-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-15-repair-humble-tx"],
  },
  {
    slug: "iphone-16-pro-repair-humble-tx",
    title: "iPhone 16 Pro Repair Humble",
    metaTitle: "iPhone 16 Pro Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert iPhone 16 Pro repair in Humble TX. Screen replacement, battery & more. Quick turnaround with a warranty. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "iPhone 16 Pro Repair",
      h1: "iPhone 16 Pro Repair in Humble",
      subhead:
        "iPhone 16 Pro and 16 Pro Max — cracked ProMotion OLED, USB-C port damage, dead battery, back glass shatter. Quality parts, 90-day warranty.",
    },
    problems: ["Cracked ProMotion OLED", "USB-C port not charging", "Battery degraded", "Titanium frame dented", "Back glass shattered", "Camera Control button broken"],
    brands: ["iPhone 16 Pro", "iPhone 16 Pro Max"],
    process: [
      { step: "Free quote", detail: "We quote in minutes." },
      { step: "Same-day where possible", detail: "Pro / Pro Max parts can occasionally take an extra day." },
      { step: "Quality ProMotion OLED", detail: "OEM-grade panels that preserve 120Hz." },
      { step: "90-day warranty", detail: "All iPhone 16 Pro repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 16 Pro screen", price: "from $329" },
      { label: "iPhone 16 Pro Max screen", price: "from $399" },
      { label: "iPhone 16 Pro USB-C port", price: "from $99" },
      { label: "iPhone 16 Pro battery", price: "from $99" },
      { label: "iPhone 16 Pro back glass", price: "from $149" },
    ],
    faqs: [
      { q: "Will my 120Hz ProMotion still work after a screen repair?", a: "Yes — we use OEM-grade panels that maintain ProMotion 120Hz refresh." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-16-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-15-repair-humble-tx"],
  },
  {
    slug: "iphone-screen-repair-humble-tx",
    title: "iPhone Screen Repair Humble",
    metaTitle: "iPhone Screen Repair Humble TX | OK Cellular",
    metaDescription:
      "Fast iPhone screen repair in Humble TX. Cracked or broken display fixed same day. All models. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "iPhone Screen Repair",
      h1: "iPhone Screen Repair in Humble",
      subhead:
        "Cracked iPhone screen, dead pixels, black bars or no touch — we replace iPhone screens same day, every model from iPhone 6 to iPhone 16 Pro Max.",
    },
    problems: ["Cracked outer glass", "Dead pixels or black/green lines", "Touch screen unresponsive", "Backlight failure (no display)", "True Tone failed after a previous repair", "Face ID stopped after a previous repair"],
    brands: ["iPhone 6, 6s, 7, 8, SE", "iPhone X, XR, XS, XS Max", "iPhone 11 / Pro / Pro Max", "iPhone 12 / mini / Pro / Pro Max", "iPhone 13 / mini / Pro / Pro Max", "iPhone 14 / Plus / Pro / Pro Max", "iPhone 15 / Plus / Pro / Pro Max", "iPhone 16 / Plus / Pro / Pro Max"],
    process: [
      { step: "Free quote", detail: "Tell us the model — we'll quote on the spot." },
      { step: "30–60 minute fix", detail: "Most iPhone screens swapped while you wait." },
      { step: "Quality screens", detail: "OEM-grade OLED / LCD that preserves True Tone where possible." },
      { step: "90-day warranty", detail: "If the new screen fails, we replace it free." },
    ],
    pricing: [
      { label: "iPhone 6/7/8/SE screen", price: "from $79" },
      { label: "iPhone X / XR / 11 screen", price: "from $129" },
      { label: "iPhone 12 / 13 screen", price: "from $169" },
      { label: "iPhone 14 / 15 screen", price: "from $179" },
      { label: "iPhone 16 / Pro / Pro Max screen", price: "from $219" },
    ],
    faqs: [
      { q: "Will True Tone still work after iPhone screen repair?", a: "On most models, yes — we use OEM-grade panels that preserve True Tone. A few specific models require a component transfer; we tell you in advance." },
      { q: "Can you fix a black iPhone screen that still vibrates on calls?", a: "Yes — that's almost always a screen failure (LCD/OLED dead while logic board is fine). A standard screen replacement fixes it." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-back-glass-repair-humble-tx", "iphone-charging-port-repair-humble-tx"],
  },
  {
    slug: "iphone-battery-replacement-humble-tx",
    title: "iPhone Battery Replacement Humble",
    metaTitle: "iPhone Battery Replacement Humble TX | OK Cellular",
    metaDescription:
      "iPhone battery draining fast? Get a quick replacement in Humble TX. All models covered. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "iPhone Battery Replacement",
      h1: "iPhone Battery Replacement in Humble",
      subhead:
        "Battery health below 80%? Phone shutting down at 30%? Battery swollen? We swap iPhone batteries from $49, same day, every model.",
    },
    problems: ["Battery health under 80% in Settings", "Phone dies by lunchtime", "Random shutdowns at 30–40%", "Battery is swollen / pushing up the screen", "Phone runs hot when idle"],
    brands: ["iPhone 6, 6s, 7, 8, SE", "iPhone X, XR, XS, XS Max", "iPhone 11 / 12 / 13 / 14 / 15 / 16 series"],
    process: [
      { step: "Same-day", detail: "Most iPhone batteries swapped in 30–45 minutes." },
      { step: "Quality cells", detail: "OEM-grade cells with full battery health reporting." },
      { step: "90-day warranty", detail: "All battery work warrantied." },
    ],
    pricing: [
      { label: "iPhone 6 / 7 / 8 / SE battery", price: "from $49" },
      { label: "iPhone X – 11 battery", price: "from $59" },
      { label: "iPhone 12 / 13 battery", price: "from $69" },
      { label: "iPhone 14 / 15 battery", price: "from $79" },
      { label: "iPhone 16 / Pro / Pro Max battery", price: "from $89" },
    ],
    faqs: [
      { q: "Will battery health show 100% after the swap?", a: "On most models, yes — our OEM-grade batteries report full health correctly to iOS." },
      { q: "Is a swollen iPhone battery dangerous?", a: "Yes. Power off the phone immediately, do not charge, and bring it in." },
    ],
    serviceType: "battery-replacement",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "battery-replacement-humble-tx", "iphone-charging-port-repair-humble-tx"],
  },
  {
    slug: "iphone-back-glass-repair-humble-tx",
    title: "iPhone Back Glass Repair Humble",
    metaTitle: "iPhone Back Glass Repair Humble TX | OK Cellular",
    metaDescription:
      "Cracked iPhone back glass? Get it repaired fast in Humble TX. Affordable pricing, all models covered, warranty included at OK Cellular!",
    hero: {
      eyebrow: "iPhone Back Glass",
      h1: "iPhone Back Glass Repair in Humble",
      subhead:
        "Cracked iPhone back? Laser-removed and replaced from $89 — without disturbing the wireless charging coil or rear cameras.",
    },
    problems: ["Cracked rear glass", "Glass coming loose", "Wireless charging not working after a back-glass crack", "MagSafe magnets damaged"],
    brands: ["iPhone 8 / 8 Plus", "iPhone X / XR / XS series", "iPhone 11 series", "iPhone 12 series", "iPhone 13 series", "iPhone 14 / 15 / 16 series"],
    process: [
      { step: "Laser removal", detail: "We laser-remove the broken glass without damaging internal components." },
      { step: "1–2 hours typical", detail: "Most back-glass jobs done same day." },
      { step: "Quality glass", detail: "OEM-grade rear glass with intact camera and MagSafe cutouts." },
      { step: "90-day warranty", detail: "All back-glass repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 8 / X / 11 back glass", price: "from $89" },
      { label: "iPhone 12 / 13 back glass", price: "from $109" },
      { label: "iPhone 14 / 15 back glass", price: "from $129" },
      { label: "iPhone 16 / Pro back glass", price: "from $149" },
    ],
    faqs: [
      { q: "Will wireless charging still work after a back glass repair?", a: "Yes — our process preserves the wireless charging and MagSafe coils." },
    ],
    serviceType: "back-glass-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-charging-port-repair-humble-tx"],
  },
  {
    slug: "iphone-charging-port-repair-humble-tx",
    title: "iPhone Charging Port Repair Humble",
    metaTitle: "iPhone Charging Port Repair Humble TX | OK Cellular",
    metaDescription:
      "iPhone not charging? Get your charging port repaired in Humble TX. Fast, affordable fix for all iPhone models at OK Cellular. Walk-ins welcome!",
    hero: {
      eyebrow: "iPhone Charging Port",
      h1: "iPhone Charging Port Repair in Humble",
      subhead:
        "iPhone won't charge or the cable falls out? Lightning or USB-C port replaced from $69, often same day.",
    },
    problems: ["Cable falls out / loose", "Phone only charges at certain angles", "No charge with a known-good cable", "Port full of pocket lint", "Slow charging on USB-C iPhones"],
    brands: ["Lightning iPhones (5 – 14)", "USB-C iPhones (15, 16)"],
    process: [
      { step: "Free cleaning first", detail: "Half the time it's just lint. We clean the port free as a first step." },
      { step: "Same-day port swap", detail: "Most iPhone charging ports swapped in 60–90 minutes." },
      { step: "Quality parts", detail: "OEM-grade Lightning and USB-C ports." },
      { step: "90-day warranty", detail: "All charging port repairs warrantied." },
    ],
    pricing: [
      { label: "Port cleaning only", price: "free" },
      { label: "iPhone Lightning port replacement", price: "from $69" },
      { label: "iPhone USB-C port replacement (15/16)", price: "from $89" },
    ],
    faqs: [
      { q: "Could it be the cable, not the phone?", a: "Often, yes. Try a different cable first. If multiple known-good cables don't charge, the port is likely the problem." },
    ],
    serviceType: "charging-port-repair",
    related: ["iphone-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-screen-repair-humble-tx"],
  },
  {
    slug: "iphone-water-damage-repair-humble-tx",
    title: "iPhone Water Damage Repair Humble",
    metaTitle: "iPhone Water Damage Repair Humble TX | OK Cellular",
    metaDescription:
      "Dropped your iPhone in water? Expert water damage repair in Humble TX. Fast diagnosis & recovery service at OK Cellular. Walk-ins welcome!",
    hero: {
      eyebrow: "iPhone Water Damage",
      h1: "iPhone Water Damage Repair in Humble",
      subhead:
        "Dropped your iPhone in water? Power it off and bring it in fast. The sooner we clean the board, the better the chance of full recovery.",
    },
    problems: ["iPhone won't turn on after liquid contact", "Speaker, mic or camera dead after spill", "Battery drains fast after liquid", "Touchscreen ghost-touching", "Water-damage indicator turned red"],
    brands: ["Every iPhone model"],
    process: [
      { step: "Power off", detail: "Don't try to charge it. Bring it in powered off — we explain why in person." },
      { step: "$25 diagnostic", detail: "Waived if you proceed with the repair." },
      { step: "Ultrasonic clean", detail: "We open the device, isopropyl-clean and ultrasonic the logic board." },
      { step: "Component repair", detail: "If a specific chip or part is corroded, we replace it at the board level." },
    ],
    pricing: [
      { label: "Diagnostic", price: "$25 (waived if repaired)" },
      { label: "Ultrasonic board clean", price: "from $79" },
      { label: "Component-level water-damage repair", price: "from $149" },
    ],
    faqs: [
      { q: "Should I put my iPhone in rice?", a: "No — rice does almost nothing and the delay makes corrosion worse. Power the phone off and bring it in." },
      { q: "What's the success rate?", a: "Highly variable. The sooner you bring it in (ideally within 24 hours), the better the chance of full recovery." },
    ],
    serviceType: "water-damage-repair",
    related: ["iphone-repair-humble-tx", "motherboard-repair-humble-tx", "iphone-battery-replacement-humble-tx"],
  },
  {
    slug: "samsung-galaxy-s24-repair-humble-tx",
    title: "Samsung Galaxy S24 Repair Humble",
    metaTitle: "Samsung Galaxy S24 Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert Samsung Galaxy S24 repair in Humble TX. Cracked screen, battery & more fixed fast. Warranty included at OK Cellular. Walk-ins welcome!",
    hero: {
      eyebrow: "Galaxy S24 Repair",
      h1: "Samsung Galaxy S24 Repair in Humble",
      subhead:
        "Galaxy S24, S24 Plus, S24 Ultra — cracked AMOLED, swollen battery, broken USB-C, S Pen lost. Quality parts, same-day where possible.",
    },
    problems: ["Cracked AMOLED display", "Green / pink lines on display", "Battery degraded", "USB-C port loose", "Back glass shattered", "S Pen lost or broken (Ultra)"],
    brands: ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price." },
      { step: "Same-day where possible", detail: "Most S24 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy S24 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy S24 screen", price: "from $229" },
      { label: "Galaxy S24+ screen", price: "from $269" },
      { label: "Galaxy S24 Ultra screen", price: "from $329" },
      { label: "Galaxy S24 battery", price: "from $79" },
      { label: "Galaxy S24 charging port", price: "from $89" },
    ],
    faqs: [
      { q: "Will the in-display fingerprint sensor work after S24 screen repair?", a: "Yes — we calibrate the in-display sensor as part of the screen replacement." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx", "samsung-galaxy-s23-repair-humble-tx"],
  },
  {
    slug: "samsung-galaxy-s23-repair-humble-tx",
    title: "Samsung Galaxy S23 Repair Humble",
    metaTitle: "Samsung Galaxy S23 Repair Humble TX | OK Cellular",
    metaDescription:
      "Reliable Samsung Galaxy S23 repair in Humble TX. Screen, battery & charging issues fixed fast. Certified techs & warranty at OK Cellular!",
    hero: {
      eyebrow: "Galaxy S23 Repair",
      h1: "Samsung Galaxy S23 Repair in Humble",
      subhead:
        "Galaxy S23, S23+, S23 Ultra — cracked AMOLED, weak battery, broken USB-C, busted back glass. Same-day where possible.",
    },
    problems: ["Cracked AMOLED display", "Battery health degraded", "USB-C charging port loose", "Back glass cracked", "S Pen broken (Ultra)", "Won't power on"],
    brands: ["Galaxy S23", "Galaxy S23+", "Galaxy S23 Ultra"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price." },
      { step: "Same-day where possible", detail: "Most S23 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy S23 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy S23 screen", price: "from $209" },
      { label: "Galaxy S23+ screen", price: "from $239" },
      { label: "Galaxy S23 Ultra screen", price: "from $299" },
      { label: "Galaxy S23 battery", price: "from $69" },
      { label: "Galaxy S23 charging port", price: "from $79" },
    ],
    faqs: [
      { q: "Are S23 screens harder to find than S24?", a: "Both are widely available — most S23 repairs are completed same day." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-s24-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
  },
  {
    slug: "samsung-screen-repair-humble-tx",
    title: "Samsung Screen Repair Humble",
    metaTitle: "Samsung Screen Repair Humble TX | OK Cellular",
    metaDescription:
      "Cracked Samsung screen? Get it repaired fast in Humble TX. All Galaxy models covered, affordable pricing & warranty. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "Samsung Screen Repair",
      h1: "Samsung Screen Repair in Humble",
      subhead:
        "Cracked Samsung AMOLED, lines, dead pixels or no touch — every Galaxy series from A to S Ultra to Z Fold replaced with quality AMOLED.",
    },
    problems: ["Cracked AMOLED outer glass", "Green or pink vertical lines", "No touch / unresponsive", "Burn-in or persistent dead pixels", "Inner foldable screen damaged (Z Fold / Flip)"],
    brands: ["Galaxy A series", "Galaxy S series", "Galaxy Note series", "Galaxy Z Fold / Z Flip", "Galaxy J & M series"],
    process: [
      { step: "Free quote", detail: "Tell us the model — firm price up front." },
      { step: "Same-day where possible", detail: "Most Galaxy A and S screens done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade panels matched to your model." },
      { step: "90-day warranty", detail: "All Samsung screen work warrantied." },
    ],
    pricing: [
      { label: "Galaxy A-series screen", price: "from $99" },
      { label: "Galaxy S-series screen", price: "from $179" },
      { label: "Galaxy Note screen", price: "from $199" },
      { label: "Galaxy Z Fold / Flip inner screen", price: "from $399" },
    ],
    faqs: [
      { q: "Can you fix the inner Z Fold screen?", a: "Yes. Inner foldable screens are pricier than rigid AMOLED — we'll quote your model after diagnostic." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-s24-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
  },
  {
    slug: "samsung-battery-replacement-humble-tx",
    title: "Samsung Battery Replacement Humble",
    metaTitle: "Samsung Battery Replacement Humble TX | OK Cellular",
    metaDescription:
      "Samsung battery not lasting? Get a fast replacement in Humble TX. All Galaxy models serviced. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "Samsung Battery",
      h1: "Samsung Galaxy Battery Replacement in Humble",
      subhead:
        "Galaxy battery dying fast? Phone shutting off at 30%? Battery swollen? We swap Samsung batteries from $59, same day.",
    },
    problems: ["Battery drains in a few hours", "Phone shuts off at 30–40%", "Battery is swollen", "Phone runs hot when idle", "Won't power on after a few minutes off the charger"],
    brands: ["Galaxy A series", "Galaxy S series", "Galaxy Note series", "Galaxy J & M series", "Galaxy Z Fold / Flip"],
    process: [
      { step: "Same-day", detail: "Most Samsung batteries swapped in 60–90 minutes." },
      { step: "Quality cells", detail: "OEM-grade Samsung cells." },
      { step: "90-day warranty", detail: "All battery work warrantied." },
    ],
    pricing: [
      { label: "Galaxy A-series battery", price: "from $59" },
      { label: "Galaxy S-series battery", price: "from $69" },
      { label: "Galaxy Note battery", price: "from $79" },
      { label: "Galaxy Z Fold / Flip battery", price: "from $109" },
    ],
    faqs: [
      { q: "Is a swollen Samsung battery dangerous?", a: "Yes. Power off the phone, don't charge, bring it in." },
    ],
    serviceType: "battery-replacement",
    related: ["samsung-repair-humble-tx", "samsung-screen-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "revvl-repair-humble-tx",
    title: "T-Mobile Revvl Repair Humble",
    metaTitle: "Revvl Phone Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert Revvl phone repair in Humble TX. Screen replacement, battery & more fixed fast. Affordable pricing & warranty. Visit OK Cellular!",
    hero: {
      eyebrow: "Revvl Repair",
      h1: "T-Mobile Revvl Repair in Humble",
      subhead:
        "Cracked Revvl screen, weak battery, USB-C port loose? We repair every T-Mobile Revvl model in our Humble shop.",
    },
    problems: ["Cracked screen", "Battery won't hold a charge", "USB-C port loose", "Speaker / mic failure", "Won't power on"],
    brands: ["Revvl", "Revvl Plus", "Revvl 4", "Revvl 5G", "Revvl 6", "Revvl 6 Pro", "Revvl 7", "Revvl 7 Pro"],
    process: [
      { step: "Free quote", detail: "Tell us the model — firm price up front." },
      { step: "Same-day fix", detail: "Most Revvl screens and batteries done in 1–2 hours." },
      { step: "Quality parts", detail: "OEM-grade screens and batteries." },
      { step: "90-day warranty", detail: "All Revvl repairs warrantied." },
    ],
    pricing: [
      { label: "Revvl screen replacement", price: "from $79" },
      { label: "Revvl battery", price: "from $59" },
      { label: "Revvl charging port", price: "from $59" },
    ],
    faqs: [
      { q: "Are Revvl parts hard to find?", a: "Some older Revvl parts can take a day to source — we tell you on the spot if a part isn't in stock." },
    ],
    serviceType: "screen-repair",
    related: ["phone-repair-humble-tx", "samsung-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "ipad-repair-humble-tx",
    title: "iPad Repair Humble",
    metaTitle: "iPad Repair Humble TX | OK Cellular",
    metaDescription:
      "Fast & affordable iPad repair in Humble TX. Screen, battery & charging port for all iPad models. Warranty included. Walk-ins welcome at OK Cellular.",
    hero: {
      eyebrow: "iPad Repair",
      h1: "iPad Repair in Humble",
      subhead:
        "Cracked iPad glass, dead LCD, weak battery, broken Lightning or USB-C port — we repair every standard iPad and iPad mini in Humble.",
    },
    problems: ["Cracked front glass", "Dead or lined LCD", "Battery worn out", "Charging port loose", "Home button not working", "Won't turn on"],
    brands: ["iPad (every generation)", "iPad mini (every generation)"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "Same-day or next-day", detail: "Most iPad screens done in 1–2 days." },
      { step: "Quality parts", detail: "OEM-grade glass, LCD and batteries." },
      { step: "90-day warranty", detail: "All iPad repairs warrantied." },
    ],
    pricing: [
      { label: "iPad glass-only", price: "from $99" },
      { label: "iPad LCD + glass", price: "from $169" },
      { label: "iPad battery", price: "from $89" },
      { label: "iPad charging port", price: "from $79" },
    ],
    faqs: [
      { q: "Can you do glass-only on an iPad?", a: "On most older iPads with separate glass and LCD, yes. On newer fused-display iPads, the entire assembly must be replaced." },
    ],
    serviceType: "screen-repair",
    related: ["tablet-repair-humble-tx", "ipad-pro-repair-humble-tx", "tablet-screen-repair-humble-tx", "tablet-battery-replacement-humble-tx"],
  },
  {
    slug: "ipad-pro-repair-humble-tx",
    title: "iPad Pro Repair Humble",
    metaTitle: "iPad Pro Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert iPad Pro repair in Humble TX. Cracked screen, battery & more fixed fast. All sizes covered with warranty. Walk-in at OK Cellular!",
    hero: {
      eyebrow: "iPad Pro Repair",
      h1: "iPad Pro Repair in Humble",
      subhead:
        "iPad Pro 11\" and 12.9\" / 13\" — cracked fused display, weak battery, broken USB-C / Thunderbolt port. Quality parts, 90-day warranty.",
    },
    problems: ["Cracked fused OLED / LCD display", "Battery degraded", "USB-C / Thunderbolt port loose", "Won't power on", "Apple Pencil won't pair"],
    brands: ["iPad Pro 11\" (all generations)", "iPad Pro 12.9\" / 13\" (all generations)"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "1–3 days typical", detail: "Pro displays are pricier — we always quote first." },
      { step: "Quality fused displays", detail: "OEM-grade panels." },
      { step: "90-day warranty", detail: "All iPad Pro repairs warrantied." },
    ],
    pricing: [
      { label: "iPad Pro 11\" display", price: "from $349" },
      { label: "iPad Pro 12.9\" display", price: "from $449" },
      { label: "iPad Pro battery", price: "from $129" },
      { label: "iPad Pro USB-C port", price: "from $99" },
    ],
    faqs: [
      { q: "Why are iPad Pro screens so expensive?", a: "On newer iPad Pros the glass, LCD and digitizer are fused — Apple sells the assembly only. We use OEM-grade equivalents to bring the price down." },
    ],
    serviceType: "screen-repair",
    related: ["tablet-repair-humble-tx", "ipad-repair-humble-tx", "tablet-screen-repair-humble-tx"],
  },
  {
    slug: "samsung-tablet-repair-humble-tx",
    title: "Samsung Tablet Repair Humble",
    metaTitle: "Samsung Tablet Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert Samsung tablet repair in Humble TX. Screen, battery & charging port fixed fast. All Galaxy Tab models. Warranty at OK Cellular!",
    hero: {
      eyebrow: "Samsung Tablet Repair",
      h1: "Samsung Galaxy Tab Repair in Humble",
      subhead:
        "Galaxy Tab S, Tab A, Tab Active — cracked AMOLED / LCD, weak battery, broken USB-C, lost S Pen. Quality parts, 90-day warranty.",
    },
    problems: ["Cracked screen", "Dead LCD or AMOLED", "Battery worn out", "USB-C port loose", "S Pen lost or broken", "Speaker / mic issues"],
    brands: ["Galaxy Tab S series", "Galaxy Tab A series", "Galaxy Tab Active"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "1–2 days typical", detail: "Most Tab screens and batteries done in a day." },
      { step: "Quality parts", detail: "OEM-grade screens and batteries." },
      { step: "90-day warranty", detail: "All Galaxy Tab repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy Tab A screen", price: "from $129" },
      { label: "Galaxy Tab S screen", price: "from $229" },
      { label: "Galaxy Tab battery", price: "from $89" },
      { label: "USB-C port", price: "from $89" },
    ],
    faqs: [
      { q: "Do you replace S Pen for Tab S?", a: "Yes — most Tab S models have replacement S Pens in stock or we order one within 1–2 days." },
    ],
    serviceType: "screen-repair",
    related: ["tablet-repair-humble-tx", "samsung-repair-humble-tx", "tablet-screen-repair-humble-tx"],
  },
  {
    slug: "tablet-screen-repair-humble-tx",
    title: "Tablet Screen Repair Humble",
    metaTitle: "Tablet Screen Repair Humble TX | OK Cellular",
    metaDescription:
      "Cracked tablet screen? Get it fixed fast in Humble TX. iPad & Samsung tablet screen repairs, affordable pricing. Walk-in at OK Cellular!",
    hero: {
      eyebrow: "Tablet Screen",
      h1: "Tablet Screen Repair in Humble",
      subhead:
        "Cracked iPad glass, dead Galaxy Tab AMOLED, broken Fire HD screen — we replace tablet screens with quality parts and a 90-day warranty.",
    },
    problems: ["Cracked outer glass", "Dead LCD or AMOLED", "Touchscreen unresponsive", "Lines or burn-in on display", "Display fused glass + LCD shattered together"],
    brands: ["Apple iPad / iPad Pro / iPad mini", "Samsung Galaxy Tab S / A", "Amazon Fire HD", "Lenovo Tab", "Microsoft Surface (select)"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "1–2 days typical", detail: "Some fused displays need next-day parts." },
      { step: "Quality parts", detail: "OEM-grade glass and assemblies." },
      { step: "90-day warranty", detail: "All tablet screen work warrantied." },
    ],
    pricing: [
      { label: "iPad glass-only", price: "from $99" },
      { label: "iPad LCD + glass", price: "from $169" },
      { label: "Galaxy Tab screen", price: "from $129" },
      { label: "Fire HD screen", price: "from $79" },
    ],
    faqs: [
      { q: "Is glass-only ever an option on tablets?", a: "On older iPads with separate glass and LCD, yes. On most newer tablets the assembly is fused and must be replaced as a unit." },
    ],
    serviceType: "screen-repair",
    related: ["tablet-repair-humble-tx", "ipad-repair-humble-tx", "samsung-tablet-repair-humble-tx", "tablet-battery-replacement-humble-tx"],
  },
  {
    slug: "tablet-battery-replacement-humble-tx",
    title: "Tablet Battery Replacement Humble",
    metaTitle: "Tablet Battery Replacement Humble TX | OK Cellular",
    metaDescription:
      "Tablet battery draining fast? Get a quick replacement in Humble TX. iPad & Samsung tablets covered. Warranty included at OK Cellular!",
    hero: {
      eyebrow: "Tablet Battery",
      h1: "Tablet Battery Replacement in Humble",
      subhead:
        "iPad battery dying fast? Galaxy Tab won't hold a charge? We swap tablet batteries from $89 with a 90-day warranty.",
    },
    problems: ["Tablet drains while idle", "Won't charge past 1%", "Battery is swollen", "Tablet shuts off at 30%"],
    brands: ["iPad / iPad Pro / iPad mini", "Galaxy Tab S / A", "Fire HD", "Lenovo Tab"],
    process: [
      { step: "Diagnostic", detail: "Free with most repairs." },
      { step: "1–2 days typical", detail: "Most tablet batteries swapped in a day." },
      { step: "Quality cells", detail: "OEM-grade tablet cells." },
      { step: "90-day warranty", detail: "All battery work warrantied." },
    ],
    pricing: [
      { label: "iPad battery", price: "from $89" },
      { label: "iPad Pro battery", price: "from $129" },
      { label: "Galaxy Tab battery", price: "from $89" },
      { label: "Fire HD battery", price: "from $69" },
    ],
    faqs: [
      { q: "Is a swollen tablet battery dangerous?", a: "Yes — power it off, don't charge it, bring it in. Swollen batteries can vent or rupture." },
    ],
    serviceType: "battery-replacement",
    related: ["tablet-repair-humble-tx", "ipad-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "tablet-charging-port-repair-humble-tx",
    title: "Tablet Charging Port Repair Humble",
    metaTitle: "Tablet Charging Port Repair Humble TX | OK Cellular",
    metaDescription:
      "Tablet not charging? Get your charging port repaired in Humble TX. iPad & Samsung tablets fixed fast. Walk-in at OK Cellular.",
    hero: {
      eyebrow: "Tablet Charging Port",
      h1: "Tablet Charging Port Repair in Humble",
      subhead:
        "Tablet won't charge or the cable wobbles? We replace Lightning and USB-C ports on every major tablet brand from $79.",
    },
    problems: ["Cable falls out / loose", "Charges only at certain angles", "Won't detect a known-good charger", "Port full of lint", "USB-C port pushed in"],
    brands: ["iPad / iPad Pro / iPad mini", "Galaxy Tab S / A", "Fire HD", "Lenovo Tab"],
    process: [
      { step: "Free port cleaning first", detail: "Often it's just lint — we clean the port free." },
      { step: "1–2 day port swap", detail: "Most tablet charging ports swapped in a day." },
      { step: "Quality parts", detail: "OEM-grade Lightning and USB-C ports." },
      { step: "90-day warranty", detail: "All charging port repairs warrantied." },
    ],
    pricing: [
      { label: "Port cleaning only", price: "free" },
      { label: "Lightning port (older iPad)", price: "from $79" },
      { label: "USB-C port (most tablets)", price: "from $89" },
    ],
    faqs: [
      { q: "Is it the cable or the port?", a: "Try a known-good cable and charger first. If multiple cables don't work, the port is the problem." },
    ],
    serviceType: "charging-port-repair",
    related: ["tablet-repair-humble-tx", "ipad-repair-humble-tx", "tablet-battery-replacement-humble-tx"],
  },
  {
    slug: "laptop-screen-repair-humble-tx",
    title: "Laptop Screen Repair Humble",
    metaTitle: "Laptop Screen Repair Humble TX | OK Cellular",
    metaDescription:
      "Cracked or broken laptop screen? Get it repaired fast in Humble TX. All brands covered. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "Laptop Screen",
      h1: "Laptop Screen Repair in Humble",
      subhead:
        "Cracked LCD, black screen, vertical lines or no backlight — we replace laptop screens on every major brand from $99.",
    },
    problems: ["Cracked LCD / outer panel", "Black screen with backlight only", "Vertical or horizontal lines", "Hinge broken pulling on screen cable", "Touchscreen not responding"],
    brands: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "Razer", "Microsoft Surface", "MacBook"],
    process: [
      { step: "Diagnostic", detail: "We confirm whether it's the LCD, backlight or cable first." },
      { step: "Same-day where possible", detail: "Most laptop screens done in a day." },
      { step: "Quality LCDs", detail: "OEM-grade panels." },
      { step: "90-day warranty", detail: "All laptop screen work warrantied." },
    ],
    pricing: [
      { label: "HP / Dell / Lenovo screen", price: "from $99" },
      { label: "Touchscreen / 2-in-1 screen", price: "from $189" },
      { label: "MacBook Retina screen", price: "from $349" },
    ],
    faqs: [
      { q: "Is it the screen or the graphics chip?", a: "We test both — if your laptop boots and outputs to an external monitor, the screen / cable is the problem. If not, it could be GPU." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-humble-tx", "macbook-repair-humble-tx", "laptop-battery-replacement-humble-tx", "laptop-keyboard-repair-humble-tx"],
  },
  {
    slug: "laptop-battery-replacement-humble-tx",
    title: "Laptop Battery Replacement Humble",
    metaTitle: "Laptop Battery Replacement Humble TX | OK Cellular",
    metaDescription:
      "Laptop battery not holding charge? Get a fast replacement in Humble TX. All brands covered. Affordable pricing & warranty at OK Cellular!",
    hero: {
      eyebrow: "Laptop Battery",
      h1: "Laptop Battery Replacement in Humble",
      subhead:
        "Laptop only runs plugged in? Battery health degraded? Battery swollen? We swap laptop batteries from $69 with a 90-day warranty.",
    },
    problems: ["Won't run on battery", "Battery health critically low (Windows / macOS)", "Battery swollen — pushing trackpad up", "Holds only 30 minutes of charge"],
    brands: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "MacBook Air / Pro"],
    process: [
      { step: "Diagnostic", detail: "We confirm whether the battery, charger or board is the problem." },
      { step: "Same-day where possible", detail: "Most laptop batteries swapped in 1–2 hours." },
      { step: "Quality cells", detail: "OEM-grade laptop batteries." },
      { step: "90-day warranty", detail: "All battery work warrantied." },
    ],
    pricing: [
      { label: "HP / Dell / Lenovo battery", price: "from $69" },
      { label: "ASUS / Acer / MSI battery", price: "from $79" },
      { label: "MacBook battery", price: "from $129" },
    ],
    faqs: [
      { q: "Is a swollen laptop battery dangerous?", a: "Yes — power it down, unplug it, bring it in. Swollen laptop batteries can vent and damage the trackpad / chassis." },
    ],
    serviceType: "battery-replacement",
    related: ["laptop-repair-humble-tx", "macbook-repair-humble-tx", "battery-replacement-humble-tx"],
  },
  {
    slug: "laptop-motherboard-repair-humble-tx",
    title: "Laptop Motherboard Repair Humble",
    metaTitle: "Laptop Motherboard Repair Humble TX | OK Cellular",
    metaDescription:
      "Expert laptop motherboard repair in Humble TX. Experienced techs diagnose & fix complex issues fast. Warranty included at OK Cellular!",
    hero: {
      eyebrow: "Laptop Motherboard",
      h1: "Laptop Motherboard Repair in Humble",
      subhead:
        "Laptop won't power on, no display, dead after a spill, won't take a charge — laptop board-level repair done in our Humble shop.",
    },
    problems: ["Won't power on / no LEDs", "Powers on but no display", "Dead after a liquid spill", "Won't charge with a known-good charger", "Random shutdowns under load"],
    brands: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "MacBook Air / Pro"],
    process: [
      { step: "Diagnostic", detail: "$79 — applied to repair if you proceed." },
      { step: "Microsolder / BGA", detail: "Done in-house with the right tools." },
      { step: "3–7 days typical", detail: "Board-level work takes time; we keep you updated." },
      { step: "90-day warranty", detail: "All board work warrantied." },
    ],
    pricing: [
      { label: "Diagnostic", price: "$79" },
      { label: "Charging IC / DC jack", price: "from $129" },
      { label: "Liquid-damage cleanup + repair", price: "from $199" },
      { label: "MacBook board no-power", price: "from $249" },
    ],
    faqs: [
      { q: "Is laptop board repair worth it?", a: "If the laptop's worth $400+ in working condition and the repair is under half that, almost always yes. We quote first." },
    ],
    serviceType: "motherboard-repair",
    related: ["laptop-repair-humble-tx", "macbook-repair-humble-tx", "motherboard-repair-humble-tx"],
  },
  {
    slug: "laptop-keyboard-repair-humble-tx",
    title: "Laptop Keyboard Repair Humble",
    metaTitle: "Laptop Keyboard Repair Humble TX | OK Cellular",
    metaDescription:
      "Broken or unresponsive laptop keyboard? Get it fixed fast in Humble TX. All brands, affordable pricing. Walk-in at OK Cellular.",
    hero: {
      eyebrow: "Laptop Keyboard",
      h1: "Laptop Keyboard Repair in Humble",
      subhead:
        "Sticky keys, dead keys, missing keycaps or a whole keyboard that stopped working — we replace laptop keyboards on every major brand.",
    },
    problems: ["Dead or sticky keys", "Missing keycaps", "Whole keyboard unresponsive", "Backlight not working", "Liquid spill on keys"],
    brands: ["HP", "Dell", "Lenovo", "ASUS", "Acer", "MSI", "MacBook Air / Pro"],
    process: [
      { step: "Diagnostic", detail: "We confirm whether the keys, ribbon or board is at fault." },
      { step: "Same-day where possible", detail: "Most keyboards done in a day." },
      { step: "Quality parts", detail: "OEM-grade keyboards." },
      { step: "90-day warranty", detail: "All keyboard work warrantied." },
    ],
    pricing: [
      { label: "HP / Dell / Lenovo keyboard", price: "from $89" },
      { label: "ASUS / MSI / Razer keyboard", price: "from $109" },
      { label: "MacBook keyboard", price: "from $199" },
    ],
    faqs: [
      { q: "Can you replace just one key on a laptop?", a: "Sometimes — depends on the brand and model. Otherwise we replace the whole keyboard assembly." },
    ],
    serviceType: "laptop-diagnostic",
    related: ["laptop-repair-humble-tx", "macbook-repair-humble-tx", "laptop-screen-repair-humble-tx"],
  },
  {
    slug: "ps5-hdmi-repair-humble-tx",
    title: "PS5 HDMI Repair Humble",
    metaTitle: "PS5 HDMI Repair Humble TX | OK Cellular",
    metaDescription:
      "PS5 with no HDMI signal? Get your PS5 HDMI port repaired in Humble TX. Fast, professional fix. Fair pricing at OK Cellular.",
    hero: {
      eyebrow: "PS5 HDMI Repair",
      h1: "PS5 HDMI Port Repair in Humble",
      subhead:
        "PS5 with no signal, broken HDMI port or bent pins inside the socket? We microsolder a new HDMI port from $99 — no need to replace your console.",
    },
    problems: ["No video output to TV", "HDMI cable falls out / loose", "Visibly bent pins inside the HDMI socket", "Picture cuts out when you bump the cable"],
    brands: ["PS5 Disc edition", "PS5 Digital edition", "PS5 Slim"],
    process: [
      { step: "Diagnostic", detail: "$25 — waived if you proceed with the repair." },
      { step: "Microsolder a new socket", detail: "We desolder the broken HDMI port and reflow a new OEM socket onto the board." },
      { step: "24–72 hour turnaround", detail: "Most PS5 HDMI repairs done within a few days." },
      { step: "90-day warranty", detail: "All console HDMI repairs warrantied." },
    ],
    pricing: [
      { label: "PS5 HDMI port repair", price: "from $99" },
      { label: "PS5 HDMI + deep clean + thermal paste", price: "from $149" },
    ],
    faqs: [
      { q: "Will I lose my data?", a: "No — your SSD is untouched. Saves and downloads remain." },
      { q: "Is it worth fixing the HDMI port vs. buying a new PS5?", a: "Almost always yes — $99 repair vs. $400+ for a new PS5." },
    ],
    serviceType: "hdmi-repair",
    related: ["ps5-repair-humble-tx", "hdmi-port-repair-humble-tx", "gaming-console-repair-humble-tx", "xbox-repair-humble-tx"],
  },
  {
    slug: "google-lock-removal-humble-tx",
    title: "Google Account Lock Removal Humble",
    metaTitle: "Google Lock Removal Humble TX | OK Cellular",
    metaDescription:
      "Get your Google account lock removed in Humble TX. Fast FRP bypass service at OK Cellular. All Android devices supported. Walk-ins welcome!",
    hero: {
      eyebrow: "Google Lock Removal",
      h1: "Google Account / FRP Lock Removal in Humble",
      subhead:
        "Bought a used phone and it's stuck on a previous owner's Google login? FRP lock removal for devices you legally own, ID required.",
    },
    problems: ["Stuck on \"Verify your Google account\" after factory reset", "Bought a used Android with someone else's Google account", "Inherited or gifted device with no login info", "Locked out of your own Samsung / Pixel after a reset"],
    brands: ["Samsung Galaxy", "Google Pixel", "Motorola", "TCL", "T-Mobile Revvl", "Most Android phones and tablets"],
    process: [
      { step: "Eligibility check", detail: "Free check by IMEI to confirm the device isn't blacklisted." },
      { step: "ID required", detail: "We only remove locks on devices you legally own. Photo ID and proof of purchase required." },
      { step: "Most unlocks 1–24h", detail: "Most Google account / FRP removals done same day." },
      { step: "Lifetime", detail: "Once removed, you can set up your own Google account on the device." },
    ],
    pricing: [
      { label: "Most Google account / FRP removals", price: "from $49" },
      { label: "Locked Samsung accounts", price: "from $79" },
    ],
    faqs: [
      { q: "Is this legal?", a: "Yes — for devices you legally own. We require photo ID and a receipt or other proof of ownership before any work begins." },
      { q: "Will my data be wiped?", a: "Yes — Google account / FRP removal involves a clean state for the device. There is no data to recover from a locked Android." },
    ],
    serviceType: "phone-unlocking",
    related: ["phone-unlocking-humble-tx", "samsung-repair-humble-tx", "phone-repair-humble-tx"],
  },
  {
    slug: "iphone-15-pro-repair-humble-tx",
    title: "iPhone 15 Pro Repair Humble",
    metaTitle: "iPhone 15 Pro Repair Humble TX | OK Cellular",
    metaDescription:
      "Reliable iPhone 15 Pro repair in Humble TX. Cracked screen, battery & more fixed by certified technicians. Walk-in or call OK Cellular!",
    hero: {
      eyebrow: "iPhone 15 Pro Repair",
      h1: "iPhone 15 Pro Repair in Humble",
      subhead:
        "iPhone 15 Pro and 15 Pro Max — cracked ProMotion OLED, USB-C port wear, dead battery, back glass shatter. Quality parts, 90-day warranty.",
    },
    problems: [
      "Cracked ProMotion OLED",
      "USB-C port loose or not charging",
      "Battery dies fast or shutdown at 30%",
      "Titanium frame dented",
      "Back glass shattered",
      "Action button not responding",
    ],
    brands: ["iPhone 15 Pro", "iPhone 15 Pro Max"],
    process: [
      { step: "Free quote", detail: "Tell us the model and damage; we'll quote in minutes." },
      { step: "Same-day where possible", detail: "Most 15 Pro screen and battery jobs done the same day." },
      { step: "Quality ProMotion OLED", detail: "OEM-grade panels that preserve 120Hz." },
      { step: "90-day warranty", detail: "All iPhone 15 Pro repairs warrantied for 90 days." },
    ],
    pricing: [
      { label: "iPhone 15 Pro screen", price: "from $289" },
      { label: "iPhone 15 Pro Max screen", price: "from $349" },
      { label: "iPhone 15 Pro USB-C port", price: "from $89" },
      { label: "iPhone 15 Pro battery", price: "from $89" },
      { label: "iPhone 15 Pro back glass", price: "from $139" },
    ],
    faqs: [
      { q: "Will ProMotion 120Hz still work after a screen repair?", a: "Yes — we use OEM-grade panels that maintain 120Hz refresh on the 15 Pro and 15 Pro Max." },
      { q: "Do you fix bent titanium frames?", a: "Light frame straightening, yes. Severely bent frames require a full housing swap, which we can quote." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-15-repair-humble-tx", "iphone-16-pro-repair-humble-tx", "iphone-screen-repair-humble-tx"],
  },
  {
    slug: "iphone-16-pro-max-repair-humble-tx",
    title: "iPhone 16 Pro Max Repair Humble",
    metaTitle: "iPhone 16 Pro Max Repair Humble TX | OK Cellular",
    metaDescription:
      "Fast iPhone 16 Pro Max repair in Humble TX. Screen, battery & charging port fixes. Trusted techs, warranty included. Free quote on request.",
    hero: {
      eyebrow: "iPhone 16 Pro Max Repair",
      h1: "iPhone 16 Pro Max Repair in Humble",
      subhead:
        "iPhone 16 Pro Max — cracked 6.9\" ProMotion OLED, dead battery, USB-C wear, back glass shatter, Camera Control button broken. Quality parts, same-day where possible.",
    },
    problems: [
      "Cracked 6.9\" ProMotion OLED",
      "USB-C port not charging or loose",
      "Battery degraded under 80%",
      "Back glass shattered",
      "Camera Control button broken",
      "Titanium frame dented",
    ],
    brands: ["iPhone 16 Pro Max"],
    process: [
      { step: "Free quote", detail: "We quote 16 Pro Max repairs in minutes." },
      { step: "Quality OLED", detail: "OEM-grade panels that preserve ProMotion 120Hz." },
      { step: "Same-day where possible", detail: "Pro Max parts may take an extra day if not in stock." },
      { step: "90-day warranty", detail: "All iPhone 16 Pro Max repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 16 Pro Max screen", price: "from $399" },
      { label: "iPhone 16 Pro Max battery", price: "from $109" },
      { label: "iPhone 16 Pro Max USB-C port", price: "from $109" },
      { label: "iPhone 16 Pro Max back glass", price: "from $169" },
      { label: "Camera Control button", price: "from $79" },
    ],
    faqs: [
      { q: "Is the 16 Pro Max screen interchangeable with the 16 Pro?", a: "No — they're different sizes (6.9\" vs 6.3\"). We always match by exact model." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-16-pro-repair-humble-tx", "iphone-16-repair-humble-tx", "iphone-screen-repair-humble-tx"],
  },
  {
    slug: "ipad-air-repair-humble-tx",
    title: "iPad Air Repair Humble",
    metaTitle: "iPad Air Repair Humble TX | OK Cellular",
    metaDescription:
      "Reliable iPad Air repair in Humble TX. Screen replacement, battery & charging port fixes. All models, fast turnaround. Visit OK Cellular!",
    hero: {
      eyebrow: "iPad Air Repair",
      h1: "iPad Air Repair in Humble",
      subhead:
        "iPad Air (2, 3, 4, 5 and M2) — cracked Liquid Retina screen, dead battery, USB-C port damage, Touch ID failure. Quality parts, 90-day warranty.",
    },
    problems: [
      "Cracked Liquid Retina screen",
      "Battery health under 80%",
      "USB-C port not charging",
      "Touch ID button broken",
      "Apple Pencil not pairing",
      "Back camera cracked",
    ],
    brands: ["iPad Air 2", "iPad Air 3", "iPad Air 4", "iPad Air 5", "iPad Air M2"],
    process: [
      { step: "Free quote", detail: "We quote iPad Air repairs in minutes." },
      { step: "Quality screens", detail: "OEM-grade Liquid Retina that preserves color and Apple Pencil response." },
      { step: "Same-day where possible", detail: "Most Air repairs done same day; some glass-only jobs ship next day." },
      { step: "90-day warranty", detail: "All iPad Air repairs warrantied for 90 days." },
    ],
    pricing: [
      { label: "iPad Air 2 / 3 screen (digitizer)", price: "from $129" },
      { label: "iPad Air 4 / 5 screen", price: "from $199" },
      { label: "iPad Air battery", price: "from $99" },
      { label: "iPad Air USB-C / Lightning port", price: "from $99" },
    ],
    faqs: [
      { q: "Will Apple Pencil still work after a screen repair?", a: "Yes — we use OEM-grade panels that fully support Apple Pencil 1 or 2 depending on your Air model." },
    ],
    serviceType: "screen-repair",
    related: ["ipad-repair-humble-tx", "ipad-pro-repair-humble-tx", "tablet-screen-repair-humble-tx", "tablet-battery-replacement-humble-tx"],
  },
  {
    slug: "iphone-13-repair-humble-tx",
    title: "iPhone 13 Repair Humble",
    metaTitle: "iPhone 13 Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 13 repair in Humble TX. Cracked OLED, battery, Lightning port & back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "iPhone 13 Repair",
      h1: "iPhone 13 Repair in Humble",
      subhead:
        "iPhone 13, 13 mini, 13 Pro, 13 Pro Max — cracked Super Retina OLED, weak battery, Lightning port damage, back glass. Same-day on most repairs.",
    },
    problems: ["Cracked Super Retina OLED", "Battery health under 80%", "Lightning port not charging", "Back glass cracked", "Camera lens cracked", "Won't power on after a fall"],
    brands: ["iPhone 13 mini", "iPhone 13", "iPhone 13 Pro", "iPhone 13 Pro Max"],
    process: [
      { step: "Free quote", detail: "Tell us your iPhone 13 model and symptom for a firm price up front." },
      { step: "Same-day fix", detail: "Most iPhone 13 screens and batteries done in 60 minutes." },
      { step: "Quality OLED", detail: "OEM-grade OLED that preserves True Tone where possible." },
      { step: "90-day warranty", detail: "Every iPhone 13 repair backed by us." },
    ],
    pricing: [
      { label: "iPhone 13 mini / 13 screen", price: "from $159" },
      { label: "iPhone 13 Pro / Pro Max screen", price: "from $239" },
      { label: "iPhone 13 battery", price: "from $69" },
      { label: "iPhone 13 charging port", price: "from $79" },
      { label: "iPhone 13 back glass", price: "from $99" },
    ],
    faqs: [
      { q: "Will Face ID still work after iPhone 13 screen repair?", a: "On most iPhone 13 repairs we preserve Face ID. We tell you up front if your specific repair needs a component transfer." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-14-repair-humble-tx"],
  },
  {
    slug: "iphone-12-repair-humble-tx",
    title: "iPhone 12 Repair Humble",
    metaTitle: "iPhone 12 Repair Humble TX | OK Cellular",
    metaDescription:
      "Fast iPhone 12 repair in Humble TX. Cracked OLED, battery replacement, Lightning port & back glass — most fixes done same day at OK Cellular.",
    hero: {
      eyebrow: "iPhone 12 Repair",
      h1: "iPhone 12 Repair in Humble",
      subhead:
        "iPhone 12 mini, 12, 12 Pro, 12 Pro Max — cracked OLED, battery shutdowns, Lightning port damage, MagSafe / back glass. Same day on most repairs.",
    },
    problems: ["Cracked OLED display", "Battery shutting off at 30%", "Lightning port not charging", "Back glass cracked (MagSafe area)", "MagSafe magnets weak", "Camera lens cracked"],
    brands: ["iPhone 12 mini", "iPhone 12", "iPhone 12 Pro", "iPhone 12 Pro Max"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for any iPhone 12 model." },
      { step: "Same-day fix", detail: "Most iPhone 12 screens and batteries done in 60 minutes." },
      { step: "Quality OLED", detail: "OEM-grade OLED that preserves True Tone where possible." },
      { step: "90-day warranty", detail: "Every iPhone 12 repair backed by us." },
    ],
    pricing: [
      { label: "iPhone 12 mini / 12 screen", price: "from $149" },
      { label: "iPhone 12 Pro / Pro Max screen", price: "from $219" },
      { label: "iPhone 12 battery", price: "from $59" },
      { label: "iPhone 12 charging port", price: "from $69" },
      { label: "iPhone 12 back glass", price: "from $99" },
    ],
    faqs: [
      { q: "Why does my iPhone 12 shut off at 30%?", a: "That's almost always battery health below 80%. A battery swap from $59 fixes it and restores full runtime." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-13-repair-humble-tx"],
  },
  {
    slug: "iphone-11-repair-humble-tx",
    title: "iPhone 11 Repair Humble",
    metaTitle: "iPhone 11 Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 11 repair in Humble TX. Cracked screen, battery, charging port and back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "iPhone 11 Repair",
      h1: "iPhone 11 Repair in Humble",
      subhead:
        "iPhone 11, 11 Pro, 11 Pro Max — cracked Liquid Retina, dying battery, loose Lightning port, back glass shatter. Most repairs done same day.",
    },
    problems: ["Cracked Liquid Retina display", "Battery health below 80%", "Lightning port loose", "Back glass cracked", "Rear camera lens cracked", "Won't turn on after a fall"],
    brands: ["iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for any iPhone 11 model." },
      { step: "Same-day fix", detail: "Most iPhone 11 screens and batteries done in 45–60 minutes." },
      { step: "Quality screens", detail: "OEM-grade LCD (11) and OLED (11 Pro / Pro Max)." },
      { step: "90-day warranty", detail: "Every iPhone 11 repair backed by us." },
    ],
    pricing: [
      { label: "iPhone 11 screen (LCD)", price: "from $119" },
      { label: "iPhone 11 Pro / Pro Max screen (OLED)", price: "from $189" },
      { label: "iPhone 11 battery", price: "from $59" },
      { label: "iPhone 11 charging port", price: "from $69" },
      { label: "iPhone 11 back glass", price: "from $89" },
    ],
    faqs: [
      { q: "Is the iPhone 11 still worth repairing in 2026?", a: "Yes — iPhone 11 still gets iOS updates and remains a strong daily driver. A $119 screen swap is far cheaper than upgrading." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-12-repair-humble-tx"],
  },
  {
    slug: "iphone-x-repair-humble-tx",
    title: "iPhone X / XS / XR Repair Humble",
    metaTitle: "iPhone X / XS / XR Repair Humble TX | OK Cellular",
    metaDescription:
      "iPhone X, XS, XS Max and XR repair in Humble TX. Cracked OLED, battery, charging port and back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "iPhone X / XS / XR Repair",
      h1: "iPhone X, XS & XR Repair in Humble",
      subhead:
        "iPhone X, XS, XS Max, XR — cracked OLED or LCD, weak battery, loose Lightning port, shattered back glass. Most repairs done same day.",
    },
    problems: ["Cracked display (OLED or LCD)", "Battery health below 80%", "Lightning port loose", "Back glass shattered", "Face ID failing intermittently", "Won't power on after a fall"],
    brands: ["iPhone X", "iPhone XS", "iPhone XS Max", "iPhone XR"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for any iPhone X / XS / XR model." },
      { step: "Same-day fix", detail: "Most X-series screens and batteries done in 45–60 minutes." },
      { step: "Quality screens", detail: "OEM-grade OLED for X / XS / XS Max, LCD for XR." },
      { step: "90-day warranty", detail: "All iPhone X / XS / XR repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone X / XS screen (OLED)", price: "from $149" },
      { label: "iPhone XS Max screen (OLED)", price: "from $189" },
      { label: "iPhone XR screen (LCD)", price: "from $109" },
      { label: "iPhone X / XS / XR battery", price: "from $59" },
      { label: "iPhone X / XS / XR back glass", price: "from $89" },
    ],
    faqs: [
      { q: "Will Face ID still work after iPhone X / XS / XR screen repair?", a: "Usually yes. A few specific repairs need a component transfer — we tell you up front if yours does." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-11-repair-humble-tx"],
  },
  {
    slug: "iphone-se-repair-humble-tx",
    title: "iPhone SE Repair Humble",
    metaTitle: "iPhone SE Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone SE repair in Humble TX (2016, 2020, 2022). Cracked screen, battery and charging port fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "iPhone SE Repair",
      h1: "iPhone SE Repair in Humble",
      subhead:
        "iPhone SE 1st gen (2016), 2nd gen (2020), 3rd gen (2022) — cracked screen, weak battery, loose Lightning port. Same-day on most repairs.",
    },
    problems: ["Cracked LCD display", "Battery health below 80%", "Lightning port loose or not charging", "Home button / Touch ID not working", "Won't power on", "Speaker or mic dead"],
    brands: ["iPhone SE (2016, 1st gen)", "iPhone SE (2020, 2nd gen)", "iPhone SE (2022, 3rd gen)"],
    process: [
      { step: "Free quote", detail: "Tell us which SE generation — pricing varies a bit by year." },
      { step: "Same-day fix", detail: "Most iPhone SE screens and batteries done in 30–45 minutes." },
      { step: "Quality screens", detail: "OEM-grade LCD panels for every SE generation." },
      { step: "90-day warranty", detail: "All iPhone SE repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone SE (2016) screen", price: "from $79" },
      { label: "iPhone SE (2020 / 2022) screen", price: "from $89" },
      { label: "iPhone SE battery", price: "from $49" },
      { label: "iPhone SE charging port", price: "from $59" },
    ],
    faqs: [
      { q: "Will Touch ID still work after iPhone SE screen repair?", a: "Yes — we transfer your original Home button so Touch ID keeps working after the screen swap." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-8-repair-humble-tx"],
  },
  {
    slug: "iphone-8-repair-humble-tx",
    title: "iPhone 8 / 8 Plus Repair Humble",
    metaTitle: "iPhone 8 / 8 Plus Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 8 and 8 Plus repair in Humble TX. Cracked screen, battery, charging port and back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "iPhone 8 / 8 Plus Repair",
      h1: "iPhone 8 & 8 Plus Repair in Humble",
      subhead:
        "iPhone 8 and 8 Plus — cracked LCD, weak battery, loose Lightning port, shattered back glass. Affordable, same-day repairs at our Humble shop.",
    },
    problems: ["Cracked LCD display", "Battery health below 80%", "Lightning port loose", "Back glass cracked", "Home button / Touch ID not working", "Won't turn on"],
    brands: ["iPhone 8", "iPhone 8 Plus"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for iPhone 8 or 8 Plus." },
      { step: "Same-day fix", detail: "Most iPhone 8 screens and batteries done in 30–45 minutes." },
      { step: "Quality LCD", detail: "OEM-grade LCD panels for iPhone 8 and 8 Plus." },
      { step: "90-day warranty", detail: "All iPhone 8 / 8 Plus repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 8 screen", price: "from $79" },
      { label: "iPhone 8 Plus screen", price: "from $89" },
      { label: "iPhone 8 / 8 Plus battery", price: "from $49" },
      { label: "iPhone 8 / 8 Plus charging port", price: "from $59" },
      { label: "iPhone 8 / 8 Plus back glass", price: "from $79" },
    ],
    faqs: [
      { q: "Is iPhone 8 still worth repairing?", a: "For a $79 screen or $49 battery, almost always yes — iPhone 8 still works fine for calls, texts and most apps. Heavier repairs we'll quote honestly." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-se-repair-humble-tx", "iphone-7-repair-humble-tx"],
  },
  {
    slug: "iphone-7-repair-humble-tx",
    title: "iPhone 7 / 6s / 6 Repair Humble",
    metaTitle: "iPhone 7 / 6s / 6 Repair Humble TX | OK Cellular",
    metaDescription:
      "Affordable iPhone 7, 6s and 6 repair in Humble TX. Cracked screen, weak battery and loose Lightning port fixed same day from $59. 90-day warranty.",
    hero: {
      eyebrow: "iPhone 7 / 6s / 6 Repair",
      h1: "iPhone 7, 6s & 6 Repair in Humble",
      subhead:
        "Still rocking an iPhone 7, 6s or 6? We fix cracked LCDs, weak batteries and loose Lightning ports on these legacy models for $59–$79 at our Humble shop — no upsells, no pressure to upgrade.",
    },
    problems: [
      "Cracked LCD or black display",
      "Battery health below 80% or swollen",
      "Lightning port loose or won't charge",
      "Home button / Touch ID stopped working",
      "Earpiece or speaker weak after a drop",
      "Won't turn on at all",
    ],
    brands: ["iPhone 7", "iPhone 7 Plus", "iPhone 6s", "iPhone 6s Plus", "iPhone 6", "iPhone 6 Plus"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for iPhone 7, 6s or 6." },
      { step: "Same-day fix", detail: "Most legacy iPhone screens and batteries done in 30–45 minutes." },
      { step: "Quality LCD", detail: "OEM-grade LCD panels for these older models." },
      { step: "90-day warranty", detail: "All iPhone 7 / 6s / 6 repairs warrantied." },
    ],
    pricing: [
      { label: "iPhone 7 / 6s / 6 screen", price: "from $59" },
      { label: "iPhone 7 Plus / 6s Plus / 6 Plus screen", price: "from $69" },
      { label: "iPhone 7 / 6s / 6 battery", price: "from $49" },
      { label: "iPhone 7 / 6s / 6 charging port", price: "from $59" },
    ],
    faqs: [
      { q: "Is it still worth repairing an iPhone 7 or 6s in 2026?", a: "If you only need a $59 screen or $49 battery and the rest of the phone works, yes — these models still handle calls, texts and most apps fine. Heavier repairs (logic board, multiple parts) we'll tell you straight up if it's not worth it." },
      { q: "Do you still stock parts for iPhone 6 and 6s?", a: "Yes — we keep LCDs and batteries for iPhone 6, 6s, 7 and their Plus variants in stock. Walk-in or call ahead." },
    ],
    serviceType: "screen-repair",
    related: ["iphone-repair-humble-tx", "iphone-screen-repair-humble-tx", "iphone-battery-replacement-humble-tx", "iphone-8-repair-humble-tx"],
  },
  {
    slug: "samsung-galaxy-a54-repair-humble-tx",
    title: "Samsung Galaxy A54 Repair Humble",
    metaTitle: "Samsung Galaxy A54 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy A54 repair in Humble TX. Cracked AMOLED, battery, USB-C port and back glass fixed same day. Affordable pricing & 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy A54 Repair",
      h1: "Samsung Galaxy A54 Repair in Humble",
      subhead:
        "Galaxy A54 5G — cracked Super AMOLED, swollen battery, loose USB-C port, back glass shatter. Same-day where possible at our Humble shop.",
    },
    problems: ["Cracked Super AMOLED display", "Battery degraded", "USB-C port not charging", "Back glass cracked", "Front or rear camera cracked", "Won't power on after a fall"],
    brands: ["Galaxy A54", "Galaxy A54 5G"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for the Galaxy A54." },
      { step: "Same-day fix", detail: "Most A54 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade Super AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy A54 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy A54 screen", price: "from $149" },
      { label: "Galaxy A54 battery", price: "from $69" },
      { label: "Galaxy A54 charging port", price: "from $79" },
      { label: "Galaxy A54 back glass", price: "from $89" },
    ],
    faqs: [
      { q: "Are A-series screens cheaper to repair than S-series?", a: "Yes — A-series AMOLED panels are less expensive than S-series, so most A54 screen repairs come in well under a flagship S repair." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx", "samsung-galaxy-a35-repair-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-a54-humble-tx", label: "Galaxy A54" },
  },
  {
    slug: "samsung-galaxy-a35-repair-humble-tx",
    title: "Samsung Galaxy A35 Repair Humble",
    metaTitle: "Samsung Galaxy A35 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy A35 repair in Humble TX. Cracked AMOLED, battery, USB-C port & back glass fixed same day. Affordable pricing & 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy A35 Repair",
      h1: "Samsung Galaxy A35 Repair in Humble",
      subhead:
        "Galaxy A35 5G — cracked Super AMOLED, weak battery, loose USB-C port, back glass shatter. Affordable repairs at our Humble shop.",
    },
    problems: ["Cracked Super AMOLED display", "Battery degraded", "USB-C port not charging", "Back glass cracked", "Camera lens cracked", "Won't power on after a fall"],
    brands: ["Galaxy A35", "Galaxy A35 5G"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for the Galaxy A35." },
      { step: "Same-day fix", detail: "Most A35 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade Super AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy A35 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy A35 screen", price: "from $139" },
      { label: "Galaxy A35 battery", price: "from $69" },
      { label: "Galaxy A35 charging port", price: "from $79" },
      { label: "Galaxy A35 back glass", price: "from $79" },
    ],
    faqs: [
      { q: "How long does a Galaxy A35 screen repair take?", a: "Most A35 screen jobs are done same day — usually within 2–3 hours of drop-off." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx", "samsung-galaxy-a54-repair-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-a35-humble-tx", label: "Galaxy A35" },
  },
  {
    slug: "samsung-galaxy-a15-repair-humble-tx",
    title: "Samsung Galaxy A15 Repair Humble",
    metaTitle: "Samsung Galaxy A15 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy A15 repair in Humble TX. Cracked screen, battery, USB-C port & back fixed affordably with a 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy A15 Repair",
      h1: "Samsung Galaxy A15 Repair in Humble",
      subhead:
        "Galaxy A15 and A15 5G — cracked AMOLED, weak battery, loose USB-C port. Affordable repairs at our Humble shop, same day where possible.",
    },
    problems: ["Cracked AMOLED display", "Battery drains fast", "USB-C port loose", "Back panel cracked", "Speaker or mic dead", "Won't power on"],
    brands: ["Galaxy A15", "Galaxy A15 5G"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for the Galaxy A15." },
      { step: "Same-day fix", detail: "Most A15 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy A15 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy A15 screen", price: "from $119" },
      { label: "Galaxy A15 battery", price: "from $59" },
      { label: "Galaxy A15 charging port", price: "from $69" },
      { label: "Galaxy A15 back panel", price: "from $69" },
    ],
    faqs: [
      { q: "Is the Galaxy A15 worth repairing?", a: "For an entry-level Galaxy, yes — a $119 screen or $59 battery typically costs much less than replacing the phone outright." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx", "samsung-galaxy-a35-repair-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-a15-humble-tx", label: "Galaxy A15" },
  },
  {
    slug: "samsung-galaxy-s22-repair-humble-tx",
    title: "Samsung Galaxy S22 Repair Humble",
    metaTitle: "Samsung Galaxy S22 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy S22 / S22+ / S22 Ultra repair in Humble TX. Cracked AMOLED, battery, USB-C port & back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy S22 Repair",
      h1: "Samsung Galaxy S22 Repair in Humble",
      subhead:
        "Galaxy S22, S22+, S22 Ultra — cracked AMOLED, weak battery, loose USB-C, shattered back glass, S Pen issues (Ultra). Same day where possible.",
    },
    problems: ["Cracked AMOLED display", "Battery health degraded", "USB-C charging port loose", "Back glass cracked", "S Pen broken (Ultra)", "Won't power on"],
    brands: ["Galaxy S22", "Galaxy S22+", "Galaxy S22 Ultra"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for any S22 model." },
      { step: "Same-day where possible", detail: "Most S22 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy S22 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy S22 screen", price: "from $189" },
      { label: "Galaxy S22+ screen", price: "from $219" },
      { label: "Galaxy S22 Ultra screen", price: "from $279" },
      { label: "Galaxy S22 battery", price: "from $69" },
      { label: "Galaxy S22 charging port", price: "from $79" },
    ],
    faqs: [
      { q: "Will the in-display fingerprint sensor work after S22 screen repair?", a: "Yes — we calibrate the in-display sensor as part of the screen replacement." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-s23-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-s22-humble-tx", label: "Galaxy S22" },
  },
  {
    slug: "samsung-galaxy-s21-repair-humble-tx",
    title: "Samsung Galaxy S21 Repair Humble",
    metaTitle: "Samsung Galaxy S21 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy S21 / S21+ / S21 Ultra repair in Humble TX. Cracked AMOLED, battery, USB-C port & back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy S21 Repair",
      h1: "Samsung Galaxy S21 Repair in Humble",
      subhead:
        "Galaxy S21, S21+, S21 Ultra and S21 FE — cracked AMOLED, weak battery, loose USB-C, shattered back. Same day where possible at our Humble shop.",
    },
    problems: ["Cracked AMOLED display", "Battery health degraded", "USB-C charging port loose", "Back glass cracked", "Camera glass cracked", "Won't power on"],
    brands: ["Galaxy S21", "Galaxy S21+", "Galaxy S21 Ultra", "Galaxy S21 FE"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for any S21 model." },
      { step: "Same-day where possible", detail: "Most S21 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels." },
      { step: "90-day warranty", detail: "All Galaxy S21 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy S21 / FE screen", price: "from $169" },
      { label: "Galaxy S21+ screen", price: "from $199" },
      { label: "Galaxy S21 Ultra screen", price: "from $259" },
      { label: "Galaxy S21 battery", price: "from $69" },
      { label: "Galaxy S21 charging port", price: "from $79" },
    ],
    faqs: [
      { q: "Is the Galaxy S21 still supported by Samsung?", a: "Yes — the S21 still gets security updates. A screen or battery repair is a fraction of replacement cost and keeps it running for years." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-s22-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-s21-humble-tx", label: "Galaxy S21" },
  },
  {
    slug: "samsung-galaxy-note-20-repair-humble-tx",
    title: "Samsung Galaxy Note 20 Repair Humble",
    metaTitle: "Samsung Galaxy Note 20 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy Note 20 / Note 20 Ultra repair in Humble TX. Cracked AMOLED, battery, USB-C, S Pen & back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy Note 20 Repair",
      h1: "Samsung Galaxy Note 20 Repair in Humble",
      subhead:
        "Galaxy Note 20 and Note 20 Ultra — cracked AMOLED, weak battery, loose USB-C, broken S Pen, back glass shatter. Same day where possible.",
    },
    problems: ["Cracked AMOLED display", "Battery health degraded", "USB-C charging port loose", "S Pen broken or lost", "Back glass shattered", "Won't power on"],
    brands: ["Galaxy Note 20", "Galaxy Note 20 Ultra", "Galaxy Note 20 5G"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for either Note 20 model." },
      { step: "Same-day where possible", detail: "Most Note 20 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels with S Pen calibration." },
      { step: "90-day warranty", detail: "All Galaxy Note 20 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy Note 20 screen", price: "from $189" },
      { label: "Galaxy Note 20 Ultra screen", price: "from $269" },
      { label: "Galaxy Note 20 battery", price: "from $69" },
      { label: "Galaxy Note 20 charging port", price: "from $79" },
      { label: "Replacement S Pen", price: "from $39" },
    ],
    faqs: [
      { q: "Will the S Pen still work after Note 20 screen repair?", a: "Yes — we calibrate the digitizer as part of the screen replacement, so S Pen pressure and tilt keep working." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-note-10-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-note-20-humble-tx", label: "Galaxy Note 20" },
  },
  {
    slug: "samsung-galaxy-note-10-repair-humble-tx",
    title: "Samsung Galaxy Note 10 Repair Humble",
    metaTitle: "Samsung Galaxy Note 10 Repair Humble TX | OK Cellular",
    metaDescription:
      "Galaxy Note 10 / Note 10+ repair in Humble TX. Cracked AMOLED, battery, USB-C, S Pen & back glass fixed same day. 90-day warranty at OK Cellular.",
    hero: {
      eyebrow: "Galaxy Note 10 Repair",
      h1: "Samsung Galaxy Note 10 Repair in Humble",
      subhead:
        "Galaxy Note 10 and Note 10+ — cracked AMOLED, weak battery, loose USB-C, broken S Pen, back glass shatter. Same day where possible.",
    },
    problems: ["Cracked AMOLED display", "Battery health degraded", "USB-C charging port loose", "S Pen broken or lost", "Back glass shattered", "Won't power on"],
    brands: ["Galaxy Note 10", "Galaxy Note 10+", "Galaxy Note 10 5G"],
    process: [
      { step: "Free quote", detail: "Quick check, firm price for either Note 10 model." },
      { step: "Same-day where possible", detail: "Most Note 10 screens and batteries done in a day." },
      { step: "Quality AMOLED", detail: "OEM-grade AMOLED panels with S Pen calibration." },
      { step: "90-day warranty", detail: "All Galaxy Note 10 repairs warrantied." },
    ],
    pricing: [
      { label: "Galaxy Note 10 screen", price: "from $179" },
      { label: "Galaxy Note 10+ screen", price: "from $239" },
      { label: "Galaxy Note 10 battery", price: "from $69" },
      { label: "Galaxy Note 10 charging port", price: "from $79" },
      { label: "Replacement S Pen", price: "from $39" },
    ],
    faqs: [
      { q: "Are Note 10 parts still available in 2026?", a: "Yes — we stock OEM-grade Note 10 screens and batteries, and most repairs are completed same day." },
    ],
    serviceType: "screen-repair",
    related: ["samsung-repair-humble-tx", "samsung-galaxy-note-20-repair-humble-tx", "samsung-screen-repair-humble-tx", "samsung-battery-replacement-humble-tx"],
    upgradeTo: { slug: "buy-samsung-galaxy-note-10-humble-tx", label: "Galaxy Note 10" },
  },
];

export const SERVICES_BY_SLUG = Object.fromEntries(SERVICES_DATA.map((s) => [s.slug, s])) as Record<string, ServiceData>;
