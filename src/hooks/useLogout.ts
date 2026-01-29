'use client'

import { useRouter } from 'next/navigation'
import { api } from '@/lib/axios'
import { useAuthStore } from '@/stores/auth.store'

export function useLogout() {
  const router = useRouter()
  const clear = useAuthStore((s) => s.clear)

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } catch (err) {
      console.log(err);
    } finally {
      clear()
      router.replace('/signin')
    }
  }

  return logout
}
