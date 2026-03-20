import { Container } from '@/components/container'
import { PencilIcon } from '@/components/icons/solid'
import { getAnyArticle, getPublicArticle, getUser } from '@/data/queries'
import { createClient } from '@/lib/supabase/client'
import { format, isSameDay, isThisYear } from 'date-fns'
import type { Metadata } from 'next'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { bundledLanguages, createHighlighter } from 'shiki/bundle/web'

export const revalidate = 30

interface PostPageProps {
  params: Promise<{
    slug: string[]
  }>
}

export async function generateMetadata(props: PostPageProps): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug.toString()
  const { article } = await getPublicArticle(slug)
  return { title: article?.title }
}

export default async function PostPage(props0: PostPageProps) {
  const params = await props0.params;
  const user = await getUser()
  const slug = params.slug.toString()
  const { article, error } = user
    ? await getAnyArticle(slug) // Include draft articles
    : await getPublicArticle(slug)

  if (error) {
    return notFound()
  }

  const highlighter = await createHighlighter({
    themes: ['github-dark'],
    langs: [...Object.keys(bundledLanguages)]
  })

  const components = {
    img: (props: any) => (
      <Image alt={props.alt} width={800} height={450} {...props} />
    ),
    a: (props: any) => (
      <Link
        href={props.href}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="External Link Click"
        data-umami-event-href={props.href}
      >
        {props.children}
      </Link>
    ),
    pre: ({ children }: any) => {
      const code = children.props.children.trim()
      const language = children.props.className?.replace(/language-/, '') || 'text'

      const highlightedCode = highlighter.codeToHtml(code, {
        lang: language,
        theme: 'github-dark'
      })

      return <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    }
  }

  const datePublished = () => {
    if (article?.published_at) {
      return isThisYear(article.published_at)
        ? format(article.published_at, 'MMMM d')
        : format(article.published_at, 'yyyy-MM-dd')
    }
  }

  const dateUpdated = () => {
    if (article && isSameDay(article.published_at, article.updated_at)) return
    if (article?.updated_at) {
      return isThisYear(article.updated_at)
        ? format(article.updated_at, 'MMMM d')
        : format(article.updated_at, 'yyyy-MM-dd')
    }
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
      <article className="prose max-w-none break-words lg:prose-xl prose-h1:text-center prose-h1:text-5xl prose-h2:pt-8 prose-h2:text-2xl prose-figcaption:text-neutral-fade prose-pre:bg-neutral-fade">
        <h1>{article?.title}</h1>

        <div className="flex justify-center space-x-1">
          {article?.published_at && (
            <time
              dateTime="2018-07-07"
              className="inline-block text-center text-sm text-neutral-fade"
            >
              Published: {datePublished()}{' '}
              {dateUpdated() && <>· Updated: {dateUpdated()}</>}
            </time>
          )}
        </div>

        {article?.status === 'draft' && (
          <div className="flex justify-center pt-8">
            <div className="inline-block rounded-full bg-neutral px-2 text-2xs font-medium uppercase leading-5">
              {article.status}
            </div>
          </div>
        )}

        <div className="pt-8 md:pt-16">
          <MDXRemote
            source={article?.markdown ?? ''}
            components={components as MDXRemoteProps['components']}
          />
        </div>
      </article>
    </Container>
  )
}

export async function generateStaticParams() {
  const supabase = createClient()
  const { data: articles } = await supabase.from('articles').select('slug')

  if (!articles) {
    return []
  }

  return articles.map((article) => ({
    slug: article.slug
  }))
}
