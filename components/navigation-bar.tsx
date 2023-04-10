'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import HomeIcon from '@/components/icons/home-icon'
import MoonIcon from '@/components/icons/moon-icon'
import ChevronUpDownIcon from '@/components/icons/chevron-up-down-icon'

export const NavigationBar = () => {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const links = [
    {
      label: 'Home',
      path: '/'
    },
    {
      label: 'Posts',
      path: '/posts'
    },
    {
      label: 'Log',
      path: '/log'
    },
    {
      label: 'Portfolio',
      path: '/portfolio'
    }
    /*         {
            label: 'Lab',
            path: '/lab',
        },
        {
            label: 'About',
            path: '/about',
        },
        {
            label: 'Now',
            path: '/now',
        }, */
  ]

  const currentPathLabel = links.find((link) => link.path === pathname)?.label

  const linkClasses = (linkPath: string | null) =>
    `p-2 text-base ${
      pathname === linkPath ? 'text-white' : 'text-white/60'
    } hover:text-white focus:outline-none focus:ring-0 focus:border-0 focus:text-white`

  if (pathname?.includes('/portfolio')) return null
  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center p-2 xs:p-4 standalone:pb-safe-area-inset-bottom">
      <div className="rounded-lg border-t border-t-white/20 bg-black/60 ring-1 ring-black/70 backdrop-blur xs:w-auto">
        <ul
          className={`${
            showMobileMenu ? 'flex flex-col' : 'hidden'
          } divide-y divide-white/5 border-b border-white/5`}
        >
          {/* Mobile links */}
          {links.map(
            (link) =>
              // Exclude Home link
              link.path !== '/' && (
                <li key={link.label} className="w-full xs:hidden">
                  <Link
                    onClick={() => setShowMobileMenu(false)}
                    href={link.path}
                    aria-label={link.label}
                    className={
                      'block w-full p-3 text-center hover:bg-white/5 ' +
                      linkClasses(link.path)
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              )
          )}
        </ul>
        <ul className="flex items-center space-x-4 px-4">
          <li>
            <Link
              onClick={() => setShowMobileMenu(false)}
              href="/"
              aria-label="Home"
              className={'block ' + linkClasses('/')}
            >
              <HomeIcon className="h-5 w-5" />
            </Link>
          </li>
          {/* Desktop links */}
          {links.map(
            (link) =>
              // Exclude Home link
              link.path !== '/' && (
                <li key={link.label} className="hidden xs:block">
                  <Link
                    href={link.path}
                    aria-label={link.label}
                    className={'block ' + linkClasses(link.path)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
          )}
          {/* Mobile menu button */}
          <li className="xs:hidden">
            <button
              onClick={() => setShowMobileMenu((prev) => !prev)}
              aria-label="Menu"
              className="flex items-center p-2 text-base text-white hover:text-white focus:border-0 focus:text-white focus:outline-none focus:ring-0"
            >
              <span>{currentPathLabel}</span>
              <ChevronUpDownIcon className="h-5 w-5" />
            </button>
          </li>
          <li>
            <button
              /*               onClick={toggleTheme} */
              aria-label="Toggle theme"
              className={linkClasses(null)}
            >
              <MoonIcon className="h-5 w-5" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

/* function toggleTheme() {
  let darkThemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  let isSystemDarkTheme = darkThemeMediaQuery.matches
  let isDarkTheme = document.documentElement.classList.toggle('dark')

  if (isDarkTheme === isSystemDarkTheme) {
    delete window.localStorage.isDarkTheme
  } else {
    window.localStorage.isDarkTheme = isDarkTheme
  }
} */
