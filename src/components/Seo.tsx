import React from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  pathname?: string;
  keywords?: string;
  ogImage?: string;
  jsonLd?: Record<string, any>;
  breadcrumbs?: BreadcrumbItem[];
}

const Seo = ({ title, description, pathname = "", keywords = "", ogImage = "", jsonLd, breadcrumbs }: SeoProps) => {
  const siteUrl = process.env.GATSBY_SITE_URL || "https://a2zpos.io";
  const defaultTitle = process.env.GATSBY_DEFAULT_TITLE || "A2Z POS — All-in-One POS for Liquor Stores & Neighborhood Markets";
  const defaultDescription = process.env.GATSBY_DEFAULT_DESCRIPTION || "One platform for POS, inventory, suppliers, payments, and reporting. Built for liquor stores and neighborhood markets.";
  const defaultImage = `${siteUrl}/og-image.png`;

  const pageTitle = title || defaultTitle;
  const pageDescription = description || defaultDescription;
  const url = `${siteUrl}${pathname}`;
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
      <link rel="canonical" href={url} />

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
