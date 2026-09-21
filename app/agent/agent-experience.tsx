"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  answerFor,
  navPrompts,
  openingPrompts,
  replyDelay,
} from "./agent-content";
import { AgentDepthBackground } from "./background/agent-depth-background";
import { AgentAvatar } from "./components/agent-avatar";
import { Composer } from "./components/composer";
import { MessageThread } from "./components/message-thread";
import { PromptPill } from "./components/prompt-pill";
import { ThemeSwitch } from "./components/theme-switch";
import type { Message } from "./types";

let messageCounter = 0;
const nextId = () => {
  messageCounter += 1;
  return `m${messageCounter}`;
};

export function AgentExperience() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const ask = useCallback((prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text: trimmed },
    ]);
    setBusy(true);

    // Placeholder for the real call — swap for `fetch("/api/agent")` later.
    const answer = answerFor(trimmed);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: nextId(), role: "agent", ...answer },
      ]);
      setBusy(false);
    }, replyDelay(answer));
  }, []);

  // Keep the newest message in view while it streams in.
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on every thread change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length, busy]);

  const reset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMessages([]);
    setBusy(false);
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-background text-foreground">
      <AgentDepthBackground visible={!hasConversation} />

      {/* ── Ambient background ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_38rem_at_50%_-12%,var(--agent-glow),transparent_70%)]"
      />

      {/* ── Header ── */}
      <header className="relative z-20 shrink-0 px-4 py-4 lg:px-8 lg:py-6">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          {/* TODO: point at "/" once this becomes the home page. */}
          <Link
            href="/agent"
            onClick={reset}
            className="font-heading text-lg font-bold uppercase leading-none tracking-[0.02em] text-foreground transition-opacity hover:opacity-70 lg:text-xl"
          >
            Edgaras
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            {navPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => ask(item.prompt)}
                className="cursor-pointer rounded-full px-2 py-1.5 font-body text-[13px] text-muted-foreground transition-colors hover:bg-agent-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 sm:px-3 sm:text-sm"
              >
                {item.label}
              </button>
            ))}
            <ThemeSwitch />
          </nav>
        </div>
      </header>

      {hasConversation ? (
        /* ── Conversation ── */
        <div
          ref={scrollRef}
          className="relative z-10 min-h-0 flex-1 overflow-y-auto px-4 lg:px-8"
        >
          <div className="mx-auto max-w-4xl pt-8 pb-12">
            <MessageThread
              messages={messages}
              busy={busy}
              onSelectPrompt={ask}
            />
            <div ref={bottomRef} />
          </div>
        </div>
      ) : (
        /* ── Landing ── */
        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-8 lg:px-8">
          <div className="flex w-full max-w-lg flex-col items-center text-center">
            <AgentAvatar
              size="xl"
              priority
              className="animate-in fade-in zoom-in-95 duration-700"
            />

            <h1 className="mt-6 animate-in fade-in slide-in-from-bottom-2 font-body text-2xl font-semibold tracking-[-0.02em] text-foreground duration-700 sm:text-3xl">
              Hi, I'm Edgaras
            </h1>
            <p
              className="mt-4 animate-in fade-in slide-in-from-bottom-2 fill-mode-both font-body text-foreground duration-700 sm:text-lg text-balance"
              style={{ animationDelay: "120ms" }}
            >
              I'm a product designer and design engineer from Vilnius,
              Lithuania 🇱🇹, building digital products, tools, and businesses. What
              would you like to know?
            </p>

            <div
              className="mt-8 flex animate-in fade-in fill-mode-both flex-wrap justify-center gap-2.5 duration-700 sm:mt-10"
              style={{ animationDelay: "240ms" }}
            >
              {openingPrompts.map((prompt, index) => (
                <PromptPill
                  key={prompt}
                  label={prompt}
                  onSelect={ask}
                  className="animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500"
                  style={{ animationDelay: `${300 + index * 60}ms` }}
                />
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ── Composer ── */}
      <div className="relative z-20 shrink-0 px-4 pb-5 lg:px-8 lg:pb-8">
        {hasConversation ? (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-full h-10 bg-gradient-to-t from-background to-transparent"
          />
        ) : null}
        <div
          className={cn(
            "mx-auto w-full transition-[max-width] duration-500",
            hasConversation ? "max-w-4xl" : "max-w-2xl",
          )}
        >
          <Composer
            onSubmit={ask}
            disabled={busy}
            autoFocus={hasConversation}
            placeholder={busy ? "Thinking..." : "Ask me anything..."}
            className="animate-in fade-in fill-mode-both duration-700"
          />
        </div>
      </div>
    </div>
  );
}
