"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function RouteThemeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col",
        isHomePage && "dark bg-background text-foreground",
      )}
    >
      {children}
    </div>
  );
}
