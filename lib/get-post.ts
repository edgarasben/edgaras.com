import { Client as NotionClient, LogLevel } from '@notionhq/client'
const { NotionToMarkdown } = require('notion-to-md')

const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN
    /*  logLevel: LogLevel.DEBUG, */
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

    n2m.setCustomTransformer('callout', async (block: any): Promise<string> => {
        const { id, has_children } = block
        let callout_string = ''
        if (!has_children) {
            return 'MEH'
        }
        return 'HAHA'
    })

    // notice second argument, totalPage.
    const mdblocks = await n2m.pageToMarkdown(pageId, 2)
    const markdown = n2m.toMarkdownString(mdblocks)

    // TODO: Fix the type, can't be "any"
    const results = response.results.map((result: any) => {
        return {
            title: result.properties.Name.title[0].plain_text,
            firstPosted: result.properties['First posted'].date.start,
            slug: result.properties.Slug.rich_text[0].plain_text,
            summary: result.properties.Summary.rich_text[0]?.plain_text || null,
            content: markdown
        }
    })

    return results[0]
}
