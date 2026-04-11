import React from "react";
import Seo from "@/components/Seo";
import SoftwarePageLayout from "@/components/SoftwarePageLayout";
import { CalendarDays, ShieldCheck, DollarSign, BarChart3 } from "lucide-react";
import employeesHero from "@/assets/employees-hero.png";
import employeesAbout from "@/assets/employees-about.png";

const Employees = () => (
  <SoftwarePageLayout
    label="EMPLOYEES"
    heroHeadline={<>Manage Your Team<br />Without the Paperwork</>}
    heroImage={employeesHero}
    heroSubheadline="Digital onboarding, shift scheduling, role-based register access, and performance tracking  all from one platform."
    aboutTitle="Employee Management Made Easy"
    aboutImage={employeesAbout}
    aboutText="Independent liquor and neighborhood stores run lean teams across multiple shifts, often with seasonal turnover and frequent new hires. Most owners manage this through a mix of paper timesheets, printed onboarding forms, and manual scheduling, all disconnected from the POS. A2Z's Employee module brings staffing directly into store operations, so onboarding, scheduling, access control, and performance tracking live in one place and update in real time."
    featuresTitle="Employee Management Key Features"
    features={[
      { title: "Shift Scheduling", description: "Build weekly schedules by role in minutes. Clock-in and clock-out ties to each shift so hours are automatically tracked.", icon: <CalendarDays className="h-5 w-5" /> },
      { title: "Role-Based Access Control", description: "Assign permissions and access levels based on employee roles to enhance security.", icon: <ShieldCheck className="h-5 w-5" /> },
      { title: "Payroll Settings", description: "Hours and shift records are captured inside A2Z. Configure rates and pay periods once. Payroll processing becomes a review-and-approve step, not a data-entry task.", icon: <DollarSign className="h-5 w-5" /> },
      { title: "Employee Performance Tracking", description: "See sales volume, discount usage, and void activity per employee. Flag unusual register activity and make staffing decisions based on real data.", icon: <BarChart3 className="h-5 w-5" /> },
    ]}
    closingHeadline={<><span style={{ whiteSpace: 'nowrap' }}>Less Paperwork. Better Control.</span><br />Stronger Team.</>}
    closingText="Spend less time managing staff and more time growing your business. A2Z Employees module keeps your team organized and your store running smoothly."
    closingCta1="See the Employees Module in Action"
    closingCta2="Schedule My Retail Strategy Call"
  />
);

export const Head = () => (
  <Seo
    title="Employee Management — Scheduling, Access Control & Performance"
    description="Digital onboarding, shift scheduling, role-based access, and performance tracking for your retail team. All from one platform."
    pathname="/software/employees"
    keywords="employee management, shift scheduling, retail staff management, POS employee tracking"
    breadcrumbs={[{name:"Home",url:"/"},{name:"Software",url:"/software/employees"},{name:"Employees",url:"/software/employees"}]}
  />
);

export default Employees;
