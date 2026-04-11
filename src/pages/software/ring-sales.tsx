import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { ScanBarcode, WifiOff, Save, CreditCard } from "lucide-react";
import ringSalesHero from "@/assets/ring-sales-hero.png";
import ringSalesAbout from "@/assets/ring-sales-about.png";

const RingSales = () => (
  <SoftwarePageLayout
    label="RING SALES"
    heroHeadline={<>Fast, Accurate Checkout<br />Built for Your Store</>}
    heroImage={ringSalesHero}
    heroSubheadline="Ring every sale faster with integrated barcode scanning, built-in age verification, flexible payments, and compliance controls, all connected inside one platform."
    aboutTitle="The Checkout Counter That Runs Right"
    aboutImage={ringSalesAbout}
    aboutText="The checkout counter is where a liquor or neighborhood store lives or dies operationally. Long lines could lose customers. A missed ID check creates legal risk. A wrong price at the register kills trust. A2Z Ring Sales makes the moment of sale fast, accurate, and compliant, every time, without extra hardware, without a separate age verification subscription, and without manual reconciliation at end of day."
    featuresTitle="Ring Sales Key Features"
    features={[
      { title: "Barcode Scanning", description: "Add items to the cart instantly. Price, name, and department pull up automatically.", icon: <ScanBarcode className="h-5 w-5" /> },
      { title: "Payment Integration", description: "Enable fast, secure, and seamless transactions with a fully integrated payment system designed for reliable and smooth checkout experiences.", icon: <CreditCard className="h-5 w-5" /> },
      { title: "Save & Recall Order", description: "Save an order mid-transaction and recall it from any terminal. Great for busy peak hours.", icon: <Save className="h-5 w-5" /> },
      { title: "Uninterrupted Checkout", description: "When the internet drops, the register keeps running. A2Z processes transactions locally and syncs every sale automatically when the connection restores.", icon: <WifiOff className="h-5 w-5" /> },
    ]}
    closingHeadline="Faster Checkout Starts Here."
    closingText={<>Your cashiers get a system they can learn in minutes.<br />Your customers leave happy.</>}
    closingCta1="See Ring Sales in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Ring Sales — Fast, Accurate Checkout for Your Store"
    description="Ring every sale faster with barcode scanning, payment integration, age verification, and compliance controls. Built for liquor stores and neighborhood markets."
    pathname="/software/ring-sales"
    keywords="POS checkout, ring sales, barcode scanning, retail checkout, liquor store POS"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/ring-sales"},{name:"Ring Sales",url:"/software/ring-sales"}]}
  />
);

export default RingSales;
