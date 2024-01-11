import { Container } from '@/components/container'
import Image from 'next/image'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { Metadata } from 'next'
import { formatDate } from '@/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import { highlight } from 'sugar-high'
import { getAnyArticle, getPublicArticle, getUser } from '@/data/queries'
import Link from 'next/link'
import { PencilIcon, RssIcon } from '@/components/icons/solid'

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
  const { article } = await getPublicArticle(slug)
  return { title: article?.title }
}

export default async function PostPage({ params }: PostPageProps) {
  const user = await getUser()
  const slug = params.slug.toString()
  const { article, error } = user
    ? await getAnyArticle(slug) // Include draft articles
    : await getPublicArticle(slug)

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
      {user && (
        <div className="fixed bottom-4 right-4 flex gap-3">
          <Link
            href={`/${slug}/update`}
            className="rounded-full p-2 text-neutral-fade transition-colors hover:bg-neutral-fade hover:text-primary dark:hover:bg-neutral-fade dark:hover:bg-opacity-10"
          >
            <PencilIcon className="h-4 w-4" />
          </Link>
        </div>
      )}
      <article className="prose max-w-none break-words pt-16 lg:prose-xl prose-h1:text-center prose-figcaption:text-neutral-fade prose-pre:bg-neutral-fade md:pt-0">
        <h1>{article?.title}</h1>

        {article?.published_at && (
          <time
            dateTime="2018-07-07"
            className="block text-center text-neutral-fade"
          >
            {formatDate(article?.published_at)}
          </time>
        )}

        {article?.status === 'draft' && (
          <div className="flex justify-center">
            <div className="text-2xs inline-block rounded-full bg-neutral px-2 font-medium uppercase leading-5">
              {article.status}
            </div>
          </div>
        )}
        <div className="pt-16">
          <MDXRemote
            source={article?.markdown ?? ''}
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
