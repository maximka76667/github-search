import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import { MissingTokenError } from "./MissingTokenError";

const meta: Meta<typeof MissingTokenError> = {
  title: "Features/MissingTokenError",
  component: MissingTokenError,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof MissingTokenError>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that main heading is present
    expect(
      canvas.getByRole("heading", { name: /github token required/i })
    ).toBeInTheDocument();

    // Test that error message is displayed
    expect(
      canvas.getByText(
        /this application requires a github personal access token/i
      )
    ).toBeInTheDocument();

    // Test that instructions are present
    expect(canvas.getByText(/to fix this:/i)).toBeInTheDocument();
    expect(canvas.getByText(/create a/i)).toBeInTheDocument();
    expect(canvas.getByText(/\.env/i)).toBeInTheDocument();

    // Test that code snippets are present
    expect(
      canvas.getByText(/VITE_GITHUB_TOKEN=your_token_here/i)
    ).toBeInTheDocument();

    // Test that "Don't have a token?" section is present
    expect(canvas.getByText(/don't have a token\?/i)).toBeInTheDocument();

    // Test that GitHub link is present and has correct attributes
    const githubLink = canvas.getByRole("link", {
      name: /github settings → personal access tokens/i,
    });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/settings/tokens"
    );
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");

    // Test that scope information is present
    expect(canvas.getByText(/public_repo/i)).toBeInTheDocument();
  },
};

export const WithFullInstructions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test all three steps are visible
    const listItems = canvasElement.querySelectorAll("ol li");
    expect(listItems.length).toBe(3);

    // Verify step content
    expect(canvas.getByText(/create a/i)).toBeInTheDocument();
    expect(canvas.getByText(/add your token/i)).toBeInTheDocument();
    expect(
      canvas.getByText(/restart the development server/i)
    ).toBeInTheDocument();
  },
};

export const IconAndLayout: Story = {
  play: async ({ canvasElement }) => {
    // Test that warning icon SVG is present
    const svg = canvasElement.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");

    // Test that the component uses destructive styling
    const container = canvasElement.querySelector('[class*="destructive"]');
    expect(container).toBeTruthy();
  },
};

export const LinkInteraction: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that the external link is accessible and properly configured
    const link = canvas.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe(
      "https://github.com/settings/tokens"
    );

    // Test security attributes
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(link.getAttribute("rel")).toContain("noreferrer");
  },
};

export const CodeSnippets: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that code elements are present
    const codeElements = canvasElement.querySelectorAll("code");
    expect(codeElements.length).toBeGreaterThan(0);

    // Test specific code content
    expect(canvas.getByText(".env")).toBeInTheDocument();
    expect(
      canvas.getByText("VITE_GITHUB_TOKEN=your_token_here")
    ).toBeInTheDocument();
  },
};

export const AccessibilityCheck: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that main heading exists for screen readers
    const heading = canvas.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();

    // Test that link has descriptive text
    const link = canvas.getByRole("link");
    expect(link.textContent).toBeTruthy();
    expect(link.textContent?.length).toBeGreaterThan(0);

    // Test that list is properly structured
    const orderedList = canvasElement.querySelector("ol");
    expect(orderedList).toBeInTheDocument();
    expect(orderedList?.classList.contains("list-decimal")).toBe(true);
  },
};
