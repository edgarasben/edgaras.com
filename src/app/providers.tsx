'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { usePathname } from 'next/navigation'

function getForcedTheme(pathname: string) {
  if (pathname == '/portfolio') return 'light'
  return undefined
}

export function Providers({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  const forcedTheme = getForcedTheme(usePathname())

  return (
    <NextThemesProvider forcedTheme={forcedTheme}>
      {children}
    </NextThemesProvider>
  )
}
