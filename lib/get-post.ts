import { Client as NotionClient } from '@notionhq/client'
const { NotionToMarkdown } = require('notion-to-md')
import { markdownToHtml } from './markdown-to-html'

const notion = new NotionClient({
  auth: process.env.NOTION_TOKEN
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export async function getPost(slug: string) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_POSTS_DATABASE_ID as string,
    filter: {
      and: [
        {
          property: 'Post to Blog',
          checkbox: {
            equals: true
          }
        },
        {
          property: 'Status',
          status: {
            equals: 'Public'
          }
        },
        {
          property: 'Slug',
          rich_text: {
            equals: slug
          }
        }
      ]
    }
  })

  const pageId = response.results[0].id

  /*     n2m.setCustomTransformer('callout', async (block: any): Promise<string> => {
        const { id, has_children } = block
        let callout_string = ''
        if (!has_children) {
            return 'TEST1'
        }
        return 'TEST2'
    }) */

  const mdblocks = await n2m.pageToMarkdown(pageId, 2) // Second argument is totalPage
  const markdown = n2m.toMarkdownString(mdblocks)
  const html = await markdownToHtml(markdown)

  // TODO: Fix the type, can't be "any"
  const results = response.results.map((result: any) => {
    return {
      title: result.properties.Name.title[0].plain_text,
      firstPosted: result.properties['First posted'].date.start,
      slug: result.properties.Slug.rich_text[0].plain_text,
      summary: result.properties.Summary.rich_text[0]?.plain_text || null,
      html: html
    }
  })

  return results[0]
}
