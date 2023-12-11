import { cookies, headers } from 'next/headers'

import { createClient } from '@/lib/supabase/server'
import { getRootURL } from '@/lib/utils'
import { redirect } from 'next/navigation'

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

  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${getRootURL()}/auth/callback?originPath=login`,
      },
    })

    if (error) {
      console.log(error.message)
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login')
  }

  const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signOut()

    if (error) {
      return redirect('/login?message=Error logging out')
    }

    return redirect('/login')
  }

  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      {!user ? (
        <form
          className="text-foreground flex w-full flex-1 flex-col justify-center gap-2 animate-in"
          action={signIn}
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="bg-inherit mb-6 rounded-md border px-4 py-2"
            name="email"
            placeholder="you@example.com"
            required
          />

          <button className="bg-green-700 text-foreground mb-2 rounded-md px-4 py-2">
            Sign In
          </button>

          {searchParams?.message && (
            <p className="bg-foreground/10 text-foreground mt-4 p-4 text-center">
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
  )
}
