import Image from "next/image";
import { Clock, TimezoneLabel } from "../components/clock";

export default function Home() {
  return (
    <main>
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

          {/* Desktop: time + timezone right */}
          <div className="hidden lg:block flex-1 text-right">
            <div className="inline-flex items-center gap-2">
              <Clock className="font-body text-sm font-medium uppercase tracking-wider text-white/50" />
              <TimezoneLabel className="font-body text-sm font-medium uppercase tracking-wider text-white/50" />
            </div>
          </div>

          {/* Mobile: location + time/timezone stacked */}
          <div className="flex flex-col items-end gap-0.5 lg:hidden">
            <span className="font-body text-[10px] font-medium uppercase tracking-wider text-white/50 leading-none">
              Vilnius, Lithuania
            </span>
            <div className="flex items-center gap-1">
              <Clock className="font-body text-[10px] font-medium uppercase tracking-wider text-white/50 leading-none" />
              <TimezoneLabel className="font-body text-[10px] font-medium uppercase tracking-wider text-white/50 leading-none" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center px-4 py-8 lg:px-16 lg:py-16">
        <div className="flex flex-col items-center gap-4 lg:gap-12 w-full lg:w-auto">
          <div className="relative w-full lg:w-105 aspect-21/20">
            <Image
              src="/edgaras-profile-personal-website.jpg"
              alt="Edgaras Benediktavičius"
              width={840}
              height={800}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <p className="font-heading font-bold text-lg leading-5 lg:text-2xl lg:leading-tight text-justify uppercase text-white/75 w-full lg:max-w-128.5">
            Edgaras Benediktavičius is a Designer, Developer, Social latin
            Dancer and business Founder living in Lithuania
          </p>
        </div>
      </section>
    </main>
  );
}
