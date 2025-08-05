import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Only initialize MongoDB connection if URI is provided
if (!uri) {
  if (process.env.NODE_ENV === "development") {
    console.warn("MongoDB URI not found. Database features will be disabled.")
  }
  // Create a mock client promise that will reject when used
  clientPromise = Promise.reject(new Error("MongoDB URI not configured"))
} else {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

export async function connectToDatabase() {
  if (!uri) {
    throw new Error("MongoDB URI not configured. Please add MONGODB_URI to your environment variables.")
  }

  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || "soul-care")
    return { client, db }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw new Error("Database connection failed")
  }
}

export function isDatabaseConfigured(): boolean {
  return !!uri
}

export default clientPromise
