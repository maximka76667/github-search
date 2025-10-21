import type { Meta, StoryObj } from "@storybook/react";
import { RepositoryList } from "./RepositoryList";
import type Repository from "../types/Repository";

const mockRepositories: Repository[] = [
  {
    id: 1,
    name: "react-portfolio",
    description:
      "A beautiful portfolio website built with React and Tailwind CSS",
    html_url: "https://github.com/example/react-portfolio",
    language: "TypeScript",
    stargazers_count: 234,
    forks_count: 45,
    updated_at: "2024-10-15T10:30:00Z",
  },
  {
    id: 2,
    name: "awesome-python-scripts",
    description:
      "Collection of useful Python automation scripts for everyday tasks",
    html_url: "https://github.com/example/awesome-python-scripts",
    language: "Python",
    stargazers_count: 1250,
    forks_count: 189,
    updated_at: "2024-10-20T14:22:00Z",
  },
  {
    id: 3,
    name: "nodejs-api-starter",
    description:
      "RESTful API starter template with Express, TypeScript, and MongoDB",
    html_url: "https://github.com/example/nodejs-api-starter",
    language: "TypeScript",
    stargazers_count: 567,
    forks_count: 92,
    updated_at: "2024-09-28T08:15:00Z",
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
      id: i + 1,
      name: `repo-${i + 1}`,
      description: `Description for repository ${i + 1}`,
      html_url: `https://github.com/example/repo-${i + 1}`,
      language: ["TypeScript", "JavaScript", "Python", "Go"][i % 4],
      stargazers_count: Math.floor(Math.random() * 1000),
      forks_count: Math.floor(Math.random() * 100),
      updated_at: new Date(
        Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
      ).toISOString(),
    })),
    loading: false,
    searchFilter: "",
    languageFilter: "all",
  },
};
