import { getPublicArticles } from '@/data/queries'
import portfolioProjects from '@/app/portfolio/data.json'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function sitemap() {
  const articles = await getPublicArticles()

  let articlesFeed =
    articles?.map((article) => ({
      url: `https://edgaras.com/${article.slug}`,
      lastModified: new Date(article.updated_at ?? '').toISOString().split('T')[0]
    })) ?? []

  let routes = ['', 'bookmarks', 'portfolio'].map((route) => ({
    url: `https://edgaras.com/${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  const projects = portfolioProjects.map((project) => ({
    url: `https://edgaras.com/portfolio/${project.slug}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...articlesFeed, ...projects]
}
