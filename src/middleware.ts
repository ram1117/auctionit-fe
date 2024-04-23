import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = (request: NextRequest) => {
  const role = cookies().get('role')?.value
  const nextPath = request.nextUrl.pathname
  const redirectPath = `/auth/signin?next=${nextPath}`
  if (!role) {
    return NextResponse.redirect(new URL(redirectPath, request.nextUrl))
  }

  if (nextPath.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/unauthorized', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/account/:path*',
    '/auctions/:path*',
    '/items/:path*',
    '/admin/:path*',
  ],
}
