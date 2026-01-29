import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')
  const { pathname } = req.nextUrl

  const publicPaths = ['/signin', '/signup', '/api']
  if (publicPaths.some(p => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // DO NOT decode or validate expiry here
  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
}
