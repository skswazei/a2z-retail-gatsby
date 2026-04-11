import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Eye, AlertTriangle, ClipboardList, MapPin } from "lucide-react";
import inventoryHero from "@/assets/inventory-hero.png";
import inventoryAbout from "@/assets/inventory-about.png";

const Inventory = () => (
  <SoftwarePageLayout
    label="INVENTORY MANAGEMENT"
    heroHeadline={<>Inventory Management<br />Built for High-SKU Retail</>}
    heroImage={inventoryHero}
    heroSubheadline="Gain clearer visibility into stock, streamline inventory workflows, and manage your store with more confidence."
    aboutTitle="Inventory Done Right Means Higher Margins"
    aboutImage={inventoryAbout}
    aboutText="Inventory is where independent liquor and neighborhood stores lose the most margin. Running out of your most popular products, over-purchasing on slow movers, supplier invoices that don't match what was received, and manual counts that take hours. That's why A2Z's inventory module was purpose built for stores like yours."
    featuresTitle="Inventory Key Features"
    features={[
      { title: "Real-Time Stock Visibility", description: "Know exactly what's on the shelf, what's in the back, and what needs to be ordered, without a manual count. Updated with every transaction.", icon: <Eye className="h-5 w-5" /> },
      { title: "Smart Restock & Supplier Sync", description: "Get alert before stock runs low and send reorders directly to your suppliers  fewer missed windows, less manual follow-up, and smarter purchasing every time.", icon: <AlertTriangle className="h-5 w-5" /> },
      { title: "Shrinkage and Loss Tracking", description: "Identify where inventory loss is occurring, between receipt and sale, before it compounds into a margin problem.", icon: <ClipboardList className="h-5 w-5" /> },
      { title: "Multi-Location Inventory View", description: "See stock levels across all your store locations in one screen. Transfer products between locations and know exactly where every unit sits.", icon: <MapPin className="h-5 w-5" /> },
    ]}
    closingHeadline={<>Less Counting. Fewer Errors.<br />More Sales.</>}
    closingText={<>Stop worrying about stock and focus on growing your business.<br />A2Z Inventory keeps everything under control.</>}
    closingCta1="Explore Inventory Workflows"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Inventory Management — Real-Time Stock Visibility"
    description="Know exactly what's on the shelf, what needs reordering, and where your margins are. Real-time inventory tracking updated with every transaction."
    pathname="/software/inventory"
    keywords="inventory management, stock tracking, retail inventory, liquor store inventory"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/inventory"},{name:"Inventory",url:"/software/inventory"}]}
  />
);

export default Inventory;
