import { getPosts, Post } from '@/lib/get-posts'
import { Container } from '@/components/container'
import { Card } from '@/components/card'
import type { Metadata } from 'next'

export const revalidate = 30 // revalidate every 30 secs

export const metadata: Metadata = {
  title: 'Posts'
}

export default async function PostsPage() {
  const posts = await getPosts()
  return (
    <Container>
      <section>
        <h2 className="p-8 text-xl font-semibold">Latest posts</h2>
        <ul>
          <li>
            {posts.map((post: Post) => (
              <Card key={post.slug} data={post} />
            ))}
          </li>
        </ul>
      </section>
    </Container>
  )
}
