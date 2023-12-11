import Balancer from 'react-wrap-balancer'
import { ButtonCalendar } from './ButtonCalendar'
import Link from 'next/link'

export default function PortfolioFooter() {
  return (
    <footer className="w-full bg-page px-8 py-24 pb-8">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-16">
        <h2 className="text-center text-5xl font-extrabold">
          Book a Free Consultation
        </h2>
        <p className="max-w-screen-sm text-center text-2xl text-neutral">
          <Balancer>
            Schedule a no-obligation call to explore how I can help you grow
            your business through design.
          </Balancer>
        </p>
        <div className="flex flex-col items-center gap-10">
          <ButtonCalendar>Book a Free Call</ButtonCalendar>
          <a
            href="mailto:hi@edgaras.com?subject=Project%20Inquiry&body=Please%20provide%20the%20information%20below%20to%20help%20me%20understand%20your%20needs%20and%20give%20you%20an%20accurate%20quote%3A---1.%20Your%20name%3A2.%20Company%20name%3A3.%20Project%20timeline%20(date%20from%2C%20to)%3A3.%20Project%20budget%3A4.%20Tell%20me%20a%20bit%20more%20what%20you%20are%20looking%20for%3F%3A"
            className="decoration-fg-neutral-fade/25 hover:decoration-fg-primary text-lg font-medium text-neutral underline underline-offset-8 transition-all hover:underline-offset-8"
          >
            Or email me
          </a>
        </div>
        <ul className="text-fg-primary flex flex-col items-center space-y-8 pt-8 font-bold md:flex-row md:space-x-32 md:space-y-0">
          <li>
            <a
              href="https://www.linkedin.com/in/edgarasben"
              className="underline hover:no-underline"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/edgarasben"
              className="underline hover:no-underline"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://dribbble.com/edgarasben"
              className="underline hover:no-underline"
            >
              Dribbble
            </a>
          </li>
          <li>
            <a
              href="mailto:hi@edgaras.com"
              className="underline hover:no-underline"
            >
              Email
            </a>
          </li>
        </ul>
        <p className="flex w-full flex-col justify-between gap-2 pt-32 text-center text-lg text-neutral md:flex-row">
          <span>
            MB Service Intent (Reg. number: 305604744) ✲ Lithuania / Denmark
          </span>
          <span>
            Design ♡ Code by{' '}
            <Link href="/" className="font-medium underline hover:no-underline">
              Edgaras Benediktavicius
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}
