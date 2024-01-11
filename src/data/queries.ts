'use server'

import { supabase } from '@/lib/supabaseClient'
import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

/* Auth */

export async function getUser() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return user
}

/* Articles */

export async function getPublicArticles() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

  return articles
}

// Including drafts
export async function getDraftArticles() {
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'draft')
    .order('created_at', { ascending: false })

  return articles
}

export async function getPublicArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'public')
    .single()

  return { article, error }
}

// Include draft articles
export async function getAnyArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  return { article, error }
}
