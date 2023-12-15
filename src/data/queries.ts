'use server'

import { supabase } from '@/lib/supabaseClient'

export async function getArticles() {
  const { data: articles } = await supabase
    .from('articles')
    .select('title, markdown, slug, published_at')
    .eq('status', 'public')
    .order('created_at', { ascending: false })

  return articles
}

export async function getArticle(slug: string) {
  const { data: article, error } = await supabase
    .from('articles')
    .select('title, markdown, slug, published_at')
    .eq('slug', slug)
    .eq('status', 'public')
    .single()

  return { article, error }
}
