'use client'

import { ThemeProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Don't apply theme to portfolio page
  if (pathname?.includes('/portfolio')) return <>{children}</>

  /*  return <ThemeProvider attribute="class">{children}</ThemeProvider> */
  return <>{children}</>
}
