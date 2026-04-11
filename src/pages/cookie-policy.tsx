import React from "react";
import Seo from "@/components/Seo";
import LegalPageLayout from "@/components/LegalPageLayout";

const CookiePolicy = () => (
  <LegalPageLayout slug="cookie-policy" fallbackTitle="Cookie Policy" />
);

export const Head = () => (
  <Seo
    title="Cookie Policy"
    description="Learn how A2Z POS uses cookies and similar technologies on our website."
    pathname="/cookie-policy"
    keywords="A2Z POS cookies, cookie policy, website cookies"
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Cookie Policy", url: "/cookie-policy" }]}
  />
);

export default CookiePolicy;
