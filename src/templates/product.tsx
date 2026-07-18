import React, { useEffect, useState } from "react";
import Seo, { withTrailingSlash } from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { fetchProduct, Product } from "@/services/api";

interface PageContext {
  product: Product;
}

const Html = ({ html }: { html: string }) => (
  <span dangerouslySetInnerHTML={{ __html: html }} />
);

const Icon = ({ svg }: { svg: string }) => (
  <span className="inline-flex h-5 w-5 items-center justify-center" dangerouslySetInnerHTML={{ __html: svg }} />
);

const ProductTemplate = ({ pageContext }: { pageContext: PageContext }) => {
  const [product, setProduct] = useState<Product>(pageContext.product);

  useEffect(() => {
    let cancelled = false;
    fetchProduct(pageContext.product.type, pageContext.product.slug)
      .then((fresh) => {
        if (!cancelled) setProduct(fresh);
      })
      .catch(() => {
        // Keep build-time data on failure
      });
    return () => {
      cancelled = true;
    };
  }, [pageContext.product.type, pageContext.product.slug]);

  return (
    <SoftwarePageLayout
      heroHeadline={<Html html={product.hero.headline_html} />}
      heroSubheadline={product.hero.subheadline}
      heroImage={product.hero.image_url || undefined}
      heroImageAlt={product.hero.image_alt}
      heroImageShadow={product.hero.image_shadow}
      aboutTitle={<Html html={product.about.title_html} />}
      aboutImage={product.about.image_url || undefined}
      aboutImageAlt={product.about.image_alt}
      aboutText={product.about.text_html}
      featuresTitle={product.features_title || undefined}
      features={product.features.map((f) => ({
        title: f.title,
        description: f.description,
        icon: f.icon_svg ? <Icon svg={f.icon_svg} /> : undefined,
      }))}
      closingHeadline={<Html html={product.closing.headline_html} />}
      closingText={<Html html={product.closing.text_html} />}
      closingCta1={product.closing.cta1_label}
      closingCta2=""
    />
  );
};

export const Head = ({ pageContext }: { pageContext: PageContext }) => {
  const { product } = pageContext;
  const pathname = `/${product.type}/${product.slug}`;
  const typeLabels: Record<string, string> = {
    software: "Software",
    hardware: "Hardware",
    service: "Service",
  };
  const typeLabel = typeLabels[product.type] || "Product";
  const schemaType =
    product.type === "software" ? "SoftwareApplication" : product.type === "service" ? "Service" : "Product";
  const siteUrl = process.env.GATSBY_SITE_URL || "https://a2zpos.io";

  const productSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: product.title,
    description: product.seo.description || product.hero.subheadline,
    url: `${siteUrl}${withTrailingSlash(pathname)}`,
    brand: { "@type": "Brand", name: "A2Z POS" },
    manufacturer: { "@type": "Organization", name: "A2Z POS", url: siteUrl },
  };
  if (product.hero.image_url) {
    productSchema.image = product.hero.image_url;
  }
  if (product.type === "software") {
    productSchema.applicationCategory = "BusinessApplication";
    productSchema.operatingSystem = "Web, Windows, Android";
  } else if (product.type === "hardware") {
    productSchema.category = "POS Hardware";
  } else if (product.type === "service") {
    productSchema.serviceType = product.title;
    productSchema.provider = { "@type": "Organization", name: "A2Z POS", url: siteUrl };
  }

  return (
    <Seo
      title={product.seo.title}
      description={product.seo.description}
      pathname={pathname}
      keywords={product.seo.keywords}
      ogImage={product.hero.image_url || undefined}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: typeLabel, url: pathname },
        { name: product.title, url: pathname },
      ]}
      jsonLd={productSchema}
    />
  );
};

export default ProductTemplate;
