import type { Metadata } from 'next'
import { Database } from '@/lib/types/supabase'
import TagSwitcherButton from './TagSwitcherButton'
import { cookies } from 'next/headers'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/base/button'
import { getUser } from '@/app/data/queries'
import { supabase } from '@/lib/supabaseClient'
import { createBookmark, deleteBookmark } from '@/app/data/actions'
import { randomUUID } from 'crypto'
import CreateBookmarkForm from './create-bookmark-form'

type Bookmark = Database['public']['Tables']['bookmarks']['Row']

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Bookmarks',
}

type SearchParams = {
  tag?: string[]
  latest?: boolean
}

type GroupedBookmarks = {
  [tag: string]: Bookmark[]
}

function filterBookmarksByTag(
  groupedBookmarks: GroupedBookmarks,
  { tag }: SearchParams,
): GroupedBookmarks {
  if (!tag) {
    return groupedBookmarks
  }

  let includedItems = new Set()
  let searchTags = Array.isArray(tag) ? tag : [tag]

  return Object.fromEntries(
    Object.entries(groupedBookmarks)
      .map(([category, items]: [string, Bookmark[]]) => [
        category,
        items.filter(({ tags, link }: Bookmark) => {
          if (tags && searchTags.every((tag) => tags.includes(tag))) {
            includedItems.add(link)
            return true
          }
          return false
        }),
      ])
      .filter(([category, items]) => items.length > 0),
  )
}

/* function BookmarkItem({ bookmark: { link, title } }: { bookmark: Bookmark }) {
  return link ? (
    <a key={link} href={link} className="block hover:bg-neutral transition-colors">
      <li className="flex gap-x-4 px-3 py-5">
        <div className="min-w-0 pl-3">
          <p className="text-sm font-semibold leading-6 text-neutral">{title}</p>
        </div>
      </li>
    </a>
  ) : null
} */

export default async function BookmarksPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const user = await getUser()

  const { data: bookmarksData, count } = await supabase
    .from('bookmarks')
    .select('title, tags, link, created_at, id', {
      count: 'estimated',
      head: false,
    })
    .order('created_at', { ascending: false })

  const { data: tagsData, error } = await supabase
    .from('bookmark_tags_all')
    .select('name, count')
    .order('name', { ascending: true })

  const groupedBookmarks = groupBy(bookmarksData, 'tags')
  const filteredData = filterBookmarksByTag(groupedBookmarks, searchParams)

  return (
    <div className="flex grid-cols-2 divide-x divide-neutral-fade">
      <nav className="hidden min-w-[320px] p-2 md:block">
        <ul className="space-y-0.5">
          <li>
            <TagSwitcherButton tag="All">
              <span>All</span> <span>{count}</span>
            </TagSwitcherButton>
          </li>
          {tagsData?.map((tag) => (
            <li key={tag.name}>
              <TagSwitcherButton tag={tag.name || ''}>
                <span>{tag.name}</span>
                <span className="text-neutral-faded">{tag.count}</span>
              </TagSwitcherButton>
            </li>
          ))}
        </ul>
        {user ? (
          <div>
            {`Logged in as ${user?.email}`}
            <CreateBookmarkForm />
          </div>
        ) : null}
      </nav>
      <section aria-label="Directory" className="w-full py-2">
        {Object.keys(filteredData).length > 0 ? (
          Object.keys(filteredData).map((tag) => (
            <div key={tag} className="relative">
              <div className="sticky top-0 z-10 border-b border-l-2 border-t border-b-transparent border-l-primary border-t-transparent bg-fade/80 px-3 py-1.5 text-xs font-medium uppercase leading-6 text-primary backdrop-blur-sm">
                <h3>{tag}</h3>
              </div>
              <ul role="list">
                {filteredData[tag].map((bookmark) => (
                  <li key={bookmark.link}>
                    <a
                      href={bookmark.link}
                      className="mx-1 flex gap-x-4 rounded-lg py-5 transition-colors hover:bg-neutral-fade"
                    >
                      <div className="flex w-full min-w-0 justify-between pl-3">
                        <p className="white text-sm font-medium leading-6 text-neutral">
                          {bookmark.title}
                        </p>
                        {user ? (
                          <form action={deleteBookmark}>
                            <input
                              type="hidden"
                              name="id"
                              defaultValue={bookmark.id}
                            />
                            <Button className="bg-[red]">Delete</Button>
                          </form>
                        ) : null}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>No matching tags found</div>
        )}
      </section>
    </div>
  )
}

///////// Helper functions
const groupBy = <T extends Record<K, string[] | null>, K extends keyof T>(
  array: T[] | null,
  key: K,
): Record<string, T[]> => {
  if (!array) {
    return {}
  }

  return array.reduce((result: Record<string, T[]>, obj: T) => {
    const keyValue = obj[key]

    if (Array.isArray(keyValue) && keyValue.length > 0) {
      // Create a string representing the combination of tags
      const groupKey = keyValue.sort().join(', ')

      if (!result[groupKey]) {
        result[groupKey] = []
      }
      result[groupKey].push(obj)
    } else {
      // Handle items with no tags or null tags
      const noTagKey = 'Untagged'
      if (!result[noTagKey]) {
        result[noTagKey] = []
      }
      result[noTagKey].push(obj)
    }

    return result
  }, {})
}
