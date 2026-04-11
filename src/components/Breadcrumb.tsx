import React from "react";
import { Link } from "gatsby";
import { useLocation } from "@reach/router";

interface BreadcrumbItem {
  label: string;
  isHome?: boolean;
}

const formatBreadcrumbLabel = (segment: string): string => {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const paths = pathname.replace(/\/$/, "").split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Home", isHome: true }];
  paths.forEach((path, index) => {
    const label = formatBreadcrumbLabel(path);
    breadcrumbs.push({ label: index === paths.length - 1 ? label.toLowerCase() : label });
  });
  return breadcrumbs;
};

const Breadcrumb = () => {
  const location = useLocation();
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  return (
    <nav className="mb-6 text-left" aria-label="Breadcrumb">
      <ol className="inline-flex items-center gap-2 text-sm bg-[#F0F1FF]/10 backdrop-blur-xl border border-solid border-[#747ED1]/20 rounded-xl py-2 px-4">
        {breadcrumbs.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-foreground"
              >
                <path
                  d="M6 12L10 8L6 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {item.isHome ? (
              <Link
                to="/"
                className="text-foreground transition-colors duration-200 hover:text-[#4B36BF]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground/60">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
