import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "storybook/test";
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

export const Default: Story = {
  play: async ({ canvasElement }) => {

    // Test that card structure exists
    const card = canvasElement.querySelector('[class*="card"]');
    expect(card).toBeTruthy();
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2" style={{ width: "800px" }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <RepositorySkeleton key={i} />
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    // Test that multiple skeletons render in grid
    const grid = canvasElement.querySelector(".grid");
    expect(grid).toBeInTheDocument();
    expect(grid?.children.length).toBe(6);
  },
};
