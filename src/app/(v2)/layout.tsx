import '@/styles/globals-v2.css'
import { Azeret_Mono as body } from 'next/font/google'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js'
}

const fontBody = body({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-body'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${fontBody.variable}`}>
      <body>{children}</body>
    </html>
  )
}
