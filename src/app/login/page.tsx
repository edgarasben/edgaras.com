import { cookies } from 'next/headers'

import { createClient } from '@/lib/supabase/server'
import { getRootURL } from '@/lib/utils'
import { redirect } from 'next/navigation'
import { Button } from '@/components/base/button'
import { signIn, signOut } from '@/data/actions'

/* export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return <LoginForm session={session} />
}
 */

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex w-full flex-1 flex-col justify-center gap-2 px-4 sm:max-w-md md:px-8">
        {!user ? (
          <form
            className="flex w-full flex-1 flex-col justify-center gap-2 animate-in animate-out"
            action={signIn}
          >
            <label className="text-md" htmlFor="email">
              Email
            </label>
            <input
              className="mb-6 rounded-md border border-neutral-fade bg-neutral-fade px-4 py-2 text-neutral placeholder:text-neutral-fade focus-visible:border-neutral-fade focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-neutral-fade"
              name="email"
              placeholder="you@example.com"
              required
            />

            <Button>Sign In</Button>

            {searchParams?.message && (
              <p className="mt-4 bg-neutral-fade p-4 text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        ) : (
          <>
            <p>Logged in as {user.email}</p>{' '}
            <form action={signOut}>
              <button>Sign out</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
