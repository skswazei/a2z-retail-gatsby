import pageSeoData from "@/data/page-seo.json";
import wpPagesSeoData from "@/data/pages-seo.json";

export interface PageSeoEntry {
  title?: string;
  description?: string;
  keywords?: string;
  og_image?: string;
  source?: string;
  path?: string;
}

const data = pageSeoData as Record<string, PageSeoEntry>;
const wpPages = wpPagesSeoData as Record<string, PageSeoEntry>;

/**
 * Build-time SEO for a static page, sourced from WordPress
 * (A2Z Settings → SEO Settings) via src/data/page-seo.json.
 *
 * Returns an empty object for unknown keys so callers can fall back to
 * their own in-file defaults: `seo.title || "Default title"`.
 */
export const getPageSeo = (key: string): PageSeoEntry => data[key] || {};

/**
 * Build-time SEO for a WordPress `page` (legal pages), keyed by slug and
 * sourced from the page's own Yoast/AIOSEO/core SEO via src/data/pages-seo.json.
 *
 * Returns an empty object for unknown slugs so callers can fall back to
 * their own in-file defaults.
 */
export const getWpPageSeo = (slug: string): PageSeoEntry => wpPages[slug] || {};
