'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '../../../../db'
import { BookmarkInsert, bookmarks } from '../../../../db/schema'

export async function updateBookmark(id: number, data: BookmarkInsert) {
  await db.update(bookmarks).set(data).where(eq(bookmarks.id, id))

  revalidatePath('/tui/bookmarks')
}

export async function deleteBookmark(id: number) {
  await db.delete(bookmarks).where(eq(bookmarks.id, id))
  
  revalidatePath('/tui/bookmarks')
}
