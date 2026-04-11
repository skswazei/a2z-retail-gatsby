import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Zap, Scissors, RotateCw, Plug } from "lucide-react";
import receiptPrinterHero from "@/assets/receipt-printer-hero.png";
import receiptPrinterAbout from "@/assets/receipt-printer-about.png";

const ReceiptPrinterPage = () => (
  <SoftwarePageLayout
    label="RECEIPT PRINTERS"
    heroHeadline={<>Reliable Receipt Printing<br />for Every Transaction</>}
    heroImage={receiptPrinterHero}
    heroImageShadow={false}
    heroSubheadline="Fast, dependable receipt printers that keep your checkout flowing. No paper jams, no delays, no missed receipts."
    aboutTitle="Every Transaction, Perfectly Printed"
    aboutImage={receiptPrinterAbout}
    aboutText="A receipt is the last touchpoint of every transaction. It should be fast, clear, and reliable. A2Z receipt printers are built for high-volume retail environments where every second at the register matters. With thermal printing technology and seamless software integration, every sale gets a clean, professional receipt without slowing down your line."
    featuresTitle="Receipt Printer Key Features"
    features={[
      { title: "High-Speed Thermal Printing", description: "Prints receipts in under two seconds. Customers aren't waiting around for paper.", icon: <Zap className="h-5 w-5" /> },
      { title: "Auto-Cutter Built In", description: "Clean, automatic cuts on every receipt. No tearing, no messy edges.", icon: <Scissors className="h-5 w-5" /> },
      { title: "Easy Paper Loading", description: "Drop-in paper roll design means your team spends seconds on reloads, not minutes.", icon: <RotateCw className="h-5 w-5" /> },
      { title: "Pre-Configured for A2Z", description: "Works out of the box with A2Z POS. Receipts include itemized details, tax breakdowns, and store branding.", icon: <Plug className="h-5 w-5" /> },
    ]}
    closingHeadline="Never Miss a Receipt."
    closingText={<>Keep your checkout professional and<br />your customers confident with every printed receipt.</>}
    closingCta1="See Receipt Printers in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Receipt Printers — Fast Thermal Printing"
    description="High-speed thermal receipt printers built for high-volume retail. Clean, professional receipts every time."
    pathname="/hardware/receipt-printer"
    keywords="receipt printer, thermal printer, POS printer, retail receipt"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/receipt-printer"},{name:"Receipt Printer",url:"/hardware/receipt-printer"}]}
  />
);

export default ReceiptPrinterPage;
