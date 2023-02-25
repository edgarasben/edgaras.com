import { NavigationBar } from '@/components/navigation-bar'
import '@/styles/globals.css'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-bg-page text-fg-neutral">
      <body>
        <>
          <NavigationBar />
          {children}
        </>
      </body>
    </html>
  )
}
