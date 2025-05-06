import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MessageSquare, Shield, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-24 flex flex-col items-center text-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl">
            Compassionate AI support for your mental wellbeing
          </h1>
          <p className="text-lg text-neutral-600">
            Soul Care provides a safe, private space to express your thoughts and receive personalized support through
            our AI companion.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
            <Button asChild size="lg" className="rounded-2xl">
              <Link href="/chat">
                Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-2xl">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">How Soul Care Helps</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-teal-500" />}
            title="AI Companion"
            description="Chat with our compassionate AI that understands your emotions and provides tailored coping strategies."
          />
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-teal-500" />}
            title="Private & Secure"
            description="Your conversations are private and secure. No personal data is stored without your consent."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-teal-500" />}
            title="Community Support"
            description="Connect anonymously with others on similar journeys through our moderated community forum."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-24">
        <h2 className="mb-12 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <StepCard
            number="1"
            title="Express Yourself"
            description="Share your thoughts through text or voice. Our AI listens without judgment."
          />
          <StepCard
            number="2"
            title="Receive Support"
            description="Get personalized coping strategies and resources based on your unique situation."
          />
          <StepCard
            number="3"
            title="Track Progress"
            description="Optionally create an account to track your journey and see your improvement over time."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 p-12 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold">Begin Your Wellness Journey Today</h2>
          <p className="mb-8 text-lg">No sign-up required. Start a conversation with our AI companion now.</p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="rounded-2xl bg-white text-teal-700 hover:bg-neutral-100"
          >
            <Link href="/chat">
              Start Chatting <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
    <Card className="rounded-2xl border-none shadow-md">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 rounded-full bg-teal-50 p-4">{icon}</div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <Card className="rounded-2xl border-none shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-xl font-bold text-teal-700">
          {number}
        </div>
        <h3 className="mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </CardContent>
    </Card>
  )
}
