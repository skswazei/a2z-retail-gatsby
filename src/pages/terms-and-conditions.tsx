import React from "react";
import Seo from "@/components/Seo";
import { getWpPageSeo } from "@/lib/pageSeo";
import LegalPageLayout from "@/components/LegalPageLayout";

const TermsAndConditions = () => (
  <LegalPageLayout slug="terms-and-conditions" fallbackTitle="Terms and Conditions" />
);

export const Head = () => {
  const seo = getWpPageSeo("terms-and-conditions");
  return (
  <Seo
    title={seo.title || "Terms and Conditions"}
    description={seo.description || "Read the terms and conditions for using A2Z POS products and services."}
    pathname="/terms-and-conditions"
    keywords={seo.keywords || "A2Z POS terms, terms of service, terms and conditions"}
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Terms and Conditions", url: "/terms-and-conditions" }]}
  />
  );
};

export default TermsAndConditions;
