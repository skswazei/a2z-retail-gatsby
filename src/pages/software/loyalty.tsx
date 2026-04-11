import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { Gift, UserCheck, MessageSquare, ScanLine } from "lucide-react";
import loyaltyHero from "@/assets/loyalty-hero.png";
import loyaltyAbout from "@/assets/loyalty-about.png";

const Loyalty = () => (
  <SoftwarePageLayout
    label="LOYALTY PROGRAM"
    heroHeadline={<>Make Every Sale<br />the Start of the Next One</>}
    heroImage={loyaltyHero}
    heroSubheadline="A built-in loyalty program that rewards customers at checkout, sends automated follow-ups, and gives you real data on who's buying what, with no separate app, no separate subscription, and no extra login."
    aboutTitle="Loyalty Programs That Grow Your Sales"
    aboutImage={loyaltyAbout}
    aboutText="Loyalty programs are now a defining factor in whether independent liquor and neighborhood stores can retain customers in a competitive market. Nearly three-quarters of neighborhood store shoppers are already enrolled in a loyalty program somewhere. 85% of shoppers say they would join a loyalty program for personalized rewards, as per Ebbo's 2023 Loyalty Amplifiers Data Study. A2Z Loyalty is built into the platform, not a separate subscription or system to manage."
    featuresTitle="Loyalty Program Key Features"
    features={[
      { title: "Build Your Own Loyalty Program", description: "Give points for every dollar spent, every visit, or any rule you set. Change the rules anytime, no tech help needed.", icon: <Gift className="h-5 w-5" /> },
      { title: "Auto-Remind Customers to Come Back", description: "Send texts or notifications about points and rewards automatically. Set it once and it runs on its own.", icon: <MessageSquare className="h-5 w-5" /> },
      { title: "See Who Your Best Customers Are", description: "See what they buy, how often they visit, and which items are selling most.", icon: <UserCheck className="h-5 w-5" /> },
      { title: "Run Deals Without Lifting a Finger", description: "Schedule promotions and exclusive offers to go out automatically. Target the right customers at the right time.", icon: <ScanLine className="h-5 w-5" /> },
    ]}
    closingHeadline={<>More Rewards. More Visits.<br />More Revenue.</>}
    closingText="Customers who feel rewarded come back more often. A2Z Loyalty makes building that relationship automatic and effortless."
    closingCta1="See Loyalty in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Loyalty Program — Reward & Retain Your Customers"
    description="Built-in loyalty that rewards customers at checkout, sends automated follow-ups, and gives you real data on purchasing behavior."
    pathname="/software/loyalty"
    keywords="loyalty program, customer rewards, retail loyalty, customer retention"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/loyalty"},{name:"Loyalty",url:"/software/loyalty"}]}
  />
);

export default Loyalty;
