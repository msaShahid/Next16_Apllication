import { User } from '@/stores/auth.store'

export interface AuthResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  errors?: AuthErrorItem[]
}

export interface AuthErrorItem {
  message: string
  field?: string
  code?: string
}

export interface LoginResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface RegisterResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export interface RefreshResponse {
  user: User
  tokens: {
    accessToken: string
    refreshToken: string
  }
}

export type ApiResponse<T> = Promise<AuthResponse<T>>