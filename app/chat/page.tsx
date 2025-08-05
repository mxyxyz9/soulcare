import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Chat with Soul Care</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Share your thoughts and feelings in a safe, private space.
        </p>
      </div>

      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  )
}
