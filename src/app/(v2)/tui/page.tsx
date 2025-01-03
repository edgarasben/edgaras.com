'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const items = [
    {
      title: 'Know Me If You Can',
      description: 'Deploy simple Node.js website or app on VPS (Hetzner)',
      isNew: true
    },
    {
      title: 'Product Studio',
      description: 'Deploy simple Node.js website or app on VPS (Hetzner)',
      isNew: false
    },
    {
      title: 'Craftled',
      description: 'Deploy simple Node.js website or app on VPS (Hetzner)',
      isNew: false
    },
    { title: 'Bookmarks', description: 'Yearly reflections 2022', isNew: false },
    {
      title: 'Articles',
      description: 'Deploy simple Node.js website or app on VPS (Hetzner)',
      isNew: false
    },
    { title: 'Projects', description: 'Yearly reflections 2022', isNew: false },
    { title: 'About Me', description: 'Yearly reflections 2022', isNew: false },
    { title: 'Uses', description: 'Yearly reflections 2022', isNew: false },
    { title: 'Now', description: 'Yearly reflections 2022', isNew: false },
    { title: 'RSS', description: 'Yearly reflections 2022', isNew: false },
    { title: '', description: '', isNew: false },
    { title: 'Newsletter', description: 'Yearly reflections 2022', isNew: false },
    { title: 'BlueSky', description: 'Yearly reflections 2022', isNew: false },
    { title: 'LinkedIn', description: 'Yearly reflections 2022', isNew: false },
    { title: 'X', description: 'Yearly reflections 2022', isNew: false }
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
      } else if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center tracking-wide uppercase">
      <dl className="flex flex-col space-y-1">
        {items.map((item, index) => (
          <div
            key={item.title}
            className="flex"
            tabIndex={0}
            onFocus={() => setSelectedIndex(index)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            <dt
              className={`relative ${selectedIndex === index ? "text-neutral select-none before:absolute before:-left-6 before:text-cyan-500 before:content-['>']" : 'text-neutral-softer'}`}
            >
              {item.title}&nbsp;
              {item.isNew && <span className="text-yellow-500">[NEW]</span>}
            </dt>
            {/* <dd>{item.title}</dd> */}
          </div>
        ))}
      </dl>
    </div>
  )
}
