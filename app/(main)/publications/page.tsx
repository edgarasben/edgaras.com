import type { Metadata } from "next";
import { SubpageHeader } from "../../components/subpage-header";
import { publications } from "../content";

export const metadata: Metadata = {
  title: "Publications – EDGARAS.COM",
  description: "Publications by Edgaras Benediktavičius.",
};

export default function PublicationsPage() {
  return (
    <main>
      <SubpageHeader title="Publications" />

      <article className="px-4 py-8 lg:px-16 lg:py-16 max-w-3xl flex flex-col gap-8">
        <h1 className="font-heading font-bold text-xl lg:text-3xl uppercase text-white leading-none">
          Publications
        </h1>

        <ul className="flex flex-col gap-4 lg:gap-5">
          {publications.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base lg:text-lg text-foreground leading-relaxed hover:text-white transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </article>
    </main>
  );
}
