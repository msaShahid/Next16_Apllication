const requiredEnvVars = {
  NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
} as const

export function validateEnv() {
  const missingVars: string[] = []

  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value) {
      missingVars.push(key)
    }
  })

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`
    )
  }
}

export const env = {
  backendUrl: requiredEnvVars.NEXT_PUBLIC_BACKEND_URL!,
}