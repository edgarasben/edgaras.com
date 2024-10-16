'use server'

import { createClient } from '@/lib/supabase/client'
import { createServerClient } from '@/lib/supabase/server'

/* Auth */

export async function getUser() {
  const supabase = await createServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  return user
}

/* Articles */

export async function getPublicArticles() {
  const supabase = createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

  return articles
}

// Including drafts
export async function getDraftArticles() {
  const supabase = await createServerClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'draft')
    .order('created_at', { ascending: false })

  return articles
}

export async function getPublicArticle(slug: string) {
  const supabase = await createServerClient()
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
  const supabase = await createServerClient()
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .single()

  return { article, error }
}
