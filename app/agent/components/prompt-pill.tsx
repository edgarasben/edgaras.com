"use client";

import { cn } from "@/lib/utils";

export function PromptPill({
  label,
  onSelect,
  disabled,
  className,
  style,
}: {
  label: string;
  onSelect: (prompt: string) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(label)}
      style={style}
      className={cn(
        "cursor-pointer rounded-full bg-agent-surface px-4 py-2.5",
        "font-body text-sm text-fade-foreground whitespace-nowrap",
        "transition-[color,background-color,transform] duration-200",
        "hover:-translate-y-px hover:bg-agent-surface-strong hover:text-foreground",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
    >
      {label}
    </button>
  );
}
