import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  const publicPaths = ['/signin', '/signup', '/']
  const isPublicPath = publicPaths.includes(pathname)
  
  if (isPublicPath) {
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/signin',
    '/signup',
  ],
}