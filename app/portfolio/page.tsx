import Image from 'next/image'
import { AnimateStagger } from './AnimateStagger'
import PortfolioFooter from './PortfolioFooter'
import projects from './data.json'
import { ButtonCalendar } from './ButtonCalendar'
import SpinningWheel from './SpinningWheel'
import BookHoursForm from './BookHoursForm'
/* import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/accordion' */

export default function PortfolioPage() {
  return (
    <>
      <header className="fixed inset-x-0 h-[512px]">
        <div className="relative flex h-full items-center justify-center">
          <div className="absolute inset-y-0 left-0 -z-10 h-[800px] w-full bg-page lg:w-3/5" />
          <div className="absolute inset-0 -z-20 h-[2000px] bg-[#BFDFB4]" />

          <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center space-y-8 px-8 xs:space-y-16 lg:items-start">
            <div className="flex flex-col items-center justify-center space-y-4 lg:items-start">
              <svg
                width="68"
                height="74"
                viewBox="0 0 68 74"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="origin-center -rotate-45 text-fg-primary xs:translate-x-24 lg:translate-x-[432px] lg:translate-y-6 lg:rotate-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.89895 2.63576C5.59895 8.65176 5.29953 14.6678 4.99953 20.6848C4.99953 22.0628 3.79895 23.1268 2.39895 23.0598C0.998949 22.9918 -0.000465393 21.8188 -0.000465393 20.4398C0.299535 14.4138 0.598949 8.38876 0.898949 2.36376C0.998949 0.985757 2.19914 -0.0712432 3.59914 0.00375683C4.89914 0.0787568 5.99895 1.25876 5.89895 2.63576Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.2003 43.0648C35.5003 32.5538 47.1003 23.3958 57.2003 12.6028C58.1003 11.5948 59.7003 11.5408 60.7003 12.4818C61.7003 13.4238 61.7999 15.0078 60.7999 16.0158C50.6999 26.8398 39.0999 36.0278 28.7999 46.5698C27.7999 47.5538 26.2003 47.5678 25.2003 46.5998C24.3003 45.6328 24.2003 44.0488 25.2003 43.0648Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M44.5995 68.5278C50.9995 66.7318 57.7001 65.8258 64.2001 64.9958C65.6001 64.8218 66.8999 65.7928 66.9999 67.1608C67.1999 68.5298 66.1993 69.7817 64.8993 69.9557C58.5993 70.7547 52.0999 71.6097 45.9999 73.3387C44.6999 73.7137 43.2993 72.9418 42.8993 71.6138C42.4993 70.2868 43.2995 68.9038 44.5995 68.5278Z"
                />
              </svg>

              <h1 className="relative text-center text-3xl font-extrabold leading-tight xs:text-4xl lg:text-left lg:text-5xl lg:leading-tight">
                {/* Design simple, <br />
              grow digital 🪴 */}
                {/* Stategic design, <br />
              functional prototypes, <br /> tangible results. */}
                <span className="tracking-tight text-fg-neutral xs:whitespace-normal">
                  Your vision, realized
                </span>
              </h1>
              <p className="max-w-xl text-center text-xl xs:text-2xl lg:text-left">
                {/* Design and development services that help you launch your product with
                confidence. */}{' '}
                Design and development services to help you prototype and launch your web
                or mobile product.
              </p>
              <div className="flex flex-col items-center gap-10 pt-8 sm:flex-row">
                <ButtonCalendar>Free 30 min call</ButtonCalendar>
                <a
                  href="mailto:hi@edgaras.com?subject=Project%20request&body=To%20better%20understand%20your%20needs%2C%20please%20provide%20me%20with%20the%20following%20information%20about%20the%20project%3A%0D%0A%0D%0A1.%20Your%20name%3A%0D%0A2.%20Company%20name%3A%0D%0A3.%20Period%20(months)%3A%0D%0A4.%20Start%20date%3A%0D%0A5.%20What%20challenges%2Fneeds%20are%20you%20looking%20to%20solve%3F%0D%0A6.%20Budget%3A"
                  className="text-lg font-medium text-fg-neutral underline decoration-fg-neutral-faded/25 underline-offset-8 transition-all hover:decoration-fg-primary hover:underline-offset-8"
                >
                  Or email me
                </a>
              </div>
            </div>
            {/*    <h1 className="text-6xl font-semibold leading-[4.25rem]">
              Less design, <br />
              more growth 🪴
            </h1> */}
          </div>
        </div>
        <div className="absolute right-[4%] top-[8%] -z-20 text-[#9FC193]">
          <SpinningWheel />
        </div>
      </header>
      <main className="flex w-full translate-y-[1080px] flex-col items-center bg-base pt-0 sm:pt-16 lg:translate-y-[614px] lg:pt-24">
        <div className="pointer-events-none absolute z-20 flex w-full -translate-y-[536px] items-center justify-center overflow-hidden bg-[#BFDFB4] pt-32 lg:inset-x-auto lg:bg-transparent lg:pt-0">
          <div className="absolute inset-y-0 right-0 top-0 -z-20 my-auto scale-[0.8] text-[#9FC193] lg:hidden">
            <SpinningWheel />
          </div>
          <div className="relative -left-1/4 h-[440px] w-[490px] bg-[url('/images/header-photo-edgaras.png')] bg-contain bg-bottom bg-no-repeat dark:bg-[url('/images/header-photo-edgaras-dark-theme.png')] lg:-right-[17%] lg:left-auto" />
        </div>
        <section className="flex w-full flex-col items-center gap-16 pt-24 lg:pt-0">
          {/*   <p className="w-full text-center uppercase tracking-widest text-fg-neutral">
            Previously I worked with:
          </p> */}
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-evenly gap-8 px-8 lg:px-8">
            <a href="https://www.kiloo.com/" className="shrink-0">
              <Image
                src={'/images/logos/kiloo.svg'}
                width={160}
                height={41.75}
                alt="Kiloo"
                className="w-16 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-20"
              />
            </a>
            <a href="https://www.fck.dk/" className="shrink-0">
              <Image
                src={'/images/logos/fck.svg'}
                width={96}
                height={96}
                alt="F.C. København"
                className="w-11 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-14"
              />
            </a>
            <a href="https://www.ergosign.de/" className="shrink-0">
              <Image
                src={'/images/logos/ergosign.svg'}
                width={256}
                height={34.83}
                alt="Ergosign"
                className="w-32 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-40"
              />
            </a>
            <a href="https://www.novonordisk.com/" className="shrink-0">
              <Image
                src={'/images/logos/novo-nordisk.svg'}
                width={113}
                height={130}
                alt="Ergosign"
                className="w-10 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-14"
              />
            </a>
            <a href="https://spirii.com/en/ev-drivers/spirii-go-app" className="shrink-0">
              <Image
                src={'/images/logos/spirii.png'}
                width={66.74}
                height={32}
                alt="Spirii"
                className="w-14 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-16"
              />
            </a>
            <a href="https://www.motosumo.com/" className=" shrink-0">
              <Image
                src={'/images/logos/motosumo.png'}
                width={49}
                height={32}
                alt="Motosumo"
                className="opacity-50 transition hover:scale-105 hover:opacity-90"
              />
            </a>
            <a href="https://www.lava.nl/" className="shrink-0">
              <Image
                src={'/images/logos/lava.svg'}
                width={112}
                height={112}
                alt="Lava"
                className="w-10 opacity-50 transition hover:scale-105 hover:opacity-90 lg:w-12"
              />
            </a>
          </div>
        </section>
        <section className="flex items-center justify-center px-8 pt-24 md:pt-48">
          <p className="max-w-3xl text-center text-2xl leading-relaxed text-fg-neutral md:text-3xl md:leading-normal">
            Hi! My name is Edgaras, and I am a freelancer specializing in UX/UI Design,
            No-Code, and JavaScript development. <br /> <br className="block md:hidden" />{' '}
            I work with clients globally to create engaging websites, functional app
            prototypes, and automations that enable you to focus on what matters most.
          </p>
        </section>
        {/* Testimonials */}
        <section className="flex w-full flex-col items-center gap-16 pt-80">
          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-8 sm:grid-cols-2 lg:grid-cols-4">
            <svg
              viewBox="0 0 162 128"
              fill="none"
              aria-hidden="true"
              className="absolute inset-x-0 -top-60 -z-10 h-32 w-full stroke-fg-neutral-faded/20 "
            >
              <path
                id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb"
                d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z"
              />
              <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
            </svg>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-4 md:min-h-[64px]">
                <Image
                  src={'/images/tomas.webp'}
                  width={48}
                  height={48}
                  alt="Tomas Laurinavicius"
                  className="rounded-full object-cover"
                />
                <div>
                  <b>Tomas Laurinavicius</b>
                  <p className="text-sm text-fg-neutral-faded">
                    Founder, Marketer, Designer & Writer
                  </p>
                </div>
              </div>
              <p className="text-lg text-fg-neutral">
                Edgaras is an exceptionally creative and professional designer and
                developer.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-4 md:min-h-[64px]">
                <Image
                  src={'/images/jeppe.jpg'}
                  width={48}
                  height={48}
                  alt="Jeppe Kønig"
                  className="rounded-full object-cover"
                />
                <div>
                  <b>Jeppe Kønig</b>
                  <p className="text-sm text-fg-neutral-faded">
                    Head Of Publishing at Funday Games
                  </p>
                </div>
              </div>
              <p className="text-lg text-fg-neutral">
                Knowledgeable of systems, processes, visual design but first and foremost
                he simply gets how people use technology and interfaces.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-4 md:min-h-[64px]">
                <Image
                  src={'/images/kasper.jpg'}
                  width={48}
                  height={48}
                  alt="Kasper Wandahl Fogh"
                  className="rounded-full object-cover"
                />
                <div>
                  <b>Kasper Wandahl Fogh</b>
                  <p className="text-sm text-fg-neutral-faded">
                    Head of Digital @ F.C. København
                  </p>
                </div>
              </div>
              <p className="text-lg text-fg-neutral">
                He is a skilled and talented graphic designer who truly understands the
                importance of UI, UX, and brand values.
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-4 md:min-h-[64px]">
                <Image
                  src={'/images/rasmus.jpg'}
                  width={48}
                  height={48}
                  alt="Rasmus Keldorff"
                  className="rounded-full object-cover"
                />
                <div>
                  <b>Rasmus Keldorff</b>
                  <p className="text-sm text-fg-neutral-faded">Visual Lead at Kiloo</p>
                </div>
              </div>
              <p className="text-lg text-fg-neutral">
                Edgaras is rarely satisfied with &ldquo;good enough&rdquo; and does not
                lightly quit a task when &ldquo;better&rdquo; is a possibility.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full overflow-hidden pb-16 pt-32 text-5xl tracking-tighter sm:text-6xl md:pt-48 lg:text-8xl">
          <div className="relative flex -rotate-3 space-x-2 md:space-x-1.5">
            <h2 className="animate-[translateX-0--100_24s_linear_infinite] flex-nowrap space-x-2 whitespace-nowrap font-medium uppercase text-fg-neutral-faded/25 md:space-x-3">
              <span>Featured projects ✲</span>
              <span>Featured projects ✲</span>
            </h2>
            <h2 className="absolute animate-[translateX-100-0_24s_linear_infinite] flex-nowrap space-x-6 whitespace-nowrap font-medium uppercase text-fg-neutral-faded/25">
              <span>Featured projects ✲</span>
              <span>Featured projects ✲</span>
            </h2>
          </div>
        </section>
        <ul className="mx-auto w-full max-w-screen-xl columns-1 gap-8 px-8 pt-16 md:columns-2">
          {projects.map((project: any) => (
            <li key={project.slug}>
              <Card {...project} />
            </li>
          ))}
        </ul>
        <section className="mx-auto w-full max-w-[1376px] pb-24 pt-16 md:px-8 md:pt-48">
          <h2 className="p-8 text-5xl font-extrabold text-fg-neutral md:ml-12 md:px-0 md:text-left">
            What I can help you with
          </h2>
          {/*  <p>
            I build stuff, practical hands on design, rapid fast, experimentation driven
            approach
          </p> */}
          <AnimateStagger />
        </section>
        <section className="mx-auto w-full max-w-screen-xl px-8 pb-24 pt-8 md:pb-48 md:pt-48">
          <h2 className="text-5xl font-extrabold text-fg-neutral md:text-left">
            How I work
          </h2>
          {/*     <p className="pt-4 text-center text-xl text-fg-neutral-faded">
            I focus on fully digital, remote and asynchonious work.
          </p> */}
          <div className="grid grid-cols-1 gap-16 pt-16 md:grid-cols-2 md:pt-20">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/figma.svg'}
                  width={48}
                  height={48}
                  alt="Figma"
                  title="Figma"
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold md:text-3xl">Figma</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                Whether I need to craft a quick <b>visual mockup</b> for a landing page or
                detail <b>UI design systems</b>, Figma is my go-to. With its real-time
                collaboration features and intuitive interface, I can work seamlessly with
                others and accelerate the design process.
              </p>
              <div className="relative aspect-video">
                <Image src={'/images/figma.jpg'} fill alt="Figma editor" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/miro.svg'}
                  width={48}
                  height={48}
                  alt="Miro"
                  title="Miro"
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold md:text-3xl">Miro</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                When a project requires more UX work, planning and collaboration, I turn
                to <b>Miro</b> or <b>FigJam</b>. These tools are excellent for{' '}
                <b>organizing research data</b>, <b>user journeys</b>, and{' '}
                <b>wireframes</b>, and simplify collaborative <b>design thinking</b>.
              </p>
              <div className="relative aspect-video">
                <Image src={'/images/miro.jpg'} fill alt="Miro whiteboard" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/vscode.svg'}
                  width={48}
                  height={48}
                  alt="VS Code"
                  title="VS Code"
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold md:text-3xl">Code</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                Designers don’t have to code, but I do! My go-to tool for coding is{' '}
                <strong>VS Code</strong>, where I write <strong>HTML</strong>,{' '}
                <strong>CSS</strong> and <strong>JavaScript</strong>. I also enjoy writing{' '}
                <strong>Tailwind CSS</strong>, which allows me to build layouts quickly.
                When it comes to building full websites and apps, I turn to frameworks —{' '}
                <strong>React</strong> and <strong>NextJS</strong>. Knowing how to code
                not only enables me to build Minimal Viable Products, but also makes it
                easier for me to communicate and collaborate with other developers.
              </p>
              <div className="relative aspect-video">
                <Image src={'/images/code.jpg'} fill alt="Code editor" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={'/images/logos/make.svg'}
                  width={48}
                  height={48}
                  alt="Make.com"
                  title="Make.com"
                  className="rounded-lg"
                />
                <h3 className="text-2xl font-bold md:text-3xl">No-Code</h3>
              </div>
              <p className="text-lg text-fg-neutral">
                When I&apos;m working on projects where speed and cost are priorities, I
                turn to no-code tools. <strong>Zapier</strong> and <strong>Make</strong>{' '}
                are excellent tools for workflow automation, while{' '}
                <strong>Internal</strong> is great for building internal tools.{' '}
                <strong>Tally</strong> is perfect for creating quick forms and surveys.
                For database prototyping, I prefer <strong>Airtable</strong> or{' '}
                <strong>Notion</strong>. I view these tools as building blocks that enable
                me to quickly bootstrap apps and automate processes, before diving into
                writing more resilient code or disrupting other developers.
              </p>
              <div className="relative aspect-video">
                <Image src={'/images/no-code.jpg'} fill alt="Make no-code automation" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-screen-xl space-y-20 px-8 pb-24 md:pb-32 md:pt-24">
          <h2
            id="payment-options"
            className="text-5xl font-extrabold text-fg-neutral md:text-left"
          >
            Payment Options
          </h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-between gap-10 rounded-[32px] bg-neutral p-12">
              <div className="space-y-4">
                <h3 className="text-4xl">
                  <strong>€70</strong> / hour
                </h3>
                <span className="block font-semibold uppercase tracking-wider text-fg-primary">
                  Pre-paid hours
                </span>
              </div>
              <p className="h-full text-xl">
                Flexible design partner services for one-time or ongoing projects without
                long-term commitment.
              </p>
              <div className="flex gap-4">
                <BookHoursForm />
              </div>
            </div>
            <div className="flex flex-col gap-10 rounded-[32px] bg-primary p-12 text-white">
              <div className="space-y-4">
                <h3 className="text-4xl">
                  <strong>€3500</strong> / month
                </h3>
                <span className="block font-bold uppercase tracking-wider opacity-90">
                  Subscription
                </span>
              </div>
              <p className="h-full text-xl">
                Dedicated design partner services for a fixed monthly fee, ensuring
                consistent and efficient support for all your design needs.
              </p>
              <a
                href="https://buy.stripe.com/4gw02sgqGe5Ce0U5kk"
                className="place-self-start rounded-full bg-white px-8 py-4 text-xl font-bold tracking-wide text-fg-primary transition-transform hover:rotate-2 hover:scale-105"
              >
                Subscribe
              </a>
            </div>
          </div>
        </section>

        {/*         <section className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is the Designer as a Service?</AccordionTrigger>
              <AccordionContent>
                It&apos;s a subscription based design service operated by an expert UX/UI
                Designer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section> */}

        {/*         <section className="mx-auto w-full max-w-screen-xl space-y-20 px-8 pb-24 md:pb-96 md:pt-24">
          <h2 className="text-5xl font-extrabold text-fg-neutral md:text-left">FAQ</h2>
          <ul>
            <li>
              <p>How does it work?</p>
              <p>
                You can subscribe for a monthly design subscription or book some work
                hours in advance. After the payment you will soon receive an email with a
                link to your new Trello board where you can request design tasks. You can
                pioritize as many tasks as you want in the Backlog. Request a task to be
                done by adding it to Current Request column. You will receive the design
                delivery in 1-2 days.
              </p>
            </li>
            <li>What can I get done?</li>
            <li>How do I request tasks?</li>
            <li>
              <p>How do we communicate?</p>
              <p>
                After we get to know each other during our video call, the rest of
                communication happens directly in the Trello board. This way we can keep
                communication organized under every task. It&apos;s also easy to go back
                and reflect on the decisions made because everything gets naturally
                documented.
              </p>
            </li>
            <li>
              <p>How quick can I get my designs delivered?</p>
              <p>1-3 days.</p>
            </li>
            <li>
              <p>What are the payment options?</p>
              <p>
                Pre-paid hours or a monthly subsciption. If you want to try out the design
                service, you can start out with some pre-paid design hours. If you need a
                regular design support, I recommend the monthly subscription, which makes
                it easier to operate.
              </p>
            </li>
            <li>
              <p>How do I pause the subscription?</p>
              <p>
                You can pause the subscription anytime logging in to Stripe Portal I
                provide you. When you pause your subscription, the rest of the days of a
                month will be banked for you to be used later. Whenever you unpause the
                subscription, the remaining days will be added to the new period.
              </p>
              <p>
                For example, if you start your subscription on 10th of May and pause your
                subscription on 20th of May, you have only used 10 days from your
                subscription. The remaining 20 days of your subscription are saved. If you
                resume your subscriptio on 4th of July, the next payment period will only
                start on 24th of June, right after you;ve used your remaining free days.
              </p>
            </li>
            <li>
              <p>How do I cancel the subscription?</p>
              <p>
                You can cancel the subscription anytime logging in to Stripe Portal I
                provide you. When you cancel your subscription, you can still request
                design tasks for the remaining days of a period. For example, if you cacel
                on 20th of of May and your subscription period end 5th of June, you can
                still request tasks for the remaining 16 days.
              </p>
            </li>
            <li>
              <p>Do you offer refunds?</p>
              <p>
                Due to the creative nature of design work, I don&apos;t offer refunds for
                the past work days. You can cancel anytime, and if you require I will
                refund you for the rest of the days of the subscription period.
              </p>
            </li>
          </ul>
        </section> */}
        <PortfolioFooter />
      </main>
    </>
  )
}

type Data = (typeof projects)[0]

function Card(data: Data) {
  return (
    <a
      href={`/portfolio/${data.slug}`}
      /* href={data.meta.link.url} */
      className="group relative block w-full pb-4 xs:pb-8 md:pb-0 md:first:mt-32"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={data.coverVertical}
          fill
          alt={data.alt}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="relative -mt-28 w-5/6 space-y-2 bg-base pb-8 pr-4 pt-6 transition-transform duration-500 ease-out group-hover:-translate-y-4">
        <span className="font-semibold uppercase tracking-wider text-fg-primary xs:text-lg">
          {data.project}
        </span>
        <h3 className="text-xl font-bold xs:text-2xl sm:text-3xl lg:text-4xl lg:leading-snug">
          {data.title}
        </h3>
      </div>
    </a>
  )
}
