"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const emailCharCodes = [
  104, 105, 64, 101, 100, 103, 97, 114, 97, 115, 46, 99, 111, 109,
];

function getEmailAddress() {
  return String.fromCharCode(...emailCharCodes);
}

export function FooterSocialLinks() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const showThemeToggle = pathname !== "/";

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(getEmailAddress());
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
      {showThemeToggle ? <ThemeToggle /> : null}
      <button
        type="button"
        onClick={copyEmail}
        className="cursor-pointer font-body text-sm lg:text-base tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? "Copied!" : "Email"}
      </button>
      <a
        href="https://twitter.com/edgarasben"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-base lg:text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        X
      </a>
      <a
        href="https://www.linkedin.com/in/edgarasben/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-base lg:text-lg tracking-wider text-muted-foreground hover:text-foreground transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
}
