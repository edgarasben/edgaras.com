import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card } from '@/components/card'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 30

export default async function IndexPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('title, markdown, slug, created_at')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

  return (
    <Container>
      <Header />
      <section>
        <h2 className="p-2 md:p-4 text-xl font-semibold">Latest articles</h2>
        <ul>
          {articles?.map((article) => (
            <li key={article.slug}>
              <Card data={article} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
