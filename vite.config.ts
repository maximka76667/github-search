/**
 * @fileoverview Vite configuration for the GitHub Repository Explorer application.
 * Configures React, TypeScript, Tailwind CSS, and Vitest for testing with Storybook integration.
 */

/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration with React SWC, Tailwind CSS, and Vitest integration.
 * Configures path aliases, test coverage, and Storybook-based testing.
 *
 * More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
 */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/components/**/*.{ts,tsx}"],
      exclude: [
        "**/*.stories.{ts,tsx}",
        "**/*.config.{ts,js}",
        "api/**",
        "src/types/**",
        "src/graphql/**",
        "src/constants/**",
        "src/main.tsx",
        "src/**/*.d.ts",
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
            storybookUrl: "http://localhost:6006",
            storybookScript: "npm run storybook -- --ci",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: "playwright",
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          // Add retry logic for flaky tests
          retry: 3,
          // Increase timeout to allow Storybook server to fully start
          testTimeout: 80000,
          hookTimeout: 80000,
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
