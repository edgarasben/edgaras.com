import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: ['/portfolio']
}

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [user, pwd] = Buffer.from(authValue, 'base64').toString().split(':')

    if (user === '4dmin' && pwd === 'testpwd123333') {
      return NextResponse.next()
    }
  }

  url.pathname = '/api/auth'

  return NextResponse.rewrite(url)
}
