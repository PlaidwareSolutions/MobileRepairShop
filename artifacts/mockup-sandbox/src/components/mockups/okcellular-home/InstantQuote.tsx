import React, { useState } from "react";
import {
  Smartphone,
  Tablet,
  Laptop,
  Gamepad2,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Zap,
  Wrench,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Battery,
  Wifi,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = ["Device", "Model", "Issue", "Quote"];

const DEVICE_TYPES = [
  { id: "phone", label: "Phone", icon: Smartphone },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "laptop", label: "Laptop", icon: Laptop },
  { id: "console", label: "Console", icon: Gamepad2 },
];

const MODELS: Record<string, string[]> = {
  phone: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Pro Max", "Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23", "Pixel 8 Pro", "Pixel 8", "Other Phone"],
  tablet: ["iPad Pro 12.9\"", "iPad Pro 11\"", "iPad Air", "iPad Mini", "Galaxy Tab S9", "Other Tablet"],
  laptop: ["MacBook Pro 16\"", "MacBook Pro 14\"", "MacBook Air", "Dell XPS", "Lenovo ThinkPad", "HP Spectre", "Other Laptop"],
  console: ["PlayStation 5", "PlayStation 4", "Xbox Series X", "Xbox Series S", "Nintendo Switch OLED", "Nintendo Switch", "Other Console"],
};

const ISSUES: Record<string, { label: string; price: string; note: string }[]> = {
  phone: [
    { label: "Cracked Screen", price: "from $79", note: "Most done in 30 mins" },
    { label: "Dead Battery", price: "from $49", note: "Most done in 15 mins" },
    { label: "Won't Charge", price: "from $69", note: "Port cleaning or replacement" },
    { label: "Water Damage", price: "Needs Diagnostics", note: "Bring it in ASAP" },
    { label: "Camera Broken", price: "from $89", note: "OEM parts available" },
    { label: "Other Issue", price: "Needs Diagnostics", note: "Free checkup" },
  ],
  tablet: [
    { label: "Cracked Screen", price: "from $99", note: "Digitizer or LCD" },
    { label: "Dead Battery", price: "from $79", note: "Same-day service" },
    { label: "Won't Charge", price: "from $89", note: "Port replacement" },
    { label: "Other Issue", price: "Needs Diagnostics", note: "Free checkup" },
  ],
  laptop: [
    { label: "Broken Screen", price: "from $149", note: "Depends on exact model" },
    { label: "Battery Replacement", price: "from $99", note: "OEM capacity" },
    { label: "Keyboard Issues", price: "from $129", note: "Full top case or keys" },
    { label: "Not Powering On", price: "Needs Diagnostics", note: "Logic board repair available" },
    { label: "Other Issue", price: "Needs Diagnostics", note: "Free checkup" },
  ],
  console: [
    { label: "HDMI Port Broken", price: "from $89", note: "Micro-soldering done in-house" },
    { label: "No Power", price: "from $99", note: "Power supply or board issue" },
    { label: "Overheating", price: "from $69", note: "Deep clean & thermal paste" },
    { label: "Disc Drive Not Reading", price: "from $79", note: "Laser replacement" },
    { label: "Other Issue", price: "Needs Diagnostics", note: "Free checkup" },
  ],
};

const SERVICES = [
  { name: "iPhone Repair", desc: "Screen, battery, charging port.", icon: Smartphone },
  { name: "Samsung Repair", desc: "Galaxy S, Note, A and Z series.", icon: Smartphone },
  { name: "Pixel Repair", desc: "Google Pixel 3 through 9 Pro.", icon: Smartphone },
  { name: "iPad / Tablet", desc: "Glass, LCD, battery replacement.", icon: Tablet },
  { name: "MacBook Repair", desc: "Screen, battery, keyboard, board.", icon: Laptop },
  { name: "Laptop Repair", desc: "HP, Dell, Lenovo, ASUS, Acer.", icon: Laptop },
  { name: "PS5 Repair", desc: "HDMI port, disc drive, no power.", icon: Gamepad2 },
  { name: "Xbox Repair", desc: "Power issues, HDMI, disc drive.", icon: Gamepad2 },
  { name: "Battery Replace", desc: "Phones, tablets, laptops.", icon: Battery },
  { name: "Accessories", desc: "Cases, chargers, screen protectors.", icon: Wrench },
];

