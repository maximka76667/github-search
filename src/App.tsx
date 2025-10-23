/**
 * @fileoverview Main application component for GitHub Repository Explorer.
 * Manages user search, repository fetching, filtering, and display.
 */

import "./App.css";
import { useState } from "react";
import { SearchHeader } from "@/components/features/SearchHeader/SearchHeader";
import { FilterBar } from "@/components/features/FilterBar/FilterBar";
import { RepositoryList } from "@/components/features/RepositoryList/RepositoryList";
import type Repository from "./types/Repository";
import { fetchUserRepositories } from "./services/githubService";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible/collapsible";
import { Button } from "./components/ui/button/button";
import { ChevronDown } from "lucide-react";

/**
 * Root application component that provides GitHub repository search and exploration.
 * Allows users to search for repositories by username and filter results by name and language.
 *
 * @return {JSX.Element} The rendered application component.
 */
function App() {
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  /**
   * Handles the search action by fetching repositories for the entered username.
   * Resets filters and clears previous results before fetching new data.
   *
   * @return {Promise<void>} Promise that resolves when search is complete.
   */
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
    .sort((a, b) => b.count - a.count)
    .map(({ language }) => language);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header Section */}
      <Collapsible
        open={isHeaderOpen}
        onOpenChange={setIsHeaderOpen}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg w-full border-b border-border/40 py-10"
      >
        <div className="container mx-auto px-4 w-full max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold tracking-tight">
                GitHub Repository Explorer
              </h1>
              <p className="text-muted-foreground text-sm">
                Search for any GitHub user and explore their repositories
              </p>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isHeaderOpen ? "" : "-rotate-90"
                  }`}
                />
                <span className="sr-only">Toggle header</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <SearchHeader
              username={username}
              onUsernameChange={setUsername}
              onSearch={handleSearch}
              loading={loading}
            />

            {/* Filter Bar */}
            {repositories.length > 0 && (
              <div>
                <FilterBar
                  searchFilter={searchFilter}
                  onSearchFilterChange={setSearchFilter}
                  languageFilter={languageFilter}
                  onLanguageFilterChange={setLanguageFilter}
                  availableLanguages={availableLanguages}
                />
              </div>
            )}
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 w-full max-w-7xl">
        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
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
