import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export type UserRole = 'USER' | 'ADMIN'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isHydrated: boolean // Track hydration state

  // Actions
  setAuth: (user: User, accessToken: string, refreshToken: string) => void
  setAccessToken: (token: string) => void
  setUser: (user: User) => void
  clearAuth: () => void
  setLoading: (loading: boolean) => void
  setHydrated: (hydrated: boolean) => void
  isAdmin: () => boolean
  isUser: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,
      isHydrated: false,

      setAuth: (user, accessToken, refreshToken) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      setAccessToken: (accessToken) =>
        set({ accessToken }),

      setUser: (user) =>
        set({ user, isAuthenticated: true, isLoading: false }),

      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (isLoading) =>
        set({ isLoading }),

      setHydrated: (isHydrated) =>
        set({ isHydrated }),

      isAdmin: () => get().user?.role === 'ADMIN',

      isUser: () => get().user?.role === 'USER',
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setLoading(false)
        state?.setHydrated(true)
      },
    }
  )
)

// Hook to ensure hydration before use
export const useAuthHydrated = () => {
  const isHydrated = useAuthStore((state) => state.isHydrated)
  return isHydrated
}