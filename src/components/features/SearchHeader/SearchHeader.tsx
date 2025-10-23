/**
 * @fileoverview Search header component for entering GitHub username and initiating search.
 */

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/input";

/**
 * Props for the SearchHeader component.
 * @interface
 */
interface SearchHeaderProps {
  /** Current username value in the input field. */
  username: string;

  /** Callback fired when username input changes. */
  onUsernameChange: (value: string) => void;

  /** Callback fired when search button is clicked or Enter key is pressed. */
  onSearch: () => void;

  /** Whether a search operation is currently in progress. */
  loading: boolean;
}

/**
 * Header component that displays the application title and username search input.
 * Provides a search field with icon and button to initiate repository lookup.
 *
 * @param {SearchHeaderProps} props - Component props.
 * @return {JSX.Element} The rendered search header component.
 */
export function SearchHeader({
  username,
  onUsernameChange,
  onSearch,
  loading,
}: SearchHeaderProps) {
  return (
    <div className="space-y-4 pt-2 pb-6">
      <div className="text-center space-y-2">
        {/* <h1 className="text-3xl font-bold tracking-tight">
          GitHub Repository Explorer
        </h1> */}
        {/* <p className="text-muted-foreground text-sm">
          Search for any GitHub user and explore their repositories
        </p> */}
      </div>

      <div className="flex gap-2 max-w-xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter GitHub username..."
            value={username}
            onChange={(e) => onUsernameChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="pl-9"
            disabled={loading}
          />
        </div>
        <Button
          onClick={onSearch}
          disabled={loading || !username.trim()}
          size="default"
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>
    </div>
  );
}
