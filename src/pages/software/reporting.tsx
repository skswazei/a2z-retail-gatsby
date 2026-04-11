import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { BarChart3, Users, PieChart, FileSpreadsheet } from "lucide-react";
import reportingHero from "@/assets/reporting-hero.png";
import reportingAbout from "@/assets/reporting-about.png";

const Reporting = () => (
  <SoftwarePageLayout
    label="REPORTING & ANALYTICS"
    heroHeadline={<>Understand and Control Your Business<br />with Real-Time Insights</>}
    heroImage={reportingHero}
    heroSubheadline="Use connected reporting to see sales, inventory, and store performance more clearly."
    aboutTitle="Clear Reports, Smarter Decisions"
    aboutImage={reportingAbout}
    aboutText="Most liquor and neighborhood store owners are making inventory, staffing, and pricing decisions based on gut feeling or old data. A2Z replaces guesswork with real-time clarity. See what happens everyday, what's moving, and what needs your attention, all on one screen."
    featuresTitle="Reporting Key Features"
    features={[
      { title: "Real-Time Sales Dashboard", description: "End-of-day totals, hourly sales trends, and top-performing SKUs, visible on any device, updated as transactions happen.", icon: <BarChart3 className="h-5 w-5" /> },
      { title: "Audit and Reconciliation", description: "Reconcile sales, payments, and inventory from one place. Simplify end-of-day audits and keep your books accurate without manual effort.", icon: <Users className="h-5 w-5" /> },
      { title: "Category and Margin Analysis", description: "See gross margin by product category, including spirits, wine, beer, Ready-to-Drink, tobacco, and snacks, and make smarter purchasing decisions based on actual margin data.", icon: <PieChart className="h-5 w-5" /> },
      { title: "Export Reports", description: "Export clean, formatted reports in CSV, PDF, or Excel. Ready for reconciliation, tax prep, or investor conversations without manual spreadsheet work.", icon: <FileSpreadsheet className="h-5 w-5" /> },
    ]}
    closingHeadline={<><span style={{ whiteSpace: 'nowrap' }}>Clear Insights. Better Decisions.</span><br />Higher Profits.</>}
    closingText={<>Stop guessing and start growing. A2Z Reporting gives you<br />the clarity to run your store with real confidence.</>}
    closingCta1="Explore Reporting Capabilities"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Reporting & Analytics — Actionable Store Insights"
    description="Sales trends, inventory performance, and employee metrics in one dashboard. Make smarter decisions with real-time data."
    pathname="/software/reporting"
    keywords="POS reporting, retail analytics, sales reports, inventory reports"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/reporting"},{name:"Reporting",url:"/software/reporting"}]}
  />
);

export default Reporting;
