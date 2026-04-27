import React, { useState, useMemo } from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  Headphones,
  Wrench,
  Search,
  Filter,
  X,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import {
  BUSINESS,
  SERVICES,
  SELL_PRODUCTS,
  COPYRIGHT
} from "./_content";

const iconMap: Record<string, React.ElementType> = {
  smartphone: Smartphone,
  tablet: Tablet,
  laptop: Laptop,
  gamepad: Gamepad2,
  headphones: Headphones,
  wrench: Wrench
};

// Mock data extension for filtering & catalog display
const CATALOG_ITEMS = [
  ...SERVICES.map((s, i) => ({
    id: `svc-${i}`,
    type: "repair",
    name: s.name,
    desc: s.desc,
    icon: s.icon,
    deviceType: s.icon === "smartphone" ? "phone" : s.icon === "tablet" ? "tablet" : s.icon === "laptop" ? "laptop" : s.icon === "gamepad" ? "console" : "accessory",
    price: s.name.includes("MacBook") ? 149 : s.name.includes("iPad") ? 99 : s.name.includes("Switch") ? 69 : s.name.includes("Console") ? 89 : 69,
    turnaround: s.name.includes("MacBook") || s.name.includes("Laptop") ? "2-3 days" : s.name.includes("iPad") || s.name.includes("Tablet") ? "next-day" : "same-day",
  })),
  ...SELL_PRODUCTS.map((p, i) => ({
    id: `prod-${i}`,
    type: "shop",
    name: p.name,
    desc: p.desc,
    icon: p.icon,
    deviceType: p.icon === "smartphone" ? "phone" : p.icon === "tablet" ? "tablet" : p.icon === "laptop" ? "laptop" : p.icon === "gamepad" ? "console" : "accessory",
    price: p.name.includes("MacBook") ? 299 : p.name.includes("Phone") ? 199 : p.name.includes("Console") ? 199 : p.name.includes("Pad") ? 149 : 19,
    turnaround: "instant",
  }))
];

