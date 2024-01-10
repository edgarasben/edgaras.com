'use server'

import { supabase } from '@/lib/supabaseClient'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

export async function getUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

export async function getArticles() {
  const { data: articles } = await supabase
    .from('articles')
    .select('title, markdown, slug, published_at, description, tags')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

  return articles
}

export async function getArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('title, markdown, slug, published_at, description')
    .eq('slug', slug)
    .eq('status', 'public')
    .single()

  return { article, error }
}
