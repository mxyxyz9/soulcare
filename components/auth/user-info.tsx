"use client"

import { useSession } from "next-auth/react"
import { User } from "lucide-react"

export function UserInfo() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          {session.user?.image ? (
            <img
              src={session.user.image || "/placeholder.svg"}
              alt={session.user.name || "User"}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Welcome back, {session.user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Signed in as {session.user?.email}</p>
        </div>
      </div>
    </div>
  )
}