export function InstantQuote() {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<{
    device?: string;
    model?: string;
    issue?: string;
  }>({});

  const handleSelectDevice = (id: string) => {
    setSelections({ device: id });
    setStep(1);
  };

  const handleSelectModel = (model: string) => {
    setSelections((prev) => ({ ...prev, model }));
    setStep(2);
  };

  const handleSelectIssue = (issueLabel: string) => {
    setSelections((prev) => ({ ...prev, issue: issueLabel }));
    setStep(3);
  };

  const reset = () => {
    setSelections({});
    setStep(0);
  };

  const currentIssueData =
    selections.device && selections.issue
      ? ISSUES[selections.device].find((i) => i.label === selections.issue)
      : null;

  return (
    <div className="min-h-screen bg-[#faf9f7] font-sans text-[#2a2725] selection:bg-rose-200">
      {/* HEADER */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-black/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center text-white shadow-sm">
              <Wrench className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">OK Cellular</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-black/60">
            <span className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"><Phone className="w-4 h-4" /> (281) 446-2166</span>
            <span className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"><Clock className="w-4 h-4" /> Mon–Sat 10–8:30 · Sun 11–7:30</span>
            <span className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer"><MapPin className="w-4 h-4" /> Humble, TX</span>
          </div>
        </div>
      </header>

      {/* HERO / CONFIGURATOR SECTION */}
      <section className="pt-16 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex justify-center items-start pt-20">
          <div className="w-[800px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-30 mix-blend-multiply translate-x-20"></div>
          <div className="w-[600px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30 mix-blend-multiply -translate-x-20 mt-20"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1a1817] mb-4">
            How much will it cost?
          </h1>
          <p className="text-xl text-[#5e5855] font-medium">
            Get an instant repair estimate. No surprises.
          </p>
        </div>

        {/* CONFIGURATOR WIDGET */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-black/5 h-1 w-full">
            <div
              className="bg-rose-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / 4) * 100}%` }}
            ></div>
          </div>

          <div className="p-8 md:p-12">
            {/* Step 0: Device */}
            {step === 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-semibold mb-6">Select your device</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {DEVICE_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleSelectDevice(type.id)}
                      className="group flex flex-col items-center justify-center p-6 border-2 border-black/5 rounded-2xl hover:border-rose-500 hover:bg-rose-50 transition-all"
                    >
                      <type.icon className="w-10 h-10 mb-3 text-[#5e5855] group-hover:text-rose-500 transition-colors" strokeWidth={1.5} />
                      <span className="font-medium text-[#2a2725]">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Model */}
            {step === 1 && selections.device && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep(0)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-semibold">Which {selections.device}?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 pb-2">
                  {MODELS[selections.device].map((model) => (
                    <button
                      key={model}
                      onClick={() => handleSelectModel(model)}
                      className="flex items-center justify-between p-4 border-2 border-black/5 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-left"
                    >
                      <span className="font-medium">{model}</span>
                      <ChevronRight className="w-4 h-4 text-black/20" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Issue */}
            {step === 2 && selections.device && (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <button onClick={() => setStep(1)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h2 className="text-2xl font-semibold">What's wrong with your {selections.model}?</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {ISSUES[selections.device].map((issue) => (
                    <button
                      key={issue.label}
                      onClick={() => handleSelectIssue(issue.label)}
                      className="flex items-center justify-between p-5 border-2 border-black/5 rounded-xl hover:border-rose-500 hover:bg-rose-50 transition-all text-left"
                    >
                      <div>
                        <div className="font-medium text-lg">{issue.label}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-black/20" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Result */}
            {step === 3 && currentIssueData && (
              <div className="animate-in zoom-in-95 fade-in duration-500 text-center py-6">
                <div className="inline-flex items-center gap-2 text-[#5e5855] bg-black/5 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                  <span className="capitalize">{selections.device}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                  <span>{selections.model}</span>
                  <ChevronRight className="w-3 h-3 opacity-50" />
                  <span>{selections.issue}</span>
                  <button onClick={reset} className="ml-2 text-rose-600 hover:underline">Edit</button>
                </div>

                <div className="mb-2">Estimated Repair Cost</div>
                <div className="text-5xl md:text-6xl font-bold tracking-tight text-[#1a1817] mb-3">
                  {currentIssueData.price}
                </div>
                <div className="text-[#5e5855] text-lg mb-8 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-rose-500" />
                  {currentIssueData.note}
                </div>

                <div className="bg-[#faf9f7] rounded-2xl p-6 mb-8 text-left grid md:grid-cols-2 gap-4 border border-black/5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">90-Day Warranty</div>
                      <div className="text-sm text-[#5e5855]">Parts and labor guaranteed</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium">Same-Day Repair</div>
                      <div className="text-sm text-[#5e5855]">On most in-stock parts</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button className="h-14 px-8 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-lg font-medium shadow-lg shadow-rose-500/20 transition-all hover:-translate-y-0.5">
                    <Phone className="w-5 h-5 mr-2" />
                    Call to Schedule
                  </Button>
                  <Button variant="outline" className="h-14 px-8 border-2 border-black/10 hover:bg-black/5 hover:border-black/20 text-[#2a2725] rounded-xl text-lg font-medium transition-all">
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SUPPORTING EVIDENCE */}
      <section className="bg-white py-24 px-6 border-t border-black/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Houston's Trusted Repair Shop</h2>
            <p className="text-[#5e5855] text-lg">
              Serving Humble and the greater Houston area for 15+ years. 
              We service all major brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">15+ Years</h3>
              <p className="text-sm text-[#5e5855]">Trusted experience</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Same-Day</h3>
              <p className="text-sm text-[#5e5855]">On most repairs</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">90-Day Warranty</h3>
              <p className="text-sm text-[#5e5855]">Peace of mind</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-1">Mail-in Repairs</h3>
              <p className="text-sm text-[#5e5855]">3-5 day turnaround</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-8 text-center">Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-4 border border-black/5 rounded-2xl bg-[#faf9f7] hover:shadow-md transition-shadow">
                <s.icon className="w-6 h-6 mb-3 text-rose-500" strokeWidth={1.5} />
                <div className="font-medium text-sm mb-1">{s.name}</div>
                <div className="text-xs text-[#5e5855]">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCING & PREPAID PROMO */}
      <section className="bg-[#1a1817] text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <CreditCard className="w-8 h-8 text-rose-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Buy a Phone Today</h3>
            <p className="text-white/70 mb-6">
              Used phones starting at $99. Financing available from $10 down with no credit impact. 
              Lease-to-own programs to fit your budget.
            </p>
            <Button className="bg-white text-black hover:bg-rose-50">View Financing</Button>
          </div>
          <div className="bg-white/5 rounded-3xl p-8 border border-white/10">
            <Wifi className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Prepaid Activations</h3>
            <p className="text-white/70 mb-6">
              Get connected instantly. We activate lines for Cricket, Metro by T-Mobile, T-Mobile, and AT&T Prepaid.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-white/10 px-3 py-1 text-xs rounded-full">Cricket</span>
              <span className="bg-white/10 px-3 py-1 text-xs rounded-full">Metro</span>
              <span className="bg-white/10 px-3 py-1 text-xs rounded-full">T-Mobile</span>
              <span className="bg-white/10 px-3 py-1 text-xs rounded-full">AT&T</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white py-12 px-6 border-t border-black/5 text-[#5e5855]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-black font-semibold">
            <Wrench className="w-5 h-5 text-rose-500" /> OK Cellular
          </div>
          <div className="text-center md:text-left">
            8910 Will Clayton Pkwy APT 200, Humble, TX 77396 <br className="md:hidden" />
            Serving Houston, Sugar Land, Katy & More
          </div>
          <div className="font-medium">
            (281) 446-2166
          </div>
        </div>
      </footer>
    </div>
  );
}
