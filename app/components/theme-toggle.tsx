"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

const themeOrder = ["system", "dark", "light"] as const;

const themeLabelMap: Record<(typeof themeOrder)[number], string> = {
  system: "System",
  dark: "Dark",
  light: "Light",
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, forcedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = useMemo(() => {
    if (!theme || !themeOrder.includes(theme as (typeof themeOrder)[number])) {
      return "system" as const;
    }

    return theme as (typeof themeOrder)[number];
  }, [theme]);

  const cycleTheme = () => {
    const currentIndex = themeOrder.indexOf(currentTheme);
    const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];
    setTheme(nextTheme);
  };

  if (!mounted) {
    return (
      <span className="font-body text-sm tracking-wider text-muted-foreground lg:text-base">
        Theme: System
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={cycleTheme}
      disabled={Boolean(forcedTheme)}
      className="cursor-pointer font-body text-sm tracking-wider text-muted-foreground transition-colors hover:text-foreground disabled:cursor-default disabled:opacity-50 lg:text-base"
      aria-label={`Theme: ${themeLabelMap[currentTheme]}`}
    >
      Theme: {themeLabelMap[currentTheme]}
    </button>
  );
}
