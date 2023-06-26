import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const redirectURL = new URL('/signIn', request.nextUrl.origin)

  if (!token) {
    const redirectToExpiresInSeconds = 60 * 4

    return NextResponse.redirect(redirectURL, {
      headers: {
        'Set-Cookie': `redirectTo=${request.url}; Path=/; HttpOnly; max-age=${redirectToExpiresInSeconds};`,
      },
    })
  }

  NextResponse.next()
}

export const config = {
  matcher: ['/', '/customers/:path*', '/help/:path*', '/products/:path*'],
}
