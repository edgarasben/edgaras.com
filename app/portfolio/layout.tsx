import type { Metadata } from 'next'

import localFont from 'next/font/local'

const satoshi = localFont({
  src: './Satoshi-Variable.woff2',
  variable: '--font-satoshi'
})

export const metadata: Metadata = {
  title: 'Portfolio',
  openGraph: {
    description:
      'Design and development services to help you prototype and launch your web or mobile product.',
    images: [
      {
        url: 'https://edgaras.com/images/og-portfolio.jpg'
      }
    ]
  },
  twitter: {
    description:
      'Design and development services to help you prototype and launch your web or mobile product.',
    images: [
      {
        url: 'https://edgaras.com/images/og-portfolio.jpg'
      }
    ]
  }
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${satoshi.variable} h-full bg-[#BFDFB4] font-display`}>
      {children}
    </div>
  )
}
