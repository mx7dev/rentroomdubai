'use client'

export default function AdminError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <main className="mx-auto max-w-xl p-8 text-center">
      <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
      <p className="text-gray-600 mb-4">Please try again, or contact support if the problem continues.</p>
      <button
        onClick={() => unstable_retry()}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Try again
      </button>
    </main>
  )
}
