import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { CreditCard, Zap, ShieldCheck, Link2 } from "lucide-react";
import creditCardReaderHero from "@/assets/credit-card-reader-hero.png";
import creditCardReaderAbout from "@/assets/credit-card-reader-about.png";

const CreditCardReaderPage = () => (
  <SoftwarePageLayout
    label="CREDIT CARD READER"
    heroHeadline={<>Secure, Fast Payment Processing<br />at Every Terminal</>}
    heroImage={creditCardReaderHero}
    heroImageShadow={false}
    heroSubheadline="Accept every payment method your customers use, including credit, debit, tap, chip, and mobile wallets, with hardware built for speed and security."
    aboutTitle="Every Payment, Your Way"
    aboutImage={creditCardReaderAbout}
    aboutText="Your customers pay how they want, including credit cards, debit cards, Apple Pay, Google Pay, contactless tap. A2Z credit card readers handle every payment method seamlessly, with fast processing speeds and security built in. No missed sales because you couldn't accept a payment type, and no security risks from outdated hardware."
    featuresTitle="Credit Card Reader Key Features"
    features={[
      { title: "All Payment Methods Supported", description: "Credit, debit, chip, tap, swipe, Apple Pay, Google Pay. Accept whatever your customer hands you.", icon: <CreditCard className="h-5 w-5" /> },
      { title: "Fast Processing Speed", description: "Transactions complete in seconds, keeping your checkout lines moving during peak hours.", icon: <Zap className="h-5 w-5" /> },
      { title: "Compliant Security", description: "End-to-end encryption and compliance to protect your store and your customers' data.", icon: <ShieldCheck className="h-5 w-5" /> },
      { title: "Integrated with A2Z POS", description: "Payments sync automatically with your POS and reporting. No manual reconciliation at end of day.", icon: <Link2 className="h-5 w-5" /> },
    ]}
    closingHeadline="Accept Every Payment With Confidence."
    closingText={<>Secure, fast, and compatible with every payment method,<br />so you never lose a sale.</>}
    closingCta1="See Card Readers in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Credit Card Readers — Accept Every Payment Method"
    description="Accept credit, debit, Apple Pay, Google Pay, and contactless payments. Fast processing with security built in."
    pathname="/hardware/credit-card-reader"
    keywords="credit card reader, payment terminal, card reader, contactless payment"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/credit-card-reader"},{name:"Credit Card Reader",url:"/hardware/credit-card-reader"}]}
  />
);

export default CreditCardReaderPage;