export function ServiceCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemType, setItemType] = useState<"all" | "repair" | "shop">("all");
  const [deviceTypes, setDeviceTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleDeviceType = (dt: string) => {
    setDeviceTypes(prev => prev.includes(dt) ? prev.filter(t => t !== dt) : [...prev, dt]);
  };

  const filteredItems = useMemo(() => {
    return CATALOG_ITEMS.filter(item => {
      if (itemType !== "all" && item.type !== itemType) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase()) && !item.desc.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (deviceTypes.length > 0 && !deviceTypes.includes(item.deviceType)) return false;
      if (item.price > maxPrice) return false;
      return true;
    });
  }, [searchQuery, itemType, deviceTypes, maxPrice]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      {/* UTILITY STRIP */}
      <div className="bg-zinc-950 text-zinc-300 py-2 px-4 text-xs font-bold uppercase tracking-widest flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-red-500" /> {BUSINESS.addressLine1}</span>
          <span className="hidden md:flex items-center gap-2"><Clock className="w-3 h-3 text-red-500" /> {BUSINESS.hoursShort}</span>
        </div>
        <a href={BUSINESS.phoneTel} className="flex items-center gap-2 text-white hover:text-red-500 transition-colors">
          <Phone className="w-3 h-3 text-red-500" /> {BUSINESS.phoneDisplay}
        </a>
      </div>

      {/* HEADER / MINIMAL HERO */}
      <header className="bg-white border-b-4 border-zinc-900 shadow-sm sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-4 py-4 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-6 w-full md:w-auto">
            <a href="/" className="bg-zinc-950 p-3 shrink-0 inline-block">
              <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-10 w-auto" />
            </a>
            <div className="hidden md:block border-l-2 border-zinc-200 pl-6 py-1">
              <h1 className="font-black uppercase tracking-tight text-xl text-zinc-900 leading-none mb-1">
                Repairs & Devices
              </h1>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                For everything you carry. Houston, since 2010.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-96 relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search repairs or products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-100 border-2 border-zinc-900 font-bold placeholder:text-zinc-400 focus:outline-none focus:border-red-600 focus:ring-0 transition-colors rounded-none"
            />
          </div>
        </div>
      </header>

      {/* MAIN CATALOG LAYOUT */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full px-4 py-8 flex flex-col lg:flex-row gap-8 relative">
        
        {/* MOBILE FILTER TOGGLE */}
        <button 
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="lg:hidden flex items-center justify-center gap-2 bg-zinc-900 text-white py-3 font-black uppercase tracking-widest text-sm"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>

        {/* SIDEBAR FILTERS */}
        <aside className={`lg:w-64 shrink-0 flex flex-col gap-8 ${mobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>
          <div className="bg-white border-4 border-zinc-900 p-6 shadow-[8px_8px_0_0_#18181b] sticky top-32">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-black uppercase text-xl tracking-tight">Filters</h2>
              {mobileFiltersOpen && (
                <button onClick={() => setMobileFiltersOpen(false)} className="lg:hidden"><X className="w-5 h-5" /></button>
              )}
            </div>

            {/* Type Toggle */}
            <div className="mb-8">
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-3">Catalog</h3>
              <div className="flex flex-col gap-2">
                {(["all", "repair", "shop"] as const).map(t => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 border-2 border-zinc-900 flex items-center justify-center ${itemType === t ? 'bg-red-600 border-red-600' : 'bg-white group-hover:border-red-600'}`}>
                      {itemType === t && <div className="w-2 h-2 bg-white" />}
                    </div>
                    <span className="font-bold uppercase text-sm">{t === "all" ? "Everything" : t === "repair" ? "Repairs" : "Shop"}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Device Types */}
            <div className="mb-8">
              <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500 mb-3">Device</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "phone", label: "Phones" },
                  { id: "tablet", label: "Tablets" },
                  { id: "laptop", label: "Laptops" },
                  { id: "console", label: "Consoles" },
                  { id: "accessory", label: "Accessories" }
                ].map(dt => (
                  <button
                    key={dt.id}
                    onClick={() => toggleDeviceType(dt.id)}
                    className={`px-3 py-1.5 border-2 font-bold text-xs uppercase tracking-wider transition-colors ${
                      deviceTypes.includes(dt.id) 
                        ? 'bg-zinc-900 border-zinc-900 text-white' 
                        : 'bg-white border-zinc-300 text-zinc-600 hover:border-zinc-900'
                    }`}
                  >
                    {dt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-xs uppercase tracking-widest text-zinc-500">Max Price</h3>
                <span className="font-black text-sm">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600 h-2 bg-zinc-200 rounded-none appearance-none"
              />
            </div>
          </div>
        </aside>

        {/* GRID */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-end border-b-2 border-zinc-200 pb-4">
            <h2 className="font-black text-3xl uppercase tracking-tighter">
              {itemType === "all" ? "All Items" : itemType === "repair" ? "Repair Services" : "Shop Inventory"}
            </h2>
            <span className="font-bold text-sm text-zinc-500 uppercase tracking-widest">
              {filteredItems.length} Results
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="py-20 text-center border-4 border-dashed border-zinc-200 bg-zinc-50">
              <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="font-black text-xl uppercase tracking-tight text-zinc-400 mb-2">No matches found</h3>
              <p className="font-bold text-zinc-500">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearchQuery(""); setItemType("all"); setDeviceTypes([]); setMaxPrice(500); }}
                className="mt-6 text-red-600 font-bold uppercase text-sm tracking-widest hover:text-zinc-900 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => {
                const Icon = iconMap[item.icon] || Wrench;
                const isRepair = item.type === "repair";
                return (
                  <div key={item.id} className="bg-white border-4 border-zinc-900 flex flex-col hover:shadow-[8px_8px_0_0_#18181b] hover:-translate-y-1 transition-all group">
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <div className={`p-3 border-2 border-zinc-900 ${isRepair ? 'bg-zinc-100' : 'bg-red-50 text-red-600'}`}>
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1">
                            {isRepair ? "Starting at" : "From"}
                          </div>
                          <div className="text-3xl font-black text-zinc-900 tracking-tighter">
                            ${item.price}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="inline-block px-2 py-0.5 bg-zinc-200 text-zinc-700 font-bold text-[10px] uppercase tracking-widest mb-2">
                          {item.turnaround}
                        </span>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tight leading-tight mb-2 group-hover:text-red-600 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-sm font-bold text-zinc-500 line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                    
                    <div className="mt-auto border-t-4 border-zinc-900">
                      <button className="w-full flex items-center justify-center gap-2 py-4 font-black uppercase tracking-widest text-sm bg-zinc-50 hover:bg-red-600 hover:text-white transition-colors">
                        {isRepair ? (
                          <>Book Repair <ArrowRight className="w-4 h-4" /></>
                        ) : (
                          <>View Details <ShoppingCart className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-zinc-900 text-white mt-auto py-12 border-t-8 border-red-600">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <img src={BUSINESS.logoOfficial} alt={BUSINESS.name} className="h-10 grayscale opacity-50" />
            <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-4 border-l border-zinc-700">
              {COPYRIGHT}
            </div>
          </div>
          <div className="flex gap-6 text-sm font-bold uppercase tracking-widest">
            <a href={BUSINESS.phoneTel} className="text-zinc-400 hover:text-white transition-colors">Call {BUSINESS.phoneDisplay}</a>
            <a href={BUSINESS.mapsLink} className="text-zinc-400 hover:text-white transition-colors">Get Directions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
