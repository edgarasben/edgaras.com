import Script from 'next/script'
import '@/styles/globals.css'
import PlausibleProvider from 'next-plausible'

import { NavigationBar } from '@/components/navigation-bar'

import type { Metadata } from 'next'
import { Providers } from './Providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://edgaras.com'),
  title: {
    default: 'Edgaras — Co-Founder, Designer, Coder',
    template: '%s | edgaras.com'
  },
  robots: 'follow, index',
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  description:
    'I design and code things for the web. Get updates on what I learn and build by joining my mailing list.',
  openGraph: {
    type: 'website',
    url: 'https://edgaras.com/',
    title: 'Edgaras — Co-Founder, Designer, Coder',
    description:
      'I design and code things for the web. Get updates on what I learn and build by joining my mailing list.',
    images: [
      {
        url: 'https://edgaras.com/images/og-main.png',
        alt: 'Edgaras — Co-Founder, Designer, Coder',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@edgarasben',
    site: '@edgarasben',
    title: 'Edgaras — Co-Founder, Designer, Coder',
    description:
      'I design and code things for the web. Get updates on what I learn and build by joining my mailing list.',
    images: [
      {
        url: 'https://edgaras.com/images/og-main.png',
        alt: 'Edgaras — Co-Founder, Designer, Coder',
        width: 1200,
        height: 630
      }
    ]
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png'
      }
    ]
  },
  manifest: '/site.webmanifest'
}
/* 
const themeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
` */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is for "next-themes" to not give warnings, add to html as an attribute
    <html lang="en" className="h-full bg-page text-fg-neutral antialiased">
      <head>
        <PlausibleProvider domain="edgaras.com" />
        <link href="https://github.com/edgarasben" rel="me" />
      </head>
      <body className="h-full">
        <>
          <NavigationBar />
          <Providers>{children}</Providers>
        </>
      </body>
    </html>
  )
}
