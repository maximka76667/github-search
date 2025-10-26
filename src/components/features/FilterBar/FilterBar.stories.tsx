import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within, fn } from "storybook/test";
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
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that search input is present with correct placeholder
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");

    // Test that language select is present
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();

    // Test that search icon is visible (via SVG)
    const searchIcon = canvasElement.querySelector("svg");
    expect(searchIcon).toBeInTheDocument();
  },
};

export const WithSearchFilter: Story = {
  args: {
    searchFilter: "react",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that search filter value is displayed
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    expect(searchInput).toHaveValue("react");
  },
};

export const WithLanguageFilter: Story = {
  args: {
    searchFilter: "",
    languageFilter: "TypeScript",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that language filter shows selected value
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();

    // Test that TypeScript is displayed as the selected value
    expect(canvas.getByText("TypeScript")).toBeInTheDocument();
  },
};

export const WithBothFilters: Story = {
  args: {
    searchFilter: "api",
    languageFilter: "Python",
    availableLanguages: ["TypeScript", "JavaScript", "Python", "Go", "Rust"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that both filters have values
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    expect(searchInput).toHaveValue("api");

    // Test that Python is shown as selected
    expect(canvas.getByText("Python")).toBeInTheDocument();
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
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that component renders with many languages
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();

    // Test that "All languages" is displayed when "all" is selected
    expect(canvas.getByText("All languages")).toBeInTheDocument();
  },
};

export const FewLanguages: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test with minimal languages
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();
  },
};

export const UserTypingInSearch: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript", "Python"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );

    // Test typing in search input
    await userEvent.type(searchInput, "test-repo");

    // Verify callback was called
    expect(args.onSearchFilterChange).toHaveBeenCalled();
  },
};

export const EmptyLanguageList: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: [],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that component handles empty language list gracefully
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();

    // Should still show "All languages" option
    expect(canvas.getByText("All languages")).toBeInTheDocument();
  },
};

export const ResponsiveLayout: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript", "Python"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that flex container exists for responsive layout
    const container = canvasElement.querySelector(".flex");
    expect(container).toBeInTheDocument();

    // Test that both search input and select are present
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    const languageSelect = canvas.getByRole("combobox");

    expect(searchInput).toBeInTheDocument();
    expect(languageSelect).toBeInTheDocument();
  },
};

export const ClearSearch: Story = {
  args: {
    searchFilter: "existing-search",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );

    // Test clearing the search
    expect(searchInput).toHaveValue("existing-search");

    await userEvent.clear(searchInput);
    expect(args.onSearchFilterChange).toHaveBeenCalled();
  },
};

export const IconsPresent: Story = {
  args: {
    searchFilter: "",
    languageFilter: "all",
    availableLanguages: ["TypeScript", "JavaScript"],
    onSearchFilterChange: fn(),
    onLanguageFilterChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that both search and filter icons are present
    const svgElements = canvasElement.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThanOrEqual(2); // Search icon + Filter icon (at minimum)
  },
};
