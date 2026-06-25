import React from "react";
import Seo from "@/components/Seo";
import { getWpPageSeo } from "@/lib/pageSeo";
import LegalPageLayout from "@/components/LegalPageLayout";

const CookiePolicy = () => (
  <LegalPageLayout slug="cookie-policy" fallbackTitle="Cookie Policy" />
);

export const Head = () => {
  const seo = getWpPageSeo("cookie-policy");
  return (
  <Seo
    title={seo.title || "Cookie Policy"}
    description={seo.description || "Learn how A2Z POS uses cookies and similar technologies on our website."}
    pathname="/cookie-policy"
    keywords={seo.keywords || "A2Z POS cookies, cookie policy, website cookies"}
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Cookie Policy", url: "/cookie-policy" }]}
  />
  );
};

export default CookiePolicy;
