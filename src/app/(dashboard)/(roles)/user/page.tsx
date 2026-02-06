// src/app/dashboard/(roles)/user/page.tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function UserDashboard() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            User Dashboard
          </h1>
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Welcome, {user?.name}!</h2>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Role:</span>{' '}
              <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-800">
                {user?.role}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">User ID:</span> {user?.id}
            </p>
          </div>
        </div>

        {/* User Features */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">My Profile</h3>
            <p className="mt-2 text-gray-600">View and edit your profile</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">My Orders</h3>
            <p className="mt-2 text-gray-600">View your order history</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow">
            <h3 className="text-lg font-semibold">Settings</h3>
            <p className="mt-2 text-gray-600">Manage your preferences</p>
          </div>
        </div>
      </main>
    </div>
  )
}