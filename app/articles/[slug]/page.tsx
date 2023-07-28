import { formatDate } from '@/lib/utils'
import { Container } from '@/components/container'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export const revalidate = 30

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slug = params.slug.toString()
  const { data: post } = await supabase
    .from('articles')
    .select('title')
    .eq('slug', slug)
    .single()
  return { title: post?.title }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.toString()
  const { data: post } = await supabase
    .from('articles')
    .select('title, markdown, slug, created_at')
    .eq('slug', slug)
    .single()

  const components = {
    img: (props: any) => (
      <Image alt={props.alt} width={800} height={450} {...props}>
        {props.children}
      </Image>
    )
  }

  return (
    <Container>
      <article className="prose max-w-none break-words lg:prose-xl prose-h1:text-center prose-figcaption:text-fg-neutral-faded prose-pre:bg-black">
        <h1>{post?.title}</h1>
        {post?.created_at && (
          <time dateTime="2018-07-07" className="block text-center text-fg-neutral-faded">
            {formatDate(post?.created_at)}
          </time>
        )}
        <div className="pt-16">
          <MDXRemote
            source={post?.markdown ?? ''}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: []
              }
            }}
          />
        </div>
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  const { data: articles } = await supabase.from('articles').select('slug')

  if (!articles) {
    return []
  }

  return articles.map((article) => ({
    slug: article.slug
  }))
}
