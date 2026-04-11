import React from "react";
import Seo from "@/components/Seo";
import { Target, Lightbulb, Eye } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import ctaParallaxBg from "@/assets/cta-image.png";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const OurStory = () => {
  const { openDemoModal } = useDemoModal();
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
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">ABOUT US</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >Built by People Who've<br />Stood Where You Stand</h1>
              {/* Animated underline */}
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                Three decades of running stores, managing inventory, and solving the problems no generic POS ever could.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

    <section className="relative overflow-hidden py-16 md:py-24" style={{ background: "linear-gradient(to bottom left, #ffffff, #F8F7FF, #EDE9FF)" }}>
      <div className="absolute top-10 -left-20 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-64 h-64 bg-[#4B36BF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 md:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <AnimateOnScroll delay={0}>
            <div className="card-elevated transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20 h-full">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Purpose</h3>
              <p className="body-text text-sm">
                Empower independent retailers. Give liquor stores and neighborhood markets the unified platform they need to simplify operations and grow their business.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={150}>
            <div className="card-elevated transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20 h-full">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Mission</h3>
              <p className="body-text text-sm">
                Deliver an integrated retail platform. Streamline operations, improve compliance, and drive merchant growth through one connected system built for their industry.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={300}>
            <div className="card-elevated transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20 h-full">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-foreground">Vision</h3>
              <p className="body-text text-sm">
                Become the operating system for independent retail. The platform that every liquor store and neighborhood market runs on, from POS to vendor integration & compliance.
              </p>
            </div>
          </AnimateOnScroll>
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
              Ready to See the Platform?
            </h2>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="text-white/80 mx-auto mb-8 max-w-lg">Every store is different. Schedule a demo<br />and see how A2Z works for yours.</p>
        <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">Get a Demo</button>
      </AnimateOnScroll>
    </section>
  </div>
  );
};

export const Head = () => (
  <Seo
    title="Our Story — Built by People Who Know Your Industry"
    description="Three decades of running stores, managing inventory, and solving the problems no generic POS ever could. Learn about the team behind A2Z POS."
    pathname="/about/our-story"
    keywords="A2Z POS story, about A2Z, retail technology company"
    breadcrumbs={[{name:"Home",url:"/"},{name:"About",url:"/about/our-story"},{name:"Our Story",url:"/about/our-story"}]}
  />
);

export default OurStory;
