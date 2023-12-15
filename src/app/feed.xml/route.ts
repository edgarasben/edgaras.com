import { getArticles } from '@/data/queries'
import RSS from 'rss'

export async function GET() {
  const feed = new RSS({
    title: 'edgaras.com',
    description: 'Edgaras is a Software Designer and Developer',
    generator: 'RSS for Node and Next.js',
    feed_url: 'https://edgaras.com/feed.xml',
    site_url: 'https://edgaras.com/',
    managingEditor: 'hi@edgaras.com (Edgaras Benediktavicius)',
    webMaster: 'hi@edgaras.com (Edgaras Benediktavicius)',
    copyright: `Copyright ${new Date()
      .getFullYear()
      .toString()}, Edgaras Benediktavicius`,
    language: 'en-US',
    pubDate: new Date().toUTCString(),
    ttl: 60,
  })

  const articles = await getArticles()

  if (articles) {
    articles.map((article) => {
      feed.item({
        title: article.title,
        description: article.description || '',
        url: `https://edgaras.com/${article.slug}`,
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
