import { desc } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { bookmarks } from './schema'

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL!, { prepare: false })

export const db = drizzle(client)

export async function getAllBookmarks() {
  const data = await db.select().from(bookmarks).orderBy(desc(bookmarks.createdAt))
  return data
}
