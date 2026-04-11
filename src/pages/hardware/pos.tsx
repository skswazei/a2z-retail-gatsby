import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Shield, Plug, Zap, Monitor } from "lucide-react";
import posHero from "@/assets/pos-hero.png";
import posAbout from "@/assets/pos-about.png";

const PosPage = () => (
  <SoftwarePageLayout
    label="POS TERMINALS"
    heroHeadline={<>Fast, Durable Checkout<br />Hardware for Busy Stores</>}
    heroImage={posHero}
    heroImageShadow={false}
    heroSubheadline="POS hardware is built to withstand the daily demands  fast checkouts, long shifts, and heavy use, without slowing down."
    aboutTitle="Performance You Can Count On, Every Day"
    aboutImage={posAbout}
    aboutText="Your checkout counter is the heart of your operation. A2Z POS terminals are built for speed, durability, and simplicity, so your cashiers spend less time fighting the hardware and more time serving customers. Pre-configured to work seamlessly with A2Z software, every terminal is ready to ring sales, process payments, and sync inventory from day one."
    featuresTitle="POS Terminal Key Features"
    features={[
      { title: "Built to Last Durability", description: "Reliable hardware built for the realities of everyday retail.", icon: <Shield className="h-5 w-5" /> },
      { title: "Set Up in Minutes", description: "Pre-configured for A2Z software so you're up and running in minutes. No installation required.", icon: <Plug className="h-5 w-5" /> },
      { title: "Fast Transaction Processing", description: "Powerful hardware ensures zero lag during peak hours. Every scan, payment, and receipt prints without delay.", icon: <Zap className="h-5 w-5" /> },
      { title: "Touchscreen Interface", description: "Intuitive, responsive touchscreen designed for speed. Cashiers learn the system in minutes.", icon: <Monitor className="h-5 w-5" /> },
    ]}
    closingHeadline="Upgrade Your Checkout Experience."
    closingText="Give your team the hardware they can rely on, shift after shift, customer after customer."
    closingCta1="See POS Terminals in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="POS Terminals — Professional Checkout Hardware"
    description="Durable, fast POS terminals pre-configured for A2Z software. Built for speed and high-volume retail environments."
    pathname="/hardware/pos"
    keywords="POS terminal, checkout hardware, retail terminal, touch screen POS"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/pos"},{name:"POS Terminals",url:"/hardware/pos"}]}
  />
);

export default PosPage;
