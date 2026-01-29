'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth.store'

export default function UserPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  // Client-side redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'USER') {
      router.push('/signin')
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || !user) {
    // Optional: show loading while redirecting
    return <p>Loading...</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <p>This is your user dashboard.</p>
    </div>
  )
}
