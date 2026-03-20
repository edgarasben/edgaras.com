'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'

type TagTabsProps = {
  tags: string[]
}

export function TagTabs({ tags }: TagTabsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const activeTags = searchParams.get('tags')?.split(',').filter(Boolean) || []

  const toggleTag = (tag: string) => {
    startTransition(() => {
      const newTags = activeTags.includes(tag)
        ? activeTags.filter((t) => t !== tag)
        : [...activeTags, tag]

      const params = new URLSearchParams(searchParams)
      if (newTags.length > 0) {
        params.set('tags', newTags.join(','))
      } else {
        params.delete('tags')
      }

      router.push(`?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => {
        const isActive = activeTags.includes(tag)
        return (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`mr-[2ch] transition-colors duration-150 ${
              isActive ? 'text-neutral' : 'text-neutral-softer hover:text-neutral'
            } ${isPending ? '' : ''} `}
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
