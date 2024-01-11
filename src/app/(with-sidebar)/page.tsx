import { Card } from '@/components/base/card'
import { PlusIcon } from '@/components/icons/solid'
import { getDraftArticles, getPublicArticles, getUser } from '@/data/queries'
import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'

export default async function ArticlesPage() {
  const getCachedPublicArticles = cache(
    // Cache public articles
    async () => getPublicArticles(),
    ['articles'],
    {
      revalidate: 30, // for 30 seconds
    },
  )
  const publicArticles = (await getCachedPublicArticles()) ?? []

  const user = await getUser()

  const articles = user
    ? [...publicArticles, ...((await getDraftArticles()) ?? [])] // If user is logged in, mix public and draft articles
    : publicArticles // Otherwise, only show public articles

  return (
    <div className="p-2 md:p-6">
      <h2 className="p-4 font-semibold tracking-wide">Latest articles</h2>
      <ul>
        {articles?.map((article) => (
          <li key={article.slug}>
            <Card data={article} />
          </li>
        ))}
      </ul>
      {user && (
        <div className="fixed bottom-4 right-4 flex gap-3">
          <Link
            href={`/articles/create`}
            className="rounded-full p-2 text-neutral-fade transition-colors hover:bg-neutral-fade hover:text-primary dark:hover:bg-neutral-fade dark:hover:bg-opacity-10"
          >
            <PlusIcon className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
