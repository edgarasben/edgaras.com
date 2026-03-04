import '@/styles/globals-v3.css'
import { Inter as sans } from 'next/font/google'

import type { Metadata } from 'next'

import { Viewport } from 'next'
import Script from 'next/script'

const fontSans = sans({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-sans'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  metadataBase: new URL('https://edgaras.com'),
  title: {
    default: 'Edgaras — Co-Founder, Designer, Coder',
    template: '%s | edgaras.com'
  },
  robots: 'follow, index',
  description:
    'I design and code things for the web. Get updates on what I learn and build by joining my mailing list.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`h-full ${fontSans.variable}`}>
      <head>
        <link href="https://github.com/edgarasben" rel="me" />
        <Script
          defer
          src="https://umami.edgaras.com/script.js"
          data-website-id="830cff46-5be7-45bd-b659-27ceb328f7a7"
        />
      </head>
      <body className="bg-default text-default h-full antialiased">{children}</body>
    </html>
  )
}
