/**
 * @fileoverview Filter bar component for refining repository search results.
 */

import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select";

/**
 * Props for the FilterBar component.
 * @interface
 */
interface FilterBarProps {
  /** Current text filter value for repository names. */
  searchFilter: string;

  /** Callback fired when search filter input changes. */
  onSearchFilterChange: (value: string) => void;

  /** Current selected language filter value ("all" or specific language). */
  languageFilter: string;

  /** Callback fired when language filter selection changes. */
  onLanguageFilterChange: (value: string) => void;

  /** Array of available programming languages to filter by. */
  availableLanguages: string[];
}

/**
 * Filter bar component that provides search and language filtering controls.
 * Allows users to narrow down repository results by name and programming language.
 *
 * @param {FilterBarProps} props - Component props.
 * @return {JSX.Element} The rendered filter bar component.
 */
export function FilterBar({
  searchFilter,
  onSearchFilterChange,
  languageFilter,
  onLanguageFilterChange,
  availableLanguages,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Filter by repository name..."
          value={searchFilter}
          onChange={(e) => onSearchFilterChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <Select value={languageFilter} onValueChange={onLanguageFilterChange}>
        <SelectTrigger
          aria-labelledby="language-filter-label"
          className="w-full sm:w-[200px]"
        >
          <Filter className="h-4 w-4 mr-2" />
          <SelectValue id="language-filter-label" placeholder="All languages" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All languages</SelectItem>
          {availableLanguages.map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
