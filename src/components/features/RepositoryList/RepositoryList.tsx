/**
 * @fileoverview Repository list component that displays filtered repositories in a grid layout.
 */

import { RepositoryCard } from "@/components/features/RepositoryCard/RepositoryCard";
import { RepositorySkeleton } from "@/components/features/RepositorySkeleton/RepositorySkeleton";
import type Repository from "../../../types/Repository";

/**
 * Props for the RepositoryList component.
 * @interface
 */
interface RepositoryListProps {
  /** Array of repositories to display. */
  repositories: Repository[];

  /** Whether repositories are currently being loaded. */
  loading: boolean;

  /** Text filter to apply to repository names. */
  searchFilter: string;

  /** Language filter to apply ("all" or specific language name). */
  languageFilter: string;
}

/**
 * List component that displays repositories in a responsive grid layout.
 * Handles loading states, empty states, and applies search and language filters.
 *
 * @param props - Component props.
 * @return The rendered repository list component.
 */
export function RepositoryList({
  repositories,
  loading,
  searchFilter,
  languageFilter,
}: RepositoryListProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <RepositorySkeleton key={i} />
        ))}
      </div>
    );
  }

  const filteredRepos = repositories.filter((repo) => {
    const matchesName = repo.name
      .toLowerCase()
      .includes(searchFilter.toLowerCase());
    const matchesLanguage =
      languageFilter === "all" ||
      repo.primaryLanguage?.name?.toLowerCase() ===
        languageFilter.toLowerCase();
    return matchesName && matchesLanguage;
  });

  if (repositories.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Search for a GitHub user to see their repositories
      </div>
    );
  }

  if (filteredRepos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No repositories match your filters
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      {filteredRepos.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
