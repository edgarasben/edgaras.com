"use client";

import { ArrowUp } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** py-2.5 + leading-6: anything taller than this has wrapped to a second row. */
const SINGLE_ROW_HEIGHT = 48;

export function Composer({
  onSubmit,
  disabled,
  autoFocus,
  placeholder = "Ask me anything...",
  className,
}: {
  onSubmit: (value: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const [multiline, setMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Grow with the content, up to ~5 lines.
  // biome-ignore lint/correctness/useExhaustiveDependencies: re-measure whenever the value changes
  useLayoutEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const content = el.scrollHeight;
    el.style.height = `${Math.min(content, 132)}px`;
    setMultiline(content > SINGLE_ROW_HEIGHT);
  }, [value]);

  const send = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    setValue("");
    onSubmit(trimmed);
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
      className={cn(
        "group flex w-full gap-2 bg-agent-surface p-2 pl-5",
        " backdrop-blur-xl",
        "transition-colors focus-within:bg-agent-surface-strong",
        multiline ? "items-end rounded-[26px]" : "items-center rounded-full",
        className,
      )}
    >
      <label htmlFor="agent-composer" className="sr-only">
        Ask Edgaras anything
      </label>
      <textarea
        id="agent-composer"
        ref={textareaRef}
        rows={1}
        // biome-ignore lint/a11y/noAutofocus: the composer is the primary control of this page
        autoFocus={autoFocus}
        value={value}
        placeholder={placeholder}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            send();
          }
        }}
        className={cn(
          "w-full resize-none bg-transparent py-2.5 font-body text-[15px] leading-6 text-foreground",
          "placeholder:text-muted-foreground focus:outline-none",
        )}
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Send message"
        className={cn(
          "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-all duration-200",
          canSend
            ? "bg-foreground text-background hover:scale-105"
            : "bg-agent-surface-strong text-muted-foreground",
          "disabled:cursor-default disabled:hover:scale-100",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60",
        )}
      >
        <ArrowUp className="size-4" />
      </button>
    </form>
  );
}
