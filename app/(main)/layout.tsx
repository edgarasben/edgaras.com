import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { EdgarasDotMatrix } from "../components/edgaras-dot-matrix";
import { FooterSocialLinks } from "../components/footer-social-links";
import { RouteThemeWrapper } from "../components/route-theme-wrapper";
import { experiments, projects, publications } from "./content";

const contentGridSections = [
  {
    title: "Projects",
    href: "/projects",
    items: projects,
  },
  {
    title: "Experiments",
    href: "/experiments",
    items: experiments,
  },
  {
    title: "Publications",
    href: "/publications",
    items: publications,
  },
] as const;

const contentGridSectionClassName = "flex flex-col gap-5 lg:flex-1 lg:gap-6";
const contentGridHeadingClassName =
  "font-heading text-lg font-bold uppercase leading-none text-muted-foreground transition-colors hover:text-foreground lg:text-2xl";
const contentGridListClassName = "flex flex-col gap-4 lg:gap-4";
const contentGridItemLinkClassName =
  "font-heading text-xl font-normal leading-none tracking-[0.08em] text-foreground transition-colors hover:text-fade-foreground lg:text-xl lg:tracking-[0.1em]";
const footerLinkClassName =
  "font-heading text-lg font-bold uppercase leading-none text-muted-foreground transition-colors hover:text-foreground lg:flex-1 lg:text-2xl";
const footerCopyrightClassName =
  "font-body text-left text-sm text-muted-foreground lg:text-base";

async function FooterCopyright() {
  await connection();
  const year = new Date().getFullYear();

  return (
    <p className={footerCopyrightClassName}>© {year} Edgaras Benediktavičius</p>
  );
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteThemeWrapper>
      {children}

      {/* ── Content Grid ── */}
      <section className="px-4 py-8 lg:px-16 lg:py-16">
        <div className="mx-auto flex max-w-[1616px] flex-col gap-14.5 lg:flex-row lg:gap-[58px]">
          {contentGridSections.map((section) => (
            <div key={section.title} className={contentGridSectionClassName}>
              <h2>
                <Link
                  href={section.href}
                  className={contentGridHeadingClassName}
                >
                  / {section.title}
                </Link>
              </h2>
              <ul className={contentGridListClassName}>
                {section.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={contentGridItemLinkClassName}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer Links ── */}
      <footer className="px-4 py-8 lg:px-16 lg:py-16">
        <div className="mx-auto flex max-w-[1616px] flex-col gap-4 lg:flex-row lg:gap-[58px]">
          <Link href="/now" className={footerLinkClassName}>
            / now
          </Link>
          <a
            href="https://bookmarks.craftled.com"
            target="_blank"
            rel="noopener noreferrer"
            className={footerLinkClassName}
          >
            / bookmarks
          </a>
        </div>
      </footer>

      {/* ── Pre-footer dot-matrix ── */}
      <section className="flex items-center justify-center px-4 py-8 lg:px-16 lg:py-16">
        <EdgarasDotMatrix />
      </section>

      {/* ── Tiny site footer ── */}
      <section className="px-4 py-6 lg:px-16 lg:py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Suspense
            fallback={
              <p className={footerCopyrightClassName}>
                © Edgaras Benediktavičius
              </p>
            }
          >
            <FooterCopyright />
          </Suspense>
          <FooterSocialLinks />
        </div>
      </section>
    </RouteThemeWrapper>
  );
}
