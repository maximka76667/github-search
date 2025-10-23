import type { Meta, StoryObj } from "@storybook/react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";
import { Button } from "../button/button";
import { ChevronDown, ChevronsUpDown } from "lucide-react";

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const WithChevron: Story = {
  render: () => (
    <Collapsible className="w-[350px] space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>Can I use this in my project?</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border px-4 py-3 text-sm">
        <p>
          Yes! You can use this component in your project. It's built with Radix
          UI primitives and fully customizable with Tailwind CSS.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const ControlledOpen: Story = {
  render: () => (
    <Collapsible defaultOpen className="w-[350px] space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">Open by default</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-3 text-sm">
          This collapsible starts in an open state because we used the{" "}
          <code>defaultOpen</code> prop.
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
};

export const NestedContent: Story = {
  render: () => (
    <Collapsible className="w-[400px] space-y-2">
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-4">
          <h4 className="text-sm font-semibold">Project Settings</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="border-t p-4 space-y-4">
            <div>
              <label className="text-sm font-medium">Project Name</label>
              <input
                type="text"
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="My Project"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Project description..."
                rows={3}
              />
            </div>
            <Button size="sm">Save Changes</Button>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  ),
};

export const MinimalText: Story = {
  render: () => (
    <Collapsible className="w-[350px]">
      <CollapsibleTrigger className="flex items-center gap-2 font-medium hover:underline">
        <ChevronDown className="h-4 w-4 transition-transform duration-200 data-[state=open]:rotate-180" />
        Read more
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
        <p>
          This is additional content that can be toggled. It uses a minimal
          text-based trigger instead of a button for a more subtle interaction
          pattern.
        </p>
      </CollapsibleContent>
    </Collapsible>
  ),
};
