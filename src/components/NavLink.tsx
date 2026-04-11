import React, { forwardRef } from "react";
import { Link, GatsbyLinkProps } from "gatsby";
import { useLocation } from "@reach/router";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<GatsbyLinkProps<Record<string, unknown>>, "className" | "ref"> {
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    const location = useLocation();
    const isActive = location.pathname === to || location.pathname === `${to}/`;

    return (
      <Link
        ref={ref as any}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
