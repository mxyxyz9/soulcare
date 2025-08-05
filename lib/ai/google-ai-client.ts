import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai"

export type AIMessage = {
  role: "user" | "assistant"
  content: string
}

export type AIResponse = {
  message: string
  sentiment: "positive" | "negative" | "neutral"
  suggestions: string[]
}

// Initialize the Google AI client only if API key is available
const apiKey = process.env.GOOGLE_AI_API_KEY
let googleAI: GoogleGenerativeAI | null = null

if (apiKey) {
  googleAI = new GoogleGenerativeAI(apiKey)
} else {
  console.warn("Google AI API key not found. AI features will be limited.")
}

// Create a system prompt that instructs the model how to behave
const SYSTEM_PROMPT = `You are a compassionate AI mental health assistant named Soul Care. Your purpose is to provide supportive, empathetic responses to users who may be experiencing various emotional states.

Guidelines:
- Respond with empathy and understanding
- Never give medical advice or diagnose conditions
- Suggest healthy coping strategies when appropriate
- Recognize signs of crisis and recommend professional help when needed
- Maintain a calm, supportive tone
- Focus on validation, reflection, and gentle guidance
- Protect user privacy and confidentiality
- If a user appears to be in crisis, suggest immediate professional resources

For each response, analyze the sentiment of the user's message and provide:
1. A supportive, empathetic response
2. An assessment of their emotional state (positive, negative, or neutral)
3. 2-3 helpful suggestions or coping strategies

Format your response as JSON with the following structure:
{
  "message": "Your empathetic response here",
  "sentiment": "positive|negative|neutral",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
}`

export async function sendMessageToAI(
  messages: AIMessage[],
  options?: {
    temperature?: number
    maxTokens?: number
  },
): Promise<AIResponse> {
  // Check if Google AI is available
  if (!googleAI) {
    return {
      message:
        "I apologize, but the AI service is currently unavailable. However, I want you to know that your feelings are valid and you're not alone. Please consider reaching out to a mental health professional or a trusted friend or family member.",
      sentiment: "neutral",
      suggestions: [
        "Contact a mental health professional",
        "Reach out to a trusted friend or family member",
        "Try some deep breathing exercises",
      ],
    }
  }

  try {
    // Get the Gemini Pro model
    const model = googleAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
      generationConfig: {
        temperature: options?.temperature || 0.7,
        maxOutputTokens: options?.maxTokens || 1000,
      },
    })

    // Format the conversation history for the model
    const formattedMessages = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "I understand my role and will follow these guidelines." }] },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ]

    // Generate content
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1),
    })

    const lastMessage = formattedMessages[formattedMessages.length - 1]
    const result = await chat.sendMessage(lastMessage.parts[0].text)
    const responseText = result.response.text()

    // Parse the JSON response
    try {
      const parsedResponse = JSON.parse(responseText) as AIResponse
      return parsedResponse
    } catch (error) {
      // If the model didn't return valid JSON, try to extract the information
      console.error("Failed to parse AI response as JSON:", error)

      // Fallback response
      return {
        message: responseText.substring(0, 500), // Limit to first 500 chars
        sentiment: "neutral",
        suggestions: ["Take a deep breath", "Consider what might help you right now", "Remember you're not alone"],
      }
    }
  } catch (error) {
    console.error("Error calling Google AI:", error)

    // Return a graceful fallback response
    return {
      message:
        "I apologize, but I'm having trouble processing your request right now. Your feelings are important, and I encourage you to reach out to someone you trust or a mental health professional if you need support.",
      sentiment: "neutral",
      suggestions: [
        "Try again in a moment",
        "Consider reaching out to a mental health professional",
        "Practice some self-care activities",
      ],
    }
  }
}
