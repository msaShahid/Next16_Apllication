import { useAuthStore } from '@/stores/auth.store'
import { authService } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useCallback } from 'react'
import { AxiosError } from 'axios'

interface AuthError {
  message: string
  field?: string
  code?: string
}

const handleAuthError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message
    const errors = error.response?.data?.errors
    
    if (errors && Array.isArray(errors)) {
      return errors.map((err: AuthError) => err.message).join(', ')
    }
    
    return message || 'An error occurred. Please try again.'
  }
  
  return 'An unexpected error occurred'
}

export const useAuth = () => {
  const router = useRouter()
  const { 
    user, 
    isAuthenticated, 
    isLoading,
    setAuth, 
    clearAuth,
    setLoading,
    isAdmin, 
    isUser 
  } = useAuthStore()

  const register = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      const response = await authService.register({ name, email, password })
      
      if (response.success) {
        const { user, tokens } = response.data
        setAuth(user, tokens.accessToken, tokens.refreshToken)
        
        toast.success(response.message || 'Registration successful!')
        
        // Role-based redirect
        router.replace(user.role === 'ADMIN' ? '/admin' : '/user')
      }
      
      return response
    } catch (error) {
      const message = handleAuthError(error)
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [router, setAuth, setLoading])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await authService.login({ email, password })
      
      if (response.success) {
        const { user, tokens } = response.data
        setAuth(user, tokens.accessToken, tokens.refreshToken)
        
        toast.success(response.message || 'Login successful!')
        
        // Role-based redirect
        router.replace(user.role === 'ADMIN' ? '/admin' : '/user')
      }
      
      return response
    } catch (error) {
      const message = handleAuthError(error)
      toast.error(message)
      throw error
    } finally {
      setLoading(false)
    }
  }, [router, setAuth, setLoading])

  const logout = useCallback(async () => {
    try {
      if (user?.id) {
        await authService.logout({ userId: user.id })
      }
    } catch (error) {
      console.error('Logout API error:', error)
      // Continue with local logout even if API fails
    } finally {
      clearAuth()
      toast.success('Logged out successfully')
      router.replace('/signin')
    }
  }, [user?.id, clearAuth, router])

  const checkAuth = useCallback(async () => {
    try {
      const response = await authService.me()
      
      if (response.success && response.user) {
        return true
      }
      return false
    } catch (error) {
      console.log(error);
      clearAuth()
      return false
    }
  }, [clearAuth])

  return {
    user,
    isAuthenticated,
    isLoading,
    isAdmin: isAdmin(),
    isUser: isUser(),
    register,
    login,
    logout,
    checkAuth,
  }
}