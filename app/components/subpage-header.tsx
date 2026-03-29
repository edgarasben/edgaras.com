import Link from "next/link";

export function SubpageHeader({ title }: { title: string }) {
  return (
    <>
      <header className="px-4 py-4 lg:px-16 lg:py-8">
        <p className="font-heading font-bold text-lg lg:text-2xl uppercase leading-none text-white/25">
          <Link href="/" className="hover:text-white/50 transition-colors">
            edgaras.com
          </Link>
          {" / "}
          <span className="text-white">{title}</span>
        </p>
      </header>

      <div className="h-px bg-border" />
    </>
  );
}
