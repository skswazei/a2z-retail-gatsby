import React, { useState } from "react";
import Seo, { CONTACT_EMAIL, CONTACT_TELEPHONE } from "@/components/Seo";
import { getPageSeo } from "@/lib/pageSeo";
import { CheckCircle, Store, CreditCard, TrendingUp, Shield, Loader2 } from "lucide-react";
import { submitContactForm } from "@/services/api";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const ScheduleDemo = () => {
  const [form, setForm] = useState({ name: "", store: "", phone: "", email: "", storeType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContactForm({
        full_name: form.name,
        store_name: form.store,
        phone: form.phone,
        email: form.email,
        store_type: form.storeType,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">GET STARTED</span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >See How A2Z Runs Your Store</h1>
              {/* Animated underline */}
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                Book a tailored demo to see how A2Z connects POS, inventory, suppliers, payments, e-orders, compliance tools, and reporting into one platform.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <AnimateOnScroll>
              <h2
                className="mb-6 text-3xl font-bold !leading-[1.3] md:text-4xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)'
                }}
              >What You'll See</h2>
            </AnimateOnScroll>
            <div className="space-y-4">
              {[
                { title: "Platform Walkthrough", text: "How A2Z connects the essential operating parts of the store into one platform." },
                { title: "Why It Matters", text: "Understand whether A2Z can reduce friction, improve visibility, and support growth for your type of store." },
                { title: "Tailored Relevance", text: "Demos are specific to liquor stores and neighborhood markets, not generic software walkthroughs." },
              ].map((item, i) => (
                <AnimateOnScroll key={item.title} delay={i * 150}>
                  <div className="flex items-start gap-3 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-xl p-3">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-green" />
                    <div>
                      <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <div>
            {submitted ? (
              <AnimateOnScroll>
                <div className="card-elevated text-center">
                  <CheckCircle className="mx-auto mb-4 h-12 w-12 text-brand-green" />
                  <h3 className="mb-2 text-xl font-bold text-foreground">Thank You!</h3>
                  <p className="body-text">We'll be in touch shortly to schedule your demo.</p>
                </div>
              </AnimateOnScroll>
            ) : (
              <AnimateOnScroll delay={200}>
                <form onSubmit={handleSubmit} className="card-elevated space-y-4 transition-all duration-300 hover:shadow-xl">
                  <p className="mb-2 text-sm font-semibold text-muted-foreground">
                    Tell us about your store and we'll show you how A2Z POS can help.
                  </p>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Full Name *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Store Name *</label>
                    <input
                      required
                      value={form.store}
                      onChange={(e) => setForm({ ...form, store: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Phone *</label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-foreground">Store Type *</label>
                    <select
                      required
                      value={form.storeType}
                      onChange={(e) => setForm({ ...form, storeType: e.target.value })}
                      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Select store type</option>
                      <option value="liquor">Liquor Store</option>
                      <option value="neighborhood">Neighborhood Market</option>
                    </select>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <button type="submit" disabled={loading} className="btn-primary-gradient w-full text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(75,54,191,0.3)] disabled:opacity-70">
                    {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {loading ? "Submitting..." : "Get a Demo"}
                  </button>
                </form>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export const Head = () => {
  const seo = getPageSeo("contact-us");
  return (
  <Seo
    title={seo.title || "Contact Us — Schedule a Demo"}
    description={seo.description || "Book a tailored demo to see how A2Z POS connects POS, inventory, suppliers, payments, and reporting into one platform for your store."}
    pathname="/contact-us"
    keywords={seo.keywords || "A2Z POS demo, contact A2Z, schedule demo, POS consultation"}
    ogImage={seo.og_image || undefined}
    breadcrumbs={[{name:"Home",url:"/"},{name:"Contact Us",url:"/contact-us"}]}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact A2Z POS",
      "url": "https://a2zpos.io/contact-us/",
      "description": "Schedule a demo and see how A2Z POS can transform your store operations with integrated POS payment solutions.",
      "mainEntity": {
        "@type": "Organization",
        "name": "A2Z POS",
        "telephone": CONTACT_TELEPHONE,
        "email": CONTACT_EMAIL
      }
    }}
  />
  );
};

export default ScheduleDemo;
