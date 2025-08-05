import { type NextRequest, NextResponse } from "next/server"
import { sendMessageToAI, type AIMessage } from "@/lib/ai/google-ai-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages } = body as { messages: AIMessage[] }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    // Call the Google AI client
    const response = await sendMessageToAI(messages)

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "An error occurred while processing your request" }, { status: 500 })
  }
}
