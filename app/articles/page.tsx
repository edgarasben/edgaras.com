import { Container } from '@/components/container'
import { Card } from '@/components/card'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Article'
}

export default async function ArticlesPage() {
  const { data: articles } = await supabase
    .from('articles')
    .select('title, markdown, slug, created_at')
    .order('created_at', { ascending: false })

  return (
    <Container>
      <section>
        <h2 className="p-8 text-xl font-semibold">Latest articles</h2>
        <ul>
          {articles?.map((post: any) => (
            <li key={post.slug}>
              <Card data={post} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
