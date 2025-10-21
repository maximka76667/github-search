import "./App.css";
import { useState } from "react";
import { SearchHeader } from "@/components/features/SearchHeader";
import { FilterBar } from "@/components/features/FilterBar";
import { RepositoryList } from "@/components/features/RepositoryList";
import type Repository from "./components/types/Repository";
import { fetchUserRepositories } from "./services/githubService";

function App() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");

  const handleSearch = async () => {
    if (!username.trim()) {
      setError("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);
    setRepositories([]);
    setSearchFilter("");
    setLanguageFilter("all");

    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const repos = await fetchUserRepositories(username.trim(), token);

      console.log("repos", repos[0]);
      if (repos.length === 0) {
        setError(`User "${username}" has no public repositories`);
      } else {
        setRepositories(repos);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch repositories";
      setError(errorMessage);
      console.error("Error fetching repositories:", err);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique languages from repositories and sort by count of repositories descending
  const availableLanguages = Array.from(
    new Set(
      repositories
        .map((repo) => repo.language)
        .filter((language): language is string => language !== null)
    )
  )
    .map((language) => ({
      language,
      count: repositories.filter((repo) => repo.language === language).length,
    }))
    .sort((a, b) => b.count - a.count) // Sort by count descending
    .map(({ language }) => language);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 w-full max-w-7xl">
        <SearchHeader
          username={username}
          onUsernameChange={setUsername}
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {repositories.length > 0 && (
          <FilterBar
            searchFilter={searchFilter}
            onSearchFilterChange={setSearchFilter}
            languageFilter={languageFilter}
            onLanguageFilterChange={setLanguageFilter}
            availableLanguages={availableLanguages}
          />
        )}

        {/* Repository list */}
        <RepositoryList
          repositories={repositories}
          loading={loading}
          searchFilter={searchFilter}
          languageFilter={languageFilter}
        />
      </div>
    </div>
  );
}

export default App;
