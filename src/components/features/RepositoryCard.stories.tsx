import type { Meta, StoryObj } from "@storybook/react";
import { RepositoryCard } from "./RepositoryCard";
import type Repository from "../types/Repository";

const mockRepository: Repository = {
  id: 1,
  name: "awesome-project",
  description:
    "A really awesome project that does amazing things with modern web technologies",
  html_url: "https://github.com/example/awesome-project",
  language: "TypeScript",
  stargazers_count: 1234,
  forks_count: 89,
  updated_at: "2024-01-15T10:30:00Z",
};

const meta: Meta<typeof RepositoryCard> = {
  title: "Features/RepositoryCard",
  component: RepositoryCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    repository: {
      control: "object",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RepositoryCard>;

export const Default: Story = {
  args: {
    repository: mockRepository,
  },
};

export const PopularRepository: Story = {
  args: {
    repository: {
      ...mockRepository,
      name: "very-popular-repo",
      stargazers_count: 50000,
      forks_count: 1200,
    },
  },
};

export const NewRepository: Story = {
  args: {
    repository: {
      ...mockRepository,
      name: "brand-new-repo",
      stargazers_count: 5,
      forks_count: 1,
      updated_at: new Date().toISOString(),
    },
  },
};

export const NoDescription: Story = {
  args: {
    repository: {
      ...mockRepository,
      description: null,
    },
  },
};

export const NoLanguage: Story = {
  args: {
    repository: {
      ...mockRepository,
      language: null,
    },
  },
};

export const LongDescription: Story = {
  args: {
    repository: {
      ...mockRepository,
      description:
        "This is a very long description that should demonstrate how the card handles text overflow and line clamping. It contains multiple sentences and should wrap properly within the card layout while maintaining good visual hierarchy.",
    },
  },
};

export const LongName: Story = {
  args: {
    repository: {
      ...mockRepository,
      name: "very-long-repository-name-that-might-cause-layout-issues",
    },
  },
};

export const OldRepository: Story = {
  args: {
    repository: {
      ...mockRepository,
      updated_at: "2020-01-01T00:00:00Z",
    },
  },
};
