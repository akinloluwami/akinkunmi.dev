import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useState, useEffect, type ReactNode } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [convex, setConvex] = useState<ConvexReactClient | null>(null);

  useEffect(() => {
    const url = import.meta.env.PUBLIC_CONVEX_URL;
    if (url) {
      setConvex(new ConvexReactClient(url));
    }
  }, []);

  if (!convex) {
    return null;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
