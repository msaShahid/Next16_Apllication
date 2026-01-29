import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000'

export async function GET(req: Request) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      method: 'GET',
      headers: {
        cookie: req.headers.get('cookie') || '',
      },
    })

    if (!res.ok) return NextResponse.json({ success: false }, { status: res.status })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('Me error:', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
