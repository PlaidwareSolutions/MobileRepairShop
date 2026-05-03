import React, { useState } from "react";
import { 
  Search, ShoppingCart, Menu, ChevronDown, Filter, Phone, 
  MapPin, Clock, Star, Zap, Shield, Smartphone, Tablet, 
  Laptop, Gamepad2, Wrench, Battery, ArrowRight, CreditCard, 
  Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SERVICES = [
  { id: "r1", brand: "Apple", device: "iPhone 15 Pro Max", issue: "Screen Replacement", price: 299, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r2", brand: "Apple", device: "iPhone 14 Pro", issue: "Screen Replacement", price: 199, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r3", brand: "Apple", device: "iPhone 13", issue: "Screen Replacement", price: 129, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r4", brand: "Apple", device: "iPhone 11", issue: "Screen Replacement", price: 79, time: "1 Hour", category: "Phones", type: "Screen" },
  { id: "r5", brand: "Apple", device: "iPhone (All)", issue: "Battery Replacement", price: 49, time: "30 Mins", category: "Phones", type: "Battery" },
  { id: "r6", brand: "Samsung", device: "Galaxy S23 Ultra", issue: "Screen Replacement", price: 349, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r7", brand: "Samsung", device: "Galaxy S22", issue: "Screen Replacement", price: 249, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r8", brand: "Samsung", device: "Galaxy A54", issue: "Screen Replacement", price: 149, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r9", brand: "Samsung", device: "Galaxy (All)", issue: "Battery Replacement", price: 59, time: "1 Hour", category: "Phones", type: "Battery" },
  { id: "r10", brand: "Google", device: "Pixel 7 Pro", issue: "Screen Replacement", price: 229, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r11", brand: "Google", device: "Pixel 6", issue: "Screen Replacement", price: 159, time: "1-2 Hours", category: "Phones", type: "Screen" },
  { id: "r12", brand: "Sony", device: "PlayStation 5", issue: "HDMI Port Repair", price: 89, time: "Same Day", category: "Consoles", type: "Port" },
  { id: "r13", brand: "Microsoft", device: "Xbox Series X", issue: "HDMI Port Repair", price: 89, time: "Same Day", category: "Consoles", type: "Port" },
  { id: "r14", brand: "Nintendo", device: "Switch OLED", issue: "Screen Replacement", price: 119, time: "Same Day", category: "Consoles", type: "Screen" },
  { id: "r15", brand: "Apple", device: "iPad Pro 12.9", issue: "Glass & LCD", price: 249, time: "Same Day", category: "Tablets", type: "Screen" },
  { id: "r16", brand: "Apple", device: "iPad 10th Gen", issue: "Glass Replacement", price: 129, time: "Same Day", category: "Tablets", type: "Screen" },
  { id: "r17", brand: "Apple", device: "MacBook Pro M2", issue: "Screen Replacement", price: 499, time: "1-2 Days", category: "Laptops", type: "Screen" },
  { id: "r18", brand: "Dell", device: "XPS 15", issue: "Battery Replacement", price: 129, time: "1-2 Days", category: "Laptops", type: "Battery" },
  { id: "r19", brand: "HP", device: "Spectre x360", issue: "Keyboard Replacement", price: 149, time: "1-2 Days", category: "Laptops", type: "Keyboard" },
  { id: "r20", brand: "Apple", device: "iPhone 12", issue: "Charging Port", price: 79, time: "1 Hour", category: "Phones", type: "Port" },
];

const PHONES_FOR_SALE = [
  { id: "p1", brand: "Apple", model: "iPhone 13 Pro - 128GB", condition: "Excellent", price: 499, finance: "15" },
  { id: "p2", brand: "Apple", model: "iPhone 12 - 64GB", condition: "Good", price: 299, finance: "10" },
  { id: "p3", brand: "Samsung", model: "Galaxy S22 Ultra - 256GB", condition: "Excellent", price: 549, finance: "16" },
  { id: "p4", brand: "Google", model: "Pixel 7 - 128GB", condition: "Like New", price: 349, finance: "12" },
  { id: "p5", brand: "Apple", model: "iPhone SE (3rd Gen)", condition: "Good", price: 199, finance: "10" },
  { id: "p6", brand: "Samsung", model: "Galaxy A14 5G", condition: "New Open Box", price: 149, finance: "10" },
];

const BRANDS = ["All", "Apple", "Samsung", "Google", "Sony", "Microsoft", "Nintendo", "Dell", "HP"];
const CATEGORIES = ["All", "Phones", "Tablets", "Laptops", "Consoles"];
const REPAIR_TYPES = ["All", "Screen", "Battery", "Port", "Keyboard"];

export function CatalogStorefront() {
  const [activeBrand, setActiveBrand] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = SERVICES.filter(service => {
    if (activeBrand !== "All" && service.brand !== activeBrand) return false;
    if (activeCategory !== "All" && service.category !== activeCategory) return false;
    if (activeType !== "All" && service.type !== activeType) return false;
    if (searchQuery && !`${service.brand} ${service.device} ${service.issue}`.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827] font-sans">
      {/* Top Utility Bar */}
      <div className="bg-[#1f2937] text-white text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5"><Star className="w-3.5 h-3.5 text-yellow-400" /> <span>15+ Years in Houston</span></span>
          <span className="hidden sm:flex items-center space-x-1.5"><Shield className="w-3.5 h-3.5 text-blue-400" /> <span>90-Day Warranty on All Repairs</span></span>
          <span className="hidden md:flex items-center space-x-1.5"><Zap className="w-3.5 h-3.5 text-red-400" /> <span>Same-Day Turnaround on Most Devices</span></span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">Mail-In Repairs</a>
          <a href="#" className="hover:underline">Financing</a>
          <a href="#" className="hover:underline">Check Status</a>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-[#b91c1c] uppercase leading-none">OK CELLULAR</span>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Parts &amp; Service</span>
            </div>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex-1 max-w-3xl flex">
            <div className="flex w-full border-2 border-[#1f2937] rounded-sm overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/50">
              <select className="bg-gray-100 px-3 py-2 text-sm font-semibold border-r border-gray-300 outline-none hidden sm:block">
                <option>All Categories</option>
                <option>Repairs</option>
                <option>Phones for Sale</option>
                <option>Prepaid Plans</option>
              </select>
              <input 
                type="text" 
                placeholder="Search repairs, phones, accessories (e.g. 'iPhone 13 Screen')" 
                className="flex-1 px-4 py-2 text-sm outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-[#1f2937] text-white px-6 hover:bg-[#374151] transition-colors flex items-center justify-center">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm">
            <div className="flex flex-col items-end">
              <span className="font-bold text-gray-900 flex items-center space-x-1.5">
                <Phone className="w-4 h-4 text-red-600" />
                <a href="tel:+12814462166">(281) 446-2166</a>
              </span>
              <span className="text-xs text-gray-500">Walk-ins Welcome</span>
            </div>
            <div className="h-10 w-px bg-gray-200"></div>
            <div className="flex items-center space-x-2 cursor-pointer group">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-black" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">0</span>
              </div>
              <span className="font-semibold group-hover:text-black">Cart</span>
            </div>
          </div>
        </div>

        {/* Category Nav */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 hidden md:block">
          <div className="max-w-[1400px] mx-auto flex items-center space-x-1">
            <button className="flex items-center space-x-2 px-4 py-2.5 font-bold text-sm hover:bg-gray-200 transition-colors border-b-2 border-red-600 text-gray-900">
              <Menu className="w-4 h-4" />
              <span>All Repairs</span>
            </button>
            <a href="#phones" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent">Phones for Sale</a>
            <a href="#" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent flex items-center space-x-1.5"><Tablet className="w-4 h-4 text-gray-500" /><span>Tablets</span></a>
            <a href="#" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent flex items-center space-x-1.5"><Laptop className="w-4 h-4 text-gray-500" /><span>Laptops</span></a>
            <a href="#" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent flex items-center space-x-1.5"><Gamepad2 className="w-4 h-4 text-gray-500" /><span>Consoles</span></a>
            <a href="#" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent">Prepaid &amp; Activations</a>
            <a href="#" className="px-4 py-2.5 font-bold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition-colors border-b-2 border-transparent">Accessories</a>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-[1400px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 border border-gray-200 rounded-sm shadow-sm">
            <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-gray-100">
              <Filter className="w-4 h-4 text-gray-500" />
              <h2 className="font-extrabold uppercase tracking-wide text-sm">Filter Inventory</h2>
            </div>
            
            <div className="space-y-5">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-sm mb-2 text-gray-800">Device Category</h3>
                <div className="space-y-1.5">
                  {CATEGORIES.map(cat => (
                    <label key={cat} className="flex items-center space-x-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="category" 
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 rounded-sm cursor-pointer"
                        checked={activeCategory === cat}
                        onChange={() => setActiveCategory(cat)}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm mb-2 text-gray-800">Brand</h3>
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                  {BRANDS.map(brand => (
                    <label key={brand} className="flex items-center space-x-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="brand" 
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 rounded-sm cursor-pointer"
                        checked={activeBrand === brand}
                        onChange={() => setActiveBrand(brand)}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black font-medium">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Repair Type Filter */}
              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm mb-2 text-gray-800">Repair Type</h3>
                <div className="space-y-1.5">
                  {REPAIR_TYPES.map(type => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                      <input 
                        type="radio" 
                        name="type" 
                        className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500 rounded-sm cursor-pointer"
                        checked={activeType === type}
                        onChange={() => setActiveType(type)}
                      />
                      <span className="text-sm text-gray-700 group-hover:text-black font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <button 
              className="mt-6 w-full py-2 text-xs font-bold text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-300 rounded-sm transition-colors uppercase tracking-wider"
              onClick={() => {
                setActiveBrand("All");
                setActiveCategory("All");
                setActiveType("All");
                setSearchQuery("");
              }}
            >
              Clear All Filters
            </button>
          </div>

          {/* Quick Info Card */}
          <div className="bg-[#1f2937] text-white p-5 border border-gray-800 rounded-sm shadow-sm">
            <h3 className="font-extrabold uppercase tracking-wide text-sm mb-4 text-gray-200">Shop Information</h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">OK Cellular</p>
                  <p className="text-gray-400">8910 Will Clayton Pkwy APT 200</p>
                  <p className="text-gray-400">Humble, TX 77396</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Store Hours</p>
                  <p className="text-gray-400 text-xs">Mon-Sat: 10:00 AM – 8:30 PM</p>
                  <p className="text-gray-400 text-xs">Sun: 11:00 AM – 7:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 pt-2 border-t border-gray-700">
                <Truck className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Mail-In Repairs</p>
                  <p className="text-gray-400 text-xs">3-5 business day turnaround for out-of-town customers.</p>
                </div>
              </div>
            </div>
            <Button className="w-full mt-5 bg-red-600 hover:bg-red-700 text-white rounded-sm font-bold uppercase tracking-wider text-xs h-10">
              Get Directions
            </Button>
          </div>
        </aside>

        {/* Right Content */}
        <main className="lg:col-span-3 space-y-8">
          
          {/* Active Filters / Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 border border-gray-200 rounded-sm">
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase text-gray-900">Repair Services Catalog</h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">Showing {filteredServices.length} results</p>
            </div>
            <div className="flex items-center space-x-3 text-sm font-semibold">
              <span className="text-gray-500">Sort By:</span>
              <select className="border border-gray-300 bg-gray-50 px-3 py-1.5 rounded-sm focus:ring-1 focus:ring-blue-500 outline-none">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Brand: A to Z</option>
              </select>
            </div>
          </div>

          {/* Catalog List */}
          <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:grid">
              <div className="col-span-5">Device &amp; Issue</div>
              <div className="col-span-2 text-center">Category</div>
              <div className="col-span-2 text-center">Est. Time</div>
              <div className="col-span-3 text-right">Price &amp; Action</div>
            </div>

            {/* List Items */}
            <div className="divide-y divide-gray-100">
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <div key={service.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 py-4 items-center hover:bg-gray-50 transition-colors">
                    {/* Device & Issue */}
                    <div className="col-span-1 md:col-span-5 flex flex-col">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-bold text-xs text-gray-500 uppercase tracking-wider">{service.brand}</span>
                        <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-200 rounded-sm px-1.5 py-0 text-[10px]">SKU: REP-{service.id}</Badge>
                      </div>
                      <h3 className="font-bold text-base text-blue-700 hover:text-blue-800 cursor-pointer">{service.device}</h3>
                      <p className="text-sm font-medium text-gray-800">{service.issue}</p>
                    </div>

                    {/* Category (Mobile hidden) */}
                    <div className="col-span-2 hidden md:flex justify-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {service.category}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center space-x-1.5 text-sm font-medium text-gray-600">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{service.time}</span>
                    </div>

                    {/* Price & Action */}
                    <div className="col-span-1 md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                      <div className="text-left md:text-right">
                        <div className="text-xs text-gray-500 font-semibold uppercase mb-0.5">Starting At</div>
                        <div className="text-xl font-black text-gray-900">${service.price}.00</div>
                      </div>
                      <Button className="bg-[#1f2937] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-sm px-4 h-9">
                        Book Repair
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Wrench className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg font-bold text-gray-900">No repairs found</p>
                  <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 border-gray-300"
                    onClick={() => {
                      setActiveBrand("All");
                      setActiveCategory("All");
                      setActiveType("All");
                      setSearchQuery("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Used Phones Section */}
          <div id="phones" className="pt-8">
            <div className="flex items-center justify-between mb-4 border-b border-gray-300 pb-2">
              <h2 className="text-2xl font-black tracking-tight uppercase text-gray-900">Certified Used Phones In Stock</h2>
              <a href="#" className="text-blue-700 hover:text-blue-800 text-sm font-bold flex items-center group">
                View All Inventory <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {PHONES_FOR_SALE.map(phone => (
                <div key={phone.id} className="bg-white border border-gray-200 rounded-sm p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge variant="outline" className="bg-white/90 font-bold uppercase text-[10px] text-green-700 border-green-200">
                      {phone.condition}
                    </Badge>
                  </div>
                  
                  {/* Placeholder for phone image - styled like a catalog thumbnail */}
                  <div className="bg-gray-50 aspect-square w-full mb-4 flex items-center justify-center p-6 border border-gray-100 rounded-sm">
                    <Smartphone className="w-16 h-16 text-gray-300 group-hover:text-blue-400 transition-colors" strokeWidth={1} />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">{phone.brand}</div>
                    <h3 className="font-bold text-base leading-tight text-blue-700 mb-2">{phone.model}</h3>
                    
                    <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-100">
                      <div>
                        <div className="text-xl font-black text-gray-900">${phone.price}.00</div>
                        <div className="text-xs font-semibold text-gray-500 flex items-center mt-1">
                          <CreditCard className="w-3.5 h-3.5 mr-1" />
                          Finance from ${phone.finance}/mo
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-gray-300 rounded-sm font-bold uppercase text-[10px] h-8 px-3 hover:bg-gray-50">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-sm flex items-start sm:items-center space-x-4">
              <div className="bg-blue-100 p-2 rounded-full shrink-0">
                <CreditCard className="w-5 h-5 text-blue-700" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 text-sm">Lease-to-own financing available</h4>
                <p className="text-xs text-blue-800 mt-0.5">Take it home today for as little as $10 down. Soft credit check required.</p>
              </div>
              <Button size="sm" className="bg-blue-700 hover:bg-blue-800 text-white rounded-sm uppercase font-bold text-[10px] hidden sm:block">
                Apply Now
              </Button>
            </div>
          </div>

        </main>
      </div>

      {/* Footer Area (Compact E-commerce style) */}
      <footer className="bg-[#111827] text-gray-300 py-12 mt-12 border-t-4 border-red-600">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-black text-lg tracking-tight uppercase mb-4">OK Cellular</h4>
            <p className="text-sm text-gray-400 mb-4">Houston's trusted parts & repair depot since 2010. Real technicians, honest pricing, same-day service.</p>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-gray-500" /> <span>(281) 446-2166</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-gray-500" /> <span>8910 Will Clayton Pkwy APT 200, Humble, TX</span></div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-700 pb-2">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Check Repair Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mail-In Instructions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Information</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financing Application</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-700 pb-2">Popular Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">iPhone Screen Repair</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Samsung Battery Replacement</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Console HDMI Port Repair</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Unlocked Used Phones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Prepaid Activations (Cricket, Metro)</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide uppercase mb-4 border-b border-gray-700 pb-2">Payment Methods</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="w-10 h-6 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center text-[8px] font-bold">VISA</div>
              <div className="w-10 h-6 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center text-[8px] font-bold">MC</div>
              <div className="w-10 h-6 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center text-[8px] font-bold">AMEX</div>
              <div className="w-10 h-6 bg-gray-800 border border-gray-700 rounded-sm flex items-center justify-center text-[8px] font-bold">CASH</div>
            </div>
            <div className="text-xs text-gray-500">
              © 2026 OK Cellular. All rights reserved. All brands, logos, and trademarks used are the property of their respective owners.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
