import React from "react";
import { Link } from "gatsby";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Calendar, ArrowRight } from "lucide-react";
import { BlogPostSummary } from "@/services/api";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
  }
};

interface BlogListViewProps {
  posts: BlogPostSummary[];
  /** Pagination UI: <Link>-based (static) or <button>-based (dynamic). */
  pagination?: React.ReactNode;
  /** Optional override for the empty / loading state. */
  emptyState?: React.ReactNode;
}

/**
 * Presentational blog-list layout shared by the static template
 * (blog-list.tsx) and the client-side dynamic template (blog-list-dynamic.tsx).
 */
const BlogListView = ({ posts, pagination, emptyState }: BlogListViewProps) => (
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
              Insights & Resources
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
              Blog
            </h1>
            <div className="flex justify-center mb-6">
              <div className="h-1 w-16 rounded-full bg-gradient-to-r from-[#4B36BF] to-[#568EF5]"></div>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <p className="body-text mx-auto max-w-lg text-lg md:text-xl">
              Tips, guides, and insights for liquor stores and neighborhood markets running on A2Z POS.
            </p>
          </AnimateOnScroll>
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden px-4 py-16 md:px-8 md:py-24" style={{ background: "linear-gradient(to bottom right, #EDE9FF, #F5F3FF, #F8F7FF)" }}>
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#4B36BF]/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {posts.length === 0 ? (
          emptyState ?? <div className="text-center text-muted-foreground py-16">No articles yet.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <AnimateOnScroll key={post.id} delay={i * 50}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  {post.featured_image?.url && (
                    <div className="aspect-video w-full overflow-hidden bg-[#4B36BF]/5">
                      <img
                        src={post.featured_image.url}
                        alt={post.featured_image.alt || post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    {post.categories.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1.5">
                        {post.categories.slice(0, 2).map((cat) => (
                          <span
                            key={cat.id}
                            className="inline-block px-2 py-0.5 rounded-full bg-[#4B36BF]/10 text-[#4B36BF] text-[10px] font-semibold uppercase tracking-wider"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="mb-2 text-lg font-bold text-foreground group-hover:text-[#4B36BF] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.date)}
                      </span>
                      <span className="flex items-center gap-1 text-[#4B36BF] font-semibold group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        )}

        {pagination}
      </div>
    </section>
  </div>
);

export default BlogListView;
