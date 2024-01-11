import { Avatar } from './Avatar'
import { Database } from '@/lib/types/supabase'
import type { Metadata } from 'next'
import { PostTextarea } from './PostTextarea'
import { XMarkIcon } from '@/icons/outline'
import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { format, isThisYear } from 'date-fns'

export const dynamic = 'force-dynamic'

type Post = Database['public']['Tables']['posts']['Row']

export const metadata: Metadata = {
  title: 'Posts',
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
    data: { session },
  } = await supabase.auth.getSession()

  const isAdmin = session && session.user.email === 'hi@edgaras.com'

  return (
    <div className="container max-w-screen-sm space-y-8 pb-24 pt-4 xs:space-y-16 xs:pt-24">
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
                    className="gradient via-border-neutral-fade mt-8 h-[1px] bg-gradient-to-r from-black/0 to-black/0"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral">No posts yet.</p>
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
    <div className="relative flex items-start space-x-4">
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
            className="text-neutral-fade hover:underline"
          >
            @edgarasben
          </a>
          <span className="text-neutral-fade">
            {isThisYear(post.created_at)
              ? format(post.created_at, 'MMM d')
              : format(post.created_at, 'yyyy-MM-dd')}
          </span>
        </div>
        <p className="text-neutral/95">{post.markdown}</p>
      </div>
      <form
        action={deletePost}
        key={new Date().toUTCString()}
        className="absolute right-0 top-0"
      >
        <input type="hidden" name="id" value={post.id} />
        {isAdmin && (
          <button
            type="submit"
            className="rounded-full p-2 text-neutral-fade hover:bg-neutral hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        )}
      </form>
    </div>
  )
}
