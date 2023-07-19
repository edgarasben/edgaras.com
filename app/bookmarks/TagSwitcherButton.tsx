'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import path from 'path'
import { useCallback } from 'react'

export default function ExampleClientComponent({
  children,
  ...props
}: {
  children: React.ReactNode
  tag: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()!

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  function path() {
    if (props.tag === 'All') return '/bookmarks'
    if (props.tag === 'Latest')
      return pathname + '?' + createQueryString('latest', 'true')
    return pathname + '?' + createQueryString('tag', props.tag)
  }

  return (
    <Link
      href={path()}
      className={`inline-block rounded-lg hover:bg-black hover:text-white p-4 ${
        props.tag === searchParams.get('tag') ||
        (searchParams.get('tag') === null && props.tag === 'All')
          ? 'bg-black text-white'
          : 'bg-white text-black'
      }`}
    >
      {children}
    </Link>
  )
}
