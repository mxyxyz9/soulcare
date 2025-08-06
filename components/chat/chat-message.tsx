"use client"

import { Button } from "@/components/ui/button"
import { Volume2, User, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

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

  const getSentimentBadge = () => {
    if (!message.sentiment) return null
    switch (message.sentiment) {
      case "positive":
        return <Badge variant="outline" className="border-green-500/50 bg-green-500/10 text-green-700 dark:text-green-400">Positive</Badge>
      case "negative":
        return <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400">Negative</Badge>
      default:
        return <Badge variant="outline" className="border-blue-500/50 bg-blue-500/10 text-blue-700 dark:text-blue-400">Neutral</Badge>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${isUser ? "bg-muted" : "bg-primary/10"}`}>
        {isUser ? <User className="h-5 w-5 text-muted-foreground" /> : <Sparkles className="h-5 w-5 text-primary" />}
      </div>
      <div className="flex max-w-[80%] flex-col gap-1">
        <div
          className={`rounded-2xl px-4 py-3 ${isUser ? "rounded-br-none bg-primary text-primary-foreground" : "rounded-bl-none bg-muted"}`}>
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-muted-foreground">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
          {!isUser && (
            <div className="flex items-center gap-2">
              {getSentimentBadge()}
              <Button size="icon" variant="ghost" className="h-6 w-6" onClick={onSpeakMessage} title="Listen to message">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          )}
        </div>
        {!isUser && message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="h-auto rounded-full py-1 px-3 text-xs"
                onClick={() => onSuggestionClick(suggestion)}>
                {suggestion}
              </Button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
