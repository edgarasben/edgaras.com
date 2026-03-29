import Image from "next/image";
import { Clock } from "../components/clock";

const desktopMetaClassName =
  "font-body text-sm font-medium uppercase tracking-[0.05em] text-white/50";
const mobileMetaClassName =
  "font-body text-[10px] font-medium uppercase tracking-[0.05em] leading-none text-white/50";

export default function Home() {
  return (
    <main>
      {/* ── Header ── */}
      <header className="px-4 py-4 lg:px-16 lg:py-12">
        <div className="mx-auto flex max-w-[1616px] items-start justify-between gap-4 lg:items-center">
          <h1 className="font-heading text-xl font-bold uppercase leading-none text-white lg:text-[2rem]">
            edgaras.com
          </h1>

          <div className="hidden items-center gap-1.5 text-right lg:flex">
            <Clock className={desktopMetaClassName} />
            <span className={desktopMetaClassName}> Vilnius, Lithuania</span>
          </div>

          <div className="flex flex-col items-end gap-0.5 lg:hidden">
            <span className={mobileMetaClassName}>Vilnius, Lithuania</span>
            <Clock className={mobileMetaClassName} />
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="px-4 pb-8 pt-6 lg:px-16 lg:pb-16 lg:pt-10">
        <div className="mx-auto flex max-w-[1616px] flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="order-2 flex w-full lg:order-1 lg:max-w-[896px] lg:flex-[1.06]">
            <p className="w-full text-justify font-heading text-xl font-normal uppercase leading-[1.18] text-white/75 sm:text-2xl lg:text-[3rem] lg:leading-[1.22]">
              Edgaras Benediktavičius is a designer, developer, social bachata
              dancer and business founder living in Lithuania.
            </p>
          </div>

          <div className="order-1 w-full lg:order-2 lg:flex lg:max-w-[784px] lg:flex-1 lg:justify-center">
            <div className="mx-auto w-full max-w-[420px] lg:max-w-[600px]">
              <Image
                src="/edgaras-profile-personal-website.jpg"
                alt="Edgaras Benediktavičius portrait"
                width={600}
                height={571}
                priority
                sizes="(min-width: 1024px) 600px, (min-width: 640px) 420px, 100vw"
                className="h-auto w-full object-cover grayscale contrast-125 brightness-95"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
