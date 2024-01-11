import { getArticles } from '@/data/queries'
import RSS from 'rss'
import config from '@/site.config.json'

export const revalidate = 0 // 0 seconds

export async function GET() {
  const feed = new RSS({
    title: config.domain,
    description: 'Edgaras is a Software Designer and Developer',
    feed_url: `${config.baseUrl}/feed.xml`,
    site_url: `${config.baseUrl}/`,
    managingEditor: 'hi@edgaras.com (Edgaras Benediktavicius)',
    webMaster: 'hi@edgaras.com (Edgaras Benediktavicius)',
    copyright: `Copyright ${new Date().getFullYear().toString()}, ${
      config.firstName
    } ${config.lastName}`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const articles = await getArticles()

  if (articles) {
    articles.map((article) => {
      feed.item({
        title: article.title,
        description: article.description,
        url: `${config.baseUrl}/${article.slug}`,
        categories: article.tags?.split(',') || [],
        author: 'Edgaras Benediktavicius',
        date: article.published_at || '',
      })
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
