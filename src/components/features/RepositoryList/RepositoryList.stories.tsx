import type { Meta, StoryObj } from "@storybook/react";
import { RepositoryList } from "./RepositoryList";
import type Repository from "../../../types/Repository";

const mockRepositories: Repository[] = [
  {
    id: "1",
    name: "react-portfolio",
    description:
      "A beautiful portfolio website built with React and Tailwind CSS",
    url: "https://github.com/example/react-portfolio",
    primaryLanguage: {
      name: "TypeScript",
    },
    stargazerCount: 234,
    forkCount: 45,
    updatedAt: "2024-10-15T10:30:00Z",
  },
  {
    id: "2",
    name: "awesome-python-scripts",
    description:
      "Collection of useful Python automation scripts for everyday tasks",
    url: "https://github.com/example/awesome-python-scripts",
    primaryLanguage: {
      name: "Python",
    },
    stargazerCount: 1250,
    forkCount: 189,
    updatedAt: "2024-10-20T14:22:00Z",
  },
  {
    id: "3",
    name: "nodejs-api-starter",
    description:
      "RESTful API starter template with Express, TypeScript, and MongoDB",
    url: "https://github.com/example/nodejs-api-starter",
    primaryLanguage: {
      name: "TypeScript",
    },
    stargazerCount: 567,
    forkCount: 92,
    updatedAt: "2024-09-28T08:15:00Z",
  },
];

const meta: Meta<typeof RepositoryList> = {
  title: "Features/RepositoryList",
  component: RepositoryList,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    repositories: {
      control: "object",
    },
    loading: {
      control: "boolean",
    },
    searchFilter: {
      control: "text",
    },
    languageFilter: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RepositoryList>;

export const Default: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    searchFilter: "",
    languageFilter: "all",
  },
};

export const Loading: Story = {
  args: {
    repositories: [],
    loading: true,
    searchFilter: "",
    languageFilter: "all",
  },
};

export const Empty: Story = {
  args: {
    repositories: [],
    loading: false,
    searchFilter: "",
    languageFilter: "all",
  },
};

export const WithSearchFilter: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    searchFilter: "react",
    languageFilter: "all",
  },
};

export const WithLanguageFilter: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    searchFilter: "",
    languageFilter: "TypeScript",
  },
};

export const NoMatches: Story = {
  args: {
    repositories: mockRepositories,
    loading: false,
    searchFilter: "nonexistent",
    languageFilter: "all",
  },
};

export const ManyRepositories: Story = {
  args: {
    repositories: Array.from({ length: 12 }, (_, i) => ({
      id: `${i + 1}`,
      name: `repo-${i + 1}`,
      description: `Description for repository ${i + 1}`,
      url: `https://github.com/example/repo-${i + 1}`,
      primaryLanguage: {
        name: ["TypeScript", "JavaScript", "Python", "Go"][i % 4],
      },
      stargazerCount: Math.floor(Math.random() * 1000),
      forkCount: Math.floor(Math.random() * 100),
      updatedAt: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })),
    loading: false,
    searchFilter: "",
    languageFilter: "all",
  },
};
