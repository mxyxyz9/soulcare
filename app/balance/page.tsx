import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BalancePage() {
  return (
    <div className="flex justify-center items-center min-h-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Balance</CardTitle>
          <CardDescription>This is the balance page.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Welcome to the balance page. More content will be added here soon.</p>
        </CardContent>
      </Card>
    </div>
  )
}
