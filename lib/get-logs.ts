import { Client as NotionClient } from '@notionhq/client'
const { NotionToMarkdown } = require('notion-to-md')

const notion = new NotionClient({
  auth: process.env.NOTION_TOKEN
})

const n2m = new NotionToMarkdown({ notionClient: notion })

export type Log = {
  title: string
  created: string
  url?: string
  category: string
  content?: string
}

export type LogTag = {
  name: string
}

export async function getLogs(settings: { tag: string }): Promise<Log[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_LOGS_DATABASE_ID as string,
    filter: {
      property: 'Tags',
      multi_select: {
        contains: settings.tag
      }
    },
    sorts: [
      {
        property: 'Created',
        direction: 'descending'
      }
    ]
  })

  // TODO: Fix the type, can't be "any"
  const results = response.results.map(async (result: any) => {
    const pageId = result.id
    // notice second argument, totalPage.
    const mdblocks = await n2m.pageToMarkdown(pageId, 2)
    const markdown = n2m.toMarkdownString(mdblocks)

    return {
      title: result.properties.Name.title[0]?.plain_text,
      created: result.properties['Created'].formula.date.start,
      url: result.properties.URL.url,
      category: result.properties.Category.multi_select[0]?.name,
      content: markdown
    }
  })

  return Promise.all(results)
}

export async function getLogTags(): Promise<any> {
  const response = await notion.databases.retrieve({
    database_id: process.env.NOTION_LOGS_DATABASE_ID as string
  })

  // @ts-ignore
  const tags = response.properties.Tags.multi_select.options.map((option: any) => {
    return {
      name: option.name
    }
  })

  return tags
}
