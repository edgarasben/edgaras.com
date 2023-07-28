import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import LoginForm from './login-form'

export const dynamic = 'force-dynamic'

import type { Database } from '@/types/supabase'

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return <LoginForm session={session} />
}
