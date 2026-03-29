import Link from "next/link";

export function SubpageHeader({ title }: { title: string }) {
  return (
    <header className="px-4 py-4 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1616px]">
        <p className="font-heading text-xl font-bold uppercase leading-none text-muted-foreground lg:text-[2rem]">
          <Link
            href="/"
            className="transition-colors hover:text-fade-foreground"
          >
            edgaras.com
          </Link>
          {" / "}
          <span className="text-foreground">{title}</span>
        </p>
      </div>
    </header>
  );
}
