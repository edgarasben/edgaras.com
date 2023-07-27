import { Header } from '@/components/header'
import { Container } from '@/components/container'
import { Card } from '@/components/card'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'
export const revalidate = 30

export default async function IndexPage() {
  const supabase = createServerComponentClient({ cookies })
  const { data: posts } = await supabase
    .from('posts')
    .select('title, markdown, slug, created_at')
    .order('created_at', { ascending: false })

  return (
    <Container>
      <Header />
      <section>
        <h2 className="p-2 md:p-4 text-xl font-semibold">Latest posts</h2>
        <ul>
          {posts?.map((post) => (
            <li key={post.slug}>
              <Card data={post} />
            </li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
