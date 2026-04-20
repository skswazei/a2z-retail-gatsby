import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMenus, MenusResponse, MenuItem } from "@/services/api";

export interface NavLink {
  label: string;
  path: string;
  external: boolean;
  target: string;
}

export type MenuSlug =
  | "header-hardware"
  | "header-software"
  | "footer-hardware"
  | "footer-software"
  | "legal";

const MENU_SLUGS: MenuSlug[] = [
  "header-hardware",
  "header-software",
  "footer-hardware",
  "footer-software",
  "legal",
];

const emptyMenus = (): Record<MenuSlug, NavLink[]> =>
  MENU_SLUGS.reduce((acc, slug) => ({ ...acc, [slug]: [] }), {} as Record<MenuSlug, NavLink[]>);

const API_ORIGIN = (() => {
  try {
    return new URL(process.env.GATSBY_API_BASE_URL || "").origin;
  } catch {
    return "";
  }
})();

const toNavLink = (item: MenuItem): NavLink => {
  let path = item.url;
  let external = false;
  try {
    const u = new URL(item.url);
    if (API_ORIGIN && u.origin === API_ORIGIN) {
      path = u.pathname.replace(/\/$/, "") || "/";
    } else {
      external = true;
    }
  } catch {
    // Relative URL — use as-is
  }
  return {
    label: item.title,
    path,
    external,
    target: item.target === "_blank" ? "_blank" : "_self",
  };
};

const MenusContext = createContext<Record<MenuSlug, NavLink[]>>(emptyMenus());

export const MenusProvider = ({ children }: { children: React.ReactNode }) => {
  const [menus, setMenus] = useState<Record<MenuSlug, NavLink[]>>(emptyMenus());

  useEffect(() => {
    let cancelled = false;
    fetchMenus()
      .then((data: MenusResponse) => {
        if (cancelled) return;
        const next = emptyMenus();
        MENU_SLUGS.forEach((slug) => {
          const items = data[slug]?.items;
          if (items && items.length > 0) {
            next[slug] = items.map(toNavLink);
          }
        });
        setMenus(next);
      })
      .catch(() => {
        // Leave empty on failure
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <MenusContext.Provider value={menus}>{children}</MenusContext.Provider>;
};

export const useMenus = () => useContext(MenusContext);
