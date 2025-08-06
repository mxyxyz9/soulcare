"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Send, Volume2, VolumeX, AlertTriangle, Sparkles } from "lucide-react"
import { ChatMessage } from "@/components/chat/chat-message"
import { AccessibilityControls } from "@/components/accessibility/accessibility-controls"
import { useSpeech } from "@/hooks/use-speech"
import type { AIMessage } from "@/lib/ai/google-ai-client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  suggestions?: string[]
  sentiment?: "positive" | "negative" | "neutral"
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello, I'm your Soul Care companion. How are you feeling today? You can type or use voice input to share your thoughts.",
      role: "assistant",
      timestamp: new Date(),
      suggestions: [
        "I'd like to talk about how I'm feeling",
        "What kind of support can you provide?",
        "I'm just exploring this platform",
      ],
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { isListening, startListening, stopListening, transcript, isSpeaking, speak, stopSpeaking, isSpeechEnabled } =
    useSpeech()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (transcript) {
      setInput(transcript)
    }
  }, [transcript])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const apiMessages: AIMessage[] = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({ role: msg.role, content: msg.content }))
        .concat({ role: "user", content: input })

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
        suggestions: data.suggestions,
        sentiment: data.sentiment,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error sending message:", err)
      setError("Sorry, there was an error processing your message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    // Optionally, send the message directly
    // handleSendMessage(suggestion)
  }

  return (
    <div className="flex h-full max-h-[calc(100vh-8rem)] flex-col">
      <Card className="flex h-full flex-col rounded-lg border border-border/40 bg-card text-card-foreground shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Soul Care Assistant</CardTitle>
              <p className="text-sm text-muted-foreground">Your compassionate AI companion</p>
            </div>
          </div>
          <AccessibilityControls />
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onSpeakMessage={() => speak(message.content)}
                onSuggestionClick={handleSuggestionClick}
              />
            ))}
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>

        <div className="border-t border-border/40 p-4">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message or use the mic..."
              className="h-12 rounded-full border-border bg-muted/50 pr-28 pl-5 text-base focus-visible:ring-primary/50"
              disabled={isLoading || isListening}
            />
            <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={isListening ? stopListening : startListening}
                      disabled={!isSpeechEnabled}
                      className={`h-9 w-9 rounded-full ${isListening ? "bg-red-500/20 text-red-500" : ""}`}>
                      <Mic className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isSpeechEnabled ? (isListening ? "Stop recording" : "Start voice input") : "Speech not available"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading} className="h-9 w-9 rounded-full">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

const LoadingIndicator = () => (
  <div className="flex justify-center p-4">
    <div className="flex items-center space-x-2">
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.3s]"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/50 [animation-delay:-0.15s]"></div>
      <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary/50"></div>
    </div>
  </div>
)

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
    <AlertTriangle className="h-5 w-5" />
    <span className="text-sm font-medium">{message}</span>
  </div>
)
