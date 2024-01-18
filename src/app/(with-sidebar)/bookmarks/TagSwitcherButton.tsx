'use client'

import { cn } from '@/lib/utils'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function ExampleClientComponent({
  children,
  ...props
}: {
  children: React.ReactNode
  tag: string
}) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  function path() {
    if (props.tag === 'All') return '/bookmarks'
    if (props.tag === 'Latest')
      return pathname + '?' + createQueryString('latest', 'true')
    return pathname + '?' + createQueryString('tag', props.tag)
  }

  return (
    <button
      className={cn(
        'flex w-full justify-between rounded-lg border border-transparent bg-transparent px-2 py-2 text-left text-sm font-medium text-neutral-fade hover:bg-neutral-fade',
        props.tag === searchParams.get('tag') ||
          (searchParams.get('tag') === null && props.tag === 'All')
          ? 'bg-neutral-fade text-neutral'
          : '',
      )}
      onClick={() => {
        router.push(path())
      }}
    >
      {children}
    </button>
  )
}
