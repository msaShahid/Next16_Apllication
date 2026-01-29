import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const result = await res.json()
    if (!res.ok) return NextResponse.json(result, { status: res.status })

    const { user, accessToken, refreshToken } = result.data

    const response = NextResponse.json({ user })

    response.cookies.set('accessToken', accessToken, { httpOnly: true, path: '/' })
    response.cookies.set('refreshToken', refreshToken, { httpOnly: true, path: '/api/auth/refresh' })

    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
