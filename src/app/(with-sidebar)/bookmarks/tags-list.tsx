'use client'

import { useRouter } from 'next/navigation'
import { useOptimistic, useTransition } from 'react'
import { Database } from '@/lib/types/supabase'
import { cn } from '@/lib/utils'

type Tag = Database['public']['Views']['bookmark_tags_all']['Row']

export default function TagsList({
  currentTags,
  tags,
}: {
  currentTags: string[]
  tags: Tag[]
}) {
  let router = useRouter()
  let [pending, startTransition] = useTransition()
  let [optimisticTags, setOptimsticTags] = useOptimistic(currentTags)

  function addTag(value: string) {
    let newTags = [...optimisticTags, value]

    pushTags(newTags)
  }

  function removeTag(value: string) {
    let newTags = optimisticTags.filter((tag) => tag !== value)
    pushTags(newTags)
  }

  function pushTags(tags: string[]) {
    let newParams = new URLSearchParams(tags.map((tag) => ['tag', tag]))

    startTransition(() => {
      setOptimsticTags(tags)
      router.push(`?${newParams}`)
    })
  }

  return (
    <ul className="space-y-0.5">
      {tags.map((tag) => {
        const isCurrent = optimisticTags.includes(`${tag.name}`)
        return (
          <button
            key={tag.name}
            className={cn(
              'flex w-full justify-between rounded-lg border border-transparent bg-transparent px-2 py-2 text-left text-sm font-medium text-neutral-fade hover:bg-neutral-fade',
              isCurrent ? 'bg-neutral-fade text-neutral' : '',
            )}
            onClick={() => {
              if (isCurrent) {
                removeTag(tag.name || '')
              } else {
                addTag(tag.name || '')
              }
            }}
          >
            <span>{tag.name}</span>
            <span className="text-neutral-faded">{tag.count}</span>
          </button>
        )
      })}
    </ul>
  )
}
