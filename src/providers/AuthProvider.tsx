'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, accessToken, clearAuth } = useAuthStore()

  useEffect(() => {

    const validateToken = async () => {
      if (isAuthenticated && accessToken) {
        try {
          await authService.me()
        } catch (error) {
          console.log(error);
          // Token is invalid, clear auth
          clearAuth()
        }
      }
    }

    validateToken()
  }, []) 

  return <>{children}</>
}