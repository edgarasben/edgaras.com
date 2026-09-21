import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Block, CardTone, ProjectCard } from "../types";

/** Same-origin routes and mailto: links stay in the current tab. */
function isExternal(href: string) {
  return href.startsWith("http");
}

const toneGradients: Record<CardTone, string> = {
  violet: "from-violet-500/40 via-indigo-500/15 to-transparent",
  sky: "from-sky-400/40 via-cyan-500/15 to-transparent",
  amber: "from-amber-400/40 via-orange-500/15 to-transparent",
  emerald: "from-emerald-400/40 via-teal-500/15 to-transparent",
  rose: "from-rose-400/40 via-pink-500/15 to-transparent",
};

function ProjectTile({ item }: { item: ProjectCard }) {
  const inner = (
    <>
      <div
        className={cn(
          "relative flex aspect-[4/3] shrink-0 items-end overflow-hidden bg-neutral-900 bg-gradient-to-br p-4",
          toneGradients[item.tone],
        )}
      >
        <span className="font-heading text-5xl font-bold uppercase leading-none text-white/15 transition-transform duration-500 group-hover:scale-110">
          {item.title.slice(0, 2)}
        </span>
      </div>
      <div className="flex flex-1 items-start justify-between gap-2 bg-white px-4 py-3">
        <div className="min-w-0">
          <p className="font-body text-sm font-semibold leading-snug text-balance text-neutral-900">
            {item.title}
          </p>
          <p className="font-body text-xs leading-snug text-neutral-500">
            {item.meta}
          </p>
        </div>
        {item.href ? (
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
        ) : null}
      </div>
    </>
  );

  const shell =
    "group flex h-full flex-col overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1";

  if (!item.href) {
    return <div className={shell}>{inner}</div>;
  }

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        shell,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60",
      )}
    >
      {inner}
    </a>
  );
}

export function AnswerBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block) => {
        switch (block.kind) {
          case "projects":
            return (
              <div
                key="projects"
                className="grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {block.items.map((item) => (
                  <ProjectTile key={item.title} item={item} />
                ))}
              </div>
            );

          case "bullets":
            return (
              <ul key="bullets" className="flex max-w-[46rem] flex-col gap-2">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-body text-[15px] leading-relaxed text-fade-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "facts":
            return (
              <dl
                key="facts"
                className="max-w-[46rem] overflow-hidden rounded-2xl bg-agent-surface"
              >
                {block.items.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 px-4 py-3.5 sm:flex-row sm:gap-4"
                  >
                    <dt className="font-body text-xs uppercase tracking-[0.08em] text-muted-foreground sm:w-36 sm:shrink-0 sm:pt-0.5">
                      {item.label}
                    </dt>
                    <dd className="font-body text-[15px] leading-relaxed text-fade-foreground">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            );

          case "links":
            return (
              <div key="links" className="flex max-w-[46rem] flex-col gap-2">
                {block.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target={isExternal(item.href) ? "_blank" : undefined}
                    rel={
                      isExternal(item.href) ? "noopener noreferrer" : undefined
                    }
                    className="group flex items-center justify-between gap-4 rounded-xl bg-agent-surface px-4 py-3 transition-colors hover:bg-agent-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-body text-[15px] text-foreground">
                        {item.label}
                      </span>
                      {item.note ? (
                        <span className="block truncate font-body text-xs text-muted-foreground">
                          {item.note}
                        </span>
                      ) : null}
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </a>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
