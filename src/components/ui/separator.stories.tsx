import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <div className="flex h-5 w-full items-center space-x-4">
      <div>Left</div>
      <Separator {...args} />
      <div>Right</div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className="space-y-4">
      <div>Content above</div>
      <Separator />
      <div>Content below</div>
    </div>
  ),
};
