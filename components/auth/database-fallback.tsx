"use client"

import type React from "react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function DatabaseFallback({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="text-amber-700 dark:text-amber-300">
          Some features may be limited as the database is not configured. You can still use the AI chat functionality.
        </AlertDescription>
      </Alert>
      {children}
    </div>
  )
}
