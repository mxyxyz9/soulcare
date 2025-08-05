"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DatabaseFallback } from "./database-fallback"

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()
  const [showFallback, setShowFallback] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      // Check if this is due to database issues
      fetch("/api/auth/session")
        .then((res) => {
          if (res.status === 503) {
            setShowFallback(true)
          } else {
            router.push("/login")
          }
        })
        .catch(() => {
          setShowFallback(true)
        })
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    )
  }

  if (status === "authenticated") {
    return <>{children}</>
  }

  if (showFallback) {
    return <DatabaseFallback>{children}</DatabaseFallback>
  }

  return null
}
