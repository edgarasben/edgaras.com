'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import DecryptedText from '../DecryptedText'
import { Grid } from '../Grid'

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
    <>
      <Grid />
      <div className="text-neutral-softer flex flex-col justify-center px-[4ch] py-[3rem]">
        <h1 className="text-neutral uppercase">Edgaras Benediktavičius</h1>
        <p className="uppercase">
          <DecryptedText
            text="Product Designer, Developer & Founder"
            maxIterations={10}
            animateOn="view"
            speed={35}
            sequential={true}
            encryptedClassName="blur-[1px] text-cyan-500"
          />
        </p>
        <br />
        <br />
        <ul className="text-neutral uppercase">
          <li>
            <Link href="https://knowmeifyoucan.com/">
              Know Me If You Can{' '}
              <span className="text-neutral-softer">
                (<span className="text-cyan-500 uppercase">Active</span>, Free, 2025)
              </span>
            </Link>
          </li>
          <li>
            Design Meets Code{' '}
            <span className="text-neutral-softer">
              (<span className="text-cyan-500 uppercase">Active</span>, Free, 2024)
            </span>
          </li>
          <li>
            Token Swapper{' '}
            <span className="text-neutral-softer">
              (<span className="text-cyan-500 uppercase">Active</span>, Free, 2024)
            </span>
          </li>
          <li>
            Prodhire{' '}
            <span className="text-neutral-softer uppercase">
              (<span className="text-cyan-500">Active</span>, Free, 2024)
            </span>
          </li>
          <li>
            Tools{' '}
            <span className="text-neutral-softer uppercase">
              (<span className="text-cyan-500">Active</span>, Free, 2024)
            </span>
          </li>
          <li>
            Expired Domains List{' '}
            <span className="text-neutral-softer uppercase">
              (<span className="text-cyan-500">Active</span>, $155, 2024)
            </span>
          </li>
          <li>
            SEO Broken Link Checker{' '}
            <span className="text-neutral-softer uppercase">
              (<span className="text-cyan-500">Active</span>, Free, 2024)
            </span>
          </li>

          <li>
            Best Writing{' '}
            <span className="text-neutral-softer">
              (<span className="text-cyan-500 uppercase">Active</span>, $63k, 2020)
            </span>
          </li>
          <li>
            Big on X{' '}
            <span className="text-neutral-softer">
              (<span className="uppercase">Discontinued</span>, $0, 2024)
            </span>
          </li>
        </ul>
        <br />
        <ul className="text-neutral uppercase">
          <li>
            About <span className="text-neutral-softer">(Me)</span>
          </li>
          <li>
            Craftled <span className="text-neutral-softer">(Business)</span>
          </li>
          <li>
            Service Intent <span className="text-neutral-softer">(Agency)</span>
          </li>
          <li>Posts</li>
          <li>Now</li>
          <li>Uses</li>
        </ul>
        <br />
        <ul className="text-neutral uppercase">
          <li>LinkedIn</li>
          <li>BlueSky</li>
          <li>RSS</li>
          <li>X</li>
        </ul>
      </div>
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
    </>
  )
}
