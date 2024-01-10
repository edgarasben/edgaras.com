import { Card } from '@/components/base/card'
import { PlusIcon } from '@/components/icons/solid'
import { getArticles, getUser } from '@/data/queries'
import Link from 'next/link'

export const revalidate = 30

export default async function ArticlesPage() {
  const user = await getUser()
  const articles = await getArticles()

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
