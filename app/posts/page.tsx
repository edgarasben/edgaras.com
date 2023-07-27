import { Container } from '@/components/container'
import { Card } from '@/components/card'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabaseClient'

export const revalidate = 30

export const metadata: Metadata = {
  title: 'Posts'
}

export default async function PostsPage() {
  const { data: posts } = await supabase
    .from('posts')
    .select('title, markdown, slug, created_at')
    .order('created_at', { ascending: false })

  return (
    <Container>
      <section>
        <h2 className="p-8 text-xl font-semibold">Latest postss</h2>
        <ul>
          {posts?.map((post: any) => (
            <li key={post.slug}>
              <Card data={post} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
