import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MessageSquare, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Track your progress and access personalized resources
          </p>
        </div>
        <Button asChild className="rounded-2xl">
          <Link href="/chat">
            <MessageSquare className="mr-2 h-4 w-4" />
            Continue Chat
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="rounded-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Mood Trend"
              value="Improving"
              icon={<TrendingUp className="h-5 w-5 text-teal-500" />}
              description="Last 7 days"
            />
            <StatsCard
              title="Chat Sessions"
              value="12"
              icon={<MessageSquare className="h-5 w-5 text-teal-500" />}
              description="This month"
            />
            <StatsCard
              title="Streak"
              value="5 days"
              icon={<Calendar className="h-5 w-5 text-teal-500" />}
              description="Keep it going!"
            />
            <StatsCard
              title="Average Session"
              value="15 min"
              icon={<Clock className="h-5 w-5 text-teal-500" />}
              description="Last 5 sessions"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Weekly Mood Tracker</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                    <div key={day} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{day}</span>
                        <span className="text-sm text-neutral-500">{getMoodLabel(getMoodValue(index))}</span>
                      </div>
                      <Progress value={getMoodValue(index)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle>Recommended Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <RecommendedPractice
                    title="5-Minute Breathing Exercise"
                    description="A quick mindfulness practice to center yourself"
                    tag="Mindfulness"
                  />
                  <RecommendedPractice
                    title="Gratitude Journaling"
                    description="Write down three things you're grateful for today"
                    tag="Reflection"
                  />
                  <RecommendedPractice
                    title="Progressive Muscle Relaxation"
                    description="Reduce physical tension with this guided exercise"
                    tag="Relaxation"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-600 dark:text-neutral-400">
                Based on your conversations, here are some patterns and insights that might be helpful:
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                  <p>You tend to experience more stress in the evenings - consider adding a wind-down routine.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                  <p>Your mood improves after social interactions - connecting with others seems beneficial for you.</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                  <p>You've mentioned work pressure frequently - exploring work-life balance strategies might help.</p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ResourceCard
              title="Understanding Anxiety"
              description="Learn about the science behind anxiety and effective coping strategies."
              type="Article"
            />
            <ResourceCard
              title="Mindfulness Meditation"
              description="A guided 10-minute meditation practice for beginners."
              type="Audio"
            />
            <ResourceCard
              title="Sleep Hygiene Tips"
              description="Practical advice for improving your sleep quality and routine."
              type="Guide"
            />
            <ResourceCard
              title="Cognitive Behavioral Techniques"
              description="Simple CBT exercises you can practice at home."
              type="Interactive"
            />
            <ResourceCard
              title="Finding Professional Help"
              description="How to find and choose the right mental health professional."
              type="Resource"
            />
            <ResourceCard
              title="Crisis Support Information"
              description="Important contacts and resources for immediate support."
              type="Emergency"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatsCard({
  title,
  value,
  icon,
  description,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
}) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
          </div>
          <div className="rounded-full bg-teal-50 p-2 dark:bg-teal-900/20">{icon}</div>
        </div>
        <p className="mt-2 text-xs text-neutral-500">{description}</p>
      </CardContent>
    </Card>
  )
}

function RecommendedPractice({
  title,
  description,
  tag,
}: {
  title: string
  description: string
  tag: string
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-md bg-teal-100 p-2 dark:bg-teal-900/20">
        <div className="h-6 w-6 rounded-full bg-teal-500" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{title}</h3>
          <span className="rounded-full bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
            {tag}
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
      </div>
    </div>
  )
}

function ResourceCard({
  title,
  description,
  type,
}: {
  title: string
  description: string
  type: string
}) {
  return (
    <Card className="rounded-2xl shadow-md">
      <CardContent className="p-6">
        <div className="mb-4 inline-block rounded-md bg-teal-100 px-2 py-1 text-xs font-medium text-teal-800 dark:bg-teal-900/30 dark:text-teal-300">
          {type}
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        <Button variant="outline" className="w-full rounded-2xl">
          View Resource
        </Button>
      </CardContent>
    </Card>
  )
}

// Helper functions for the mood tracker
function getMoodValue(day: number): number {
  // Simulate mood values (0-100)
  const moodValues = [45, 60, 55, 70, 80, 75, 85]
  return moodValues[day]
}

function getMoodLabel(value: number): string {
  if (value < 30) return "Low"
  if (value < 50) return "Below Average"
  if (value < 70) return "Average"
  if (value < 85) return "Good"
  return "Excellent"
}
