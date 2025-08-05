import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, MessageSquare, TrendingUp, Lightbulb, BookOpen, Activity } from "lucide-react"
import Link from "next/link"
import { AuthCheck } from "@/components/auth/auth-check"
import { UserInfo } from "@/components/auth/user-info"

export default function DashboardPage() {
  return (
    <AuthCheck>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Track your progress and access personalized resources</p>
          </div>
          <Button asChild>
            <Link href="/chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Continue Chat
            </Link>
          </Button>
        </div>

        <div className="mb-8">
          <UserInfo />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="Mood Trend"
                value="Improving"
                icon={<TrendingUp className="h-5 w-5" />}
                description="Last 7 days"
                trend="up"
              />
              <StatsCard
                title="Chat Sessions"
                value="12"
                icon={<MessageSquare className="h-5 w-5" />}
                description="This month"
                trend="up"
              />
              <StatsCard
                title="Streak"
                value="5 days"
                icon={<Calendar className="h-5 w-5" />}
                description="Keep it going!"
                trend="neutral"
              />
              <StatsCard
                title="Average Session"
                value="15 min"
                icon={<Clock className="h-5 w-5" />}
                description="Last 5 sessions"
                trend="neutral"
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Weekly Mood Tracker
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day, index) => (
                        <div key={day} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{day}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {getMoodLabel(getMoodValue(index))}
                            </span>
                          </div>
                          <Progress value={getMoodValue(index)} className="h-2" />
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Recommended Practices
                  </CardTitle>
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
            <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Based on your conversations, here are some patterns and insights that might be helpful:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      You tend to experience more stress in the evenings - consider adding a wind-down routine.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Your mood improves after social interactions - connecting with others seems beneficial for you.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      You've mentioned work pressure frequently - exploring work-life balance strategies might help.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ResourceCard
                title="Understanding Anxiety"
                description="Learn about the science behind anxiety and effective coping strategies."
                type="Article"
                icon={<BookOpen className="h-5 w-5" />}
              />
              <ResourceCard
                title="Mindfulness Meditation"
                description="A guided 10-minute meditation practice for beginners."
                type="Audio"
                icon={<Activity className="h-5 w-5" />}
              />
              <ResourceCard
                title="Sleep Hygiene Tips"
                description="Practical advice for improving your sleep quality and routine."
                type="Guide"
                icon={<Lightbulb className="h-5 w-5" />}
              />
              <ResourceCard
                title="Cognitive Behavioral Techniques"
                description="Simple CBT exercises you can practice at home."
                type="Interactive"
                icon={<Activity className="h-5 w-5" />}
              />
              <ResourceCard
                title="Finding Professional Help"
                description="How to find and choose the right mental health professional."
                type="Resource"
                icon={<BookOpen className="h-5 w-5" />}
              />
              <ResourceCard
                title="Crisis Support Information"
                description="Important contacts and resources for immediate support."
                type="Emergency"
                icon={<Activity className="h-5 w-5" />}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AuthCheck>
  )
}

function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
}: {
  title: string
  value: string
  icon: React.ReactNode
  description: string
  trend: "up" | "down" | "neutral"
}) {
  return (
    <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
          </div>
          <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-800">
            <div className="text-gray-600 dark:text-gray-400">{icon}</div>
          </div>
        </div>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{description}</p>
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
      <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <div className="h-4 w-4 rounded-full bg-gray-400" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {tag}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  )
}

function ResourceCard({
  title,
  description,
  type,
  icon,
}: {
  title: string
  description: string
  type: string
  icon: React.ReactNode
}) {
  return (
    <Card className="border-0 bg-white shadow-sm dark:bg-gray-950">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-lg bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            {type}
          </span>
          <div className="text-gray-400">{icon}</div>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <Button variant="outline" className="w-full bg-transparent">
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
