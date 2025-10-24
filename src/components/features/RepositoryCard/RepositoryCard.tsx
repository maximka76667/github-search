/**
 * @fileoverview Individual repository card component displaying repository metadata.
 */

import { ExternalLink, Star, GitFork, Clock, FolderGit2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import type Repository from "@/types/Repository";
import { formatDate, formatNumber, getLanguageColor } from "@/lib/utils";

/**
 * Props for the RepositoryCard component.
 * @interface
 */
interface RepositoryCardProps {
  /** Repository data to display in the card. */
  repository: Repository;
}

/**
 * Card component that displays a single GitHub repository with its metadata.
 * Shows repository name, description, language, stars, forks, and last update time.
 *
 * @param {RepositoryCardProps} props - Component props.
 * @return {JSX.Element} The rendered repository card component.
 */
export function RepositoryCard({ repository }: RepositoryCardProps) {
  const languageColor = getLanguageColor(repository.primaryLanguage?.name);

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 px-1 py-3 sm:py-4 gap-3 sm:gap-4">
      {/* Gradient accent bar on top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2 sm:pb-3 space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <div className="p-2 sm:p-2.5 rounded-lg bg-linear-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-purple-50 transition-colors duration-300">
              <FolderGit2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl font-bold line-clamp-1">
                <a
                  href={repository.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  aria-label="Open repository"
                >
                  {repository.name}
                </a>
              </CardTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 hover:bg-linear-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
            asChild
          >
            <a
              href={repository.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open repository in new tab"
            >
              <ExternalLink className="h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors duration-300" />
            </a>
          </Button>
        </div>

        <CardDescription className="line-clamp-2 text-xs sm:text-sm text-gray-600 leading-relaxed min-h-8 sm:min-h-10 max-w-lg mx-auto text-center">
          {repository.description || (
            <span className="italic text-gray-400">
              No description provided
            </span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 mt-auto">
        <div className="flex items-center gap-2 sm:gap-4 text-sm bg-linear-to-br from-gray-50 to-gray-100/50 rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-gray-200/50 flex-wrap">
          {repository.primaryLanguage?.name && (
            <Badge
              variant="outline"
              className="bg-white/80 border-gray-200 text-gray-700 hover:bg-white flex items-center gap-1.5 px-2.5 py-0.5"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: languageColor }}
              />
              <span className="text-xs font-medium">
                {repository.primaryLanguage?.name}
              </span>
            </Badge>
          )}

          <a
            href={`${repository.url}/stargazers`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group/star hover:scale-110 transition-transform duration-200"
            aria-label="Star this repository"
          >
            <div className="relative">
              <Star className="h-4 w-4 text-gray-400 group-hover/star:text-yellow-500 transition-colors duration-200" />
              <Star className="absolute inset-0 h-4 w-4 text-yellow-500 opacity-0 group-hover/star:opacity-100 group-hover/star:fill-yellow-500 transition-all duration-200" />
            </div>
            <span className="font-semibold font-mono text-gray-700 group-hover/star:text-yellow-600 transition-colors duration-200">
              {formatNumber(repository.stargazerCount)}
            </span>
          </a>

          {repository.forkCount > 0 && (
            <a
              href={`${repository.url}/forks`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group/fork hover:scale-110 transition-transform duration-200"
              aria-label="View repository forks"
            >
              <GitFork className="h-4 w-4 text-gray-400 group-hover/fork:text-blue-500 transition-colors duration-200" />
              <span className="font-semibold font-mono text-gray-700 group-hover/fork:text-blue-600 transition-colors duration-200">
                {formatNumber(repository.forkCount)}
              </span>
            </a>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto text-gray-500">
            <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            <span className="text-xs sm:text-sm font-medium">
              {formatDate(repository.updatedAt)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
