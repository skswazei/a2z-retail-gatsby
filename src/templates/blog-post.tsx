import React from "react";
import { Link } from "gatsby";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { BlogPost } from "@/services/api";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

interface PageContext {
  post: BlogPost;
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

const BlogPostTemplate = ({ pageContext }: { pageContext: PageContext }) => {
  const { post } = pageContext;

  return (
    <article>
      <section className="relative overflow-hidden pt-16" style={{ background: "var(--gradient-hero)" }}>
        <img src={softwareHeroWatermark} alt="" className="pointer-events-none absolute inset-0 w-full h-full object-cover watermark-fade" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#4B36BF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }}></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#568EF5]/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s" }}></div>

        <div className="mx-auto px-4 pt-12 pb-16 md:px-8 md:pt-16 md:pb-20 relative">
          <div className="mx-auto max-w-9xl">
            <Breadcrumb />
          </div>
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll>
              {post.categories.length > 0 && (
                <div className="mb-4 flex flex-wrap justify-center gap-2">
                  {post.categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-block px-3 py-1 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-xs font-semibold uppercase tracking-[0.15em] border border-[#4B36BF]/20"
                    >
                      {cat.name}
                    </span>
                  ))}
                </div>
              )}
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <h1
                className="mb-6 text-center text-3xl font-extrabold !leading-[1.2] md:text-4xl lg:text-5xl bg-gradient-to-r from-[#4B36BF] to-[#568EF5] bg-clip-text text-transparent"
                style={{
                  textShadow:
                    "1px 1px 0 rgba(75, 54, 191, 0.10), 2px 2px 0 rgba(75, 54, 191, 0.08), 3px 3px 0 rgba(75, 54, 191, 0.06), 4px 4px 0 rgba(75, 54, 191, 0.05), 5px 5px 0 rgba(75, 54, 191, 0.03), 6px 6px 10px rgba(75, 54, 191, 0.08)",
                }}
              >
                {post.title}
              </h1>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                {/* {post.author?.name && (
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {post.author.name}
                  </span>
                )} */}
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <section className="relative px-4 py-12 md:px-8 md:py-16" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
        {post.featured_image?.url && (
          <div className="mx-auto max-w-7xl">
            <AnimateOnScroll>
              <img
                src={post.featured_image.url}
                alt={post.featured_image.alt || post.title}
                className="mb-10 w-full rounded-2xl shadow-xl"
              />
            </AnimateOnScroll>
          </div>
        )}

        <div className="mx-auto max-w-6xl">
          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-headings:font-bold prose-a:text-[#4B36BF] prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.tags.length > 0 && (
            <AnimateOnScroll delay={200}>
              <div className="mt-12 border-t border-[#4B36BF]/10 pt-6">
                <span className="mr-3 text-sm font-semibold text-foreground">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="mr-2 inline-block rounded-full bg-white px-3 py-1 text-xs text-muted-foreground border border-[#4B36BF]/10"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </AnimateOnScroll>
          )}

          <AnimateOnScroll delay={300}>
            <div className="mt-12 text-center">
              <Link
                to="/blog/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#4B36BF] hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </article>
  );
};

export const Head = ({ pageContext }: { pageContext: PageContext }) => {
  const { post } = pageContext;
  const pathname = `/blog/${post.slug}`;
  const siteUrl = process.env.GATSBY_SITE_URL || "https://a2zpos.io";

  return (
    <Seo
      title={post.seo.title || post.title}
      description={post.seo.description || post.excerpt}
      pathname={pathname}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: pathname },
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.seo.description || post.excerpt,
        datePublished: post.date,
        dateModified: post.modified,
        author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
        image: post.featured_image?.url,
        url: `${siteUrl}${pathname}`,
        publisher: {
          "@type": "Organization",
          name: "A2Z POS",
          url: siteUrl,
        },
      }}
    />
  );
};

export default BlogPostTemplate;
