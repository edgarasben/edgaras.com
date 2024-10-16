import { getUser } from '@/data/queries'
import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/types/supabase'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BookmarkLink } from './bookmark-link'
import CreateBookmarkForm from './create-bookmark-form'
import TagsList from './tags-list'

export const revalidate = 30
export const metadata: Metadata = {
  title: 'Bookmarks'
}

export type Bookmark = Database['public']['Tables']['bookmarks']['Row']
type GroupedBookmarks = {
  [tag: string]: Bookmark[]
}

export default async function BookmarksPage({
  searchParams
}: {
  searchParams: { tag?: string | string[]; latest?: boolean }
}) {
  const user = await getUser()

  const currentTags = Array.isArray(searchParams.tag)
    ? searchParams.tag
    : searchParams.tag
      ? [searchParams.tag]
      : []

  const supabase = createClient()
  const { data: tagsData } = await supabase
    .from('bookmark_tags_all')
    .select('name, count')
    .order('name', { ascending: true })

  const { data: bookmarksData, count } = await supabase
    .from('bookmarks')
    .select('title, tags, link, created_at, id', {
      count: 'estimated',
      head: false
    })
    .order('created_at', { ascending: false })

  const groupedBookmarks = groupBy(bookmarksData ?? [], 'tags')
  const filteredData = filterBookmarksByTag(groupedBookmarks, currentTags)

  return (
    <div className="flex grid-cols-2 divide-x divide-neutral-fade">
      <nav className="hidden min-w-[320px] p-2 md:block">
        {user ? (
          <div>
            {`Logged in as ${user?.email}`}
            <CreateBookmarkForm />
          </div>
        ) : null}
        <div className="mb-0.5">
          <Link
            href="/bookmarks"
            className={cn(
              'flex w-full justify-between rounded-lg border border-transparent bg-transparent px-2 py-2 text-left text-sm font-medium text-neutral-fade hover:bg-neutral-fade',
              currentTags.length === 0 ? 'bg-neutral-fade text-neutral' : ''
            )}
          >
            <span>All</span> <span>{count}</span>
          </Link>
        </div>

        <TagsList currentTags={currentTags} tags={tagsData ?? []} />
      </nav>
      <section aria-label="Directory" className="w-full py-2">
        <h1 className="pb-4 pl-4 pt-2 text-sm font-semibold">Bookmarks</h1>
        {Object.keys(filteredData).length > 0 ? (
          Object.keys(filteredData).map((tag) => (
            <div key={tag} className="relative">
              <div className="sticky top-0 z-10 border-b border-l-2 border-t border-b-transparent border-l-primary border-t-transparent bg-fade/80 px-3 py-1.5 text-xs font-medium uppercase leading-6 text-primary backdrop-blur-sm">
                <h3>{tag === 'null' ? 'Untagged' : tag}</h3>
              </div>
              <ul role="list">
                {filteredData[tag].map((bookmark: Bookmark) => (
                  <li key={bookmark.link}>
                    <BookmarkLink
                      bookmark={bookmark}
                      withMenu={user ? true : false}
                    />
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

function filterBookmarksByTag(
  bookmarks: GroupedBookmarks,
  tags: string[]
): GroupedBookmarks {
  if (!tags.length) return bookmarks

  const includedItems = new Set()
  return Object.fromEntries(
    Object.entries(bookmarks)
      .map(([category, items]) => {
        return [
          category,
          items.filter(
            ({ tags: itemTags, link }) =>
              itemTags &&
              tags.every((tag) => itemTags.includes(tag)) &&
              includedItems.add(link)
          )
        ]
      })
      .filter(([_, items]) => items.length)
  )
}

// Group an array of objects by a key
function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((acc: Record<string, T[]>, item: T) => {
    const groupKey = String(item[key]) || 'Untagged'
    if (!acc[groupKey]) {
      acc[groupKey] = []
    }
    acc[groupKey].push(item)
    return acc
  }, {})
}
