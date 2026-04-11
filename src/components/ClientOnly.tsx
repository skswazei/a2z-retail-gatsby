import React, { useState, useEffect, ReactNode } from "react";

const ClientOnly = ({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
};

export default ClientOnly;
