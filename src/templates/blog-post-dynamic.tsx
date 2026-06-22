import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import Seo from "@/components/Seo";
import BlogPostView from "@/components/blog/BlogPostView";
import { fetchPost, BlogPost } from "@/services/api";

interface Props {
  // Gatsby passes the reach/router location to every page, including matchPath pages.
  location?: { pathname?: string };
}

const slugFromPath = (pathname: string): string =>
  pathname
    .replace(/^\/?blog\/?/, "") // strip leading /blog/
    .replace(/\/+$/, "")        // strip trailing slashes
    .trim();

const BlogPostDynamic = ({ location }: Props) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "notfound">("loading");

  useEffect(() => {
    const pathname = location?.pathname ?? (typeof window !== "undefined" ? window.location.pathname : "");
    const slug = slugFromPath(pathname);

    // Stray paginated URLs (/blog/page/2) don't exist in client-side mode — send to the list.
    if (!slug || /^page\/\d+/.test(slug)) {
      navigate("/blog/", { replace: true });
      return;
    }

    let cancelled = false;
    setStatus("loading");
    fetchPost(slug)
      .then((data) => {
        if (cancelled) return;
        setPost(data);
        setStatus("ready");
        if (typeof document !== "undefined") {
          document.title = `${data.seo?.title || data.title} | A2Z POS`;
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("notfound");
      });

    return () => {
      cancelled = true;
    };
  }, [location?.pathname]);

  if (status === "ready" && post) {
    return <BlogPostView post={post} />;
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
      {status === "notfound" ? (
        <div>
          <h1 className="mb-3 text-2xl font-bold text-foreground">Article not found</h1>
          <p className="mb-6 text-muted-foreground">This article may have been moved or unpublished.</p>
          <a href="/blog/" className="text-sm font-semibold text-[#4B36BF] hover:underline">
            Back to all articles
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-3 text-muted-foreground">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#4B36BF]/30 border-t-[#4B36BF]" />
          Loading article…
        </div>
      )}
    </div>
  );
};

// Slug is unknown at build time, so per-post SEO isn't available in this mode.
// Provide baseline meta only.
export const Head = () => (
  <Seo
    title="Blog — A2Z POS"
    description="Tips, guides, and insights for liquor stores and neighborhood markets running on A2Z POS."
    pathname="/blog"
    canonicalPath="/blog"
  />
);

export default BlogPostDynamic;
