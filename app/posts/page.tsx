import { Container } from '@/components/container'
import { Card } from '@/components/card'
import type { Metadata } from 'next'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export const metadata: Metadata = {
  title: 'Posts'
}

export default async function PostsPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase
    .from('posts')
    .select('title, markdown, slug, created_at')

  return (
    <Container>
      <section>
        <h2 className="p-8 text-xl font-semibold">Latest posts</h2>
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
