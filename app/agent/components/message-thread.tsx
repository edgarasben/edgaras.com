"use client";

import { cn } from "@/lib/utils";
import type { Message } from "../types";
import { AgentAvatar } from "./agent-avatar";
import { AnswerBlocks } from "./answer-blocks";
import { PromptPill } from "./prompt-pill";

const WORD_STAGGER_MS = 22;

function StreamedText({ text }: { text: string }) {
  const words = text.split(" ");

  return (
    <p className="font-body text-[15px] leading-relaxed text-fade-foreground lg:text-base">
      {words.map((word, index) => (
        <span
          key={`${index}-${word}`}
          className="inline-block animate-in fade-in fill-mode-both duration-500"
          style={{ animationDelay: `${index * WORD_STAGGER_MS}ms` }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end pl-10">
      <div className="max-w-[85%] animate-in fade-in slide-in-from-bottom-2 rounded-[20px] rounded-br-md bg-agent-surface-strong px-4 py-3 duration-300">
        <p className="font-body text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
          {text}
        </p>
      </div>
    </div>
  );
}

function AgentMessage({
  message,
  onSelectPrompt,
  busy,
}: {
  message: Message;
  onSelectPrompt: (prompt: string) => void;
  busy: boolean;
}) {
  const wordCount = message.text.split(" ").length;
  const afterText = wordCount * WORD_STAGGER_MS + 140;

  return (
    <div className="flex gap-3">
      <AgentAvatar size="md" className="mt-0.5" />

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="w-fit max-w-[46rem] animate-in fade-in slide-in-from-bottom-2 rounded-[20px] rounded-tl-md bg-agent-surface px-4 py-3 duration-300">
          <StreamedText text={message.text} />
        </div>

        {message.blocks?.length ? (
          <div
            className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500"
            style={{ animationDelay: `${afterText}ms` }}
          >
            <AnswerBlocks blocks={message.blocks} />
          </div>
        ) : null}

        {message.followUps?.length ? (
          <div
            className="flex flex-col gap-2.5 animate-in fade-in fill-mode-both duration-500"
            style={{ animationDelay: `${afterText + 160}ms` }}
          >
            <p className="font-body text-sm text-muted-foreground">
              You may also want:
            </p>
            <div className="flex flex-wrap gap-2">
              {message.followUps.map((prompt) => (
                <PromptPill
                  key={prompt}
                  label={prompt}
                  onSelect={onSelectPrompt}
                  disabled={busy}
                  className="py-2 text-[13px]"
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ThinkingIndicator() {
  return (
    <div className="flex gap-3">
      <AgentAvatar size="md" className="mt-0.5" />
      <div className="flex items-center gap-1.5 rounded-[20px] rounded-tl-md bg-agent-surface px-4 py-4">
        {[0, 1, 2].map((dot) => (
          <span
            key={dot}
            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
            style={{ animationDelay: `${dot * 140}ms` }}
          />
        ))}
        <span className="sr-only">Thinking</span>
      </div>
    </div>
  );
}

export function MessageThread({
  messages,
  busy,
  onSelectPrompt,
  className,
}: {
  messages: Message[];
  busy: boolean;
  onSelectPrompt: (prompt: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {messages.map((message) =>
        message.role === "user" ? (
          <UserMessage key={message.id} text={message.text} />
        ) : (
          <AgentMessage
            key={message.id}
            message={message}
            onSelectPrompt={onSelectPrompt}
            busy={busy}
          />
        ),
      )}
      {busy ? <ThinkingIndicator /> : null}
    </div>
  );
}
