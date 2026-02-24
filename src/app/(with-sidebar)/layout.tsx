import '@/styles/globals.css'
import { Inter as sans } from 'next/font/google'
import display from 'next/font/local'

import type { Metadata, Viewport } from 'next'

import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/header'
import React from 'react'

// Sans-serif font
const fontSans = sans({
  weight: 'variable',
  subsets: ['latin'],
  variable: '--font-sans'
})

// Display font
const fontDisplay = display({
  src: '../../fonts/Satoshi-Variable.woff2',
  variable: '--font-display',
  display: 'swap'
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
    'I design and code things for the web. Get updates on what I learn and build by joining my mailing list.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`h-full ${fontDisplay.variable} ${fontSans.variable}`}
    >
      <body className="bg-fade text-neutral h-full antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex h-full flex-col md:flex-row">
            <Header />
            <section className="w-full md:ml-[320px]">{children}</section>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
