import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { DemoModalProvider } from "./DemoModal";
import { ThemeOptionsProvider } from "./ThemeOptionsProvider";
import { MenusProvider } from "./MenusProvider";
import "../styles/global.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeOptionsProvider>
      <MenusProvider>
        <DemoModalProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-10">{children}</main>
            <Footer />
          </div>
        </DemoModalProvider>
      </MenusProvider>
    </ThemeOptionsProvider>
  );
};

export default Layout;
