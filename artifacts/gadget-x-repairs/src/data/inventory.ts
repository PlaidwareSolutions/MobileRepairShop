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

export const INVENTORY_FALLBACK: InventoryItem[] = [
  { id: "iphone-13-128-blue", category: "Used iPhones", brand: "Apple", model: "iPhone 13", storage: "128GB", color: "Blue", condition: "Good", carrier: "Unlocked", price: "$329", warranty: "30-day", availability: "In stock" },
  { id: "iphone-12-128-black", category: "Used iPhones", brand: "Apple", model: "iPhone 12", storage: "128GB", color: "Black", condition: "Good", carrier: "Unlocked", price: "$249", warranty: "30-day", availability: "In stock" },
  { id: "iphone-14-128-purple-refurb", category: "Refurbished iPhones", brand: "Apple", model: "iPhone 14", storage: "128GB", color: "Purple", condition: "Refurbished", carrier: "Unlocked", price: "$489", warranty: "90-day", availability: "In stock" },
  { id: "samsung-s22-128-black", category: "Samsung phones", brand: "Samsung", model: "Galaxy S22", storage: "128GB", color: "Phantom Black", condition: "Good", carrier: "Unlocked", price: "$299", warranty: "30-day", availability: "In stock" },
  { id: "macbook-air-m1-256", category: "Laptops", brand: "Apple", model: "MacBook Air M1", storage: "256GB SSD", condition: "Good", price: "$649", warranty: "30-day", availability: "In stock" },
  { id: "watch-se-40-silver", category: "Apple Watches", brand: "Apple", model: "Watch SE (2nd Gen) 40mm", color: "Silver", condition: "Good", price: "$179", warranty: "30-day", availability: "In stock" },
  { id: "airpods-pro-2", category: "AirPods", brand: "Apple", model: "AirPods Pro (2nd Gen)", condition: "Open box", price: "$169", warranty: "30-day", availability: "In stock" },
];
