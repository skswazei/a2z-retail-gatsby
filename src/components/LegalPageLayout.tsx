import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

interface LegalPageLayoutProps {
  slug: string;
  fallbackTitle: string;
}

const LegalPageLayout = ({ slug, fallbackTitle }: LegalPageLayoutProps) => {
  const [title, setTitle] = useState(fallbackTitle);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/wp-json/wp/v2/pages?slug=${slug}`);
        const data = await res.json();
        if (data && data.length > 0) {
          setTitle(data[0].title.rendered);
          setContent(data[0].content.rendered);
        } else {
          setError("Content not found.");
        }
      } catch {
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [slug]);

  return (
    <div>
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
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-4 text-4xl font-extrabold !leading-[1.2] md:text-5xl lg:text-6xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow: '1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06)'
                }}
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div className="flex justify-center mb-6">
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24 bg-white">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />

        <div className="mx-auto max-w-4xl relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-border">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block h-8 w-8 border-4 border-[#4B36BF]/30 border-t-[#4B36BF] rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-500">Loading content...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
              <div
                className="legal-content"
                style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: content }}
              />
          )}
        </div>
      </section>
    </div>
  );
};

export default LegalPageLayout;
