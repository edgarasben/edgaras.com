import { Container } from '@/components/container'
import Image from 'next/image'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { highlight } from 'sugar-high'

export const revalidate = 30

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const slug = params.slug.toString()
  const { data: post } = await supabase
    .from('articles')
    .select('title')
    .eq('slug', slug)
    .eq('status', true)
    .single()
  return { title: post?.title }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.toString()
  const { data: post, error } = await supabase
    .from('articles')
    .select('title, markdown, slug, created_at')
    .eq('slug', slug)
    .eq('status', 'public')
    .single()

  if (error) {
    return notFound()
  }

  function Code({ children, ...props }: { children: string }) {
    let codeHTML = highlight(children)
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
  }

  const components = {
    img: (props: any) => (
      <Image alt={props.alt} width={800} height={450} {...props}>
        {props.children}
      </Image>
    ),
    code: Code,
  }

  return (
    <Container>
      <article className="prose max-w-none break-words lg:prose-xl prose-h1:text-center prose-figcaption:text-neutral-fade prose-pre:bg-neutral-fade">
        <h1>{post?.title}</h1>
        {post?.created_at && (
          <time
            dateTime="2018-07-07"
            className="block text-center text-neutral-fade"
          >
            {formatDate(post?.created_at)}
          </time>
        )}
        <div className="pt-16">
          <MDXRemote
            source={post?.markdown ?? ''}
            components={components as MDXRemoteProps['components']} // Casting the components
            options={{
              mdxOptions: {
                remarkPlugins: [],
              },
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
    slug: article.slug,
  }))
}
