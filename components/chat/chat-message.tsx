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
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
      case "negative":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
      default:
        return ""
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} flex-col`}>
      <div
        className={`max-w-[80%] rounded-2xl p-4 ${
          isUser
            ? "bg-teal-500 text-white"
            : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
        }`}
      >
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <p className="whitespace-pre-wrap">{message.content}</p>
            <div className="mt-1 flex items-center justify-between">
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
              {!isUser && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 rounded-full p-0"
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
        <div className="mt-1 flex justify-start">
          <Badge variant="outline" className={`text-xs ${getSentimentColor()}`}>
            {message.sentiment.charAt(0).toUpperCase() + message.sentiment.slice(1)}
          </Badge>
        </div>
      )}

      {/* Suggestions - only show for assistant messages */}
      {!isUser && message.suggestions && message.suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {message.suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="rounded-full text-xs"
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
