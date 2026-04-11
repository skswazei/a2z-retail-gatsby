import React from "react";
import Seo from "@/components/Seo";
import LegalPageLayout from "@/components/LegalPageLayout";

const PrivacyPolicy = () => (
  <LegalPageLayout slug="privacy-policy" fallbackTitle="Privacy Policy" />
);

export const Head = () => (
  <Seo
    title="Privacy Policy"
    description="Learn how A2Z POS collects, uses, and protects your personal and business data. Read our full privacy policy."
    pathname="/privacy-policy"
    keywords="A2Z POS privacy policy, data protection, personal data"
    breadcrumbs={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/privacy-policy" }]}
  />
);

export default PrivacyPolicy;
