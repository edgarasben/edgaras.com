import '@/styles/globals.css'
import { Inter as sans } from 'next/font/google'
import display from 'next/font/local'

import type { Metadata } from 'next'
import { NavigationBar } from '@/components/navigation-bar'

import { Viewport } from 'next'
import { Providers } from '@/app/providers'
import Script from 'next/script'

// Sans-serif font
const fontSans = sans({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-sans',
})

// Display font
const fontDisplay = display({
  src: '../fonts/Satoshi-Variable.woff2',
  variable: '--font-display',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://edgaras.com'),
  title: {
    default: 'Edgaras — Co-Founder, Designer, Coder',
    template: '%s | edgaras.com',
  },
  robots: 'follow, index',
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
        height: 630,
      },
    ],
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
        height: 630,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: https://github.com/pacocoursey/next-themes/issues/180#issuecomment-1736652696
    <html
      suppressHydrationWarning
      lang="en"
      className={`h-full ${fontDisplay.variable} ${fontSans.variable}`}
    >
      <head>
        <link href="https://github.com/edgarasben" rel="me" />

        <Script
          defer
          src="https://analytics.eu.umami.is/script.js"
          data-website-id="6b937d0e-517d-49ae-808a-4c7e88173574"
        />
      </head>
      <body className={`h-full bg-fade text-neutral antialiased `}>
        <>
          {/*       <NavigationBar /> */}
          <Providers>{children}</Providers>
        </>
      </body>
    </html>
  )
}
