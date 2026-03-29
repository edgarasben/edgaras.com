import type { Metadata } from "next";
import { SubpageHeader } from "../../components/subpage-header";

export const metadata: Metadata = {
  title: "Now – EDGARAS.COM",
  description: "What Edgaras is up to right now.",
};

export default function NowPage() {
  return (
    <main>
      <SubpageHeader title="Now" />

      {/* ── Content ── */}
      <article className="px-4 py-8 lg:px-16 lg:py-16 max-w-3xl flex flex-col gap-8">
        <h2 className="font-heading font-bold text-xl lg:text-3xl uppercase text-white leading-none">
          What I&apos;m doing now
        </h2>

        <ul className="flex flex-col gap-4 list-disc list-outside pl-5">
          <li className="font-body text-base lg:text-lg text-foreground leading-relaxed">
            Writing some design, tech and AI related blog posts for our{" "}
            <a
              href="https://epigraphmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Epigraph Media
            </a>{" "}
            publications.
          </li>
          <li className="font-body text-base lg:text-lg text-foreground leading-relaxed">
            As a contractor, making design systems and mobile apps for the top
            Danish and international football clubs.
          </li>
          <li className="font-body text-base lg:text-lg text-foreground leading-relaxed">
            Practicing Bachata 2x a week and social dancing
          </li>
          <li className="font-body text-base lg:text-lg text-foreground leading-relaxed">
            Getting back to my 3-times/week gym routine.
          </li>
          <li className="font-body text-base lg:text-lg text-foreground leading-relaxed">
            Recently started living in 🇱🇹 Vilnius, Lithuania
          </li>
        </ul>

        <p className="font-body text-base lg:text-lg text-foreground leading-relaxed">
          Read{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            why this page exists
          </a>
          ? And check out other people{" "}
          <a
            href="https://nownownow.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-white transition-colors"
          >
            /now pages
          </a>
          .
        </p>
      </article>
    </main>
  );
}
