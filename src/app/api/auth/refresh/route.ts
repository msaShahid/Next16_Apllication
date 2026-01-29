import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function POST() {
  try {
    const refreshToken = (await cookies()).get('refreshToken')?.value
    if (!refreshToken) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const res = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })

    const result = await res.json()
    if (!res.ok) return NextResponse.json(result, { status: res.status })

    const { accessToken, refreshToken: newRefreshToken } = result.data

    const response = NextResponse.json({ success: true })
    response.cookies.set('accessToken', accessToken, { httpOnly: true, path: '/' })
    response.cookies.set('refreshToken', newRefreshToken, { httpOnly: true, path: '/api/auth/refresh' })

    return response
  } catch (err) {
    console.error('Refresh error:', err)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
