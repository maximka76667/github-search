/**
 * @fileoverview Error component displayed when GitHub token is missing.
 */

export function MissingTokenError() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-destructive/10 border-2 border-destructive/50 rounded-lg p-8">
        <div className="flex items-start gap-4">
          <svg
            className="w-8 h-8 text-destructive flex-shrink-0 mt-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-destructive mb-2">
              GitHub Token Required
            </h1>
            <p className="text-foreground mb-4">
              This application requires a GitHub Personal Access Token to
              function. The token is missing from your environment variables.
            </p>
            <div className="bg-background/50 rounded p-4 mb-4">
              <p className="font-semibold mb-2">To fix this:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>
                  Create a{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">.env</code>{" "}
                  file in the project root
                </li>
                <li>
                  Add your token:{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">
                    VITE_GITHUB_TOKEN=your_token_here
                  </code>
                </li>
                <li>Restart the development server</li>
              </ol>
            </div>
            <div className="bg-background/50 rounded p-4">
              <p className="font-semibold mb-2">Don't have a token?</p>
              <p className="text-sm mb-2">
                Create one at{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:no-underline"
                >
                  GitHub Settings → Personal Access Tokens
                </a>
              </p>
              <p className="text-sm text-muted-foreground">
                Select the <strong>public_repo</strong> scope for read access to
                public repositories.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
