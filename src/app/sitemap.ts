import { getPublicArticles } from '@/data/queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const articles = await getPublicArticles()

  let articlesFeed =
    articles?.map((article) => ({
      url: `https://edgaras.com/${article.slug}`,
      lastModified: new Date(article.published_at ?? '')
        .toISOString()
        .split('T')[0],
    })) ?? []

  let routes = ['', 'bookmarks', 'portfolio'].map((route) => ({
    url: `https://edgaras.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...articlesFeed]
}
