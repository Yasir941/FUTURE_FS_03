import Link from 'next/link'
import { Suspense } from 'react'

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-4">
        <h2 className="text-4xl font-bold mb-4">404 - Page Not Found</h2>
        <p className="text-gray-400 mb-8 text-center">
          Oops! The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </Suspense>
  )
}