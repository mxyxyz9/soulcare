import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth/auth-options"
import { connectToDatabase, isDatabaseConfigured } from "@/lib/db/mongodb"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const { db } = await connectToDatabase()

    const chatHistory = await db
      .collection("chatHistory")
      .find({ userId: session.user.id })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json(chatHistory)
  } catch (error) {
    console.error("Error fetching chat history:", error)
    return NextResponse.json({ error: "An error occurred while fetching chat history" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!isDatabaseConfigured()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    const body = await request.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages are required and must be an array" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const result = await db.collection("chatHistory").insertOne({
      userId: session.user.id,
      messages,
      timestamp: new Date(),
    })

    return NextResponse.json({
      success: true,
      message: "Chat history saved successfully",
      id: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error saving chat history:", error)
    return NextResponse.json({ error: "An error occurred while saving chat history" }, { status: 500 })
  }
}
