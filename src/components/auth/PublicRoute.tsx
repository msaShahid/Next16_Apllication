'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore, useAuthHydrated } from '@/stores/auth.store'
import { AuthLoadingSpinner } from './AuthLoadingSpinner'

interface PublicRouteProps {
  children: React.ReactNode
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter()
  const isHydrated = useAuthHydrated()
  const { isAuthenticated, isLoading, user } = useAuthStore()

  useEffect(() => {
    if (isHydrated && !isLoading && isAuthenticated && user) {
      router.replace(user.role === 'ADMIN' ? '/admin' : '/user')
    }
  }, [isHydrated, isLoading, isAuthenticated, user, router])

  // Still loading or hydrating
  if (!isHydrated || isLoading) {
    return <AuthLoadingSpinner />
  }

  // Authenticated user (will redirect)
  if (isAuthenticated && user) {
    return null
  }

  return <>{children}</>
}