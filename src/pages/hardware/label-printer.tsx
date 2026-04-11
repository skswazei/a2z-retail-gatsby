import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Link2, Layers, Ruler, RefreshCw } from "lucide-react";
import labelPrinterHero from "@/assets/label-printer-hero.png";
import labelPrinterAbout from "@/assets/label-printer-about.png";

const LabelPrinterPage = () => (
  <SoftwarePageLayout
    label="LABEL PRINTERS"
    heroHeadline="Label Each Product on Every Shelf"
    heroImage={labelPrinterHero}
    heroImageShadow={false}
    heroSubheadline="Print accurate, clear price tags and product labels on demand. Keep your product labels accurate and your pricing consistent across the store."
    aboutTitle="The Right Price on Every Product"
    aboutImage={labelPrinterAbout}
    aboutText="Print accurate product labels directly from your inventory system and place them right on the shelf. Whether it's a price update, a new arrival, or a promotion, every label is ready in seconds, no handwriting, no mismatched tags, no pricing errors. A2Z makes sure every product on your shelf is labeled correctly, every time."
    featuresTitle="Label Printer Key Features"
    features={[
      { title: "Direct Inventory Integration", description: "Pull product names, prices, and barcodes directly from A2Z inventory.", icon: <Link2 className="h-5 w-5" /> },
      { title: "Batch & On-Demand Printing", description: "Print label in bulk or one at a time for every item.", icon: <Layers className="h-5 w-5" /> },
      { title: "Multiple Label Sizes", description: "Supports standard shelf tags, product stickers, and formats to fit your store's needs.", icon: <Ruler className="h-5 w-5" /> },
      { title: "Clear, Quality Output", description: "Sharp, smudge-resistant prints that stay readable on the shelf.", icon: <RefreshCw className="h-5 w-5" /> },
    ]}
    closingHeadline="Label It Right the First Time."
    closingText={<>Keep your shelves accurate and your team efficient<br />with on-demand label printing.</>}
    closingCta1="See Label Printers in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Label Printers — Accurate Shelf Labels On Demand"
    description="Print accurate product labels and price tags directly from your inventory system. No handwriting, no pricing errors."
    pathname="/hardware/label-printer"
    keywords="label printer, price tag printer, shelf labels, product labels"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/label-printer"},{name:"Label Printer",url:"/hardware/label-printer"}]}
  />
);

export default LabelPrinterPage;
