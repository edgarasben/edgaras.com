'use client'

import { useEffect, useState } from 'react'

export function Grid() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'g' && e.metaKey) {
        e.preventDefault()
        setIsVisible((v) => !v)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        backgroundSize: '1ch 1em',
        backgroundImage:
          'linear-gradient(to right, rgb(0 0 0 / 1) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 1) 1px, transparent 1px)'
      }}
    />
  )
}
