import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

import { Database } from '@/types/supabase'
import XMarkIcon from '@/components/icons/x-mark'
import { Avatar } from './Avatar'
import { PostTextarea } from './PostTextarea'

export const dynamic = 'force-dynamic'

type Post = Database['public']['Tables']['posts']['Row']

export const metadata: Metadata = {
  title: 'Posts'
}

/* const posts = [
  {
    slug: 'new',
    markdown:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor libero eget nunc ultricies, eget ultricies nisl. Sed vel aliquet libero. Sed sed eros sed lorem aliquam tempus. Sed auctor, nibh ac tincidunt lacinia. Sem justo ultrices ante, sit amet ultrices elit ipsum in ante. Donec nec quam eget odio aliquet ultricies. Nullam euismod, mi id ultricies tincidunt, nunc justo tempus elit, sed commodo nunc nisl id mauris. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.',
    createdAt: '2023-07-28T10:10:10.000Z'
  },
  {
    slug: 'another',
    markdown:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor libero eget nunc ultricies, eget ultricies nisl. Sed vel aliquet libero. Sed sed eros sed lorem aliquam tempus. Sed auctor, nibh ac tincidunt lacinia. Sem justo ultrices ante, sit amet ultrices elit ipsum in ante. Donec nec quam eget odio aliquet ultricies. Nullam euismod, mi id ultricies tincidunt, nunc justo tempus elit, sed commodo nunc nisl id mauris. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.',
    createdAt: '2023-07-10T10:10:10.000Z'
  },
  {
    slug: 'hello-world',
    markdown:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor libero eget nunc ultricies, eget ultricies nisl. Sed vel aliquet libero. Sed sed eros sed lorem aliquam tempus. Sed auctor, nibh ac tincidunt lacinia. Sem justo ultrices ante, sit amet ultrices elit ipsum in ante. Donec nec quam eget odio aliquet ultricies. Nullam euismod, mi id ultricies tincidunt, nunc justo tempus elit, sed commodo nunc nisl id mauris. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi.',
    createdAt: '2023-06-10T10:10:10.000Z'
  }
] */

export default async function PostsPage() {
  const supabase = createServerActionClient<Database>({ cookies })
  const { data: posts } = await supabase
    .from('posts')
    .select()
    .order('created_at', { ascending: false })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  const isAdmin = session && session.user.email === 'hi@edgaras.com'

  return (
    <div className="container max-w-screen-sm space-y-8 pt-4 pb-24 xs:space-y-16 xs:pt-24">
      {isAdmin && <PostTextarea />}
      <section>
        {posts && posts.length > 0 ? (
          <ul className="space-y-8">
            {posts.map((post, index) => (
              <li key={post.id}>
                <Post post={post} isAdmin={!!isAdmin} />
                {index !== posts.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="h-[1px] mt-8 bg-gradient-to-r from-black/0 via-border-neutral-faded gradient to-black/0"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-fg-neutral">No posts yet.</p>
        )}
      </section>
    </div>
  )
}

function Post({ post, isAdmin }: { post: Post; isAdmin: boolean }) {
  const deletePost = async (formData: FormData) => {
    'use server'
    const id = formData.get('id') as string

    if (id) {
      const supabase = createServerActionClient<Database>({ cookies })

      const { error } = await supabase.from('posts').delete().eq('id', id)
      if (error) {
        console.error(error)
      }
    }

    revalidatePath('/posts')
  }
  return (
    <div className="flex items-start space-x-4 relative">
      <Avatar />
      <div className="space-y-0.5">
        <div className="space-x-1">
          <a
            href="https://twitter.com/edgarasben"
            className="font-semibold hover:underline"
          >
            Edgaras
          </a>
          <a
            href="https://twitter.com/edgarasben"
            className="text-fg-neutral-faded hover:underline"
          >
            @edgarasben
          </a>
          <span className="text-fg-neutral-faded">
            {formatDate(post.created_at ?? '')}
          </span>
        </div>
        <p className="text-fg-neutral/95">{post.markdown}</p>
      </div>
      <form
        action={deletePost}
        key={new Date().toUTCString()}
        className="absolute top-0 right-0"
      >
        <input type="hidden" name="id" value={post.id} />
        {isAdmin && (
          <button
            type="submit"
            className="text-fg-neutral-faded hover:underline focus:outline-none focus:ring-2 focus:ring-primary hover:bg-neutral rounded-full p-2"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  )
}
