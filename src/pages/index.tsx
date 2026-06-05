import React, { useState, useEffect, useRef } from "react";
import Seo, { CONTACT_EMAIL, CONTACT_TELEPHONE } from "@/components/Seo";
import { Link } from "gatsby";
import { ShoppingCart, Package, Users, BarChart3, Globe, Heart, CheckCircle, ArrowRight, Store, CreditCard, TrendingUp, Shield, Star, Quote, Play } from "lucide-react";
import ClientOnly from "@/components/ClientOnly";
import { TestimonialSlider, PartnerSlider } from "@/components/SwiperComponents";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import homepageHero from "@/assets/homepage-hero.png";
import heroWatermark from "@/assets/hero-watermark.svg";
import ctaParallaxBg from "@/assets/cta-image.png";
import grubhubLogo from "@/assets/partners/GrubHub.png";
import trueageLogo from "@/assets/partners/TrueAge.png";
import ubereatsLogo from "@/assets/partners/UberEats.png";

import ringSalesHero from "@/assets/ring-sales-hero.png";
import inventoryHero from "@/assets/inventory-hero.png";
import reportingHero from "@/assets/reporting-hero.png";
import eordersHero from "@/assets/eorders-hero.png";
import employeesHero from "@/assets/employees-hero.png";
import loyaltyHero from "@/assets/loyalty-hero.png";

