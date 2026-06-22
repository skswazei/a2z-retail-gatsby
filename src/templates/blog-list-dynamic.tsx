import React, { useEffect, useMemo, useState } from "react";
import Seo from "@/components/Seo";
import BlogListView from "@/components/blog/BlogListView";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchPosts, BlogPostSummary } from "@/services/api";

const PER_PAGE = 9;

const ButtonPagination = ({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}) => {
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
  const disabled = "bg-white text-muted-foreground/40 border border-[#4B36BF]/10 cursor-not-allowed";

  const go = (n: number) => {
    onChange(n);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav aria-label="Pagination" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${baseBtn} ${currentPage <= 1 ? disabled : inactive}`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
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
          <button key={p} type="button" onClick={() => go(p)} className={`${baseBtn} ${inactive}`}>
            {p}
          </button>
        )
      )}
      <button
        type="button"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${baseBtn} ${currentPage >= totalPages ? disabled : inactive}`}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
};

const BlogListDynamic = () => {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    fetchPosts()
      .then((data) => {
        if (cancelled) return;
        setPosts(Array.isArray(data) ? data : []);
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  const slice = useMemo(
    () => posts.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    [posts, page]
  );

  const emptyState =
    status === "loading" ? (
      <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#4B36BF]/30 border-t-[#4B36BF]" />
        Loading articles…
      </div>
    ) : status === "error" ? (
      <div className="py-16 text-center text-muted-foreground">Couldn't load articles. Please try again later.</div>
    ) : undefined;

  return (
    <BlogListView
      posts={slice}
      emptyState={emptyState}
      pagination={
        status === "ready" ? (
          <ButtonPagination currentPage={page} totalPages={totalPages} onChange={setPage} />
        ) : null
      }
    />
  );
};

export const Head = () => (
  <Seo
    title="Blog — Insights for Liquor Stores & Neighborhood Markets"
    description="Tips, guides, and insights for liquor stores and neighborhood markets running on A2Z POS."
    pathname="/blog"
    canonicalPath="/blog"
    keywords="A2Z POS blog, retail tips, liquor store management, POS insights"
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]}
  />
);

export default BlogListDynamic;
