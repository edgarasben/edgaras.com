'use client'

import Image from 'next/image'
import {
  BookmarkIcon,
  BriefcaseIcon,
  HomeIcon,
  LinkedinIcon,
  RssIcon
} from '@/icons/solid'
import { MailIcon } from '@/icons/solid'
import { NewsletterForm } from '@/components/newsletter-form'
import { XComIcon } from '@/icons/solid'
import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  BookmarkOutlineIcon,
  BriefcaseOutlineIcon,
  HomeOutlineIcon
} from './icons/outline'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './base/tooltip'

const menuLinks = [
  {
    label: 'Home',
    url: '/',
    IconActive: HomeIcon,
    IconInactive: HomeOutlineIcon
  },
  {
    label: 'Bookmarks',
    url: '/bookmarks',
    IconActive: BookmarkIcon,
    IconInactive: BookmarkOutlineIcon
  },
  {
    label: 'Portfolio',
    url: '/portfolio',
    IconActive: BriefcaseIcon,
    IconInactive: BriefcaseOutlineIcon
  }
]

const socialLinks = [
  {
    label: 'Follow on Twitter',
    url: 'https://twitter.com/edgarasben',
    icon: <XComIcon className="h-5 w-5" />,
    hoverClass: 'hover:text-black'
  },
  {
    label: 'Connect on LinkedIn',
    url: 'https://www.linkedin.com/in/edgarasben/',
    icon: <LinkedinIcon className="h-5 w-5" />,
    hoverClass: 'hover:text-[#0077B5]'
  },
  {
    label: 'Send email',
    url: 'mailto:hi@edgaras.com',
    icon: <MailIcon className="h-5 w-5" />
  }
]

export const Header = () => {
  const pathname = usePathname()

  const getIconClass = (url: string) =>
    cn('h-4 w-4', {
      'group-hover:text-primary': true,
      'text-primary': pathname === url
    })

  return (
    <header className="inset-y-0 left-0 md:fixed md:min-w-[320px] md:max-w-sm">
      <div className="flex h-full flex-col bg-raise shadow-raise ring-1 ring-neutral-fade">
        <div>
          <div className="border-b border-neutral-fade">
            <div className="space-y-2 p-6">
              <Link href={'/'}>
                <Image
                  src="/avatar.jpg"
                  className="border-bg-base shadow-md inline-block rounded-full border-2"
                  alt="Edgaras profile"
                  width={48}
                  height={48}
                />
              </Link>
              <dl className="space-y-1">
                <dt className="text-sm font-semibold">Edgaras Benediktavičius</dt>
                <dd className="text-sm text-neutral-fade">
                  Product designer and web developer
                </dd>
              </dl>
            </div>
          </div>
          <nav>
            <ul className="flex space-y-0.5 overflow-x-auto px-2 py-2 md:block md:py-6">
              {menuLinks.map(({ label, url, IconActive, IconInactive }) => (
                <li key={label}>
                  <Link
                    href={url}
                    className={cn(
                      'group flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-neutral-fade hover:bg-neutral-fade/50 hover:text-neutral'
                    )}
                  >
                    {pathname === url ? (
                      <IconActive className={getIconClass(url)} />
                    ) : (
                      <IconInactive className={getIconClass(url)} />
                    )}
                    <span
                      className={cn(
                        'text-sm',
                        pathname === url ? 'text-neutral' : ''
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="absolute right-4 top-4 flex gap-3 md:bottom-4 md:left-4 md:right-auto md:top-auto">
          <ThemeToggle />
          <a
            aria-label="Subscribe via RSS"
            href="/feed.xml"
            className="rounded-full p-2 text-neutral-fade transition-colors hover:bg-neutral-fade hover:text-primary  dark:hover:bg-neutral-fade dark:hover:bg-opacity-10"
          >
            <RssIcon className="h-4 w-4" />
          </a>
        </div>
        {/*       <div className="space-y-4">
          <NewsletterForm />
          <p className="text-center text-sm text-neutral-fade">
            Get updates on what I learn and build.
          </p>

          <ul className="flex justify-around text-neutral-fade">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  aria-label={link.label}
                  href={link.url}
                  className={`${
                    link.hoverClass ? link.hoverClass : 'hover:text-primary'
                  } block transition-colors`}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div> */}
      </div>
    </header>
  )
}
