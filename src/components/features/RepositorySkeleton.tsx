import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RepositorySkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-8 w-8 shrink-0" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-20" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
