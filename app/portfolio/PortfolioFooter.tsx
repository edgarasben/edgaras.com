import Link from 'next/link'
import { ButtonCalendar } from './ButtonCalendar'
import Balancer from 'react-wrap-balancer'

export default function PortfolioFooter() {
  return (
    <footer className="w-full bg-page px-8 py-48 pt-32 pb-8">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center space-y-16">
        <h2 className="text-center text-5xl font-extrabold">Get in touch</h2>
        <p className="max-w-screen-sm text-center text-xl text-fg-neutral">
          <Balancer>
            Ready for a digital upgrade? Let&apos;s talk app design and web development!
            No pressure, just a quick chat to see how I can help.
          </Balancer>
        </p>
        <ButtonCalendar>Let&apos;s Talk!</ButtonCalendar>
        <ul className="flex flex-col items-center space-y-8 pt-8 font-bold text-fg-primary md:flex-row md:space-x-32 md:space-y-0">
          <li>
            <a href="https://www.linkedin.com/in/edgarasben" className="hover:underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://twitter.com/edgarasben" className="hover:underline">
              Twitter
            </a>
          </li>
          <li>
            <a href="https://dribbble.com/edgarasben" className="hover:underline">
              Dribbble
            </a>
          </li>
          <li>
            <a href="mailto:hi@edgaras.com" className="hover:underline">
              Email
            </a>
          </li>
        </ul>
        <p className="flex w-full flex-col justify-between gap-2 pt-32 text-center text-lg text-fg-neutral md:flex-row">
          <span>MB Service Intent ✲ Lithuania / Denmark</span>
          <span>
            Design ♡ Code by{' '}
            <Link href="/" className="font-medium underline">
              Edgaras Benediktavicius
            </Link>
          </span>
        </p>
      </div>
    </footer>
  )
}
