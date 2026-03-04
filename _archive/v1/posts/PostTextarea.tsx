'use client'

import { startTransition } from 'react'

import { Avatar } from './Avatar'
import { Database } from '@/lib/types/supabase'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export function PostTextarea() {
  const router = useRouter()
  const createPost = async (formData: FormData) => {
    const markdown = formData.get('markdown') as string
    const status = 'public'

    if (markdown) {
      const supabase = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      await supabase.from('posts').insert({ markdown, status })
      router.refresh()
    }
  }

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    //
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()

      startTransition(() => {
        createPost(new FormData(event.currentTarget.form as HTMLFormElement))
      })
    }
  }

  return (
    <div className="flex items-start">
      <Avatar />
      <div className="flex-1 space-x-4">
        <div
          aria-hidden="true"
          className="via-border-neutral-fade gradient h-[1px] bg-gradient-to-r from-black/0 to-black/0"
        />
        <form key={new Date().toUTCString()}>
          <label htmlFor="markdown" className="sr-only">
            Write your post
          </label>
          <textarea
            rows={3}
            name="markdown"
            id="markdown"
            className="block w-full border-0 border-transparent bg-transparent p-4 text-lg focus:ring-0"
            placeholder="What is happening?!"
            onKeyDown={handleTextareaKeyDown}
          />
        </form>
        <div
          aria-hidden="true"
          className="via-border-neutral-fade gradient h-[1px] bg-gradient-to-r from-black/0 to-black/0"
        />
      </div>
    </div>
  )
}
