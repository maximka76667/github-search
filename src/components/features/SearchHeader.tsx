import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchHeaderProps {
  username: string;
  onUsernameChange: (value: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export function SearchHeader({
  username,
  onUsernameChange,
  onSearch,
  loading,
}: SearchHeaderProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          GitHub Repository Explorer
        </h1>
        <p className="text-muted-foreground">
          Search for any GitHub user and explore their repositories
        </p>
      </div>

      <div className="flex gap-2 max-w-2xl mx-auto">
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
