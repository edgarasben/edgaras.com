import Link from "next/link";
import { EdgarasDotMatrix } from "../components/edgaras-dot-matrix";
import { FooterSocialLinks } from "../components/footer-social-links";
import { experiments, projects, publications } from "./content";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      {children}

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Content Grid ── */}
      <section className="flex flex-col lg:flex-row gap-14.5 px-4 py-8 lg:px-16 lg:py-16">
        {/* Projects */}
        <div className="flex flex-col gap-5 lg:gap-6 lg:flex-1">
          <h2>
            <Link
              href="/projects"
              className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              / Projects
            </Link>
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
          <h2>
            <Link
              href="/experiments"
              className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              / Experiments
            </Link>
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
          <h2>
            <Link
              href="/publications"
              className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              / Publications
            </Link>
          </h2>
          <ul className="flex flex-col gap-4 lg:gap-3">
            {publications.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="font-body text-base leading-normal tracking-widest lg:text-lg lg:tracking-wider text-foreground hover:text-foreground transition-colors"
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
          href="https://bookmarks.craftled.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-foreground transition-colors lg:flex-1"
        >
          / bookmarks
        </a>
        <Link
          href="/now"
          className="font-heading font-bold text-lg lg:text-2xl leading-none uppercase text-muted-foreground hover:text-foreground transition-colors lg:flex-1"
        >
          / now
        </Link>
      </footer>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Pre-footer dot-matrix ── */}
      <section className="px-4 py-8 lg:px-16 lg:py-16 flex items-center justify-center overflow-hidden">
        <EdgarasDotMatrix />
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />

      {/* ── Tiny site footer ── */}
      <section className="px-4 py-6 lg:px-16 lg:py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="font-body text-left text-base lg:text-lg tracking-wider text-white/45">
            © 2026 Edgaras Benediktavičius
          </p>
          <FooterSocialLinks />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="h-px bg-border" />
    </div>
  );
}
