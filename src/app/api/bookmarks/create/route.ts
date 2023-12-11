import { supabaseAdmin } from '../../../../lib/supabase/admin'
import * as cheerio from 'cheerio'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const link = body.url

    if (body.token !== process.env.API_ACCESS_KEY) {
      return Response.json({ message: 'Invalid access token' })
    }

    const title = await getMetaTitle(link)

    const { data, error } = await supabaseAdmin
      .from('bookmarks')
      .insert({ link: link, title: title })
      .select()
      .single()

    if (data) return Response.json({ title: data.title })

    if (error) {
      if (error.code === '23505')
        return Response.json({ error: 'The link already exists.' })
      return Response.json({ error: error.message })
    }
  } catch (error) {
    return Response.json({ error: 'Unknown error occured' })
  }
}

async function getMetaTitle(url: string) {
  try {
    const response = await fetch(url)
    const body = await response.text()
    const $ = cheerio.load(body)
    const title = $('title').text()
    return title
  } catch (error) {
    console.error('Error fetching title:', error)
  }
}
