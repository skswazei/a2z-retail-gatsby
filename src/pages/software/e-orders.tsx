import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Smartphone, Globe, LayoutDashboard, TrendingUp } from "lucide-react";
import eordersHero from "@/assets/eorders-hero.png";
import eordersAbout from "@/assets/eorders-about.png";

const EOrders = () => (
  <SoftwarePageLayout
    label="E-ORDERS & DELIVERY"
    heroHeadline={<>Bring Online Orders<br />Into Your Store</>}
    heroImage={eordersHero}
    heroSubheadline="Expand beyond the physical counter with connected ordering channels that support modern retail growth."
    aboutTitle="Manage Every Online Order in One Place"
    aboutImage={eordersAbout}
    aboutText="Delivery and online ordering have moved from 'nice to have' to must have for liquor and neighborhood stores. Retailers on delivery platforms are unlocking new revenue without increasing overhead. Store owners report struggling with delivery orders on separate tablets, manual POS reconciliation, and no single view of all incoming orders. That's exactly what A2Z POS was designed for."
    featuresTitle="E-Orders Key Features"
    features={[
      { title: "Delivery App Integration", description: "Connect to major platforms like Uber Eats, DoorDash, and Grubhub. All incoming delivery orders route to one screen, not separate tablets.", icon: <Smartphone className="h-5 w-5" /> },
      { title: "Online Ordering", description: "Give customers the ability to order directly from your store, pickup or delivery, without needing a third-party marketplace for every order.", icon: <Globe className="h-5 w-5" /> },
      { title: "Centralized Order Management", description: "One dashboard for in-store sales, delivery and online orders. Inventory updates in real time across all channels.", icon: <LayoutDashboard className="h-5 w-5" /> },
      { title: "Channel Performance Reporting", description: "See exactly how much revenue is coming from each channel, how it's trending, and how it compares to in-store sales.", icon: <TrendingUp className="h-5 w-5" /> },
    ]}
    closingHeadline={<>More Orders. Less Hassle.<br />Better Control.</>}
    closingText={<>Stop juggling devices and apps. A2Z E-Orders keeps everything<br />organized so you can focus on serving customers and growing your revenue.</>}
    closingCta1="See How A2Z Supports Digital Ordering"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="E-Orders & Delivery — Manage Online Orders in One Place"
    description="Connect to UberEats, DoorDash, GrubHub and more. All delivery orders on one screen, synced with your POS and inventory."
    pathname="/software/e-orders"
    keywords="online ordering, delivery integration, UberEats POS, DoorDash integration"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/e-orders"},{name:"E-Orders",url:"/software/e-orders"}]}
  />
);

export default EOrders;
