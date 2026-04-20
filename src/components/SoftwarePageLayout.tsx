import React, { ReactNode } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { useDemoModal } from "@/components/DemoModal";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import heroWatermark from "@/assets/hero-watermark.svg";
import ctaParallaxBg from "@/assets/cta-image.png";

interface SoftwarePageLayoutProps {
  heroHeadline: ReactNode;
  heroSubheadline: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageShadow?: boolean;
  aboutTitle: ReactNode;
  aboutImage?: string;
  aboutImageAlt?: string;
  aboutText: string;
  features: { title: string; description: string; icon?: ReactNode }[];
  featuresTitle?: string;
  closingHeadline: ReactNode;
  closingText: ReactNode;
  closingCta1: string;
  closingCta2: string;
  icon?: ReactNode;
}

const SoftwarePageLayout = ({
  heroHeadline,
  heroSubheadline,
  heroImage,
  heroImageAlt,
  heroImageShadow = true,
  aboutTitle,
  aboutImage,
  aboutImageAlt,
  aboutText,
  features,
  featuresTitle = "Key Features",
  closingHeadline,
  closingText,
  closingCta1,
}: SoftwarePageLayoutProps) => {
  const { openDemoModal } = useDemoModal();
  return (
  <div>
    <style>{`
      @keyframes softFadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes softFadeIn {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      .soft-fade-up { animation: softFadeUp 0.7s ease-out both; }
      .soft-fade-in-right { animation: softFadeIn 0.8s ease-out both; }
      .soft-delay-1 { animation-delay: 0.15s; }
      .soft-delay-2 { animation-delay: 0.3s; }
      .soft-delay-3 { animation-delay: 0.45s; }
    `}</style>

    {/* Hero */}
    <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
      {/* Watermark & decorative elements */}
      <img src={heroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade-7" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4B36BF]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#568EF5]/5 rounded-full blur-3xl"></div>
      <div className="mx-auto px-4 pt-10 pb-20 md:px-8 md:pt-12 md:pb-28 relative">
        <div className="mx-auto max-w-9xl">
          <Breadcrumb />
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <h1
                className="mb-6 text-4xl font-extrabold !leading-[1.3] md:text-5xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent soft-fade-up"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >{heroHeadline}</h1>
              <p className="body-text mb-8 max-w-lg text-lg soft-fade-up soft-delay-1">{heroSubheadline}</p>
              <div className="soft-fade-up soft-delay-2">
                <button onClick={openDemoModal} className="btn-primary-gradient transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(75,54,191,0.3)]">Get a Free Demo</button>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              {heroImage ? (
                <img src={heroImage} alt={heroImageAlt || "Product feature overview"} className={`w-full max-w-xl ${heroImageShadow ? "rounded-2xl shadow-lg" : ""} soft-fade-in-right soft-delay-2 transition-transform duration-500 hover:scale-[1.02]`} />
              ) : (
                <div className="w-full max-w-md aspect-[4/3] rounded-2xl border-2 border-dashed border-[#4B36BF]/30 bg-[#4B36BF]/5 flex items-center justify-center soft-fade-in-right soft-delay-2">
                  <div className="text-center">
                    <svg className="mx-auto mb-3 w-12 h-12 text-[#4B36BF]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                    </svg>
                    <p className="text-sm text-[#4B36BF]/40 font-medium">Image Placeholder (4:3 — 448×336 px)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* About */}
    <section className="relative px-4 py-16 md:px-8 md:py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#4B36BF 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      <div className="container mx-auto max-w-7xl relative">
        <AnimateOnScroll>
          <h2
            className="mb-10 text-center text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
            style={{
              textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
            }}
          >{aboutTitle}</h2>
        </AnimateOnScroll>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <AnimateOnScroll className="flex items-center justify-center">
            {aboutImage ? (
              <img src={aboutImage} alt={aboutImageAlt || "About"} className="w-full max-w-md rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.03]" />
            ) : (
              <div className="w-full max-w-md aspect-[4/3] rounded-2xl border-2 border-dashed border-[#4B36BF]/30 bg-[#4B36BF]/5 flex items-center justify-center">
                <div className="text-center">
                  <svg className="mx-auto mb-3 w-12 h-12 text-[#4B36BF]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                  <p className="text-sm text-[#4B36BF]/40 font-medium">Image Placeholder (4:3 — 448×336 px)</p>
                </div>
              </div>
            )}
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:border-[#4B36BF]/20">
              <div className="body-text text-base leading-relaxed md:text-lg" dangerouslySetInnerHTML={{ __html: aboutText }} />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="relative py-16 md:py-24 overflow-hidden" style={{ background: "linear-gradient(to bottom left, #ffffff, #F8F7FF, #EDE9FF)" }}>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#568EF5]/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#4B36BF]/5 rounded-full blur-3xl"></div>
      <div className="container mx-auto px-4 md:px-8 relative">
        <AnimateOnScroll>
          <div className="relative text-center group mb-12">
            <div className="relative inline-block">
              <h2
                className="relative text-3xl md:text-4xl font-bold leading-tight py-2 px-8"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >
                <span className="bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent">
                  {featuresTitle}
                </span>
              </h2>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-[#4B36BF] to-[#568EF5] group-hover:w-32 transition-all duration-500"></div>
          </div>
        </AnimateOnScroll>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <AnimateOnScroll key={i} delay={i * 150}>
              <div className="card-elevated group/card transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[#4B36BF]/20">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover/card:bg-primary group-hover/card:text-white group-hover/card:scale-110">
                  {f.icon || <span className="text-lg font-bold">{i + 1}</span>}
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
                <p className="body-text text-sm">{f.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>

    {/* Closing CTA — Parallax */}
    <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${ctaParallaxBg})`, backgroundAttachment: 'fixed' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e3e]/85 via-[#1a0e3e]/80 to-[#4B36BF]/70"></div>
      <AnimateOnScroll className="container mx-auto max-w-3xl px-4 py-20 md:py-28 text-center relative z-10">
        <div className="relative text-center group mb-8">
          <div className="relative inline-block">
            <div className="absolute -inset-x-8 -inset-y-4 border border-white/10 rounded-xl transform group-hover:scale-105 transition-transform duration-500"></div>
            <h2 className="relative text-3xl md:text-5xl font-bold leading-tight py-2 px-8 text-white">
              {closingHeadline}
            </h2>
            <div className="absolute inset-0 bg-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-px bg-gradient-to-r from-white/40 to-white/40 group-hover:w-32 transition-all duration-500"></div>
        </div>
        <p className="mx-auto mb-10 text-lg text-white/80" style={{ maxWidth: "none" }}>{closingText}</p>
        <div className="flex justify-center">
          <button onClick={openDemoModal} className="bg-white text-[#4B36BF] font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)]">{closingCta1}</button>
        </div>
      </AnimateOnScroll>
    </section>
  </div>
  );
};

export default SoftwarePageLayout;
