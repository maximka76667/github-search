import type { Meta, StoryObj } from "@storybook/react";
import { SearchHeader } from "./SearchHeader";

const meta: Meta<typeof SearchHeader> = {
  title: "Features/SearchHeader",
  component: SearchHeader,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    username: {
      control: "text",
    },
    loading: {
      control: "boolean",
    },
    onUsernameChange: { action: "username changed" },
    onSearch: { action: "search clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof SearchHeader>;

export const Default: Story = {
  args: {
    username: "",
    loading: false,
  },
};

export const WithUsername: Story = {
  args: {
    username: "octocat",
    loading: false,
  },
};

export const Loading: Story = {
  args: {
    username: "octocat",
    loading: true,
  },
};

export const LongUsername: Story = {
  args: {
    username: "very-long-github-username-example",
    loading: false,
  },
};
