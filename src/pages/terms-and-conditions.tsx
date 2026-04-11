import React from "react";
import Seo from "@/components/Seo";
import LegalPageLayout from "@/components/LegalPageLayout";

const TermsAndConditions = () => (
  <LegalPageLayout slug="terms-and-conditions" fallbackTitle="Terms and Conditions" />
);

export const Head = () => (
  <Seo
    title="Terms and Conditions"
    description="Read the terms and conditions for using A2Z POS products and services."
    pathname="/terms-and-conditions"
    keywords="A2Z POS terms, terms of service, terms and conditions"
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Terms and Conditions", url: "/terms-and-conditions" }]}
  />
);

export default TermsAndConditions;
