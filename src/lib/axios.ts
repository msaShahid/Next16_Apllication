import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'
import { env } from './env'

const API_BASE_URL = env.backendUrl

// Token refresh state
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return useAuthStore.getState().accessToken || null
  }
  return null
}

const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return useAuthStore.getState().refreshToken || null
  }
  return null
}

// Guest API - for unauthenticated requests
const GuestApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
})

// Authenticated API - with auto token injection
const AuthApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
})

if (process.env.NODE_ENV === 'development') {
  AuthApi.interceptors.request.use((config) => {
    console.log('🚀 Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    })
    return config
  })

  AuthApi.interceptors.response.use(
    (response) => {
      console.log('✅ Response:', {
        status: response.status,
        data: response.data,
      })
      return response
    },
    (error) => {
      console.error('❌ Error:', {
        status: error.response?.status,
        message: error.response?.data?.message,
        errors: error.response?.data?.errors,
      })
      return Promise.reject(error)
    }
  )
}

// Request interceptor - inject token
AuthApi.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    config.headers.Accept = 'application/json'

    // Handle PUT requests with FormData
    if (config.method === 'put' && config.data instanceof FormData) {
      config.method = 'post'
      config.data.append('_method', 'PUT')
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle 401 and auto-refresh with queue
AuthApi.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue the request while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`
            }
            return AuthApi(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      const refreshToken = getRefreshToken()

      if (!refreshToken) {
        isRefreshing = false
        processQueue(error, null)
        useAuthStore.getState().clearAuth()
        if (typeof window !== 'undefined') {
          window.location.href = '/signin'
        }
        return Promise.reject(error)
      }

      try {
        const { data } = await GuestApi.post('/auth/refresh', { refreshToken })
        const { user, tokens } = data.data

        useAuthStore.getState().setAuth(user, tokens.accessToken, tokens.refreshToken)

        processQueue(null, tokens.accessToken)

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
        }

        return AuthApi(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null)
        useAuthStore.getState().clearAuth()

        if (typeof window !== 'undefined') {
          window.location.href = '/signin'
        }

        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export { GuestApi, AuthApi }