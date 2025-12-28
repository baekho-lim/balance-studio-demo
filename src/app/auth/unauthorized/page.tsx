import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">403</div>
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-gray-600">
          You don't have permission to access this page.
          Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Admin
          </Link>
        </div>
      </div>
    </main>
  )
}