const pillars = [
  {
    title: "Multi-Functional Dashboard",
    subtitle: "Complete Store Control",
    text: "One center of gravity for the entire business. Run POS, inventory, suppliers, payments, and reporting from one connected platform.",
    icon: <ShoppingCart className="h-6 w-6" />,
  },
  {
    title: "Auto Update Inventory",
    subtitle: "Always Stocked, Always Organized",
    text: "Inventory updates automatically with every sale, return, and delivery. No manual counts, no guesswork, just accurate stock levels at all times.",
    icon: <Package className="h-6 w-6" />,
  },
  {
    title: "Growth & Supplier Integration",
    subtitle: "Expand Reach, Simplify Supply",
    text: "Sell across more channels with built-in delivery and online ordering integrations. On the supply side, automate reordering and manage vendors with less effort.",
    icon: <Globe className="h-6 w-6" />,
  },
  {
    title: "Compliance Confidence",
    subtitle: "Built for Regulated Retail",
    text: "Tools designed for the workflows that matter in liquor store and neighborhood market operations, including age verification, compliance reporting, and audit trails.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
];

const modules = [
  { label: "Ring Sales", desc: "Fast, reliable checkout built for high-volume retail.", path: "/software/ring-sales", icon: <ShoppingCart className="h-5 w-5" /> },
  { label: "Inventory", desc: "Real-time product visibility for stores with large SKU counts.", path: "/software/inventory", icon: <Package className="h-5 w-5" /> },
  { label: "Employees", desc: "Scheduling, access control, and digital onboarding in one place.", path: "/software/employees", icon: <Users className="h-5 w-5" /> },
  { label: "Reporting", desc: "Understand sales, inventory, and store performance clearly.", path: "/software/reporting", icon: <BarChart3 className="h-5 w-5" /> },
  { label: "E-Orders", desc: "Connect your store to modern ordering channels.", path: "/software/e-orders", icon: <Globe className="h-5 w-5" /> },
  { label: "Loyalty", desc: "Built-in loyalty programs that reward and retain customers.", path: "/software/loyalty", icon: <Heart className="h-5 w-5" /> },
];

const transformations = [
  { before: "Disconnected tools", after: "One connected platform" },
  { before: "Fragmented reporting", after: "Clearer visibility" },
  { before: "Operational complexity", after: "Simpler workflows" },
  { before: "Reactive management", after: "Smarter decision-making" },
];

const stats = [
  { value: 500, suffix: "+", label: "Stores Powered", icon: <Store className="h-6 w-6" /> },
  { value: 10, suffix: "M+", label: "Transactions Processed", icon: <CreditCard className="h-6 w-6" /> },
  { value: 99.9, suffix: "%", label: "Uptime Reliability", icon: <TrendingUp className="h-6 w-6" /> },
  { value: 24, suffix: "/7", label: "Dedicated Support", icon: <Shield className="h-6 w-6" /> },
];

const testimonials = [
  { quote: "A2Z POS has transformed how we run our store. Customer support is outstanding. Any issues are resolved quickly and professionally.", name: "Rajesh P.", role: "Campus Liquor" },
  { quote: "The inventory management features have saved us countless hours and transformed the way we place our orders. Best decision we've made for our business.", name: "Maria G.", role: "Mesa Food" },
  { quote: "Fast, reliable, and packed with features that helped our business grow. Our staff loved it and learned how to use it in no time.", name: "Kevin Hanna", role: "Apple Tree Market" },
  { quote: "Since switching to A2Z POS we've seen rapid increase in sales with all the integrations the system provides. The ROI is incredible.", name: "David W.", role: "Wilson's Shop" },
  { quote: "User friendly and powerful. It has everything we need to help us run our store smoothly and enhance our bottom line.", name: "Rachel G.", role: "Green's Store" },
  { quote: "The reporting tools give us insights we never had before. Reconciling daily sales and knowing our exact margins, it's like having a business analyst on staff.", name: "Sirwn P.", role: "Patel's Store" },
];

const productTabs = [
  { id: "pos", label: "Ring Sales", image: ringSalesHero, title: "Fast, Accurate Checkout", desc: "Ring every sale faster with barcode scanning, age verification, flexible payments, and compliance controls  all in one screen.", link: "/software/ring-sales" },
  { id: "inventory", label: "Inventory", image: inventoryHero, title: "Real-Time Stock Visibility", desc: "Know exactly what's on the shelf, what needs reordering, and where your margins are  updated with every transaction.", link: "/software/inventory" },
  { id: "reporting", label: "Reporting", image: reportingHero, title: "Actionable Store Insights", desc: "Sales trends, inventory performance, and employee metrics  all in one dashboard you can check from anywhere.", link: "/software/reporting" },
  { id: "employees", label: "Employees", image: employeesHero, title: "Team Management, Simplified", desc: "Digital onboarding, shift scheduling, role-based access, and performance tracking  all from one platform.", link: "/software/employees" },
  { id: "eorders", label: "E-Orders", image: eordersHero, title: "Delivery Made Simple", desc: "UberEats, GrubHub, DoorDash  all incoming orders on one screen. No separate tablets needed.", link: "/software/e-orders" },
  { id: "loyalty", label: "Loyalty", image: loyaltyHero, title: "Reward & Retain Customers", desc: "Built-in loyalty that rewards at checkout, sends follow-ups, and gives you real data on who's buying what.", link: "/software/loyalty" },
];

const Homepage = () => {
  const { openDemoModal } = useDemoModal();
  const [activeTab, setActiveTab] = useState("pos");
  const swiperRef = useRef<any>(null);
  const testimonialSwiperRef = useRef<any>(null);

  useEffect(() => {
    if (sessionStorage.getItem('scrollToVideoDemo') === 'true') {
      sessionStorage.removeItem('scrollToVideoDemo');
      setTimeout(() => {
        const el = document.getElementById('video-demo-player');
        if (el) {
          const offset = 200;
          window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);
  return (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 0.07; }
        }
        @keyframes heroSlideIn {
          from { opacity: 0; transform: translateX(40px) translateY(-50%); }
          to { opacity: 1; transform: translateX(0) translateY(-50%); }
        }
        .hero-fade-up { animation: heroFadeUp 0.7s ease-out both; }
        .hero-fade-in { animation: heroFadeIn 0.8s ease-out both; }
        .hero-slide-in { animation: heroSlideIn 0.9s ease-out both; }
        .hero-delay-1 { animation-delay: 0.1s; }
        .hero-delay-2 { animation-delay: 0.25s; }
        .hero-delay-3 { animation-delay: 0.4s; }
        .hero-delay-4 { animation-delay: 0.55s; }
        .hero-delay-5 { animation-delay: 0.7s; }
        .hero-delay-6 { animation-delay: 0.85s; }
      `}</style>
      <img src={heroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover hero-fade-in hero-delay-3" />
      <style>{`
        .hero-container { margin: 0 auto; padding: 48px 16px; position: relative; }
        @media (min-width: 768px) { .hero-container { padding: 80px 48px; } }
        .hero-grid { display: grid; gap: 16px; align-items: center; grid-template-columns: 1fr; }
        @media (min-width: 768px) { .hero-grid { grid-template-columns: 2fr 1fr; } }
      `}</style>
      <div className="hero-container">
        <div className="hero-grid">
          <div>
            <p className="font-semibold hero-fade-up hero-delay-1" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.15rem', color: '#1fa868', lineHeight: 1.8, letterSpacing: 'normal', marginBottom: '12px' }}>Built for liquor stores and neighborhood markets.</p>
            <h1
              className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl hero-fade-up hero-delay-2"
              style={{
                fontFamily: 'Nunito, sans-serif',
                background: 'linear-gradient(to right, #4B36BF, #568EF5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
              }}
            >
              Stop juggling multiple tools.<br />
              Run your entire store<br />
              From One Platform.
            </h1>
            <p className="hero-fade-up hero-delay-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.15rem', fontWeight: 400, color: '#4b5563', lineHeight: 1.8, letterSpacing: 'normal', maxWidth: '32rem', marginBottom: '32px' }}>
              One platform for POS, inventory, suppliers, payments, and reporting. Always know what you have, what you're making, and what to do next.
            </p>
            <div className="flex flex-col sm:flex-row hero-fade-up hero-delay-4" style={{ gap: '16px', marginBottom: '0' }}>
              <button
                onClick={openDemoModal}
                className="hero-btn-primary text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  boxShadow: 'rgba(79, 70, 229, 0.38) 0px 4px 18px 0px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = 'rgba(79, 70, 229, 0.55) 0px 8px 28px 0px'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'rgba(79, 70, 229, 0.38) 0px 4px 18px 0px'; }}
              >Get a Demo</button>
              <button
                onClick={() => { const el = document.getElementById('video-demo-player'); if (el) { const offset = 200; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' }); } }}
                className="hero-btn-outline text-center"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#4541be',
                  background: 'transparent',
                  border: '2px solid #4541be',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  boxShadow: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(69, 65, 190, 0.06)'; e.currentTarget.style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >See How It Works</button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img src={homepageHero} alt="A2Z POS System" className="absolute right-0 top-1/2 -translate-y-1/2 w-[155%] max-w-none hero-slide-in hero-delay-3" />
          </div>
        </div>
        <div className="hero-fade-up hero-delay-6" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', marginTop: '24px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#687282' }}><CheckCircle style={{ width: '16px', height: '16px', color: '#1fa868' }} /> Built for Liquor Stores & Neighborhood Markets</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#687282' }}><CheckCircle style={{ width: '16px', height: '16px', color: '#1fa868' }} /> Dedicated onboarding, start to finish</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', fontSize: '0.875rem', fontWeight: 500, color: '#687282' }}><CheckCircle style={{ width: '16px', height: '16px', color: '#1fa868' }} /> Built by a team that knows your industry</span>
        </div>
      </div>
    </section>

    {/* Stats Counter
    <section className="relative bg-gradient-to-r from-[#4B36BF] to-[#568EF5] py-12 md:py-16">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <AnimateOnScroll key={i} delay={i * 150} className="text-center">
              <div className="flex justify-center mb-3 text-white/70">{s.icon}</div>
              <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">
                <AnimatedCounter end={s.value} suffix={s.suffix} />
              </div>
              <p className="text-sm text-white/70 font-medium">{s.label}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
    */}

    {/* Value Pillars */}
    <section className="relative container mx-auto px-4 py-16 md:px-8 md:py-24 overflow-hidden">
      {/* Decorative blobs */}
      <AnimateOnScroll className="mb-12 text-center">
        <div className="relative text-center group mb-12">
          <div className="relative inline-block">
            <h2
              className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
              style={{
                textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
              }}
            >
              <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                Everything You Need<br />to Run and Grow Your Business
              </span>
            </h2>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="body-text mx-auto max-w-2xl">
          A2Z brings the essential systems of modern retail together in one platform so merchants can simplify operations, improve visibility, and create new opportunities for growth.
        </p>
      </AnimateOnScroll>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {pillars.map((p, i) => (
          <AnimateOnScroll key={i} delay={i * 150} className="h-full">
            <div className="card-elevated group/card h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover/card:bg-primary group-hover/card:text-white group-hover/card:scale-110">
                {p.icon}
              </div>
              <h3 className="mb-1 text-xl font-bold text-foreground">{p.title}</h3>
              <p className="mb-2 text-sm font-semibold text-brand-green">{p.subtitle}</p>
              <p className="body-text text-sm">{p.text}</p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>

    {/* Interactive Product Showcase */}
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4B36BF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <AnimateOnScroll className="mb-12 text-center">
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
                <h2
                className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
                style={{ textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)' }}
              >
                <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  See the Platform in Action
                </span>
              </h2>
              </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
          </div>
          <p className="body-text mx-auto max-w-2xl">
            Click through each module to see how A2Z POS connects every part of your store.<br />One platform that brings it all together.
          </p>
        </AnimateOnScroll>

        {/* Tab buttons and Tab content commented out
        <AnimateOnScroll>
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-xl bg-muted/50 p-1.5 border border-border">
              {productTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === tab.id ? "bg-primary text-white shadow-md" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <style>{`
            @keyframes tabFadeIn {
              from { opacity: 0; transform: translateY(16px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .tab-animate { animation: tabFadeIn 0.5s ease-out both; }
          `}</style>
          {productTabs.filter((tab) => tab.id === activeTab).map((tab) => (
            <div key={tab.id} className="tab-animate">
              <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-2 items-center">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <img src={tab.image} alt={tab.label} className="w-full" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{tab.title}</h3>
                  <p className="body-text text-base md:text-lg">{tab.desc}</p>
                  <Link to={tab.link} className="btn-primary-gradient inline-flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:gap-3">
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </AnimateOnScroll>
        */}

        {/* Module links grid */}
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-16">
          {modules.map((m, i) => (
            <AnimateOnScroll key={m.path} delay={i * 100}>
              <Link to={m.path} className="card-elevated group flex items-start gap-4 bg-background transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 group-hover:rotate-3">
                  {m.icon}
                </div>
                <div>
                  <h3 className="mb-1 text-base font-bold text-foreground group-hover:text-primary transition-colors duration-300">{m.label}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Trust Bar — Swiper Carousel */}
    <section className="py-10 md:py-12 border-y border-border/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm font-medium text-[#4B36BF]/70 uppercase tracking-[0.15em]">Trusted Partners</p>
          <div className="flex justify-center">
            <ClientOnly>
              <PartnerSlider
                partners={[
                  { src: grubhubLogo, alt: "GrubHub" },
                  { src: trueageLogo, alt: "TrueAge" },
                  { src: ubereatsLogo, alt: "UberEats" },
                ]}
                onSwiper={(swiper) => { swiperRef.current = swiper; }}
              />
            </ClientOnly>
          </div>
        </div>
      </div>
    </section>

    {/* Industry Authority */}
    <section className="relative container mx-auto px-4 py-16 md:px-8 md:py-24 overflow-hidden">
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#4B36BF]/20 to-transparent"></div>
      <div className="mx-auto max-w-4xl">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <AnimateOnScroll>
            <span className="text-sm font-medium text-[#4B36BF]/70 uppercase tracking-[0.15em] mb-3 inline-block">INDUSTRY FOCUS</span>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 !leading-[1.3] bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
              style={{
                textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
              }}
            >
              Technology Built for Liquor Stores & Neighborhood Markets
            </h2>
            <p className="body-text mb-6">
              A2Z was not built as generic retail software. It was built for the operational realities of liquor stores and neighborhood markets, including high SKU counts, fast transactions, supplier-driven complexity, and constant margin pressure.
            </p>
          </AnimateOnScroll>
          <div className="space-y-3">
            {["High SKU inventory environments", "Supplier-heavy operating model", "Fast-moving checkout workflows", "Real-time inventory tracking & alerts", "Better operational visibility with lean teams"].map((item, i) => (
              <AnimateOnScroll key={item} delay={i * 120}>
                <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-all duration-300 hover:shadow-md hover:border-[#4B36BF]/20 hover:translate-x-1">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-brand-green" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Why Retailers Switch */}
    <section className="relative bg-card py-16 md:py-24 overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -top-32 -right-32 w-64 h-64 border border-[#4B36BF]/5 rounded-full"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 border border-[#4B36BF]/5 rounded-full"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 border border-[#568EF5]/5 rounded-full"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <AnimateOnScroll className="mx-auto max-w-3xl text-center">
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
                <h2
                className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >
                <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  Why Retailers Switch to A2Z
                </span>
              </h2>
              </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
          </div>
          <p className="body-text mx-auto mb-12 max-w-xl">
            From disconnected tools to one connected platform. Less switching, less manual reconciliation, fewer blind spots, and a clearer operational picture.
          </p>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {transformations.map((t, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-[#4B36BF]/20 group/card h-full min-h-[72px]">
                <div className="flex flex-1 items-center gap-2 bg-muted/50 px-4 py-4 transition-all duration-500 group-hover/card:bg-muted/30">
                  <span className="text-sm text-muted-foreground transition-all duration-500 group-hover/card:text-muted-foreground/30 group-hover/card:scale-95 origin-left">{t.before}</span>
                </div>
                <div className="flex items-center bg-gradient-to-r from-muted/50 to-background px-2">
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover/card:translate-x-0.5 group-hover/card:scale-110" />
                </div>
                <div className="flex flex-1 items-center gap-2 bg-background px-4 py-4 transition-all duration-500 group-hover/card:bg-brand-green/[0.03]">
                  <CheckCircle className="h-4 w-4 flex-shrink-0 text-brand-green transition-transform duration-300 group-hover/card:scale-125" />
                  <span className="text-sm font-bold text-foreground transition-all duration-500 group-hover/card:text-brand-green group-hover/card:scale-105 origin-left">{t.after}</span>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#568EF5]/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <AnimateOnScroll className="text-center mb-12">
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
                <h2
                className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
                style={{ textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)' }}
              >
                <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  What Store Owners Are Saying
                </span>
              </h2>
              </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
          </div>
        </AnimateOnScroll>
        <div className="mx-auto max-w-6xl relative px-20">
          <button
            className="testimonial-prev absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4B36BF] hover:text-white hover:border-[#4B36BF] hover:shadow-md text-[#4B36BF]"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="testimonial-next absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4B36BF] hover:text-white hover:border-[#4B36BF] hover:shadow-md text-[#4B36BF]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <ClientOnly>
            <TestimonialSlider testimonials={testimonials} prevClass="testimonial-prev" nextClass="testimonial-next" />
          </ClientOnly>
        </div>
      </div>
    </section>

    {/* Video Demo Section */}
    <section id="video-demo" className="relative bg-card py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <AnimateOnScroll className="text-center mb-12">
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
                <h2
                className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
                style={{ textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)' }}
              >
                <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  Watch A2Z in Action
                </span>
              </h2>
              </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
          </div>
          <p className="body-text mx-auto max-w-xl">
            See how A2Z transforms daily store operations in under 45 seconds.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll>
          <div id="video-demo-player" className="mx-auto max-w-4xl relative rounded-2xl overflow-hidden shadow-2xl border border-border group cursor-pointer">
            <img src={ctaParallaxBg} alt="A2Z POS demo video thumbnail" className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e3e]/60 via-[#1a0e3e]/30 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-20 w-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                <Play className="h-8 w-8 text-[#4B36BF] ml-1" fill="#4B36BF" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6">
              <p className="text-white font-semibold text-lg">A2Z Platform Overview</p>
              <p className="text-white/70 text-sm">45 sec demo walkthrough</p>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>

    {/* Final CTA — Parallax */}
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Parallax background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaParallaxBg})`, backgroundAttachment: 'fixed' }}
      ></div>
      {/* Dark overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e3e]/85 via-[#1a0e3e]/80 to-[#4B36BF]/70"></div>
      <AnimateOnScroll className="container mx-auto max-w-3xl px-4 py-20 md:py-28 text-center relative z-10">
        <div className="relative text-center group mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-x-8 -inset-y-4 border border-white/10 rounded-xl transform group-hover:scale-105 transition-transform duration-500"></div>
            <h2 className="relative text-3xl md:text-5xl font-bold leading-tight py-2 px-8 text-white">
              Run Your Entire Store on<br />One Platform
            </h2>
            <div className="absolute inset-0 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="mx-auto mb-10 text-lg text-white/80" style={{maxWidth: "none"}}>
          See how A2Z connects POS, inventory, suppliers, payments, delivery apps,<br />compliance tools, and reporting into one unified retail growth platform.
        </p>
        <div className="flex justify-center">
          <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
            Contact Sales
          </button>
        </div>
      </AnimateOnScroll>
    </section>
  </div>
  );
};

export const Head = () => (
  <Seo
    title="A2Z POS — All-in-One POS for Liquor Stores & Neighborhood Markets"
    description="One platform for POS, inventory, suppliers, payments, and reporting. Built for liquor stores and neighborhood markets. Stop juggling multiple tools."
    pathname="/"
    keywords="POS system, liquor store POS, neighborhood market POS, retail POS, inventory management, A2Z POS"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "A2Z POS",
      "url": "https://a2zpos.io",
      "logo": "https://a2zpos.io/og-image.png",
      "description": "All-in-one POS platform for liquor stores and neighborhood markets. POS, inventory, suppliers, payments, and reporting in one system.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": CONTACT_TELEPHONE,
        "contactType": "sales",
        "email": CONTACT_EMAIL
      },
      "sameAs": []
    }}
  />
);

export default Homepage;
