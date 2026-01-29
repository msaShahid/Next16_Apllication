export type Role = 'ADMIN' | 'USER'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  emailVerified: boolean
  isActive: boolean
  createdAt: string
}

/**
 * Payload returned by the auth service
 * (this mirrors backend response structure)
 */
export interface AuthPayload {
  user: User
  accessToken: string
  refreshToken: string
}

/**
 * Standard API response wrapper
 * (reusable for other endpoints)
 */
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

/**
 * Auth login response
 */
export type AuthResponse = ApiResponse<AuthPayload>
