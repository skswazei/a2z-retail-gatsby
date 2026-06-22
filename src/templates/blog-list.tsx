import React from "react";
import { Link } from "gatsby";
import Seo from "@/components/Seo";
import BlogListView from "@/components/blog/BlogListView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlogPostSummary } from "@/services/api";

interface PageContext {
  posts: BlogPostSummary[];
  currentPage: number;
  totalPages: number;
  perPage: number;
}

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
  return (
    <BlogListView
      posts={posts}
      pagination={<Pagination currentPage={currentPage} totalPages={totalPages} />}
    />
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
