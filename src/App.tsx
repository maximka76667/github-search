/**
 * @fileoverview Main application component for GitHub Repository Explorer.
 * Manages user search, repository fetching, filtering, and display.
 */

import "./App.css";
import { useState } from "react";
import { SearchHeader } from "@/components/features/SearchHeader/SearchHeader";
import { FilterBar } from "@/components/features/FilterBar/FilterBar";
import { RepositoryList } from "@/components/features/RepositoryList/RepositoryList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible/collapsible";
import { Button } from "./components/ui/button/button";
import { ChevronDown } from "lucide-react";
import { useLazyQuery } from "@apollo/client/react";
import { getUserRepositories } from "./graphql/getUserRepositories";
import type {
  GetUserRepositoriesResponse,
  GetUserRepositoriesVariables,
} from "./types/GraphQLReponse";

/**
 * Root application component that provides GitHub repository search and exploration.
 * Allows users to search for repositories by username and filter results by name and language.
 *
 * @return {JSX.Element} The rendered application component.
 */
function App() {
  const [username, setUsername] = useState("");
  // const [repositories, setRepositories] = useState<Repository[]>([]);
  // const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [isHeaderOpen, setIsHeaderOpen] = useState(true);

  const [getRepositories, { loading, data, error: queryError }] = useLazyQuery<
    GetUserRepositoriesResponse,
    GetUserRepositoriesVariables
  >(getUserRepositories);

  const repositories = data?.user?.repositories?.nodes || [];

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

    setError(null);
    // setRepositories([]);
    setSearchFilter("");
    setLanguageFilter("all");

    getRepositories({
      variables: {
        username: username.trim(),
        first: 30,
      },
    });
  };

  // Extract unique languages from repositories and sort by count of repositories descending
  const availableLanguages = Array.from(
    new Set(
      repositories
        .map((repo) => repo.primaryLanguage?.name)
        .filter(
          (languageName): languageName is string => languageName !== undefined
        )
    )
  )
    .map((language) => ({
      language,
      count: repositories.filter(
        (repo) => repo.primaryLanguage?.name === language
      ).length,
    }))
    .sort((a, b) => b.count - a.count)
    .map(({ language }) => language);

  // Combine local validation error with GraphQL query error
  const displayError =
    error ||
    (queryError
      ? `User "${username}" not found. Please check the username and try again.`
      : null);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header Section */}
      <Collapsible
        open={isHeaderOpen}
        onOpenChange={setIsHeaderOpen}
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg w-full border-b border-border/40 py-4 sm:py-6 md:py-10"
      >
        <div className="container mx-auto px-4 w-full max-w-5xl">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex flex-col gap-2 items-center justify-center">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                GitHub Repository Explorer
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm">
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
        {displayError && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            <p className="font-medium">Error</p>
            <p className="text-sm">{displayError}</p>
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
