import Image from "next/image";
import { Clock } from "./components/clock";

const projects = [
  { name: "Craftled", href: "#" },
  { name: "Service Intent", href: "#" },
  { name: "UI Things", href: "#" },
  { name: "AI Turnpoint", href: "#" },
  { name: "Know Me If You Can", href: "#" },
];

const experiments = [
  { name: "Craftled", href: "#" },
  { name: "Service Intent", href: "#" },
  { name: "Ui things", href: "#" },
  { name: "AI Turnpoint", href: "#" },
];

const publications = [
  {
    name: "AI Coding Agents Compared (2026)",
    href: "#",
  },
  {
    name: "Agentic Project Management for an AI Agent Organization",
    href: "#",
  },
  {
    name: "AI Agents vs Figma: Are Designers About to Switch Tools?",
    href: "#",
  },
  {
    name: "Figma Make and the Rise of AI Vibe Coding",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* ── Header ── */}
      <header className="px-4 py-4 lg:px-16 lg:py-8">
        <div className="flex items-center justify-between lg:justify-center gap-3">
          {/* Desktop: location left */}
          <span className="hidden lg:block flex-1 font-body text-sm font-medium uppercase tracking-wider text-white/50">
            Vilnius, Lithuania
          </span>

          {/* Logo */}
          <h1 className="font-heading font-bold text-lg lg:text-5xl uppercase text-white lg:flex-1 lg:text-center leading-none">
            edgaras.com
          </h1>

          {/* Desktop: time right */}
          <div className="hidden lg:block flex-1 text-right">
            <Clock className="font-body text-sm font-medium uppercase tracking-wider text-white/50" />
          </div>

          {/* Mobile: location + time stacked */}
          <div className="flex flex-col items-end gap-0.5 lg:hidden">
            <span className="font-body text-[10px] font-medium uppercase tracking-wider text-white/50 leading-none">
              Vilnius, Lithuania
            </span>
            <Clock className="font-body text-[10px] font-medium uppercase tracking-wider text-white/50 leading-none" />
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center px-4 py-8 lg:px-16 lg:py-16">
        <div className="flex flex-col items-center gap-4 lg:gap-12 w-full lg:w-auto">
          <div className="relative w-full lg:w-[420px] aspect-[21/20]">
            <Image
              src="/edgaras-profile-personal-website.jpg"
              alt="Edgaras Benediktavičius"
              width={840}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <p className="font-heading font-bold text-lg leading-[20px] lg:text-2xl lg:leading-tight text-justify uppercase text-white/75 w-full lg:max-w-[514px]">
            Edgaras Benediktavičius is a Designer, Developer, Social latin
            Dancer and business Founder living in Lithuania
          </p>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Content Grid ── */}
      <section className="flex flex-col lg:flex-row gap-[58px] px-4 py-8 lg:px-16 lg:py-16">
        {/* Projects */}
        <div className="flex flex-col gap-5 lg:gap-6 lg:flex-1">
          <h2 className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground">
            / Projects
          </h2>
          <ul className="flex flex-col gap-4 lg:gap-3">
            {projects.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-heading font-normal text-xl leading-none tracking-widest lg:font-body lg:text-lg lg:leading-normal lg:tracking-wider text-foreground hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Experiments */}
        <div className="flex flex-col gap-5 lg:gap-6 lg:flex-1">
          <h2 className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground">
            / Experiments
          </h2>
          <ul className="flex flex-col gap-4 lg:gap-3">
            {experiments.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-heading font-normal text-xl leading-none tracking-widest lg:font-body lg:text-lg lg:leading-normal lg:tracking-wider text-foreground hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Publications */}
        <div className="flex flex-col gap-5 lg:gap-6 lg:flex-[1.3]">
          <h2 className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground">
            / Publications
          </h2>
          <ul className="flex flex-col gap-4 lg:gap-3">
            {publications.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-body text-base leading-normal tracking-widest lg:text-lg lg:tracking-wider text-foreground hover:text-white transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Footer Links ── */}
      <footer className="flex flex-col lg:flex-row gap-4 lg:gap-3 px-4 py-8 lg:px-16 lg:py-16">
        <a
          href="#"
          className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-white/50 transition-colors lg:flex-1"
        >
          / bookmarks
        </a>
        <a
          href="#"
          className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-white/50 transition-colors lg:flex-1"
        >
          / now
        </a>
      </footer>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />
    </main>
  );
}
