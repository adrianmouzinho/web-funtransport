import { NextRequest, NextResponse } from 'next/server'

type Data = {
  token: string
}

export async function POST(request: NextRequest) {
  const { token }: Data = await request.json()

  // const { searchParams } = new URL(request.url)
  // const token = searchParams.get('token')

  const redirectURL = new URL('/', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 7

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}
