import { getAllBookmarks } from '../../../../../db'
import { Grid } from '../../Grid'
import { BookmarkList } from './BookmarkList'
import { TagTabs } from './TagTabs'

export default async function Page({
  searchParams
}: {
  searchParams: Promise<{ tags?: string }>
}) {
  const allBookmarks = await getAllBookmarks()

  // Get unique tags from all bookmarks
  const uniqueTags = Array.from(
    new Set(allBookmarks.flatMap((bookmark) => bookmark.tags || []).filter(Boolean))
  ).sort()

  // Filter bookmarks if tags are selected
  const selectedTags = (await searchParams).tags?.split(',').filter(Boolean) || []
  const filteredBookmarks =
    selectedTags.length > 0
      ? allBookmarks.filter((bookmark) =>
          selectedTags.every((tag) => bookmark.tags?.includes(tag))
        )
      : allBookmarks

  return (
    <div className="text-neutral-softer flex flex-col justify-center gap-[3rem] px-[4ch] py-[3rem]">
      <TagTabs tags={uniqueTags} />
      <BookmarkList initialBookmarks={filteredBookmarks} />
      <Grid />
    </div>
  )
}
