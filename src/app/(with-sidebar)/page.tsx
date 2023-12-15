import { Card } from '@/components/base/card'
import { getArticles } from '@/data/queries'

export const revalidate = 30

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="p-6">
      <h2 className="font-semibold tracking-wide md:p-4">Latest articles</h2>
      <ul>
        {articles?.map((article) => (
          <li key={article.slug}>
            <Card data={article} />
          </li>
        ))}
      </ul>
    </div>
  )
}
