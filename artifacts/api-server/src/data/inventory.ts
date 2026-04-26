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
};

export const INVENTORY: InventoryItem[] = [
  { id: "iphone-13-128-blue", category: "Used iPhones", brand: "Apple", model: "iPhone 13", storage: "128GB", color: "Blue", condition: "Good", carrier: "Unlocked", price: "$329", warranty: "30-day", availability: "In stock" },
  { id: "iphone-12-128-black", category: "Used iPhones", brand: "Apple", model: "iPhone 12", storage: "128GB", color: "Black", condition: "Good", carrier: "Unlocked", price: "$249", warranty: "30-day", availability: "In stock" },
  { id: "iphone-11-64-white", category: "Used iPhones", brand: "Apple", model: "iPhone 11", storage: "64GB", color: "White", condition: "Fair", carrier: "Unlocked", price: "$179", warranty: "30-day", availability: "In stock" },
  { id: "iphone-14-128-purple-refurb", category: "Refurbished iPhones", brand: "Apple", model: "iPhone 14", storage: "128GB", color: "Purple", condition: "Refurbished", carrier: "Unlocked", price: "$489", warranty: "90-day", availability: "In stock" },
  { id: "iphone-13-pro-256-graphite-refurb", category: "Refurbished iPhones", brand: "Apple", model: "iPhone 13 Pro", storage: "256GB", color: "Graphite", condition: "Refurbished", carrier: "Unlocked", price: "$549", warranty: "90-day", availability: "In stock" },
  { id: "samsung-s22-128-black", category: "Samsung phones", brand: "Samsung", model: "Galaxy S22", storage: "128GB", color: "Phantom Black", condition: "Good", carrier: "Unlocked", price: "$299", warranty: "30-day", availability: "In stock" },
  { id: "samsung-a54-128-graphite", category: "Samsung phones", brand: "Samsung", model: "Galaxy A54", storage: "128GB", color: "Graphite", condition: "Good", carrier: "Unlocked", price: "$229", warranty: "30-day", availability: "In stock" },
  { id: "pixel-7-128-snow", category: "Google Pixel phones", brand: "Google", model: "Pixel 7", storage: "128GB", color: "Snow", condition: "Good", carrier: "Unlocked", price: "$269", warranty: "30-day", availability: "In stock" },
  { id: "pixel-6a-128-charcoal", category: "Google Pixel phones", brand: "Google", model: "Pixel 6a", storage: "128GB", color: "Charcoal", condition: "Good", carrier: "Unlocked", price: "$179", warranty: "30-day", availability: "In stock" },
  { id: "moto-g-power-2023", category: "Motorola phones", brand: "Motorola", model: "Moto G Power (2023)", storage: "64GB", color: "Mineral Black", condition: "Good", carrier: "Unlocked", price: "$129", warranty: "30-day", availability: "In stock" },
  { id: "moto-g-stylus-2024", category: "Motorola phones", brand: "Motorola", model: "Moto G Stylus 5G", storage: "128GB", color: "Sapphire Blue", condition: "Good", carrier: "Unlocked", price: "$199", warranty: "30-day", availability: "In stock" },
  { id: "revvl-6-pro", category: "Revvl phones", brand: "T-Mobile", model: "Revvl 6 Pro 5G", storage: "128GB", color: "Black", condition: "Good", carrier: "T-Mobile", price: "$129", warranty: "30-day", availability: "In stock" },
  { id: "macbook-air-m1-256", category: "Laptops", brand: "Apple", model: "MacBook Air M1", storage: "256GB SSD", condition: "Good", price: "$649", warranty: "30-day", availability: "In stock" },
  { id: "hp-15-i5-256", category: "Laptops", brand: "HP", model: "Pavilion 15 i5", storage: "256GB SSD / 8GB RAM", condition: "Good", price: "$349", warranty: "30-day", availability: "In stock" },
  { id: "dell-latitude-5400-256", category: "Laptops", brand: "Dell", model: "Latitude 5400", storage: "256GB SSD / 16GB RAM", condition: "Good", price: "$329", warranty: "30-day", availability: "In stock" },
  { id: "watch-se-40-silver", category: "Apple Watches", brand: "Apple", model: "Watch SE (2nd Gen) 40mm", color: "Silver", condition: "Good", price: "$179", warranty: "30-day", availability: "In stock" },
  { id: "watch-7-45-midnight", category: "Apple Watches", brand: "Apple", model: "Watch Series 7 45mm", color: "Midnight", condition: "Good", price: "$229", warranty: "30-day", availability: "In stock" },
  { id: "airpods-pro-2", category: "AirPods", brand: "Apple", model: "AirPods Pro (2nd Gen)", condition: "Open box", price: "$169", warranty: "30-day", availability: "In stock" },
  { id: "airpods-3", category: "AirPods", brand: "Apple", model: "AirPods (3rd Gen)", condition: "Open box", price: "$129", warranty: "30-day", availability: "In stock" },
  { id: "case-iphone-15-clear", category: "Accessories", brand: "Generic", model: "Clear case for iPhone 15 / Pro / Pro Max", price: "$15", availability: "In stock" },
  { id: "screen-protector-iphone-15", category: "Accessories", brand: "Generic", model: "Tempered glass for iPhone 15 / Pro / Pro Max", price: "$10", availability: "In stock" },
  { id: "usb-c-cable-6ft", category: "Accessories", brand: "Generic", model: "USB-C 6ft braided cable", price: "$12", availability: "In stock" },
  { id: "lightning-cable-6ft", category: "Accessories", brand: "Generic", model: "Lightning 6ft braided cable", price: "$12", availability: "In stock" },
  { id: "wall-charger-20w", category: "Accessories", brand: "Generic", model: "20W USB-C wall charger", price: "$15", availability: "In stock" },
];
