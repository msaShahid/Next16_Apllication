'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore, useAuthHydrated, UserRole } from '@/stores/auth.store'
import { AuthLoadingSpinner } from './AuthLoadingSpinner'

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles?: UserRole[]
  fallbackUrl?: string
}

export default function AuthGuard({ 
  children, 
  allowedRoles,
  fallbackUrl = '/signin' 
}: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isHydrated = useAuthHydrated()
  const { isAuthenticated, user, isLoading } = useAuthStore()

  useEffect(() => {
    // Wait for hydration
    if (!isHydrated || isLoading) return

    // Not authenticated
    if (!isAuthenticated || !user) {
      router.replace(fallbackUrl)
      return
    }

    // Check role-based access
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard
        const redirectUrl = user.role === 'ADMIN' ? '/admin' : '/user'
        router.replace(redirectUrl)
      }
    }
  }, [isHydrated, isLoading, isAuthenticated, user, allowedRoles, router, pathname, fallbackUrl])

  // Show loading while checking
  if (!isHydrated || isLoading) {
    return <AuthLoadingSpinner />
  }

  // Don't render if not authenticated or wrong role 
  if (!isAuthenticated || !user) {
    return null
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null
  }

  return <>{children}</>
}