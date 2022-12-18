import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { Client as NotionClient } from '@notionhq/client'

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' })
})

const notion = new NotionClient({
    auth: process.env.NOTION_TOKEN
})

const subscribersDatabaseId = '935913563fa14819b93592cb6a12df03'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = schema.parse(JSON.parse(req.body))

    // Check if the email already exists in Notion database
    const subscriber = await notion.databases.query({
        database_id: subscribersDatabaseId,
        filter: {
            property: 'Email',
            email: {
                equals: body.email
            }
        }
    })

    // Add the subscriber to Notion, if it doesn't exist yet
    if (subscriber.results.length < 1) {
        await notion.pages.create({
            parent: {
                type: 'database_id',
                database_id: subscribersDatabaseId
            },
            properties: {
                Email: {
                    email: body.email
                }
            }
        })

        res.status(200).json({ result: 'added' })
        return
    }

    res.status(200).json({ result: 'exists' })
}
