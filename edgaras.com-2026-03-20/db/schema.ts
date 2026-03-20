import { sql } from 'drizzle-orm'
import {
  bigint,
  check,
  pgPolicy,
  pgTable,
  pgView,
  text,
  timestamp,
  unique
} from 'drizzle-orm/pg-core'

export const bookmarks = pgTable(
  'bookmarks',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'bookmarks_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1
    }),
    createdAt: timestamp('created_at', {
      withTimezone: true,
      mode: 'string'
    }).defaultNow(),
    title: text(),
    tags: text().array(),
    link: text().notNull()
  },
  (table) => [
    unique('favs_link_key').on(table.link),
    pgPolicy('Enable insert for authenticated users only', {
      as: 'permissive',
      for: 'all',
      to: ['authenticated'],
      using: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`,
      withCheck: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`
    }),
    pgPolicy('Everyone can read bookmarks', {
      as: 'permissive',
      for: 'select',
      to: ['public']
    })
  ]
)

export const posts = pgTable(
  'posts',
  {
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    markdown: text().notNull(),
    status: text().notNull(),
    id: text().default(generate_random_19_digit_id()).primaryKey().notNull()
  },
  (table) => [
    unique('posts_id_key').on(table.id),
    pgPolicy('As an admin I can view, create, updated and delete all posts', {
      as: 'permissive',
      for: 'all',
      to: ['public'],
      using: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`,
      withCheck: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`
    }),
    pgPolicy('Everyone can see public posts', {
      as: 'permissive',
      for: 'select',
      to: ['public']
    }),
    check(
      'posts_status_check',
      sql`status = ANY (ARRAY['public'::text, 'draft'::text])`
    )
  ]
)

export const newsletters = pgTable(
  'newsletters',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: 'number' }).primaryKey().generatedByDefaultAsIdentity({
      name: 'newsletters_id_seq',
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1
    }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    subject: text(),
    text: text(),
    html: text(),
    status: text().default('draft').notNull()
  },
  (table) => [
    check(
      'newsletters_status_check',
      sql`status = ANY (ARRAY['draft'::text, 'sent'::text])`
    )
  ]
)

export const articles = pgTable(
  'articles',
  {
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    title: text().notNull(),
    markdown: text().notNull(),
    slug: text().primaryKey().notNull(),
    status: text().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    publishedAt: timestamp('published_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    description: text().notNull(),
    tags: text()
  },
  (table) => [
    unique('posts_slug_key').on(table.slug),
    pgPolicy('Enable all for admin', {
      as: 'permissive',
      for: 'all',
      to: ['authenticated'],
      using: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`,
      withCheck: sql`(auth.uid() = '1dc3cd41-40d9-4747-a1b5-434d5c423f1e'::uuid)`
    }),
    pgPolicy('Enable read access for all users', {
      as: 'permissive',
      for: 'select',
      to: ['public']
    })
  ]
)
export const bookmarkTagsAll = pgView('bookmark_tags_all', {
  name: text(),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  count: bigint({ mode: 'number' })
}).as(
  sql`SELECT unnest(bookmarks.tags) AS name, count(*) AS count FROM bookmarks GROUP BY (unnest(bookmarks.tags))`
)

function generate_random_19_digit_id() {
  const randomPart =
    BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) *
    BigInt(Math.floor(Math.random() * 1000000))
  const timestamp = BigInt(Date.now())
  return (timestamp + randomPart).toString()
}

export type Bookmark = typeof bookmarks.$inferSelect
export type BookmarkInsert = typeof bookmarks.$inferInsert
