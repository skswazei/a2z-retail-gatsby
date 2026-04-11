import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { DemoModalProvider } from "./DemoModal";
import "../styles/global.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DemoModalProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-10">{children}</main>
        <Footer />
      </div>
    </DemoModalProvider>
  );
};

export default Layout;
