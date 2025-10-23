import type { Meta, StoryObj } from "@storybook/react";
import { RepositorySkeleton } from "./RepositorySkeleton";

const meta: Meta<typeof RepositorySkeleton> = {
  title: "Features/RepositorySkeleton",
  component: RepositorySkeleton,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RepositorySkeleton>;

export const Default: Story = {};

export const Multiple: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <RepositorySkeleton key={i} />
      ))}
    </div>
  ),
};
