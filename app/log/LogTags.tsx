'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function LogTags({ data }: { data: any }) {
  const searchParams = useSearchParams()!
  const pathname = usePathname()

  const currentTag = searchParams.get('tag')

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  return (
    data && (
      <div className="flex flex-wrap gap-2 pb-8">
        <Link
          href={pathname + ''}
          className={`rounded-md ${
            !currentTag ? 'bg-primary text-white' : 'bg-black/5'
          } px-3.5 py-1.5`}
        >
          All
        </Link>
        {data.map((tag: any) => (
          <Link
            href={pathname + '?' + createQueryString('tag', tag.name)}
            key={tag.name}
            className={`rounded-md ${
              currentTag === tag.name ? 'bg-primary text-white' : 'bg-black/5'
            } px-3.5 py-1.5`}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    )
  )
}
