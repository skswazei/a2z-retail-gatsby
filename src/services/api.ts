const API_BASE_URL = process.env.GATSBY_API_BASE_URL;

export interface ContactFormData {
  full_name: string;
  store_name: string;
  phone: string;
  email: string;
  store_type: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z-contact/v1/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit form");
  }

  return result;
};

export interface ThemeOptions {
  contact: { email: string; phone: string };
  auth_links: { login: string };
  social: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    youtube: string;
  };
}

export interface MenuItem {
  id: number;
  title: string;
  url: string;
  target: string;
  type: string;
  order: number;
}

export interface Menu {
  id: number;
  name: string;
  slug: string;
  items: MenuItem[];
}

export type MenusResponse = Record<string, Menu>;

export type ProductType = "software" | "hardware" | "service";

export interface ProductFeature {
  title: string;
  description: string;
  icon_svg: string;
}

export interface Product {
  id: number;
  slug: string;
  type: ProductType;
  title: string;
  hero: {
    headline_html: string;
    subheadline: string;
    image_url: string;
    image_alt: string;
    image_shadow: boolean;
  };
  about: {
    title_html: string;
    text_html: string;
    image_url: string;
    image_alt: string;
  };
  features_title: string;
  features: ProductFeature[];
  closing: {
    headline_html: string;
    text_html: string;
    cta1_label: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    source?: "yoast" | "aioseo" | "custom";
  };
}

export const fetchProducts = async (type: ProductType): Promise<Product[]> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/${type}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type} products`);
  }
  return response.json();
};

export const fetchProduct = async (type: ProductType, slug: string): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/${type}/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${type}/${slug}`);
  }
  return response.json();
};

export const fetchMenus = async (): Promise<MenusResponse> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/menus`);
  if (!response.ok) {
    throw new Error("Failed to fetch menus");
  }
  return response.json();
};

export const fetchThemeOptions = async (): Promise<ThemeOptions> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/theme-options`);
  if (!response.ok) {
    throw new Error("Failed to fetch theme options");
  }
  return response.json();
};

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPostSummary {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featured_image: {
    url: string;
    width: number;
    height: number;
    alt: string;
  } | null;
  categories: BlogCategory[];
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  modified: string;
  author: {
    name: string;
    avatar: string;
  } | null;
  tags: BlogCategory[];
  seo: {
    title: string;
    description: string;
    keywords?: string;
    source?: "yoast" | "aioseo" | "core";
  };
}

export const fetchPosts = async (): Promise<BlogPostSummary[]> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

export const fetchPost = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/posts/${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${slug}`);
  }
  return response.json();
};

export interface SitemapItem {
  id: number;
  title: string;
  slug: string;
  link: string;
  date: string;
}

export interface SitemapGroup {
  label: string;
  items: SitemapItem[];
}

export type SitemapResponse = Record<string, SitemapGroup>;

export const fetchSitemap = async (): Promise<SitemapResponse> => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z/v1/sitemap`);
  if (!response.ok) {
    throw new Error("Failed to fetch sitemap");
  }
  return response.json();
};

export const submitSubscribe = async (email: string) => {
  const response = await fetch(`${API_BASE_URL}/wp-json/a2z-subscribe/v1/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Could not subscribe");
  }

  return result;
};
