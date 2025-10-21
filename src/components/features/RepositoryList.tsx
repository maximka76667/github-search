import { RepositoryCard } from "@/components/features/RepositoryCard";
import { RepositorySkeleton } from "@/components/features/RepositorySkeleton";
import type Repository from "../types/Repository";

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  searchFilter: string;
  languageFilter: string;
}

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
      languageFilter === "all" || repo.language === languageFilter;
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
    <div className="grid gap-4 md:grid-cols-2">
      {filteredRepos.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
