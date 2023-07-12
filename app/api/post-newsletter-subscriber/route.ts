import { z } from 'zod'
import { Client as NotionClient } from '@notionhq/client'
import { sendEmail } from '@/lib/send-email'
import { NextResponse } from 'next/server'

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' })
})

const notion = new NotionClient({
  auth: process.env.NOTION_TOKEN
})

const subscribersDatabaseId = '935913563fa14819b93592cb6a12df03'

export async function POST(request: Request) {
  const body = await request.json()

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

  let result = 'already-exists'

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

    const emailData = {
      toEmail: body.email,
      subject: '✅ Subscribed!',
      html: `<p>Hi there,</p>
            <br/>
            <p>Thanks for signing up for my newsletter! I'm excited to have you on board!</p>
            <br/>
            <p>If you're into design, web development, no-code, low-code, and bootstrapping (or even if you're just pretending to be because you accidentally subscribed and have no idea what any of those things are), you're in the right place.</p>
            <br/>
            <p>I'm looking forward to sharing the best new discoveries and ideas with you!"</p>
            <br/>
            <p>And in the meantime, feel free to reach out and introduce yourself.</p>
            <br/>
            <p>Warm regards,<br/>Edgaras</p>
            <br/><br/>
            <p>(If you did not request this newsletter, you can <a href="{$unsubscribe}">unsubscribe</a>)</p>`,
      text: 'Welcome! \n\n {$unsubscribe}'
    }

    await sendEmail(emailData)
    result = 'subscribed'
  }

  return NextResponse.json({ result: result })
}
