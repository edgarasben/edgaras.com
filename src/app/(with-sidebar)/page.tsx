import { Card } from '@/components/base/card'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 30

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('title, markdown, slug, created_at')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

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
