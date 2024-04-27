'use client'

import { deleteArticle } from '@/data/actions'
import { Tables } from '@/lib/types/supabase'
import { toast } from 'sonner'

export function DeleteArticle({ article }: { article: Tables<'articles'> }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        deleteArticle(new FormData(e.currentTarget)).then(() => {
          toast.success('Article deleted')
        })
      }}
      className="flex flex-col items-start"
    >
      <input type="hidden" name="slug" defaultValue={article?.slug} />
      <button
        type="submit"
        className="mt-24 flex flex-grow-0 border border-[red] bg-base leading-10"
      >
        Delete
      </button>
    </form>
  )
}
