import { ChatInterface } from "@/components/chat/chat-interface"

export default function ChatPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] flex-col px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Chat with Soul Care</h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Share your thoughts and feelings in a safe, private space.
        </p>
      </div>

      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  )
}
