'use client'

import { NewsletterForm } from '@/components/newsletter-form'
import LinkedinIcon from '@/components/icons/linkedin-icon'
import TwitterIcon from '@/components/icons/twitter-icon'
import MailIcon from '@/components/icons/mail-icon'
import Image from 'next/image'

const socialLinks = [
  {
    label: 'Follow on Twitter',
    url: 'https://twitter.com/edgarasben',
    icon: <TwitterIcon className="h-5 w-5" />
  },
  {
    label: 'Connect on LinkedIn',
    url: 'https://www.linkedin.com/in/edgarasben/',

    icon: <LinkedinIcon className="h-5 w-5" />
  },
  {
    label: 'Send email',
    url: 'mailto:hi@edgaras.com',
    icon: <MailIcon className="h-5 w-5" />
  }
]

export const Header = () => {
  return (
    <header>
      <div className="space-y-8 rounded-xl bg-base p-8 shadow-sm">
        <div className="relative flex justify-between">
          <div className="flex flex-col items-start space-y-8 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
            <Image
              src="/avatar.jpg"
              className="border-bg-base rounded-full border-2 shadow-md"
              alt="Edgaras profile"
              width={56}
              height={56}
            />
            <div className="space-y-1">
              <h1 className="font-semibold">Edgaras Benediktavicius</h1>
              <p className="text-fg-neutral-faded">
                Co-founder at{' '}
                <a
                  href="https://bestwriting.com"
                  className="underline underline-offset-2 hover:no-underline"
                >
                  Best Writing
                </a>
              </p>
            </div>
          </div>
          <ul className="absolute right-0 flex">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  aria-label={link.label}
                  href={link.url}
                  className="block p-3.5 hover:text-fg-neutral-faded"
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-fg-neutral-faded">
          I design and code things for the web. Get updates on what I learn and build by
          joining my mailing list. Weekly at most.
        </p>
        <NewsletterForm />
      </div>
    </header>
  )
}
