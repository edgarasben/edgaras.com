import type { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import TagSwitcherButton from './TagSwitcherButton'

type BookmarkFull = Database['public']['Tables']['bookmarks']['Row']
type Bookmark = Pick<BookmarkFull, 'link' | 'title' | 'tags'>

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Bookmarks'
}
type SearchParams = {
  tag?: string[]
  // other possible keys...
}

type GroupedBookmarks = {
  [tag: string]: Bookmark[]
}

function groupBookmarksByTag(data: Bookmark[]) {
  return data?.reduce((acc: GroupedBookmarks, bookmark: Bookmark) => {
    bookmark.tags?.forEach((tag: string) => {
      if (!acc[tag]) {
        acc[tag] = []
      }
      acc[tag].push(bookmark)
    })
    return acc
  }, {})
}

function filterBookmarksByTag(
  groupedBookmarks: GroupedBookmarks,
  searchParams: SearchParams
): GroupedBookmarks {
  // If searchParams is empty, return all data
  if (Object.keys(searchParams).length === 0) {
    return groupedBookmarks
  }

  let includedItems = new Set()

  return Object.fromEntries(
    Object.entries(groupedBookmarks)
      .map(([category, items]: [string, Bookmark[]]) => [
        category,
        items.filter((item: Bookmark) => {
          if (
            item.tags &&
            item.tags.every((tag) => searchParams.tag?.includes(tag)) &&
            !includedItems.has(item.title)
          ) {
            includedItems.add(item.title)
            return true
          }
          return false
        })
      ])
      .filter(([category, items]) => items.length > 0)
  )
}

function BookmarkItem({ bookmark }: { bookmark: Bookmark }) {
  return bookmark.link ? (
    <a
      key={bookmark.link}
      href={bookmark.link}
      className="block hover:bg-neutral transition-colors"
    >
      <li className="flex gap-x-4 px-3 py-5">
        <div className="min-w-0 pl-3">
          <p className="text-sm font-semibold leading-6 text-fg-neutral">
            {bookmark.title}
          </p>
        </div>
      </li>
    </a>
  ) : null
}

export default async function BookmarksPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: bookmarksData } = await supabase
    .from('bookmarks')
    .select('title, tags, link, created_at, id')

  const { data: tagsData } = await supabase.from('bookmark_tags_all').select('*')

  const groupedBookmarks = groupBookmarksByTag(bookmarksData || [])
  const filteredData = filterBookmarksByTag(groupedBookmarks, searchParams)

  return (
    <div className="grid grid-cols-2 h-full">
      <section className="bg-neutral">
        <ul className="flex flex-wrap place-content-start gap-2 p-12 sticky top-0">
          <li>
            <TagSwitcherButton tag="All">All</TagSwitcherButton>
          </li>
          {tagsData?.map((tag) => (
            <li key={tag.name}>
              <TagSwitcherButton tag={tag.name || ''}>{tag.name}</TagSwitcherButton>
            </li>
          ))}
        </ul>
      </section>
      <nav className="" aria-label="Directory">
        {Object.keys(filteredData).length > 0 ? (
          Object.keys(filteredData).map((tag) => (
            <div key={tag} className="relative">
              <div className="sticky top-0 z-10 border-y bg-neutral border-b-border-neutral-faded border-t-border-neutral-faded px-3 py-1.5 text-sm font-semibold leading-6 text-fg-primary">
                <h3>{tag}</h3>
              </div>
              <ul role="list" className="divide-y divide-border-neutral-faded">
                {filteredData[tag].map((bookmark) => (
                  <BookmarkItem key={bookmark.link} bookmark={bookmark} />
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div>No matching tags found</div>
        )}
      </nav>
    </div>
  )
}
