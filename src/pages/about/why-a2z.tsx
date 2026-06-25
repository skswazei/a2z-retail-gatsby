import React, { useRef } from "react";
import Seo from "@/components/Seo";
import { getPageSeo } from "@/lib/pageSeo";
import { CheckCircle, Star, Quote } from "lucide-react";
import ClientOnly from "@/components/ClientOnly";
import { TestimonialSlider } from "@/components/SwiperComponents";
import Breadcrumb from "@/components/Breadcrumb";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ctaParallaxBg from "@/assets/cta-image.png";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const reasons = [
  { title: "Built Exclusively for Your Industry", text: "A2Z POS was not adapted from generic retail software. Every feature, workflow, and integration was designed for liquor stores and neighborhood markets." },
  { title: "One Connected Platform", text: "POS, inventory, suppliers, payments, delivery, compliance, and reporting, all in one place. No more switching between disconnected tools." },
  { title: "Operational Simplicity", text: "A2Z POS simplifies the daily work of running a store. Lean teams need systems that reduce complexity." },
];

const WhyA2Z = () => {
  const { openDemoModal } = useDemoModal();
  const testimonialSwiperRef = useRef<any>(null);
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

        <div className="mx-auto px-4 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 relative">
          <div className="mx-auto max-w-9xl">
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-6xl text-center">
            <AnimateOnScroll>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">WHY A2Z</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Built to Simplify Operations,<br />and Support Growth</h1>
              {/* Animated underline */}
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                For liquor stores and neighborhood markets that are ready for a better way to run their business.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

    <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
      <div className="absolute top-20 -right-16 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-16 w-64 h-64 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-4xl space-y-6">
        {reasons.map((r, i) => (
          <AnimateOnScroll key={i} delay={i * 150}>
            <div className="card-elevated flex items-start gap-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                <CheckCircle className="h-5 w-5 text-brand-green" />
              </div>
              <div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{r.title}</h3>
                <p className="body-text text-sm">{r.text}</p>
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>

    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom left, #ffffff, #F8F7FF, #EDE9FF)" }}>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <AnimateOnScroll className="text-center mb-12">
          <span className="text-sm font-medium text-[#4B36BF]/70 uppercase tracking-[0.15em] mb-4 inline-block">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent" style={{ textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06)' }}>
            What Store Owners Are Saying
          </h2>
        </AnimateOnScroll>
        <div className="mx-auto max-w-6xl relative px-20">
          <button
            className="why-testimonial-prev absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4B36BF] hover:text-white hover:border-[#4B36BF] hover:shadow-md text-[#4B36BF]"
          >
            <svg className="w-5 h-5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            className="why-testimonial-next absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center transition-all duration-300 hover:bg-[#4B36BF] hover:text-white hover:border-[#4B36BF] hover:shadow-md text-[#4B36BF]"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <ClientOnly>
            <TestimonialSlider
              testimonials={[
                { quote: "A2Z POS has transformed how we run our store. Customer support is outstanding. Any issues are resolved quickly and professionally.", name: "Rajesh P.", role: "Campus Liquor" },
                { quote: "The inventory management features have saved us countless hours and transformed the way we place our orders. Best decision we've made for our business.", name: "Maria G.", role: "Mesa Food" },
                { quote: "Fast, reliable, and packed with features that helped our business grow. Our staff loved it and learned how to use it in no time.", name: "Kevin Hanna", role: "Apple Tree Market" },
                { quote: "Since switching to A2Z POS we've seen rapid increase in sales with all the integrations the system provides. The ROI is incredible.", name: "David W.", role: "Wilson's Shop" },
                { quote: "User friendly and powerful. It has everything we need to help us run our store smoothly and enhance our bottom line.", name: "Rachel G.", role: "Green's Store" },
                { quote: "The reporting tools give us insights we never had before. Reconciling daily sales and knowing our exact margins, it's like having a business analyst on staff.", name: "Sirwn P.", role: "Patel's Store" },
              ]}
              prevClass="why-testimonial-prev"
              nextClass="why-testimonial-next"
            />
          </ClientOnly>
        </div>
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
              See the Difference for Yourself
            </h2>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="text-white/80 mx-auto mb-8" style={{ maxWidth: "none" }}>Schedule a demo and discover why retailers are switching to A2Z POS.</p>
        <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">
          Get a Demo
        </button>
      </AnimateOnScroll>
    </section>
  </div>
  );
};

export const Head = () => {
  const seo = getPageSeo("why-a2z");
  return (
  <Seo
    title={seo.title || "Why A2Z — Built to Simplify Operations and Support Growth"}
    description={seo.description || "A2Z POS was built exclusively for liquor stores and neighborhood markets. One connected platform, real support, operational simplicity."}
    pathname="/about/why-a2z"
    keywords={seo.keywords || "why A2Z POS, POS comparison, best POS for liquor stores"}
    ogImage={seo.og_image || undefined}
    breadcrumbs={[{name:"Home",url:"/"},{name:"About",url:"/about/why-a2z"},{name:"Why A2Z",url:"/about/why-a2z"}]}
  />
  );
};

export default WhyA2Z;
