import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface FilterBarProps {
  searchFilter: string;
  onSearchFilterChange: (value: string) => void;
  languageFilter: string;
  onLanguageFilterChange: (value: string) => void;
  availableLanguages: string[];
}

export function FilterBar({
  searchFilter,
  onSearchFilterChange,
  languageFilter,
  onLanguageFilterChange,
  availableLanguages,
}: FilterBarProps) {
  return (
    <div className="space-y-4 mb-6">
      <Separator />
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
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All languages" />
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
    </div>
  );
}
