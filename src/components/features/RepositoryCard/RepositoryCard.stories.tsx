import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { RepositoryCard } from "./RepositoryCard";

const meta = {
  title: "Features/RepositoryCard",
  component: RepositoryCard,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRepository = {
  id: "1",
  name: "awesome-project",
  description: "A really cool project",
  url: "https://github.com/user/awesome-project",
  primaryLanguage: {
    name: "TypeScript",
  },
  stargazerCount: 1234,
  forkCount: 56,
  updatedAt: "2024-01-15T10:00:00Z",
};

export const Default: Story = {
  args: {
    repository: mockRepository,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the title link is rendered correctly
    const titleLink = canvas.getByRole("link", { name: /open repository$/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", mockRepository.url);

    // Test that description is displayed
    expect(canvas.getByText(mockRepository.description)).toBeInTheDocument();

    // Test that the language badge is displayed
    expect(canvas.getByText("TypeScript")).toBeInTheDocument();

    // Test that stats are displayed correctly (formatted)
    expect(canvas.getByText("1.2k")).toBeInTheDocument(); // 1234 stars
    expect(canvas.getByText("56")).toBeInTheDocument(); // 56 forks
  },
};

export const NoDescription: Story = {
  args: {
    repository: {
      ...mockRepository,
      description: null,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that "No description provided" message is shown
    expect(canvas.getByText(/no description provided/i)).toBeInTheDocument();
  },
};

export const HighStarCount: Story = {
  args: {
    repository: {
      ...mockRepository,
      stargazerCount: 25670,
      forkCount: 3420,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that large numbers are formatted correctly
    expect(canvas.getByText("25.7k")).toBeInTheDocument();
    expect(canvas.getByText("3.4k")).toBeInTheDocument();
  },
};

export const NoForks: Story = {
  args: {
    repository: {
      ...mockRepository,
      forkCount: 0,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that fork count is not displayed when it's 0
    const forkLinks = canvas.queryAllByRole("link", {
      name: /view repository forks/i,
    });
    expect(forkLinks).toHaveLength(0);
  },
};

export const NoLanguage: Story = {
  args: {
    repository: {
      ...mockRepository,
      primaryLanguage: null,
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that language badge is not shown when no language is specified
    const badges = canvas.queryByText("TypeScript");
    expect(badges).not.toBeInTheDocument();
  },
};

export const LongName: Story = {
  args: {
    repository: {
      ...mockRepository,
      name: "extremely-long-repository-name-that-should-be-truncated-properly",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that long names are displayed (truncation is handled by CSS)
    expect(
      canvas.getByRole("link", { name: /open repository$/i })
    ).toBeInTheDocument();
  },
};

export const LongDescription: Story = {
  args: {
    repository: {
      ...mockRepository,
      description:
        "This is an extremely long description that should be clamped to two lines. It contains a lot of text to demonstrate how the component handles very long descriptions. The CSS should truncate this text with an ellipsis after two lines.",
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that description is displayed (truncation is handled by CSS)
    const description = canvas.getByText(/extremely long description/i);
    expect(description).toBeInTheDocument();
  },
};

export const RecentlyUpdated: Story = {
  args: {
    repository: {
      ...mockRepository,
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that recently updated repos show "Yesterday" or "Today"
    const dateText = canvas.getByText(/yesterday|today|1 days ago/i);
    expect(dateText).toBeInTheDocument();
  },
};

export const DifferentLanguages: Story = {
  args: {
    repository: {
      ...mockRepository,
      primaryLanguage: {
        name: "Python",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that different languages are displayed correctly
    expect(canvas.getByText("Python")).toBeInTheDocument();
  },
};
