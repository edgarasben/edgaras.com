'use client'

import Image from 'next/image'
import {
  BookmarkIcon,
  BriefcaseIcon,
  HomeIcon,
  LinkedinIcon,
  RssIcon,
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
  HomeOutlineIcon,
} from './icons/outline'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './base/tooltip'

const socialLinks = [
  {
    label: 'Follow on Twitter',
    url: 'https://twitter.com/edgarasben',
    icon: <XComIcon className="h-5 w-5" />,
    hoverClass: 'hover:text-black',
  },
  {
    label: 'Connect on LinkedIn',
    url: 'https://www.linkedin.com/in/edgarasben/',
    icon: <LinkedinIcon className="h-5 w-5" />,
    hoverClass: 'hover:text-[#0077B5]',
  },
  {
    label: 'Send email',
    url: 'mailto:hi@edgaras.com',
    icon: <MailIcon className="h-5 w-5" />,
  },
]

export const Header = () => {
  const pathname = usePathname()
  return (
    <header className="fixed inset-y-0 left-0 min-w-[320px] max-w-sm">
      <div className="flex h-full flex-col bg-base shadow-raise ring-1 ring-neutral-fade">
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
              <div className="space-y-1">
                <h1 className="text-sm font-semibold">
                  Edgaras Benediktavičius
                </h1>
                <p className="text-sm text-neutral-fade">
                  Product designer and web developer
                </p>
              </div>
            </div>
          </div>
          <nav>
            <ul className="space-y-0.5 px-2 py-6">
              <li>
                <Link
                  href="/"
                  className={cn(
                    'group flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-neutral-fade hover:bg-neutral-fade hover:text-neutral',
                  )}
                >
                  {pathname === '/' ? (
                    <HomeIcon
                      className={cn(
                        'h-4 w-4 group-hover:text-primary',
                        pathname === '/' ? 'text-primary' : '',
                      )}
                    />
                  ) : (
                    <HomeOutlineIcon
                      className={cn(
                        'h-4 w-4',
                        pathname === '/' ? 'text-primary' : '',
                      )}
                    />
                  )}

                  <span
                    className={cn('', pathname === '/' ? 'text-neutral' : '')}
                  >
                    Home
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/bookmarks"
                  className={cn(
                    'group flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-neutral-fade hover:bg-neutral-fade hover:text-neutral',
                  )}
                >
                  {pathname === '/bookmarks' ? (
                    <BookmarkIcon
                      className={cn(
                        'h-4 w-4 group-hover:text-primary',
                        pathname === '/bookmarks' ? 'text-primary' : '',
                      )}
                    />
                  ) : (
                    <BookmarkOutlineIcon
                      className={cn(
                        'h-4 w-4 group-hover:text-neutral',
                        pathname === '/bookmarks' ? 'text-primary' : '',
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      '',
                      pathname === '/bookmarks' ? 'text-neutral' : '',
                    )}
                  >
                    Bookmarks
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className={cn(
                    'group flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-neutral-fade hover:bg-neutral-fade hover:text-neutral',
                  )}
                >
                  {pathname === '/portfolio' ? (
                    <BriefcaseIcon
                      className={cn(
                        'h-4 w-4 group-hover:text-primary',
                        pathname === '/portfolio' ? 'text-primary' : '',
                      )}
                    />
                  ) : (
                    <BriefcaseOutlineIcon
                      className={cn(
                        'h-4 w-4 group-hover:text-neutral',
                        pathname === '/portfolio' ? 'text-primary' : '',
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      '',
                      pathname === '/portfolio' ? 'text-neutral' : '',
                    )}
                  >
                    Portfolio
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-3">
          <ThemeToggle />
          <a
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
