import { GuestApi, AuthApi } from '@/lib/axios'

interface RegisterPayload {
  name: string
  email: string
  password: string
}

interface LoginPayload {
  email: string
  password: string
}

interface LogoutPayload {
  userId: string
}

export const authService = {

  register: async (payload: RegisterPayload) => {
    const response = await GuestApi.post('/auth/register', payload)
    return response.data
  },

  login: async (payload: LoginPayload) => {
    const response = await GuestApi.post('/auth/login', payload)
    return response.data
  },

  logout: async (payload: LogoutPayload) => {
    const response = await AuthApi.post('/auth/logout', payload)
    return response.data
  },

  me: async () => {
    const response = await AuthApi.get('/auth/me')
    return response.data
  },

  refresh: async (refreshToken: string) => {
    const response = await GuestApi.post('/auth/refresh', { refreshToken })
    return response.data
  },
  
}