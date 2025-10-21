import type { Meta, StoryObj } from "@storybook/react";
import { FilterBar } from "./FilterBar";

const meta: Meta<typeof FilterBar> = {
  title: "Features/FilterBar",
  component: FilterBar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    searchFilter: {
      control: "text",
    },
    languageFilter: {
      control: "text",
    },
    availableLanguages: {
      control: "object",
    },
    onSearchFilterChange: { action: "search filter changed" },
    onLanguageFilterChange: { action: "language filter changed" },
  },
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

export const Default: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
  },
};

export const WithSearchFilter: Story = {
  args: {
    searchFilter: "react",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
  },
};

export const WithLanguageFilter: Story = {
  args: {
    searchFilter: "",
    languageFilter: "TypeScript",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
  },
};

export const WithBothFilters: Story = {
  args: {
    searchFilter: "api",
    languageFilter: "Python",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
  },
};

export const ManyLanguages: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: [
      "TypeScript",
      "JavaScript",
      "Python",
      "Go",
      "Rust",
      "Java",
      "C++",
      "C#",
      "PHP",
      "Ruby",
      "Swift",
      "Kotlin",
      "Scala",
      "Clojure",
      "Haskell",
    ],
  },
};

export const FewLanguages: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript"],
  },
};
