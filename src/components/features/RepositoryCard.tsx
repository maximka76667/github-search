import {
  ExternalLink,
  Star,
  GitFork,
  Clock,
  FolderGit2,
  FolderRoot,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type Repository from "../types/Repository";

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow flex-1 py-4 min-w-md">
      <CardHeader className="px-4">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg line-clamp-1 flex items-center gap-2">
            <FolderGit2 className="h-4 w-4" />
            {repository.name}
          </CardTitle>
          <Button variant="ghost" size="icon" className="shrink-0" asChild>
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open repository in new tab"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
        <CardDescription className="line-clamp-2 min-h-10 text-left">
          {repository.description || "No description provided"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-end justify-between px-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {repository.language && (
            <Badge variant="secondary">{repository.language}</Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground justify-between w-full">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{repository.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-4 w-4" />
            <span>{repository.forks_count}</span>
          </div>
          <div className="flex items-center gap-1.5 ml-auto">
            <Clock className="h-4 w-4" />
            <span>{formatDate(repository.updated_at)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
