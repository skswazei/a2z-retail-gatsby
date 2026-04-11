import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { MonitorSmartphone, Megaphone, Eye, Plug } from "lucide-react";
import customerScreenHero from "@/assets/customer-screen-hero.png";
import customerScreenAbout from "@/assets/customer-screen-about.png";

const CustomerScreenPage = () => (
  <SoftwarePageLayout
    label="CUSTOMER SCREEN"
    heroHeadline={<>Build Customer Trust with<br />Real-Time Transaction Visibility</>}
    heroImage={customerScreenHero}
    heroImageShadow={false}
    heroSubheadline="Customer-facing displays that show real time transaction details, keeping every checkout transparent."
    aboutTitle="Transparency That Builds Trust"
    aboutImage={customerScreenAbout}
    aboutText="Customers want to see what they're being charged. A2Z customer screens give shoppers a clear, real-time view of every item scanned, every discount applied, and every total calculated, right at the point of sale. It's a simple addition that builds customer confidence, and gives your store a modern, professional feel."
    featuresTitle="Customer Screen Key Features"
    features={[
      { title: "Real-Time Transaction Display", description: "Every item, price, and discount appears on screen as it's scanned. No surprises at the total.", icon: <MonitorSmartphone className="h-5 w-5" /> },
      { title: "Promotions & Branding", description: "Display your store promotions, loyalty program details, or branded messaging between transactions.", icon: <Megaphone className="h-5 w-5" /> },
      { title: "Clear, High-Resolution Screen", description: "Easy-to-read display with large fonts and high contrast, visible from a comfortable distance.", icon: <Eye className="h-5 w-5" /> },
      { title: "Seamless POS Integration", description: "Connects directly to A2Z POS with zero additional configuration. Plug in and go.", icon: <Plug className="h-5 w-5" /> },
    ]}
    closingHeadline="Give Customers Confidence at Checkout."
    closingText={<>A transparent checkout experience means<br />fewer disputes and more repeat customers.</>}
    closingCta1="See Customer Screens in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Customer Screens — Real-Time Transaction Display"
    description="Give shoppers a clear view of every item scanned, every discount applied, and every total calculated at checkout."
    pathname="/hardware/customer-screen"
    keywords="customer display, customer facing screen, POS display, checkout screen"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/customer-screen"},{name:"Customer Screen",url:"/hardware/customer-screen"}]}
  />
);

export default CustomerScreenPage;
