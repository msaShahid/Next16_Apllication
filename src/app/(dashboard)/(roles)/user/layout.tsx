// src/app/dashboard/(roles)/user/layout.tsx
import AuthGuard from '@/components/auth/AuthGuard'

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard allowedRoles={['USER']}>
      {children}
    </AuthGuard>
  )
}