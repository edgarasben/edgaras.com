'use server'

import { createClient } from '@/lib/supabase/server'
import { getRootURL } from '@/lib/utils'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

// User

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${getRootURL()}/api/auth/callback?originPath=login`,
    },
  })

  if (error) {
    console.log(error.message)
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login')
}

export async function signOut() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.auth.signOut()

  if (error) {
    return redirect('/login?message=Error logging out')
  }

  return redirect('/login')
}

// Bookmarks
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

  if (error) return { error: JSON.stringify(error) }
  if (data) {
    revalidatePath('/bookmarks')
    redirect('/bookmarks')
  }
}

// Articles
export async function createArticle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const markdown = formData.get('markdown') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  await supabase.from('articles').insert({
    slug: slug,
    title: title,
    markdown: markdown,
    description: description,
    status: status,
  })

  redirect(`/${slug}`)
}

export async function updateArticle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const markdown = formData.get('markdown') as string
  const description = formData.get('description') as string
  const status = formData.get('status') as string

  await supabase
    .from('articles')
    .update({
      slug: slug,
      title: title,
      markdown: markdown,
      description: description,
      status: status,
    })
    .eq('slug', slug)

  redirect(`/${slug}`)
}

export async function deleteArticle(formData: FormData) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const slug = formData.get('slug') as string

  await supabase.from('articles').delete().eq('slug', slug)

  redirect(`/`)
}
