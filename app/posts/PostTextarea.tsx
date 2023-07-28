'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { Avatar } from './Avatar'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { startTransition, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function PostTextarea() {
  const router = useRouter()
  const createPost = async (formData: FormData) => {
    const markdown = formData.get('markdown') as string
    const status = 'public'

    if (markdown) {
      const supabase = createClientComponentClient<Database>()
      await supabase.from('posts').insert({ markdown, status })
      router.refresh()
    }
  }

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
          className="h-[1px] bg-gradient-to-r from-black/0 via-border-neutral-faded gradient to-black/0"
        />
        <form key={new Date().toUTCString()}>
          <label htmlFor="markdown" className="sr-only">
            Write your post
          </label>
          <textarea
            rows={3}
            name="markdown"
            id="markdown"
            className="block text-lg w-full border-0 border-transparent p-4 focus:ring-0 bg-transparent"
            placeholder="What is happening?!"
            onKeyDown={handleTextareaKeyDown}
          />
        </form>
        <div
          aria-hidden="true"
          className="h-[1px] bg-gradient-to-r from-black/0 via-border-neutral-faded gradient to-black/0"
        />
      </div>
    </div>
  )
}
