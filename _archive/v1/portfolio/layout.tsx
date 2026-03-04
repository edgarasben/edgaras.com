import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  openGraph: {
    title: 'Edgaras — Software Designer and Developer',
    description:
      'Design and development services to help you prototype and launch your web or mobile product.',
    type: 'website',
    url: 'https://edgaras.com/portfolio',
    images: [
      {
        url: 'https://edgaras.com/images/og-portfolio.jpg',
        alt: 'Edgaras — Software Designer and Developer',
        width: 1200,
        height: 630
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@edgarasben',
    site: '@edgarasben',
    title: 'Edgaras — Software Designer and Developer',
    description:
      'Design and development services to help you prototype and launch your web or mobile product.',
    images: [
      {
        url: 'https://edgaras.com/images/og-portfolio.jpg',
        alt: 'Edgaras — Software Designer and Developer',
        width: 1200,
        height: 630
      }
    ]
  }
}

export default function PortfolioLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={`h-full bg-[#BFDFB4] font-display`}>{children}</div>
}
