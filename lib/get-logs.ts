import { Client as NotionClient } from '@notionhq/client'

const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN
})

export type Log = {
    title: string
    created: string
    url?: string
    tag: string
}

export async function getLogs(): Promise<Log[]> {
    const response = await notion.databases.query({
        database_id: process.env.NOTION_LOGS_DATABASE_ID as string,
        sorts: [
            {
                property: 'Created',
                direction: 'descending'
            }
        ]
    })

    // TODO: Fix the type, can't be "any"
    const results = response.results.map((result: any) => {
        return {
            title: result.properties.Name.title[0]?.plain_text,
            created: result.properties['Created'].formula.date.start,
            url: result.properties.URL.url,
            tag: result.properties.Tags.multi_select[0]?.name
        }
    })

    return results
}
