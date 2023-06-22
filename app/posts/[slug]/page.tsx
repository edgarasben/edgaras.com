import { getPosts } from '@/lib/get-posts'
import { getPost } from '@/lib/get-post'
import { formatDate } from '@/lib/format-date'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export const revalidate = 60

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = params.slug.toString()
  const post = await getPost(slug)
  return { title: post.title }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.toString()

  const post = await getPost(slug)

  return (
    <Container>
      <article className="prose max-w-none break-words lg:prose-xl prose-h1:text-center prose-figcaption:text-fg-neutral-faded prose-pre:bg-black">
        <h1>{post.title}</h1>
        <time dateTime="2018-07-07" className="block text-center text-fg-neutral-faded">
          {formatDate(post.firstPosted)}
        </time>
        <div className="pt-16">
          <MDXRemote source={post.markdown.parent} />
        </div>
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug
  }))
}
