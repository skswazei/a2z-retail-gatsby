import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchThemeOptions, ThemeOptions } from "@/services/api";

const defaultOptions: ThemeOptions = {
  contact: { email: "", phone: "" },
  auth_links: { login: "" },
  social: {
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  },
};

const ThemeOptionsContext = createContext<ThemeOptions>(defaultOptions);

export const ThemeOptionsProvider = ({ children }: { children: React.ReactNode }) => {
  const [options, setOptions] = useState<ThemeOptions>(defaultOptions);

  useEffect(() => {
    let cancelled = false;
    fetchThemeOptions()
      .then((data) => {
        if (cancelled) return;
        setOptions({
          contact: {
            email: data.contact?.email ?? "",
            phone: data.contact?.phone ?? "",
          },
          auth_links: {
            login: data.auth_links?.login ?? "",
          },
          social: {
            facebook: data.social?.facebook ?? "",
            twitter: data.social?.twitter ?? "",
            linkedin: data.social?.linkedin ?? "",
            instagram: data.social?.instagram ?? "",
            youtube: data.social?.youtube ?? "",
          },
        });
      })
      .catch(() => {
        // Keep defaults on failure
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <ThemeOptionsContext.Provider value={options}>{children}</ThemeOptionsContext.Provider>;
};

export const useThemeOptions = () => useContext(ThemeOptionsContext);

export const telHref = (phone: string) => `tel:+${phone.replace(/\D/g, "")}`;
export const mailHref = (email: string) => `mailto:${email}`;
