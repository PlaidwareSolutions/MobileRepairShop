export type InventoryItem = {
  id: string;
  category: string;
  brand: string;
  model: string;
  storage?: string;
  color?: string;
  condition?: string;
  carrier?: string;
  price: string;
  warranty?: string;
  availability?: string;
  imageUrl?: string;
  description?: string;
};

// Showroom fallback used when the API is unreachable. Includes at least one
// item per brand bucket (apple / samsung / google / consoles) so the chip
// filters never render an empty catalog when the page loads with no API.
export const INVENTORY_FALLBACK: InventoryItem[] = [
  // Apple — iPhones
  { id: "iphone-13-128-blue", category: "Used iPhones", brand: "Apple", model: "iPhone 13", storage: "128GB", color: "Blue", condition: "Good", carrier: "Unlocked", price: "$329", warranty: "30-day", availability: "In stock" },
  { id: "iphone-12-128-black", category: "Used iPhones", brand: "Apple", model: "iPhone 12", storage: "128GB", color: "Black", condition: "Good", carrier: "Unlocked", price: "$249", warranty: "30-day", availability: "In stock" },
  { id: "iphone-14-128-purple-refurb", category: "Refurbished iPhones", brand: "Apple", model: "iPhone 14", storage: "128GB", color: "Purple", condition: "Refurbished", carrier: "Unlocked", price: "$489", warranty: "90-day", availability: "In stock" },
  // Apple — iPads
  { id: "ipad-9-64-silver", category: "iPads", brand: "Apple", model: "iPad (9th Gen)", storage: "64GB", color: "Silver", condition: "Good", price: "$229", warranty: "90-day", availability: "In stock" },
  { id: "ipad-air-4-64-rose", category: "iPads", brand: "Apple", model: "iPad Air (4th Gen)", storage: "64GB", color: "Rose Gold", condition: "Very Good", price: "$329", warranty: "90-day", availability: "In stock" },
  // Apple — MacBooks
  { id: "macbook-air-m1-256", category: "MacBooks", brand: "Apple", model: "MacBook Air M1", storage: "256GB SSD", condition: "Good", price: "$649", warranty: "30-day", availability: "In stock" },
  // Apple — Watches
  { id: "watch-se-40-silver", category: "Apple Watches", brand: "Apple", model: "Watch SE (2nd Gen) 40mm", color: "Silver", condition: "Good", price: "$179", warranty: "30-day", availability: "In stock" },
  // Apple — AirPods
  { id: "airpods-pro-2", category: "AirPods", brand: "Apple", model: "AirPods Pro (2nd Gen)", condition: "Open box", price: "$169", warranty: "30-day", availability: "In stock" },

  // Samsung — phones
  { id: "samsung-s22-128-black", category: "Samsung phones", brand: "Samsung", model: "Galaxy S22", storage: "128GB", color: "Phantom Black", condition: "Good", carrier: "Unlocked", price: "$299", warranty: "30-day", availability: "In stock" },
  { id: "samsung-a54-128-graphite", category: "Samsung phones", brand: "Samsung", model: "Galaxy A54 5G", storage: "128GB", color: "Awesome Graphite", condition: "Very Good", carrier: "Unlocked", price: "$249", warranty: "90-day", availability: "In stock" },
  { id: "samsung-note-20-128-bronze", category: "Samsung phones", brand: "Samsung", model: "Galaxy Note 20", storage: "128GB", color: "Mystic Bronze", condition: "Good", carrier: "Unlocked", price: "$229", warranty: "30-day", availability: "In stock" },

  // Google — Pixel phones
  { id: "pixel-7-128-obsidian", category: "Google Pixel", brand: "Google", model: "Pixel 7", storage: "128GB", color: "Obsidian", condition: "Very Good", carrier: "Unlocked", price: "$299", warranty: "90-day", availability: "In stock" },
  { id: "pixel-6a-128-charcoal", category: "Google Pixel", brand: "Google", model: "Pixel 6a", storage: "128GB", color: "Charcoal", condition: "Good", carrier: "Unlocked", price: "$179", warranty: "30-day", availability: "In stock" },

  // Gaming Consoles
  { id: "ps5-disc-825", category: "Consoles", brand: "Sony", model: "PlayStation 5 (Disc)", storage: "825GB SSD", condition: "Refurbished", price: "$369", warranty: "90-day", availability: "In stock" },
  { id: "xbox-series-s-512", category: "Consoles", brand: "Microsoft", model: "Xbox Series S", storage: "512GB SSD", condition: "Good", price: "$219", warranty: "30-day", availability: "In stock" },
  { id: "switch-oled-white", category: "Consoles", brand: "Nintendo", model: "Switch OLED", color: "White", condition: "Very Good", price: "$259", warranty: "90-day", availability: "In stock" },
];
