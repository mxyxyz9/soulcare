import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Users, Sparkles, Brain, Heart, MessageSquare, BarChart2, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-light to-background dark:from-brand-dark dark:to-background">
        <div className="container mx-auto px-6 py-24 text-center sm:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center rounded-full bg-secondary px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              AI-Powered Mental Wellness
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
              Find Your Calm, Build Your Strength
            </h1>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              Soul Care is your private companion for mental and emotional wellbeing. Start your journey towards a healthier mind today.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="text-base font-semibold">
                <Link href="/chat">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">How Soul Care Can Help You</h2>
            <p className="text-lg text-muted-foreground">
              Our platform offers a unique blend of technology and compassionate care to support your mental health journey.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="AI Companion"
              description="Engage with our empathetic AI that understands your emotions and provides personalized coping strategies 24/7."
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Private & Secure"
              description="Your conversations are encrypted and confidential. We prioritize your privacy above all else."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Community Support"
              description="Connect with others on similar journeys through our anonymous, moderated community forums."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/50 py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">A Simple Path to Feeling Better</h2>
            <p className="text-lg text-muted-foreground">
              Getting started is easy. Begin your journey to better mental health in just a few simple steps.
            </p>
          </div>
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-0 -ml-px h-full w-0.5 bg-border" aria-hidden="true"></div>
            <div className="grid gap-12 lg:grid-cols-3">
              <HowItWorksStep
                icon={<Zap className="h-8 w-8" />}
                title="Express Yourself"
                description="Share your thoughts and feelings through text or voice in a safe, judgment-free space."
              />
              <HowItWorksStep
                icon={<Brain className="h-8 w-8" />}
                title="Receive Guidance"
                description="Get personalized insights and evidence-based coping strategies tailored to your unique needs."
              />
              <HowItWorksStep
                icon={<BarChart2 className="h-8 w-8" />}
                title="Track Your Growth"
                description="Monitor your emotional journey, recognize patterns, and celebrate your progress over time."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Heart className="mx-auto mb-6 h-12 w-12 text-primary" />
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Journey?</h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Take the first step towards a healthier, happier you. Our AI companion is here to listen, without judgment.
            </p>
            <Button asChild size="lg" className="text-base font-semibold">
              <Link href="/chat">
                Chat Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="transform border-border bg-card text-card-foreground shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">{icon}</div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function HowItWorksStep({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative text-center">
      <div className="absolute -top-1.5 left-1/2 -ml-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
        {icon}
      </div>
      <div className="pt-12">
        <h3 className="mb-3 text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
