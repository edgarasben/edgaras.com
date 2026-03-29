import Link from "next/link";

export function SubpageHeader({ title }: { title: string }) {
  return (
    <header className="border-t border-border px-4 py-4 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[1616px]">
        <p className="font-heading text-xl font-bold uppercase leading-none text-white/25 lg:text-[2rem]">
          <Link href="/" className="transition-colors hover:text-white/50">
            edgaras.com
          </Link>
          {" / "}
          <span className="text-white">{title}</span>
        </p>
      </div>
    </header>
  );
}
