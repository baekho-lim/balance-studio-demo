import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-6xl md:text-7xl mb-4">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl mb-4">
          Page Not Found
        </h2>
        <p className="text-secondary mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-pastel-sage text-white rounded-md hover:bg-pastel-sage/90 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
