import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (body.token !== process.env.API_ACCESS_KEY) {
      return Response.json({ message: 'Invalid access token' })
    }

    const { data, error } = await supabaseAdmin
      .from('bookmarks')
      .insert({ link: body.url })
      .select()
      .single()

    if (data) return Response.json({ link: data.link })

    if (error) {
      if (error.code === '23505')
        return Response.json({ error: 'The link already exists.' })
      return Response.json({ error: error.message })
    }
  } catch (error) {
    return Response.json({ error: 'Unknown error occured' })
  }
}
