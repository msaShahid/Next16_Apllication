import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:4000/api'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await res.json();
    if (!res.ok) return NextResponse.json(result, { status: res.status });

    const response = NextResponse.json({ user: result.data.user });

    // Set Cookies
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('accessToken', result.data.accessToken, cookieOptions);
    response.cookies.set('refreshToken', result.data.refreshToken, {
      ...cookieOptions,
      path: '/api/auth/refresh', 
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}