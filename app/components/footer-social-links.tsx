"use client";

import { useEffect, useState } from "react";

export function FooterSocialLinks() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => {
      setCopied(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hi@edgaras.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 lg:justify-end">
      <button
        type="button"
        onClick={copyEmail}
        className="cursor-pointer font-body text-sm lg:text-base tracking-wider text-white/50 hover:text-foreground transition-colors"
      >
        {copied ? "Copied!" : "Email"}
      </button>
      <a
        href="https://twitter.com/edgarasben"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-sm lg:text-base tracking-wider text-white/50 hover:text-foreground transition-colors"
      >
        X
      </a>
      <a
        href="https://www.linkedin.com/in/edgarasben/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-body text-sm lg:text-base tracking-wider text-white/50 hover:text-foreground transition-colors"
      >
        LinkedIn
      </a>
    </div>
  );
}
