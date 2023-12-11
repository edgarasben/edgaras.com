'use client'

import { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
/* import { useEffect } from 'react' */

export function ButtonCalendar({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: { brandColor: '#000000' }
        }
      })
    })()
  }, [])
  return (
    <button
      data-cal-link="edgaras/30min"
      className="rounded-full bg-primary px-8 py-4 text-xl font-bold tracking-wide text-on-primary transition-transform hover:rotate-2 hover:scale-105"
    >
      {children}
    </button>
  )
}
