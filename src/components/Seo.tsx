import React from "react";
import bundledThemeOptions from "@/data/theme-options.json";

interface BreadcrumbItem {
  name: string;
  url: string;
}

type ThemeOptionsShape = {
  analytics?: {
    google_site_verification?: string;
    gtag_id?: string;
  };
};

const analytics = (bundledThemeOptions as ThemeOptionsShape).analytics || {};
const verificationRaw = (analytics.google_site_verification || "").trim();
const gtagRaw = (analytics.gtag_id || "").trim();

// User pastes the full <meta ... /> — pull out the content value.
const verificationCode = (() => {
  if (!verificationRaw) return "";
  const m = verificationRaw.match(/content\s*=\s*["']([^"']+)["']/i);
  return m ? m[1] : verificationRaw; // fallback: raw value if they pasted just the token
})();

// User pastes the full gtag snippet (external + inline script).
// Extract the measurement ID and the inline init body.
const gtagParsed = (() => {
  if (!gtagRaw) return null;
  const idMatch = gtagRaw.match(/[?&]id=([A-Za-z0-9_-]+)/) || gtagRaw.match(/\b(G-[A-Za-z0-9_-]+)\b/);
  const id = idMatch ? (idMatch[1].startsWith("G-") ? idMatch[1] : idMatch[1]) : "";
  const inlineMatch = gtagRaw.match(/<script[^>]*>([\s\S]*?)<\/script\s*>/gi);
  let inline = "";
  if (inlineMatch) {
    for (const block of inlineMatch) {
      if (/src\s*=/i.test(block)) continue; // skip the external loader
      const innerMatch = block.match(/<script[^>]*>([\s\S]*?)<\/script\s*>/i);
      if (innerMatch) { inline = innerMatch[1].trim(); break; }
    }
  }
  if (!id && !inline) return null;
  return { id, inline };
})();

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  canonicalPath?: string;
  keywords?: string;
  ogImage?: string;
  jsonLd?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

const Seo = ({ title, description, pathname = "", canonicalPath, keywords = "", ogImage = "", jsonLd, breadcrumbs }: SeoProps) => {
  const siteUrl = process.env.GATSBY_SITE_URL || "https://a2zpos.io";
  const defaultTitle = process.env.GATSBY_DEFAULT_TITLE || "A2Z POS — All-in-One POS for Liquor Stores & Neighborhood Markets";
  const defaultDescription = process.env.GATSBY_DEFAULT_DESCRIPTION || "One platform for POS, inventory, suppliers, payments, and reporting. Built for liquor stores and neighborhood markets.";
  const defaultImage = `${siteUrl}/og-image.png`;

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const url = `${siteUrl}${pathname}`;
  const canonicalUrl = `${siteUrl}${canonicalPath ?? pathname}`;
  const fullTitle = pageTitle.includes("A2Z") ? pageTitle : `${pageTitle} | A2Z POS`;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "A2Z POS",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "A2Z POS",
    "url": siteUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web, Windows, Android",
    "description": "All-in-one POS platform for liquor stores and neighborhood markets.",
    "brand": {
      "@type": "Brand",
      "name": "A2Z POS"
    },
    "provider": {
      "@type": "Organization",
      "name": "A2Z POS",
      "url": siteUrl,
      "logo": defaultImage,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-833-229-7677",
        "contactType": "sales",
        "email": "contact@a2zpos.io",
        "availableLanguage": "English"
      }
    }
  };

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${siteUrl}${item.url}`
    }))
  } : null;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {verificationCode && (
        <meta name="google-site-verification" content={verificationCode} />
      )}
      {gtagParsed?.id && (
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagParsed.id}`} />
      )}
      {gtagParsed && (gtagParsed.inline || gtagParsed.id) && (
        <script
          dangerouslySetInnerHTML={{
            __html: gtagParsed.inline
              || `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gtagParsed.id}');`,
          }}
        />
      )}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:site_name" content="A2Z POS" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={ogImage || defaultImage} />

      {/* WebSite Schema — only on homepage */}
      {pathname === "/" && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* Organization/SoftwareApp Schema — only on homepage */}
      {pathname === "/" && (
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      )}

      {/* BreadcrumbList Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {/* Custom JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </>
  );
};

export default Seo;
