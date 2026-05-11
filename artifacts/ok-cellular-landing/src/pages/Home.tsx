import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  PhoneCall, MapPin, Mail, Clock, ShieldCheck, Zap,
  Headphones, Laptop, Smartphone, BatteryCharging, Gamepad2, ChevronRight, Menu, X, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* NAVBAR */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
        }`}
        data-testid="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <img src={`${import.meta.env.BASE_URL}ok-cellular-logo-transparent.png`} alt="OK Cellular Logo" className="h-10 w-auto" />
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8 items-center">
              {['About', 'Categories', 'Why Us', 'FAQ', 'Contact'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  data-testid={`nav-link-${item.toLowerCase().replace(' ', '-')}`}
                >
                  {item}
                </button>
              ))}
              <Button onClick={() => window.location.href = "tel:+12814462166"} className="rounded-full shadow-md hover:shadow-lg transition-all" data-testid="button-nav-call">
                <PhoneCall className="w-4 h-4 mr-2" />
                (281) 446-2166
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-foreground p-2"
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['About', 'Categories', 'Why Us', 'FAQ', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-foreground hover:bg-muted rounded-md"
                >
                  {item}
                </button>
              ))}
              <div className="pt-4">
                <Button onClick={() => window.location.href = "tel:+12814462166"} className="w-full justify-center">
                  <PhoneCall className="w-4 h-4 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20 -z-10" />
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] -z-10" />
        <div className="absolute top-[40%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={staggerContainer}
              className="max-w-2xl"
            >
              <motion.div variants={fadeInUp}>
                <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                  <Zap className="w-4 h-4 mr-2" /> Fast Customer Assistance Available
                </Badge>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
                Quality Electronics & <span className="text-primary">Mobile Accessories</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Premium accessories and everyday tech products designed for convenience, style, and performance.
              </motion.p>
              
              <motion.ul variants={fadeInUp} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 text-sm md:text-base font-medium text-foreground/80">
                {[
                  "Mobile Accessories", "Chargers & Cables", 
                  "Audio Devices", "Phone Protection", 
                  "Computer Accessories", "Electronics & Gadgets"
                ].map((item, i) => (
                  <li key={i} className="flex items-center">
                    <ShieldCheck className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </motion.ul>
              
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg rounded-full" onClick={() => window.location.href = "tel:+12814462166"} data-testid="button-hero-call">
                  <PhoneCall className="w-5 h-5 mr-2" /> Call Us Today
                </Button>
                <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full bg-background/50 backdrop-blur-sm" onClick={() => scrollToSection("contact")} data-testid="button-hero-contact">
                  Contact Us <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card/50 backdrop-blur-sm p-4">
                <img src="/images/category-mobile.png" alt="Mobile Accessories Collection" className="w-full h-auto rounded-xl object-cover" />
                
                {/* Floating cards */}
                <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-xl border flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="w-6 h-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg leading-none">4.9/5</p>
                    <p className="text-sm text-muted-foreground">Customer Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-y bg-muted/30 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-semibold mb-2">Trusted By Customers Looking For Quality Tech Products</h2>
            <p className="text-muted-foreground text-sm max-w-2xl mx-auto">Affordable pricing, quality products, and a smooth customer experience from start to finish.</p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              "Secure Shopping", "Quality Products", "Fast Response", 
              "Reliable Customer Service", "Independent Electronics Business"
            ].map((badge, i) => (
              <div key={i} className="flex items-center text-sm font-medium text-foreground/70 bg-background px-4 py-2 rounded-full shadow-sm border">
                <ShieldCheck className="w-4 h-4 text-primary mr-2" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/category-audio.png" alt="Audio Products" className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-md" />
                <img src="/images/category-computer.png" alt="Computer Accessories" className="rounded-2xl w-full h-48 md:h-64 object-cover shadow-md mt-8" />
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About OK Cellular</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  OK Cellular is an independent electronics and mobile accessory business focused on providing quality products for modern devices and everyday technology needs.
                </p>
                <p>
                  We offer a wide selection of electronics, mobile accessories, charging products, audio devices, and computer accessories designed for convenience, reliability, and performance.
                </p>
                <p className="font-medium text-foreground border-l-4 border-primary pl-4 py-1">
                  Our mission is to provide customers with quality products, competitive pricing, and dependable customer assistance.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section id="categories" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Explore Our Product Categories</h2>
            <p className="text-lg text-muted-foreground">Discover our extensive range of high-quality electronics and accessories tailored to your lifestyle.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Mobile Accessories",
                desc: "Cases, screen protectors, charging cables, adapters, holders, and everyday accessories for modern devices.",
                img: "/images/category-mobile.png",
                icon: <Smartphone className="w-6 h-6" />
              },
              {
                title: "Charging Solutions",
                desc: "Fast chargers, wireless charging accessories, power banks, USB cables, and charging essentials.",
                img: "/images/category-charging.png",
                icon: <BatteryCharging className="w-6 h-6" />
              },
              {
                title: "Audio Products",
                desc: "Wireless earbuds, headphones, speakers, microphones, and audio accessories.",
                img: "/images/category-audio.png",
                icon: <Headphones className="w-6 h-6" />
              },
              {
                title: "Computer Accessories",
                desc: "Keyboards, mice, USB hubs, storage accessories, laptop stands, and office essentials.",
                img: "/images/category-computer.png",
                icon: <Laptop className="w-6 h-6" />
              },
              {
                title: "Electronics & Gadgets",
                desc: "Trending electronic products and useful gadgets for home, office, and travel.",
                img: "/images/category-electronics.png",
                icon: <Gamepad2 className="w-6 h-6" />
              }
            ].map((cat, i) => (
              <motion.div key={i} variants={fadeInUp} className={i === 3 ? "lg:col-span-1 lg:col-start-1" : i === 4 ? "lg:col-span-2" : ""}>
                <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 z-20 bg-background/90 backdrop-blur p-2 rounded-lg shadow-sm">
                      {cat.icon}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{cat.title}</h3>
                    <p className="text-muted-foreground">{cat.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US & HOW IT WORKS */}
      <section id="why-us" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Why Choose Us */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Customers Choose OK Cellular</h2>
              <div className="space-y-4">
                {[
                  "Quality Electronics & Accessories",
                  "Competitive Pricing",
                  "Friendly Customer Assistance",
                  "Fast Order Processing",
                  "Reliable Shopping Experience",
                  "Independent Electronics Business"
                ].map((reason, i) => (
                  <div key={i} className="flex items-start">
                    <div className="mt-1 mr-4 bg-primary/10 p-1.5 rounded-full flex-shrink-0">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-lg font-medium">{reason}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-muted/50 rounded-3xl p-8 md:p-10 border"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl font-bold mb-8">A Simple Customer Experience</motion.h2>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {[
                  { step: "1", title: "Browse Products", desc: "Explore our collection of electronics and accessories." },
                  { step: "2", title: "Contact Our Team", desc: "Reach out to us for product availability and general inquiries." },
                  { step: "3", title: "Place Your Inquiry", desc: "Connect with our team for assistance and information." },
                  { step: "4", title: "Enjoy Quality Products", desc: "Receive dependable products and customer assistance." }
                ].map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="relative flex items-start md:justify-between">
                    <div className="hidden md:block w-[45%] text-right">
                      {i % 2 === 0 && (
                        <>
                          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </>
                      )}
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 flex h-9 w-9 -translate-x-[0.35rem] md:-translate-x-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-md z-10 border-4 border-background">
                      {item.step}
                    </div>
                    
                    <div className="ml-12 md:ml-0 md:w-[45%]">
                      {(i % 2 !== 0 || window.innerWidth < 768) && (
                        <>
                          <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Need Help Finding The Right Product?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl mb-10 text-primary-foreground/90 font-light"
          >
            Our team is here to assist you with product information, availability, and general questions.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button size="lg" variant="secondary" className="h-14 px-8 text-base text-primary font-semibold hover:bg-background/90" onClick={() => window.location.href = "tel:+12814462166"} data-testid="cta-call">
              <PhoneCall className="w-5 h-5 mr-2" /> Call Now
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => window.location.href = "mailto:support@okcellularrepairs.com"} data-testid="cta-email">
              <Mail className="w-5 h-5 mr-2" /> Send Us An Email
            </Button>
            <Button size="lg" variant="ghost" className="h-14 px-8 text-base border-transparent hover:bg-primary-foreground/10 text-primary-foreground" onClick={() => scrollToSection("contact")} data-testid="cta-visit">
              Visit Our Location
            </Button>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">What Customers Say About OK Cellular</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Great customer experience and quality products.",
              "Fast responses and affordable pricing.",
              "Reliable place for electronics and accessories.",
              "Professional service and helpful staff."
            ].map((quote, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-md bg-muted/20 hover:bg-muted/40 transition-colors">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex text-yellow-400 mb-4">
                        {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                      </div>
                      <p className="text-lg font-medium leading-tight mb-6">"{quote}"</p>
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        C{i+1}
                      </div>
                      <div>
                        <p className="text-sm font-bold">Verified Customer</p>
                        <p className="text-xs text-muted-foreground">Local Shopper</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Accordion type="single" collapsible className="w-full bg-background rounded-2xl border p-4 md:p-6 shadow-sm">
              {[
                {
                  q: "What products do you offer?",
                  a: "We offer electronics, mobile accessories, charging products, audio devices, and computer accessories."
                },
                {
                  q: "Do you have a physical location?",
                  a: "Yes. Customers can contact us or visit our location during business hours."
                },
                {
                  q: "How can I contact your team?",
                  a: "You can contact us by phone, email, or through our contact page."
                },
                {
                  q: "Do you sell branded products?",
                  a: "We offer a variety of compatible and branded electronics and accessories depending on availability."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b last:border-0">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-32 bg-background border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact OK Cellular</h2>
            <p className="text-lg text-muted-foreground">We're ready to assist you. Reach out today.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp} className="flex p-6 rounded-2xl bg-muted/40 border items-start">
                <MapPin className="w-8 h-8 text-primary mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Address</h3>
                  <p className="text-muted-foreground text-lg">8910 Will Clayton Pkwy APT 200<br/>Humble, TX 77396</p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex p-6 rounded-2xl bg-muted/40 border items-start cursor-pointer hover:bg-muted/60 transition-colors" onClick={() => window.location.href = "tel:+12814462166"} data-testid="contact-card-phone">
                <PhoneCall className="w-8 h-8 text-primary mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-muted-foreground text-lg hover:text-primary transition-colors">(281) 446-2166</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex p-6 rounded-2xl bg-muted/40 border items-start cursor-pointer hover:bg-muted/60 transition-colors" onClick={() => window.location.href = "mailto:support@okcellularrepairs.com"} data-testid="contact-card-email">
                <Mail className="w-8 h-8 text-primary mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground text-lg hover:text-primary transition-colors">support@okcellularrepairs.com</p>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex p-6 rounded-2xl bg-primary/5 border border-primary/10 items-start">
                <Clock className="w-8 h-8 text-primary mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-lg mb-1">Hours</h3>
                  <p className="text-muted-foreground text-lg font-medium">Monday–Saturday: 9:00 AM – 7:00 PM</p>
                  <p className="text-muted-foreground text-lg">Sunday: Closed</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[400px] lg:h-auto rounded-2xl overflow-hidden border shadow-lg"
            >
              <iframe 
                src="https://maps.google.com/maps?q=8910%20Will%20Clayton%20Pkwy%20APT%20200%20Humble%20TX%2077396&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="OK Cellular Location"
                data-testid="google-maps-embed"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 py-12 md:py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <img src={`${import.meta.env.BASE_URL}ok-cellular-logo-transparent.png`} alt="OK Cellular Logo" className="h-10 w-auto mb-6 brightness-0 invert opacity-90" />
              <p className="text-sm text-slate-400 mb-6 max-w-xs">
                Quality Electronics & Mobile Accessories in Humble, TX. Dependable products and excellent customer service.
              </p>
            </div>
            
            <div className="md:col-span-2 flex justify-center md:justify-start">
              <div>
                <h4 className="text-white font-bold mb-6">Navigation</h4>
                <ul className="grid grid-cols-2 gap-x-10 gap-y-3">
                  {['Home', 'About', 'Categories', 'Why Us', 'FAQ', 'Contact'].map((item) => (
                    <li key={item}>
                      <button 
                        onClick={() => item === 'Home' ? window.scrollTo({top: 0, behavior: 'smooth'}) : scrollToSection(item.toLowerCase().replace(' ', '-'))}
                        className="text-sm hover:text-white transition-colors"
                        data-testid={`footer-link-${item.toLowerCase().replace(' ', '-')}`}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6">Connect</h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-center">
                  <PhoneCall className="w-4 h-4 mr-3 text-slate-500" />
                  <a href="tel:+12814462166" className="hover:text-white transition-colors">(281) 446-2166</a>
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-slate-500" />
                  <a href="mailto:support@okcellularrepairs.com" className="hover:text-white transition-colors">Email Us</a>
                </p>
                <p className="flex items-center items-start mt-2">
                  <MapPin className="w-4 h-4 mr-3 mt-1 text-slate-500 flex-shrink-0" />
                  <span>8910 Will Clayton Pkwy<br/>APT 200, Humble, TX 77396</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-900 text-center text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 OK Cellular. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex items-center space-x-2 text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure & Trustworthy Tech Shop</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
