export type ReviewData = {
  author: string;
  rating: 5 | 4;
  date: string;
  body: string;
  service?: string;
};

export const REVIEWS_DATA: ReviewData[] = [
  { author: "Marcus J.", rating: 5, date: "2026-04-01", body: "Brought my PS5 in for a busted HDMI port. Had it back in 2 days, works perfectly. Saved me from having to buy a new console.", service: "PS5 HDMI repair" },
  { author: "Sandra T.", rating: 5, date: "2026-03-28", body: "iPhone 13 Pro screen cracked into a thousand pieces. They had a replacement in stock and got it done while I waited. Honest pricing too.", service: "iPhone screen replacement" },
  { author: "David K.", rating: 5, date: "2026-03-22", body: "MacBook Air battery was at 71%. New battery installed in about an hour. They walked me through the process and answered every question.", service: "MacBook battery" },
  { author: "Lupe G.", rating: 5, date: "2026-03-19", body: "Activated my new Cricket line and ported my number from T-Mobile. Took 30 minutes, no headache. Great customer service.", service: "Cricket activation" },
  { author: "Kevin R.", rating: 5, date: "2026-03-12", body: "Sold them my old Galaxy S22 — got a fair cash price on the spot. No haggling, just an honest offer.", service: "Sold a phone" },
  { author: "Aisha M.", rating: 5, date: "2026-03-08", body: "Xbox Series X had no display. Diagnosed as HDMI port the same day, fixed in 48 hours. Friendly, professional, fair price.", service: "Xbox HDMI repair" },
  { author: "Jorge L.", rating: 5, date: "2026-03-02", body: "Cracked iPad Pro screen, replaced same day. They're the only people I trust with my devices in Houston.", service: "iPad screen" },
  { author: "Chantelle B.", rating: 4, date: "2026-02-26", body: "Good repair on my Pixel 7 charging port. Took a day longer than expected but the work was solid and they kept me updated.", service: "Pixel 7 charging port" },
  { author: "Reginald W.", rating: 5, date: "2026-02-18", body: "Bought a refurbished iPhone 12 from them — looks new, works perfect, came with 90-day warranty. Will be back.", service: "Refurbished iPhone" },
  { author: "Patricia O.", rating: 5, date: "2026-02-09", body: "Honest, fast, fair. They told me my old laptop wasn't worth fixing and helped me pick a refurbished replacement instead. Appreciate the integrity.", service: "Laptop diagnostic" },
];
