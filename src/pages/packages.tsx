import React, { useState } from "react";
import Seo from "@/components/Seo";
import { CheckCircle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ctaParallaxBg from "@/assets/cta-image.png";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const plans = [
  {
    name: "Essential",
    tagline: "Everything you need to get started",
    popular: false,
    features: [
      "Point of Sale Application",
      "Store Admin Web Portal",
      "Store Admin Mobile App (1 User)",
      "ID Verification by TruAge",
    ],
  },
  {
    name: "Growth",
    tagline: "Best for growing stores",
    popular: true,
    features: [
      "Point of Sale Application",
      "Store Admin Web Portal",
      "Store Admin Mobile App (2 Users)",
      "ID Verification by TruAge",
      "Mobile with Ring Sales (1 User)",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For multi-terminal operations",
    popular: false,
    features: [
      "Point of Sale Application",
      "Store Admin Web Portal",
      "Store Admin Mobile App (3 Users)",
      "ID Verification by TruAge",
      "Mobile with Ring Sales (2 Users)",
    ],
  },
];

const tabsData = [
  {
    id: "sales",
    label: "Sales & Checkout",
    title: "Sales & checkout",
    description: "Everything your cashier needs at the counter. Payments, refunds, discounts, and customer rewards handled in seconds with merchant POS.",
    badge: "Core checkout features",
    groups: [
      { label: "Payments", chips: ["Cash & card", "SNAP / EBT", "Quick scan", "Discounts", "Refunds", "Void item"] },
      { label: "Order handling", chips: ["Save & recall order", "Price check & change", "Print receipt", "Cash drop"] },
      { label: "Customer at checkout", chips: ["Add customer", "Redeem points", "ID scan — age & loyalty"] },
    ],
  },
  {
    id: "store",
    label: "Store Management",
    title: "Store management",
    description: "Run daily operations without friction. Inventory, employees scheduling, shift control, and terminal management all in one place.",
    badge: "Operations & employees features",
    groups: [
      { label: "Inventory", chips: ["Product management", "Category settings", "Supplier list", "Scratcher inventory", "Waste management"] },
      { label: "Daily operations", chips: ["Open & close day", "Terminal control", "Cash in & payout", "Taxes & fees"] },
      { label: "Employees", chips: ["Clock in / out", "Shift scheduler", "Timesheet", "Leave requests", "Roles & permissions"] },
    ],
  },
  {
    id: "loyalty",
    label: "Loyalty & Marketing",
    title: "Loyalty & marketing",
    description: "Keep customers coming back with points and deals. Run promotions, manage coupons, and accept online delivery orders, all from A2Z.",
    badge: "Loyalty & growth features",
    groups: [
      { label: "Loyalty", chips: ["Points program", "Customer profiles", "Loyalty deals"] },
      { label: "Promotions", chips: ["Coupons", "E-commerce coupons", "Promotions"] },
      { label: "Delivery app integrations", chips: ["UberEats", "Process & fulfill orders", "Product upload"] },
    ],
  },
  {
    id: "insights",
    label: "Reports & Growth",
    title: "Reports & growth",
    description: "Every number you need to run a smarter store. Plus access to exclusive vendor deals, compliance support, and A2Z marketplace programs.",
    badge: "Reporting & marketplace",
    groups: [
      { label: "Reports", chips: ["Sales overview", "Shift reports", "End of day", "Inventory report", "Employee timesheet"] },
      { label: "Marketplace", chips: ["Preferred vendors", "Exclusive deals", "A2Z programs"] },
      { label: "Support", chips: ["Customer support", "E-learning & tutorials", "Compliance guidance"] },
    ],
  },
];

const addons = [
  {
    name: "Delivery App Integration",
    description: "Connect with DoorDash, Uber Eats, and more. Orders flow directly into your POS.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 2l2 5h5l-4 3 1.5 5L9 12l-4.5 3L6 10 2 7h5L9 2z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Tobacco Coupons",
    description: "Built-in tobacco coupon management for liquor and convenience stores.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="2" y="4" width="14" height="10" rx="1.5" />
        <path d="M6 9h6M9 7v4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Inventory Through Fintech",
    description: "Empower merchants with A2Z discounts, rewards, and premium benefits.",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="9" cy="9" r="6.5" />
        <path d="M9 6v3l2 1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const hardwareItems = [
  "Cashier Touch Screen",
  "Customer Facing Screen",
  "Thermal Receipt Printer",
  "Barcode & License / ID Scanner",
  "Cash Drawer",
  "Credit Card Reader",
  "Backup Battery Unit",
];

const bundleItems = [
  "Touch Screen + Customer Display",
  "Thermal Receipt Printer",
  "Barcode & ID Scanner",
  "Cash Drawer + Card Reader",
  "Backup Battery Unit",
];

const PackagesPage = () => {
  const { openDemoModal } = useDemoModal();
  const [activeTab, setActiveTab] = useState("sales");
  const activeTabData = tabsData.find((t) => t.id === activeTab)!;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
        <img src={softwareHeroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4B36BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#568EF5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4B36BF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="mx-auto px-4 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 relative">
          <div className="mx-auto max-w-9xl">
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-6xl text-center">
            <AnimateOnScroll>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">PRICING</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Tailored Packages<br />for Your Store</h1>
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                Every store is different. Get a demo and we'll show you what A2Z looks like for yours.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={300}>
              <button onClick={openDemoModal} className="btn-primary-gradient mt-8 transition-transform duration-200 hover:scale-105">
                Schedule a Demo
              </button>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Software Plans */}
      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">Software Plans</span>
            <h2
              className="mb-4 text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
              style={{
                textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
              }}
            >A2Z POS Software</h2>
            <p className="body-text">Flexible plans designed to scale with your business</p>
          </AnimateOnScroll>

          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan, i) => (
              <AnimateOnScroll key={plan.name} delay={i * 150}>
                <div
                  className={`relative rounded-2xl border-2 p-7 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    plan.popular
                      ? "border-primary bg-primary/[0.02] shadow-md"
                      : "border-border bg-background"
                  }`}
                >
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5] px-4 py-1 text-xs font-bold text-white">
                      MOST POPULAR
                    </span>
                  )}
                  <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-5">{plan.tagline}</p>
                  <div className="h-px bg-border mb-5"></div>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-green" />
                        <span className="text-sm text-foreground">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={openDemoModal}
                    className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-300 border-2 ${
                      plan.popular
                        ? "bg-gradient-to-r from-[#4B36BF] to-[#568EF5] text-white border-transparent hover:shadow-lg"
                        : "border-primary text-primary hover:bg-primary hover:text-white"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Everything in your plan */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl">
            <AnimateOnScroll className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">What's Included</span>
              <h2
                className="mb-4 text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Everything in your plan</h2>
              <p className="body-text mx-auto max-w-xl">
                Every A2Z plan covers all the key areas your store needs to run — checkout, operations, loyalty, and growth.
              </p>
            </AnimateOnScroll>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabsData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#4B36BF] to-[#568EF5] border-transparent text-white"
                      : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeTab === tab.id ? "bg-white" : "bg-current"} opacity-70`}></span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  {activeTabData.title}
                </h3>
                <p className="body-text mb-5">{activeTabData.description}</p>
                <span className="inline-flex items-center gap-2 text-sm text-primary font-semibold bg-primary/10 px-4 py-1.5 rounded-full">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
                    <path d="M2 4h10M2 7h10M2 10h6" />
                  </svg>
                  {activeTabData.badge}
                </span>
              </div>
              <div className="bg-primary/5 rounded-2xl p-7 border border-border">
                {activeTabData.groups.map((group, i) => (
                  <div key={i} className={i < activeTabData.groups.length - 1 ? "mb-5" : ""}>
                    <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">{group.label}</div>
                    <div className="flex flex-wrap gap-2">
                      {group.chips.map((chip) => (
                        <span key={chip} className="text-xs text-foreground bg-background border border-border rounded-lg px-3 py-1.5 font-medium flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-5xl">
            <AnimateOnScroll className="text-center mb-12">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">Add-ons</span>
              <h2
                className="mb-4 text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Powerful Add-ons</h2>
              <p className="body-text">Enhance your POS with these optional features</p>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3">
              {addons.map((addon, i) => (
                <AnimateOnScroll key={addon.name} delay={i * 150}>
                  <div className="card-elevated group flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                      {addon.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">{addon.name}</h3>
                      <p className="text-sm text-muted-foreground">{addon.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hardware */}
      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24 bg-background">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#4B36BF]/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="mx-auto max-w-5xl">
          <AnimateOnScroll className="text-center mb-12">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">Hardware</span>
            <h2
              className="mb-4 text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
              style={{
                textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
              }}
            >A2Z Hardware</h2>
            <p className="body-text">Complete POS equipment — everything you need in one package</p>
          </AnimateOnScroll>

          <AnimateOnScroll delay={200}>
            <div className="mx-auto max-w-5xl rounded-2xl p-8 md:p-12 border border-border grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" style={{ background: "linear-gradient(135deg, #EDE9FF, #E6EAFF)" }}>
              {/* Left - List */}
              <div>
                <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">Complete Package</span>
                <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  Everything to get started
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Professional-grade hardware built for high-volume retail.</p>
                <ul className="space-y-3">
                  {hardwareItems.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-brand-green" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green text-sm font-bold px-4 py-2 rounded-full mt-6">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                    <path d="M7 1.5L8.5 5H12L9 7.2l1.2 3.8L7 9 3.8 11 5 7.2 2 5h3.5L7 1.5z" strokeLinejoin="round" />
                  </svg>
                  1 Year Warranty Included
                </div>
              </div>

              {/* Right - Bundle Visual */}
              <div className="bg-gradient-to-br from-[#4B36BF] to-[#568EF5] rounded-2xl p-8 text-center">
                <h4 className="text-white text-lg font-bold mb-1">Complete POS Bundle</h4>
                <p className="text-white/60 text-sm mb-6">7-piece professional kit</p>
                <div className="space-y-2.5">
                  {bundleItems.map((item) => (
                    <div key={item} className="bg-white/10 rounded-lg px-4 py-2.5 text-white text-sm font-medium text-left flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 opacity-80" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="1.2">
                        <rect x="1" y="2" width="12" height="9" rx="1.5" />
                        <path d="M4 13h6M7 11v2" strokeLinecap="round" />
                      </svg>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* CTA */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${ctaParallaxBg})`, backgroundAttachment: 'fixed' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e3e]/85 via-[#1a0e3e]/80 to-[#4B36BF]/70"></div>
        <AnimateOnScroll className="container mx-auto max-w-3xl px-4 py-20 md:py-28 text-center relative z-10">
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-x-8 -inset-y-4 border border-white/10 rounded-xl transform group-hover:scale-105 transition-transform duration-500"></div>
              <h2 className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8 text-white">
                Ready to Get Started?
              </h2>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
          </div>
          <p className="text-white/80 mx-auto mb-8 max-w-xl">
            Schedule a demo and see how A2Z POS can transform your store operations with integrated POS payment solutions.
          </p>
          <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
            Schedule a Demo
          </button>
        </AnimateOnScroll>
      </section>
    </div>
  );
};

export const Head = () => (
  <Seo
    title="Packages & Pricing — Tailored Plans for Your Store"
    description="Explore A2Z POS pricing plans — Essential, Growth, and Enterprise packages tailored for liquor stores and neighborhood markets."
    pathname="/packages"
    keywords="A2Z POS pricing, POS packages, liquor store POS plans, retail POS pricing"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Packages",url:"/packages"}]}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "A2Z POS",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web, Windows, Android",
      "description": "All-in-one POS platform for liquor stores and neighborhood markets.",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "offerCount": 3
      }
    }}
  />
);

export default PackagesPage;
