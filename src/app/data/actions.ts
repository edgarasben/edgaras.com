'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function deleteBookmark(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const id = formData.get('id')
  const { error } = await supabase.from('bookmarks').delete().eq('id', `${id}`)

  return revalidatePath('/')
}

export async function createBookmark(prevState: any, formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const title = formData.get('title') as string
  const link = formData.get('link') as string
  const tagsString = formData.get('tags') as string
  const tags = tagsString.split(',').map((i) => i.trim())

  const { data, error } = await supabase
    .from('bookmarks')
    .insert({ title: title, link: link, tags: tags })
    .select()

  revalidatePath('/bookmarks')
  redirect('/bookmarks')
  if (error) return { error: JSON.stringify(error) }
  if (data) return { message: 'Success' }
}
