import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-full">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}
