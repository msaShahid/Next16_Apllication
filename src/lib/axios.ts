import axios from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // send HttpOnly cookies
})

// interceptor for auto-refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        // call refresh token endpoint
        await api.post('/auth/refresh')
        return api(originalRequest) // retry original request
      } catch (err) {
        // refresh failed
        useAuthStore.getState().clearUser()
        window.location.href = '/signin'
        return Promise.reject(err)
      }
    }
    return Promise.reject(error)
  }
)
