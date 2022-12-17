import { Client as NotionClient, LogLevel } from '@notionhq/client'

const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN,
    /*     logLevel: LogLevel.DEBUG, */
})

export async function getPosts() {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID as string,
        filter: {
            and: [
                {
                    property: 'Post to Blog',
                    checkbox: {
                        equals: true,
                    },
                },
                {
                    property: 'Status',
                    status: {
                        equals: 'Public',
                    },
                },
            ],
        },
    })

    // TODO: Fix the type, can't be "any"
    const results = response.results.map((result: any) => {
        return {
            title: result.properties.Name.title[0].plain_text,
            firstPosted: result.properties['First posted'].date.start,
            slug: result.properties.Slug.rich_text[0].plain_text,
            summary: result.properties.Summary.rich_text[0].plain_text,
        }
    })

    return results
}
