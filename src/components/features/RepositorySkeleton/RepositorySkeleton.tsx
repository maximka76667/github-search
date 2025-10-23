/**
 * @fileoverview Skeleton loading component for repository cards.
 * Displays placeholder content while repository data is being fetched.
 */
import { Card, CardContent, CardHeader } from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";

/**
 * Skeleton loading component that mimics the structure of a RepositoryCard.
 * Used to provide visual feedback during data loading, showing placeholder
 * elements in place of actual repository information.
 *
 * @return {JSX.Element} The rendered skeleton placeholder component.
 */
export function RepositorySkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        {/* Repository name and external link button placeholders */}
        <div className="flex items-start justify-between gap-2">
          {/* Repository description placeholders (two lines) */}
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-8 w-8 shrink-0" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        {/* Language badge placeholder */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Skeleton className="h-5 w-20" />
        </div>
        {/* Repository metadata placeholders (stars, forks, updated date) */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24 ml-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
