import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Users, Sparkles, Brain, Heart } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm dark:border-gray-800 dark:bg-gray-900">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Mental Health Support
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl">
              Your mental wellbeing, <span className="text-gray-600 dark:text-gray-400">reimagined</span>
            </h1>
            <p className="mb-8 text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
              A safe, private space to express your thoughts and receive personalized support through our compassionate
              AI companion.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base">
                <Link href="/chat">
                  Start Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base bg-transparent">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              How Soul Care helps
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Our platform combines cutting-edge AI with evidence-based mental health practices
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Brain className="h-8 w-8" />}
                title="AI Companion"
                description="Engage with our empathetic AI that understands your emotions and provides personalized coping strategies."
              />
              <FeatureCard
                icon={<Shield className="h-8 w-8" />}
                title="Private & Secure"
                description="Your conversations are encrypted and private. We prioritize your confidentiality above all else."
              />
              <FeatureCard
                icon={<Users className="h-8 w-8" />}
                title="Community Support"
                description="Connect with others on similar journeys through our anonymous, moderated community."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 py-24 dark:bg-gray-900 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Simple, effective process
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get started in minutes and begin your journey to better mental health
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-8 sm:grid-cols-3">
              <ProcessStep
                number="01"
                title="Express Yourself"
                description="Share your thoughts through text or voice in a judgment-free environment."
              />
              <ProcessStep
                number="02"
                title="Receive Support"
                description="Get personalized insights and evidence-based coping strategies tailored to your needs."
              />
              <ProcessStep
                number="03"
                title="Track Progress"
                description="Monitor your emotional journey and celebrate your growth over time."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <Heart className="mx-auto mb-6 h-12 w-12 text-gray-400" />
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
              Begin your wellness journey today
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
              No sign-up required. Start a conversation with our AI companion now.
            </p>
            <Button asChild size="lg" className="text-base">
              <Link href="/chat">
                Start Chatting
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
      <CardContent className="p-8 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white dark:bg-gray-100 dark:text-gray-900">
        {number}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}
