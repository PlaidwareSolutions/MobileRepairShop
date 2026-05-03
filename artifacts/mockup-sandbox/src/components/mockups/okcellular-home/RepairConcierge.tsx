import React, { useState, useEffect, useRef } from "react";
import { 
  Phone, MapPin, Clock, Truck, Shield, Star, 
  Smartphone, Tablet, Laptop, Gamepad2, 
  ArrowRight, MessageCircle, Send, CheckCircle2, ShieldCheck, Zap,
  ChevronRight, Battery, Wifi
} from "lucide-react";

const BUSINESS = {
  name: "OK Cellular",
  phoneDisplay: "(281) 446-2166",
  phoneTel: "tel:+12814462166",
  addressLine1: "8910 Will Clayton Pkwy APT 200",
  addressLine2: "Humble, TX 77396",
  hoursShort: "Sun 11:00 AM–7:30 PM | Mon–Sat 10:00 AM–8:30 PM",
  yearsInBusiness: 15,
};

type Message = {
  id: string;
  sender: "bot" | "user";
  type: "text" | "options" | "card";
  text?: string;
  options?: string[];
  card?: React.ReactNode;
  delay?: number;
};

export function RepairConcierge() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "bot",
      type: "text",
      text: "Hi there! I'm Ali, the head tech at OK Cellular. What can I help you with today?",
    },
    {
      id: "msg-2",
      sender: "bot",
      type: "options",
      options: [
        "Cracked screen", 
        "Won't turn on", 
        "Battery dies fast", 
        "Sell my phone", 
        "I need a phone — financing", 
        "Mail-in repair"
      ],
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleOptionClick = (option: string) => {
    if (messages[messages.length - 1].type === "options") {
      // Remove options from bot message
      setMessages((prev) => {
        const newMsg = [...prev];
        newMsg[newMsg.length - 1] = { ...newMsg[newMsg.length - 1], type: "text", text: "..." }; // placeholder or just remove
        return prev.slice(0, prev.length - 1);
      });
    }

    const newMessages = [...messages.filter(m => m.type !== "options"), { id: Date.now().toString(), sender: "user" as const, type: "text" as const, text: option }];
    setMessages(newMessages);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (option === "Cracked screen" || option === "Won't turn on" || option === "Battery dies fast") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            type: "text",
            text: "Ouch, we can definitely fix that. What kind of device is it?",
          },
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            type: "options",
            options: ["iPhone", "Samsung Galaxy", "Google Pixel", "iPad / Tablet", "Other"],
          }
        ]);
      } else if (["iPhone", "Samsung Galaxy", "Google Pixel", "iPad / Tablet", "Other"].includes(option)) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            type: "text",
            text: `Great, we repair ${option}s all the time. Screen replacements usually start around $79 and take about 15-20 minutes while you wait.`,
          },
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            type: "card",
            card: (
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mt-2 w-full max-w-sm">
                <h4 className="font-semibold text-stone-900 mb-1">Ready to get it fixed?</h4>
                <p className="text-sm text-stone-500 mb-4">Walk-ins are always welcome, or you can call ahead.</p>
                <div className="flex flex-col gap-2">
                  <a href={BUSINESS.phoneTel} className="flex items-center justify-center gap-2 bg-stone-900 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-stone-800 transition-colors">
                    <Phone className="w-4 h-4" /> Call (281) 446-2166
                  </a>
                  <a href="https://maps.app.goo.gl/A7NW74nbXMUS7NAM6" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-stone-100 text-stone-900 py-2.5 px-4 rounded-xl font-medium hover:bg-stone-200 transition-colors">
                    <MapPin className="w-4 h-4" /> Get Directions
                  </a>
                </div>
              </div>
            )
          },
          {
            id: (Date.now() + 2).toString(),
            sender: "bot",
            type: "options",
            options: ["Start over", "Mail-in repair instead"],
          }
        ]);
      } else if (option === "Start over") {
        setMessages([
          {
            id: "msg-1",
            sender: "bot",
            type: "text",
            text: "Hi there! I'm Ali, the head tech at OK Cellular. What can I help you with today?",
          },
          {
            id: "msg-2",
            sender: "bot",
            type: "options",
            options: [
              "Cracked screen", 
              "Won't turn on", 
              "Battery dies fast", 
              "Tablet / iPad repair",
              "Laptop or MacBook",
              "Game console repair",
              "Sell my phone", 
              "I need a phone — financing", 
              "Mail-in repair",
              "Accessories & cases"
            ],
          }
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            sender: "bot",
            type: "text",
            text: "Got it! Our team can help you with that. We've been doing this for 15 years, so you're in good hands.",
          },
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            type: "card",
            card: (
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm mt-2 w-full max-w-sm">
                <h4 className="font-semibold text-stone-900 mb-1">Let's get this sorted.</h4>
                <div className="flex flex-col gap-2 mt-4">
                  <a href={BUSINESS.phoneTel} className="flex items-center justify-center gap-2 bg-stone-900 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-stone-800 transition-colors">
                    <Phone className="w-4 h-4" /> Call Us Now
                  </a>
                </div>
              </div>
            )
          },
          {
            id: (Date.now() + 2).toString(),
            sender: "bot",
            type: "options",
            options: ["Start over"],
          }
        ]);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-stone-800 font-sans selection:bg-orange-200">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#F9F8F6]/80 backdrop-blur-md border-b border-stone-200/50 py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg leading-none">
            O
          </div>
          <span className="font-extrabold text-xl tracking-tight text-stone-900">OK Cellular</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-500">
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Humble, TX</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Open Today</span>
        </div>
        <a href={BUSINESS.phoneTel} className="bg-white border border-stone-200 shadow-sm text-stone-900 px-4 py-2 rounded-full font-semibold text-sm hover:border-stone-300 transition-colors flex items-center gap-2">
          <Phone className="w-4 h-4" /> <span className="hidden sm:inline">{BUSINESS.phoneDisplay}</span>
        </a>
      </header>

      {/* Main Chat Interface */}
      <main className="max-w-3xl mx-auto pt-8 pb-20 px-4 md:px-6">
        <div className="bg-white rounded-[2rem] shadow-sm border border-stone-100 overflow-hidden flex flex-col h-[600px]">
          {/* Chat Header */}
          <div className="bg-white border-b border-stone-100 p-4 flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-orange-600">A</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h2 className="font-bold text-stone-900">Ali from OK Cellular</h2>
              <p className="text-xs text-stone-500 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-orange-500" /> Usually replies instantly
              </p>
            </div>
          </div>

          {/* Chat Messages area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-50/50">
            <div className="text-center pb-4">
              <span className="text-xs font-medium text-stone-400 uppercase tracking-widest bg-stone-100 px-3 py-1 rounded-full">Today</span>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  
                  {msg.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center mt-auto">
                      <span className="text-sm border border-orange-200 text-orange-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">A</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {msg.type === "text" && (
                      <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                        msg.sender === "user" 
                          ? "bg-stone-900 text-white rounded-br-sm" 
                          : "bg-white text-stone-800 border border-stone-100 rounded-bl-sm"
                      }`}>
                        {msg.text}
                      </div>
                    )}

                    {msg.type === "card" && (
                      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {msg.card}
                      </div>
                    )}

                    {msg.type === "options" && (
                      <div className="flex flex-wrap gap-2 mt-1 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {msg.options?.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => handleOptionClick(opt)}
                            className="bg-white border border-stone-200 hover:border-orange-500 hover:bg-orange-50 text-stone-700 hover:text-orange-700 px-4 py-2.5 rounded-full text-sm font-medium transition-all text-left shadow-sm hover:shadow-md"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex w-full justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex-shrink-0 flex items-center justify-center mt-auto">
                    <span className="text-sm border border-orange-200 text-orange-600 rounded-full w-5 h-5 flex items-center justify-center font-bold">A</span>
                  </div>
                  <div className="bg-white border border-stone-100 px-5 py-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Chat Input (Disabled visual) */}
          <div className="p-4 bg-white border-t border-stone-100">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Choose an option above..." 
                disabled 
                className="w-full bg-stone-50 border border-stone-200 rounded-full py-3.5 pl-5 pr-12 text-sm text-stone-500 cursor-not-allowed"
              />
              <button disabled className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-stone-200 rounded-full flex items-center justify-center text-stone-400 cursor-not-allowed">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Services Grid as Chips */}
      <section className="bg-white border-y border-stone-200 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-stone-900 mb-8">Not sure what you need? We fix everything.</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: Smartphone, label: "iPhone Repair" },
              { icon: Smartphone, label: "Samsung Repair" },
              { icon: Smartphone, label: "Pixel Repair" },
              { icon: Tablet, label: "iPad / Tablet" },
              { icon: Laptop, label: "MacBook Repair" },
              { icon: Laptop, label: "PC Laptops" },
              { icon: Gamepad2, label: "PS5 / Xbox" },
              { icon: Gamepad2, label: "Nintendo Switch" },
              { icon: Battery, label: "Battery Replacement" },
              { icon: Smartphone, label: "Buy Used Phones" },
              { icon: Wifi, label: "Prepaid Activation" }
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <div key={i} className="flex items-center gap-2 bg-[#F9F8F6] border border-stone-200 rounded-full px-5 py-3 hover:bg-white hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer">
                  <Icon className="w-4 h-4 text-stone-500" />
                  <span className="font-semibold text-stone-800 text-sm">{service.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Strip */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-900 text-lg mb-2">15 Years in Houston</h4>
            <p className="text-stone-500 text-sm mb-4 flex-1">We've been fixing devices in the Houston area for over a decade. Check out our 5-star reviews.</p>
            <div className="text-orange-600 font-semibold text-sm flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
              Read reviews <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-900 text-lg mb-2">90-Day Warranty</h4>
            <p className="text-stone-500 text-sm mb-4 flex-1">Every repair is backed by our 90-day warranty. Most repairs are done same-day while you wait.</p>
            <div className="text-orange-600 font-semibold text-sm flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
              Warranty details <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-stone-900 text-lg mb-2">Mail-In Repair</h4>
            <p className="text-stone-500 text-sm mb-4 flex-1">Not nearby? Mail your device to us. Fast 3-5 business day turnaround on mail-in repairs.</p>
            <div className="text-orange-600 font-semibold text-sm flex items-center gap-1 cursor-pointer hover:gap-2 transition-all">
              Start mail-in <ArrowRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* Location / Footer */}
      <footer className="bg-stone-900 text-stone-300 py-16 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg leading-none">
                O
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">OK Cellular</span>
            </div>
            <p className="text-stone-400 mb-6 max-w-xs leading-relaxed">
              Fast, reliable repair for your essential devices. Serving Houston, Sugar Land, Katy, and beyond.
            </p>
            <div className="flex flex-col gap-3">
              <a href={BUSINESS.phoneTel} className="flex items-center gap-3 text-stone-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-orange-500" /> {BUSINESS.phoneDisplay}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>
                  {BUSINESS.addressLine1}<br/>{BUSINESS.addressLine2}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-orange-500 shrink-0" />
                <span>
                  {BUSINESS.hoursShort}
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-stone-800 rounded-2xl p-6 md:min-w-[320px]">
            <h4 className="text-white font-bold mb-4">Financing Available</h4>
            <p className="text-sm text-stone-400 mb-6">Need a phone today? We offer flexible financing starting from $10 down with no credit check required.</p>
            <button className="w-full bg-white text-stone-900 font-bold py-3 rounded-xl hover:bg-stone-100 transition-colors">
              Apply for Financing
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
