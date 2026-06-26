import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchMenus, MenusResponse, MenuItem } from "@/services/api";
import bundledMenus from "@/data/menus.json";

export interface NavLink {
  label: string;
  path: string;
  external: boolean;
  target: string;
}

export type MenuSlug =
  | "header-hardware"
  | "header-software"
  | "header-service"
  | "footer-hardware"
  | "footer-software"
  | "footer-service"
  | "legal";

const MENU_SLUGS: MenuSlug[] = [
  "header-hardware",
  "header-software",
  "header-service",
  "footer-hardware",
  "footer-software",
  "footer-service",
  "legal",
];

const API_ORIGIN = (() => {
  try {
    return new URL(process.env.GATSBY_API_BASE_URL || "").origin;
  } catch {
    return "";
  }
})();

const toNavLink = (item: MenuItem & { object?: string; object_id?: number }): NavLink => {
  let path = item.url;
  let external = false;

  // If the URL is already a relative path (e.g. "/software/ring-sales"), take it as-is.
  if (path.startsWith("/")) {
    return {
      label: item.title,
      path,
      external: false,
      target: item.target === "_blank" ? "_blank" : "_self",
    };
  }

  try {
    const u = new URL(item.url);
    if (API_ORIGIN && u.origin === API_ORIGIN) {
      // Same-origin WP URL. Prefer the pathname; if WP is using default
      // query-string permalinks (pathname === "/" and ?post_type=slug),
      // rebuild the frontend path from the object + query.
      const cleanPath = u.pathname.replace(/\/$/, "") || "/";
      if (cleanPath === "/") {
        const objectType = item.object;
        let slug = "";
        if (objectType && u.searchParams.has(objectType)) {
          slug = u.searchParams.get(objectType) || "";
        }
        if (objectType && slug) {
          path = objectType === "page" ? `/${slug}` : `/${objectType}/${slug}`;
        } else {
          path = "/";
        }
      } else {
        path = cleanPath;
      }
    } else {
      external = true;
    }
  } catch {
    // Unknown URL shape — leave as-is
  }

  return {
    label: item.title,
    path,
    external,
    target: item.target === "_blank" ? "_blank" : "_self",
  };
};

const emptyMenus = (): Record<MenuSlug, NavLink[]> =>
  MENU_SLUGS.reduce((acc, slug) => ({ ...acc, [slug]: [] }), {} as Record<MenuSlug, NavLink[]>);

const menusFromResponse = (data: MenusResponse | Record<string, unknown>): Record<MenuSlug, NavLink[]> => {
  const out = emptyMenus();
  MENU_SLUGS.forEach((slug) => {
    const items = (data as MenusResponse)[slug]?.items;
    if (items && items.length > 0) {
      out[slug] = items.map(toNavLink);
    }
  });
  return out;
};

// Seed from the build-time JSON so SSR HTML already has links.
const initialMenus = menusFromResponse(bundledMenus as unknown as MenusResponse);

const MenusContext = createContext<Record<MenuSlug, NavLink[]>>(initialMenus);

export const MenusProvider = ({ children }: { children: React.ReactNode }) => {
  const [menus, setMenus] = useState<Record<MenuSlug, NavLink[]>>(initialMenus);

  useEffect(() => {
    let cancelled = false;
    fetchMenus()
      .then((data: MenusResponse) => {
        if (cancelled) return;
        setMenus(menusFromResponse(data));
      })
      .catch(() => {
        // Keep initial (build-time) menus on failure
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return <MenusContext.Provider value={menus}>{children}</MenusContext.Provider>;
};

export const useMenus = () => useContext(MenusContext);
