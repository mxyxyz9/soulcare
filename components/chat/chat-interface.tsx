"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mic, Send, Volume2, VolumeX, AlertTriangle } from "lucide-react"
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

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Update input when transcript changes
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
      // Format messages for the API
      const apiMessages: AIMessage[] = messages
        .filter((msg) => msg.id !== "welcome") // Skip the welcome message
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }))
        .concat({ role: "user", content: input })

      // Call the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
  }

  return (
    <Card className="flex h-full flex-col rounded-2xl shadow-md">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">Soul Care Assistant</h2>
        <AccessibilityControls />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onSpeakMessage={() => speak(message.content)}
              onSuggestionClick={handleSuggestionClick}
            />
          ))}
          {isLoading && (
            <div className="flex justify-center p-4">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-teal-500"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-teal-500"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-teal-500"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          )}
          {error && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-red-50 p-3 text-red-700 dark:bg-red-900/20 dark:text-red-300">
              <AlertTriangle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t p-4">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="rounded-2xl"
            disabled={isLoading || isListening}
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full"
                  onClick={isListening ? stopListening : startListening}
                  disabled={!isSpeechEnabled}
                >
                  <Mic className={isListening ? "text-red-500" : ""} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isSpeechEnabled
                  ? isListening
                    ? "Stop recording"
                    : "Start voice input"
                  : "Speech recognition not available in your browser"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {isSpeechEnabled && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                    onClick={isSpeaking ? stopSpeaking : () => speak(messages[messages.length - 1]?.content || "")}
                  >
                    {isSpeaking ? <VolumeX /> : <Volume2 />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isSpeaking ? "Stop speaking" : "Read last message aloud"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          <Button
            size="icon"
            className="rounded-full"
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send />
          </Button>
        </div>
      </div>
    </Card>
  )
}
