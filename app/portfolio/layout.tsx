import type { Metadata } from 'next'

import localFont from 'next/font/local'

const satoshi = localFont({
  src: './Satoshi-Variable.woff2',
  variable: '--font-satoshi'
})

export const metadata: Metadata = {
  title: 'Portfolio'
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${satoshi.variable} h-full bg-[#BFDFB4] font-display`}>
      {children}
    </div>
  )
}
