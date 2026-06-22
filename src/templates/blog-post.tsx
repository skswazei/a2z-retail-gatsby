import React from "react";
import Seo from "@/components/Seo";
import BlogPostView from "@/components/blog/BlogPostView";
import { BlogPost } from "@/services/api";

interface PageContext {
  post: BlogPost;
}

const BlogPostTemplate = ({ pageContext }: { pageContext: PageContext }) => (
  <BlogPostView post={pageContext.post} />
);

export const Head = ({ pageContext }: { pageContext: PageContext }) => {
  const { post } = pageContext;
  const pathname = `/blog/${post.slug}`;
  const siteUrl = process.env.GATSBY_SITE_URL || "https://a2zpos.io";

  return (
    <Seo
      title={post.seo.title || post.title}
      description={post.seo.description || post.excerpt}
      keywords={post.seo.keywords}
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
