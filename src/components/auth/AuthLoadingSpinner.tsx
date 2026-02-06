export function AuthLoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-dark-primary">
      <div className="text-center">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent mx-auto" />
        <p className="text-sm text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
}