'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ChangeEvent, useState, useTransition } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function Search({ initialValue }: { initialValue?: string }) {
  const [focused, setFocused] = useState(false)
  const { replace } = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(initialValue ?? '')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // Debounce the search input so we don't send a request on every keystroke
  const debounced = useDebouncedCallback((value: string) => {
    handleSearch(value)
  }, 500)

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }
    params.delete('page')

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="relative">
      <input
        placeholder="Search"
        type="search"
        value={search}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          handleChange(e)
          debounced(e.target.value)
        }}
        className="w-full rounded-lg bg-white p-2.5 shadow-sm outline-none placeholder:text-fg-neutral-faded focus:border-border-neutral-faded focus:bg-neutral focus:ring-border-neutral-faded"
      />

      {/*            {isPending && (
                <div className="absolute inset-y-0 right-0 flex items-center justify-center">
                    <Loader className="mr-4" />
                </div>
            )} */}
    </div>
  )
}
