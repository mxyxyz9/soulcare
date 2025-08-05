"use client"

import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  suggestions?: string[]
  sentiment?: "positive" | "negative" | "neutral"
}

type ChatMessageProps = {
  message: Message
  onSpeakMessage: () => void
  onSuggestionClick: (suggestion: string) => void
}

export function ChatMessage({ message, onSpeakMessage, onSuggestionClick }: ChatMessageProps) {
  const isUser = message.role === "user"

  // Get sentiment color
  const getSentimentColor = () => {
    if (!message.sentiment) return ""
    switch (message.sentiment) {
      case "positive":
        return "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
      case "negative":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800"
      case "neutral":
        return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
      default:
        return ""
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} flex-col`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
            : "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
        }`}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs opacity-60">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              {!isUser && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                  onClick={onSpeakMessage}
                  title="Listen to this message"
                >
                  <Volume2 className="h-3 w-3" />
                  <span className="sr-only">Listen</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sentiment badge - only show for assistant messages */}
      {!isUser && message.sentiment && (
        <div className="mt-2 flex justify-start">
          <Badge variant="outline" className={`text-xs ${getSentimentColor()}`}>
            {message.sentiment.charAt(0).toUpperCase() + message.sentiment.slice(1)}
          </Badge>
        </div>
      )}

      {/* Suggestions - only show for assistant messages */}
      {!isUser && message.suggestions && message.suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {message.suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="h-8 rounded-full border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}
