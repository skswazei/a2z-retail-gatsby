import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Loader2, AlertCircle } from "lucide-react";
import { fetchSitemap, SitemapResponse } from "@/services/api";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const WP_BASE = process.env.GATSBY_API_BASE_URL ?? "";

const toLocalPath = (link: string): string => {
  if (!link) return "/";
  if (WP_BASE && link.startsWith(WP_BASE)) {
    const path = link.slice(WP_BASE.length);
    return path.startsWith("/") ? path : `/${path}`;
  }
  try {
    const url = new URL(link);
    return url.pathname + url.search + url.hash;
  } catch {
    return link;
  }
};

const Sitemap = () => {
  const [data, setData] = useState<SitemapResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSitemap()
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load sitemap"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
        <img src={softwareHeroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4B36BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#568EF5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }}></div>

        <div className="mx-auto px-4 pt-12 pb-24 md:px-8 md:pt-16 md:pb-32 relative">
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
          {loading && (
            <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading sitemap...</span>
            </div>
          )}

          {error && !loading && (
            <div className="card-elevated mx-auto max-w-md text-center">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-red-500" />
              <p className="text-sm text-foreground">{error}</p>
            </div>
          )}

          {data && !loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(data).map(([type, group], i) => (
                <AnimateOnScroll key={type} delay={i * 100}>
                  <div className="card-elevated h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <h2 className="mb-4 text-xl font-bold text-foreground border-b border-[#4B36BF]/20 pb-3">
                      {group.label}
                    </h2>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.id}>
                          <Link
                            to={toLocalPath(item.link)}
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
