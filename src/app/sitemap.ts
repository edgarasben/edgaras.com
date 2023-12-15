import { getArticles } from '@/data/queries'

export default async function sitemap() {
  const articles = await getArticles()

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