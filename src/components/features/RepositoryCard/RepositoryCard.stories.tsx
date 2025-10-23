// RepositoryCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { RepositoryCard } from "./RepositoryCard";

const meta = {
  title: "Features/RepositoryCard",
  component: RepositoryCard,
} satisfies Meta<typeof RepositoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockRepository = {
  id: 1,
  name: "awesome-project",
  description: "A really cool project",
  html_url: "https://github.com/user/awesome-project",
  language: "TypeScript",
  stargazers_count: 1234,
  forks_count: 56,
  updated_at: "2024-01-15T10:00:00Z",
};

export const Default: Story = {
  args: {
    repository: mockRepository,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the title is rendered and clickable
    const titleLink = canvas.getByRole("link", { name: /awesome-project/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute("href", mockRepository.html_url);

    // Test that the language badge is displayed
    expect(canvas.getByText("TypeScript")).toBeInTheDocument();

    // Test that stats are displayed correctly
    expect(canvas.getByText("1.2k")).toBeInTheDocument();
    expect(canvas.getByText("56")).toBeInTheDocument();
  },
};
