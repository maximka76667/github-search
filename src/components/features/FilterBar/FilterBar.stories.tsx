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
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Test 1: Basic elements presence
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue("");

    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();

    // Test 2: Icons are present (Search and Filter icons)
    const svgElements = canvasElement.querySelectorAll("svg");
    expect(svgElements.length).toBeGreaterThanOrEqual(2);

    // Test 3: Responsive layout container
    const container = canvasElement.querySelector(".flex");
    expect(container).toBeInTheDocument();

    // Test 4: Default "All languages" text is shown
    expect(canvas.getByText("All languages")).toBeInTheDocument();

    // Test 5: User typing in search input
    await userEvent.type(searchInput, "test-repo");
    expect(args.onSearchFilterChange).toHaveBeenCalled();

    // Test 6: Clear search input
    await userEvent.clear(searchInput);
    expect(searchInput).toHaveValue("");
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
    const searchInput = canvas.getByPlaceholderText(
      /filter by repository name/i
    );
    expect(searchInput).toHaveValue("api");
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
    const languageSelect = canvas.getByRole("combobox");
    expect(languageSelect).toBeInTheDocument();
    expect(canvas.getByText("All languages")).toBeInTheDocument();
  },
};
