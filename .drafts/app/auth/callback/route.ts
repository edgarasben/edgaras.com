import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { Database } from '@/types/supabase'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const session = await supabase.auth.exchangeCodeForSession(code)
    console.log(session)
  }

  console.log(requestUrl)

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin + '/admin')
}
