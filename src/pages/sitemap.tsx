import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Loader2 } from "lucide-react";
import { fetchPosts, BlogPostSummary } from "@/services/api";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

interface SitemapLink {
  title: string;
  path: string;
}

interface SitemapSection {
  label: string;
  items: SitemapLink[];
}

const staticSections: SitemapSection[] = [
  {
    label: "Main",
    items: [
      { title: "Home", path: "/" },
      { title: "Packages", path: "/packages/" },
      { title: "Blog", path: "/blog/" },
      { title: "Contact Us", path: "/contact-us/" },
    ],
  },
  {
    label: "Software",
    items: [
      { title: "E-Orders", path: "/software/e-orders/" },
      { title: "Employees", path: "/software/employees/" },
      { title: "Inventory", path: "/software/inventory/" },
      { title: "Loyalty", path: "/software/loyalty/" },
      { title: "Reporting", path: "/software/reporting/" },
      { title: "Ring Sales", path: "/software/ring-sales/" },
    ],
  },
  {
    label: "Hardware",
    items: [
      { title: "Barcode Scanner", path: "/hardware/barcode-scanner/" },
      { title: "Credit Card Reader", path: "/hardware/credit-card-reader/" },
      { title: "Customer Screen", path: "/hardware/customer-screen/" },
      { title: "Label Printer", path: "/hardware/label-printer/" },
      { title: "POS", path: "/hardware/pos/" },
      { title: "Receipt Printer", path: "/hardware/receipt-printer/" },
    ],
  },
  {
    label: "About",
    items: [
      { title: "Our Story", path: "/about/our-story/" },
      { title: "Why A2Z", path: "/about/why-a2z/" },
      { title: "Success Stories", path: "/about/success-stories/" },
      { title: "FAQs", path: "/about/faqs/" },
    ],
  },
  {
    label: "Legal",
    items: [
      { title: "Privacy Policy", path: "/privacy-policy/" },
      { title: "Cookie Policy", path: "/cookie-policy/" },
      { title: "Terms and Conditions", path: "/terms-and-conditions/" },
    ],
  },
];

const Sitemap = () => {
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoadingPosts(false));
  }, []);

  const blogSection: SitemapSection | null = posts && posts.length > 0
    ? {
        label: "Blog Articles",
        items: posts.map((p) => ({ title: p.title, path: `/blog/${p.slug}/` })),
      }
    : null;

  return (
    <div>
      <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
        <img src={softwareHeroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4B36BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#568EF5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }}></div>

        <div className="mx-auto px-4 pb-24 md:px-8 md:pt-8 md:pb-32 relative">
          <div className="mx-auto max-w-9xl">
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-6xl text-center">
            <AnimateOnScroll>
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-sm font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20">
                Site Index
              </span>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow:
                    "1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)",
                }}
              >
                Sitemap
              </h1>
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
                A complete index of every page across the A2Z site, organized by section.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {staticSections.map((section, i) => (
              <AnimateOnScroll key={section.label} delay={i * 100}>
                <div className="card-elevated h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <h2 className="mb-4 text-xl font-bold text-foreground border-b border-[#4B36BF]/20 pb-3">
                    {section.label}
                  </h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className="text-sm text-muted-foreground hover:text-[#4B36BF] hover:underline transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {loadingPosts && (
            <div className="mt-12 flex items-center justify-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Loading articles...</span>
            </div>
          )}

          {blogSection && (
            <AnimateOnScroll>
              <div className="mt-12 card-elevated">
                <h2 className="mb-4 text-xl font-bold text-foreground border-b border-[#4B36BF]/20 pb-3">
                  {blogSection.label}
                </h2>
                <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {blogSection.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-sm text-muted-foreground hover:text-[#4B36BF] hover:underline transition-colors"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          )}
        </div>
      </section>
    </div>
  );
};

export const Head = () => (
  <Seo
    title="Sitemap"
    description="A complete index of every page on the A2Z POS website, organized by section."
    pathname="/sitemap"
    keywords="A2Z POS sitemap, site index, all pages"
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Sitemap", url: "/sitemap" }]}
  />
);

export default Sitemap;
