import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that input is present and interactive
    const input = canvas.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("");

    // Test that search button is present
    const searchButton = canvas.getByRole("button");
    expect(searchButton).toBeInTheDocument();
  },
};

export const WithUsername: Story = {
  args: {
    username: "octocat",
    loading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that input has the correct value
    const input = canvas.getByRole("textbox");
    expect(input).toHaveValue("octocat");
  },
};

export const Loading: Story = {
  args: {
    username: "octocat",
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that button is disabled during loading
    const searchButton = canvas.getByRole("button");
    expect(searchButton).toBeDisabled();
  },
};

export const LongUsername: Story = {
  args: {
    username: "very-long-github-username-example",
    loading: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that long username is handled properly
    const input = canvas.getByRole("textbox");
    expect(input).toHaveValue("very-long-github-username-example");
  },
};
