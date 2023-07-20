import type { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'
import TagSwitcherButton from './TagSwitcherButton'

const supabase = createServerComponentClient<Database>({ cookies })

type BookmarkFull = Database['public']['Tables']['bookmarks']['Row']
type Bookmark = Pick<BookmarkFull, 'link' | 'title' | 'tags'>

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Bookmarks'
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
  { tag }: SearchParams
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
        })
      ])
      .filter(([category, items]) => items.length > 0)
  )
}

/* function BookmarkItem({ bookmark: { link, title } }: { bookmark: Bookmark }) {
  return link ? (
    <a key={link} href={link} className="block hover:bg-neutral transition-colors">
      <li className="flex gap-x-4 px-3 py-5">
        <div className="min-w-0 pl-3">
          <p className="text-sm font-semibold leading-6 text-fg-neutral">{title}</p>
        </div>
      </li>
    </a>
  ) : null
} */

export default async function BookmarksPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const { data: bookmarksData } = await supabase
    .from('bookmarks')
    .select('title, tags, link, created_at, id')
    .order('created_at', { ascending: false })

  const { data: tagsData } = await supabase.from('bookmark_tags_all').select('*')

  const groupedBookmarks = groupBy(bookmarksData || [], 'tags')
  const filteredData = filterBookmarksByTag(groupedBookmarks, searchParams)

  return (
    <div className="grid grid-cols-2 h-full">
      <section className="bg-neutral">
        <ul className="flex flex-wrap place-content-start gap-2 p-12 sticky top-0">
          <li>
            <TagSwitcherButton tag="All">All</TagSwitcherButton>
          </li>
          {tagsData?.map(({ name }) => (
            <li key={name}>
              <TagSwitcherButton tag={name || ''}>{name}</TagSwitcherButton>
            </li>
          ))}
        </ul>
      </section>
      <nav aria-label="Directory" className="overflow-y-scroll">
        {Object.keys(filteredData).length > 0 ? (
          Object.keys(filteredData).map((tag) => (
            <div key={tag} className="relative">
              <div className="sticky top-0 z-10 border-y bg-neutral border-b-border-neutral-faded border-t-border-neutral-faded px-3 py-1.5 text-sm font-semibold leading-6 text-fg-primary">
                <h3>{tag}</h3>
              </div>
              <ul role="list" className="divide-y divide-border-neutral-faded">
                {filteredData[tag].map((bookmark) => (
                  <li key={bookmark.link}>
                    <a
                      href={bookmark.link}
                      className="hover:bg-neutral transition-colors flex gap-x-4 px-3 py-5"
                    >
                      <div className="min-w-0 pl-3">
                        <p className="text-sm font-semibold leading-6 text-fg-neutral">
                          {bookmark.title}
                        </p>
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
      </nav>
    </div>
  )
}

///////// Helper functions
interface Groupable {
  [key: string]: any
}

const groupBy = <T extends Groupable>(array: T[], key: string): Record<string, T[]> => {
  return array.reduce((result: Record<string, T[]>, obj: T) => {
    obj[key].forEach((k: any) => (result[k] = result[k] || []).push(obj))
    return result
  }, {})
}
