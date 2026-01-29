'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth.store'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios'

interface Props {
  children: React.ReactNode
}

export default function AuthBootstrap({ children }: Props) {
  const { setUser, clearUser, user, isAuthenticated, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // call /me endpoint to hydrate user
        const res = await api.get('/auth/me', { withCredentials: true })
        if (res.status === 200) {
          setUser(res.data.user)
        } else {
          clearUser()
        }
      } catch (err) {
        clearUser()
      }
    }

    bootstrap()
  }, [setUser, clearUser])

  // redirect if user exists
  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      router.replace(user.role === 'ADMIN' ? '/admin' : '/user')
    }
  }, [isLoading, isAuthenticated, user, router])

  // prevent flicker
  if (isLoading) return null

  return <>{children}</>
}
