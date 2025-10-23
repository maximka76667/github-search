/**
 * @fileoverview Skeleton component for loading states.
 * Displays animated placeholder content while data is being fetched.
 */

import { cn } from "@/lib/utils";

/** Skeleton component that displays a pulsing placeholder during loading. */
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

export { Skeleton };
