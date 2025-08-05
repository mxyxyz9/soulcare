import type React from "react"
import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900 dark:bg-gray-100">
              <span className="text-sm font-bold text-white dark:text-gray-900">SC</span>
            </div>
            <span className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Soul Care</span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
