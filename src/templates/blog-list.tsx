import React from "react";
import { Link } from "gatsby";
import Seo from "@/components/Seo";
import Breadcrumb from "@/components/Breadcrumb";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPostSummary } from "@/services/api";
import softwareHeroWatermark from "@/assets/software-hero-watermark.svg";

interface PageContext {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
  perPage: number;
}

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

const pagePath = (n: number) => (n === 1 ? "/blog/" : `/blog/page/${n}/`);

const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  const range = (start: number, end: number) => {
    for (let i = start; i <= end; i++) pages.push(i);
  };

  if (totalPages <= 7) {
    range(1, totalPages);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("ellipsis");
    range(Math.max(2, currentPage - 1), Math.min(totalPages - 1, currentPage + 1));
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  const baseBtn =
    "inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-lg text-sm font-semibold transition-all duration-200";
  const inactive = "bg-white text-foreground border border-[#4B36BF]/15 hover:border-[#4B36BF]/40 hover:text-[#4B36BF]";
  const active = "bg-gradient-to-r from-[#4B36BF] to-[#568EF5] text-white shadow-md";
  const disabled = "bg-white text-muted-foreground/40 border border-[#4B36BF]/10 cursor-not-allowed pointer-events-none";

  const PrevLink =
    currentPage > 1 ? (
      <Link to={pagePath(currentPage - 1)} className={`${baseBtn} ${inactive}`} aria-label="Previous page">
        <ChevronLeft className="h-4 w-4" />
      </Link>
    ) : (
      <span className={`${baseBtn} ${disabled}`} aria-hidden>
        <ChevronLeft className="h-4 w-4" />
      </span>
    );

  const NextLink =
    currentPage < totalPages ? (
      <Link to={pagePath(currentPage + 1)} className={`${baseBtn} ${inactive}`} aria-label="Next page">
        <ChevronRight className="h-4 w-4" />
      </Link>
    ) : (
      <span className={`${baseBtn} ${disabled}`} aria-hidden>
        <ChevronRight className="h-4 w-4" />
      </span>
    );

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {PrevLink}
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">
            …
          </span>
        ) : p === currentPage ? (
          <span key={p} className={`${baseBtn} ${active}`} aria-current="page">
            {p}
          </span>
        ) : (
          <Link key={p} to={pagePath(p)} className={`${baseBtn} ${inactive}`}>
            {p}
          </Link>
        )
      )}
      {NextLink}
    </nav>
  );
};

const BlogList = ({ pageContext }: { pageContext: PageContext }) => {
  const { posts, currentPage, totalPages } = pageContext;
  const heading = "Blog";

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
                {heading}
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
            <div className="text-center text-muted-foreground py-16">No articles yet.</div>
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

          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </section>
    </div>
  );
};

export const Head = ({ pageContext }: { pageContext: PageContext }) => {
  const { currentPage } = pageContext;
  const pathname = currentPage === 1 ? "/blog" : `/blog/page/${currentPage}`;

  return (
    <Seo
      title="Blog — Insights for Liquor Stores & Neighborhood Markets"
      description="Tips, guides, and insights for liquor stores and neighborhood markets running on A2Z POS."
      pathname={pathname}
      canonicalPath="/blog"
      keywords="A2Z POS blog, retail tips, liquor store management, POS insights"
      breadcrumbs={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]}
    />
  );
};

export default BlogList;
