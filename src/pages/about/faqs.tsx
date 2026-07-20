import React, { useState, useRef, useEffect } from "react";
import Seo from "@/components/Seo";
import { getPageSeo } from "@/lib/pageSeo";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ctaParallaxBg from "@/assets/cta-image.png";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const faqs = [
  { q: "How easy is it to set up A2Z POS?", a: "A2Z POS is designed for quick and easy setup. Our team provides comprehensive onboarding support, seamless installation, staff support, and initial inventory setup. Most businesses are up and running within a few hours." },
  { q: "What payment methods does A2Z POS support?", a: "A2Z POS supports all major payment methods including credit/debit cards, SNAP payment, Apple Pay, Contactless payments, Mobile payments. We offer integrated payment processing with competitive rates and real-time transaction reporting." },
  { q: "Is the system suitable for multiple locations?", a: "Yes, A2Z POS is designed for multi-location businesses. Our cloud-based system allows retailers to manage multiple stores from a single dashboard, with real-time synchronization of inventory, sales data, and customer information across all locations." },
  { q: "What kind of reporting features are available?", a: "Our system offers comprehensive reporting tools including sales analytics, inventory tracking, employee metrics, and customer purchases trends. Reports can be customized, automated, and accessed from anywhere, helping you make data-driven intelligent decisions." },
  { q: "What support options are available?", a: "We provide 24/7 technical support through multiple channels including phone and email. Our support team is highly trained and can assist with any issues, from basic troubleshooting to advanced system configurations." },
];

const FAQItem = ({ q, a, index, isOpen, onToggle }: { q: string; a: string; index: number; isOpen: boolean; onToggle: () => void }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className={`rounded-2xl border transition-all duration-300 backdrop-blur-md ${isOpen ? "border-[#4B36BF]/20 bg-white/70 shadow-lg" : "border-white/40 bg-white/40 hover:bg-white/60 hover:border-[#4B36BF]/10 hover:shadow-md"}`}>
      <button onClick={onToggle} className="flex w-full items-center gap-4 p-5 md:p-6 text-left">
        <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-all duration-300 ${isOpen ? "bg-primary text-white scale-110" : "bg-[#4B36BF]/10 text-[#4B36BF]"}`}>
          {String(index + 1).padStart(2, "0")}
        </div>
        <span className={`flex-1 text-base md:text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-[#4B36BF]" : "text-foreground"}`}>{q}</span>
        <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${isOpen ? "bg-primary text-white rotate-0" : "bg-[#4B36BF]/10 text-[#4B36BF]"}`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>
      <div className="overflow-hidden transition-all duration-400 ease-in-out" style={{ maxHeight: height }}>
        <div ref={contentRef}>
          <div className="px-5 pb-5 md:px-6 md:pb-6 pl-[4.25rem] md:pl-[4.75rem]">
            <div className="h-px w-full bg-gradient-to-r from-[#4B36BF]/10 via-[#568EF5]/10 to-transparent mb-4"></div>
            <p className="body-text text-sm md:text-base leading-relaxed">{a}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQsPage = () => {
  const { openDemoModal } = useDemoModal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
  <div>
    <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
        {/* Watermark */}
        <img src={softwareHeroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade" />
        {/* Decorative shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4B36BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#568EF5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-20 right-[15%] w-4 h-4 bg-[#4B36BF]/20 rounded-full"></div>
        <div className="absolute bottom-16 left-[10%] w-3 h-3 bg-[#568EF5]/20 rounded-full"></div>
        <div className="absolute top-1/2 right-[8%] w-32 h-32 border border-[#4B36BF]/10 rounded-full"></div>
        <div className="absolute bottom-1/3 left-[5%] w-20 h-20 border border-[#568EF5]/10 rounded-full"></div>
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#4B36BF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

        <div className="mx-auto px-4 pb-24 md:px-8 md:pt-8 md:pb-32 relative">
          <div className="mx-auto max-w-9xl">
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-6xl text-center">
            <AnimateOnScroll>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">SUPPORT</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Frequently Asked Questions</h1>
              {/* Animated underline */}
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                Everything you need to know about A2Z.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

    <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
      <div className="absolute top-24 -right-16 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 -left-16 w-64 h-64 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#4B36BF 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="mx-auto max-w-3xl relative space-y-4">
        {faqs.map((f, i) => (
          <AnimateOnScroll key={i} delay={i * 75}>
            <FAQItem
              q={f.q}
              a={f.a}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          </AnimateOnScroll>
        ))}
      </div>
    </section>

    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${ctaParallaxBg})`, backgroundAttachment: 'fixed' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e3e]/85 via-[#1a0e3e]/80 to-[#4B36BF]/70"></div>
      <AnimateOnScroll className="container mx-auto max-w-3xl px-4 py-20 md:py-28 text-center relative z-10">
        <div className="relative text-center group mb-12">
          <div className="relative inline-block">
            <div className="absolute -inset-x-8 -inset-y-4 border border-white/10 rounded-xl transform group-hover:scale-105 transition-transform duration-500"></div>
            <h2 className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8 text-white">
              Still Have Questions?
            </h2>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="text-white/80 mx-auto mb-8 max-w-lg">Schedule a demo and our team will walk you through everything.</p>
        <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">Get a Demo</button>
      </AnimateOnScroll>
    </section>
  </div>
  );
};

export const Head = () => {
  const seo = getPageSeo("faqs");
  return (
  <Seo
    title={seo.title || "FAQs — Frequently Asked Questions"}
    description={seo.description || "Find answers to common questions about A2Z POS — setup, features, pricing, hardware, and support."}
    pathname="/about/faqs"
    keywords={seo.keywords || "A2Z POS FAQ, POS questions, A2Z support"}
    ogImage={seo.og_image || undefined}
    breadcrumbs={[{name:"Home",url:"/"},{name:"About",url:"/about/faqs"},{name:"FAQs",url:"/about/faqs"}]}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }}
  />
  );
};

export default FAQsPage;
