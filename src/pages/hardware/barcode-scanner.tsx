import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { ScanBarcode, Zap, Hand, Link2 } from "lucide-react";
import barcodeScannerHero from "@/assets/barcode-scanner-hero.png";
import barcodeScannerAbout from "@/assets/barcode-scanner-about.png";

const BarcodeScannerPage = () => (
  <SoftwarePageLayout
    label="BARCODE SCANNERS"
    heroHeadline={<>Faster Checkout,<br />Instant Age Verification,<br />Accurate Inventory</>}
    heroImage={barcodeScannerHero}
    heroImageShadow={false}
    heroSubheadline="The A2Z POS barcode scanner speeds up checkout, verifies customer IDs instantly, and keeps your inventory accurate, included with every system."
    aboutTitle="The Only Scanner Your Store Needs"
    aboutImage={barcodeScannerAbout}
    aboutText="Reliable, accurate, and built for busy stores. The A2Z barcode scanner works seamlessly with your POS so nothing slows down your checkout. Designed for all day use and fully integrated from day one, it handles high volume environments without missing a beat. Whether it's a weekday morning or a Saturday rush, your team gets consistent performance without worrying about connectivity or compatibility."
    featuresTitle="Barcode Scanner Key Features"
    features={[
      { title: "1D & 2D Barcode Support", description: "Reads all standard retail barcode formats, including damaged or small labels that cheaper scanners miss.", icon: <ScanBarcode className="h-5 w-5" /> },
      { title: "Lightning-Fast Read Speed", description: "Sub-second scanning keeps your checkout lines moving, even during peak rush hours.", icon: <Zap className="h-5 w-5" /> },
      { title: "Ergonomic Design", description: "Lightweight and comfortable for all-day use, reducing fatigue for cashiers working long shifts.", icon: <Hand className="h-5 w-5" /> },
      { title: "Seamless A2Z Integration", description: "Every scan instantly syncs with your POS and inventory system. No manual entry, no mismatches.", icon: <Link2 className="h-5 w-5" /> },
    ]}
    closingHeadline={<>One Scan.<br />Everything Updated.</>}
    closingText={<>Equip your team with scanners that<br />keep up with the pace of your store.</>}
    closingCta1="See Barcode Scanners in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Barcode Scanners — Fast, Reliable Scanning"
    description="Accurate barcode scanning built for busy stores. Fully integrated with A2Z POS for seamless checkout."
    pathname="/hardware/barcode-scanner"
    keywords="barcode scanner, retail scanner, POS scanner, product scanning"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Hardware",url:"/hardware/barcode-scanner"},{name:"Barcode Scanner",url:"/hardware/barcode-scanner"}]}
  />
);

export default BarcodeScannerPage;
