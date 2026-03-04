import '@/styles/globals-v6.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edgaras',
  description: 'Edgaras Benediktavičius'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
