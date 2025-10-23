/**
 * @fileoverview Service for interacting with GitHub's GraphQL API v4.
 * Provides functions to fetch user repository data.
 */

/**
 * Represents the structure of a single GitHub repository from the REST API.
 * @interface
 */
interface Repository {
  /** Unique identifier for the repository. */
  id: number;

  /** The name of the repository. */
  name: string;

  /** Brief description of the repository's purpose. Null if no description is provided. */
  description: string | null;

  /** The URL to access the repository on GitHub. */
  html_url: string;

  /** Primary programming language used in the repository. Null if not specified. */
  language: string | null;

  /** Total number of stars the repository has received. */
  stargazers_count: number;

  /** Total number of times the repository has been forked. */
  forks_count: number;

  /** ISO 8601 timestamp of when the repository was last updated. */
  updated_at: string;
}

/**
 * Response structure from GitHub's GraphQL API for user repositories query.
 * @interface
 */
interface GitHubGraphQLResponse {
  /** Contains the successful response data. */
  data?: {
    /** User information and repositories. */
    user: {
      /** Collection of user's repositories. */
      repositories: {
        /** Array of repository nodes returned from the query. */
        nodes: Array<{
          /** Unique identifier for the repository (string in GraphQL). */
          id: string;

          /** The name of the repository. */
          name: string;

          /** Brief description of the repository's purpose. Null if no description is provided. */
          description: string | null;

          /** The URL to access the repository on GitHub. */
          url: string;

          /** Primary programming language information. */
          primaryLanguage: {
            /** Name of the programming language. */
            name: string;
          } | null;

          /** Total number of stars the repository has received. */
          stargazerCount: number;

          /** Total number of times the repository has been forked. */
          forkCount: number;

          /** ISO 8601 timestamp of when the repository was last updated. */
          updatedAt: string;
        }>;
      };
    };
  };

  /** Array of errors returned from the GraphQL API, if any. */
  errors?: Array<{
    /** Human-readable error message. */
    message: string;
  }>;
}

/** GitHub GraphQL API endpoint URL. */
const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

/**
 * GraphQL query to fetch a user's public repositories.
 * Retrieves the most recently updated repositories with relevant metadata.
 * @const {string}
 */
const GET_USER_REPOSITORIES = `
    query($username: String!, $first: Int!) {
      user(login: $username) {
        repositories(first: $first, orderBy: {field: UPDATED_AT, direction: DESC}, privacy: PUBLIC) {
          nodes {
            id
            name
            description
            url
            primaryLanguage {
              name
            }
            stargazerCount
            forkCount
            updatedAt
          }
        }
      }
    }
  `;

/**
 * Fetches repositories for a given GitHub user using GraphQL API v4.
 * Retrieves up to 30 of the user's most recently updated public repositories.
 *
 * @param {string} username - The GitHub username to fetch repositories for.
 * @param {string} [token] - Optional GitHub personal access token for higher rate limits and private repository access.
 * @return {Promise<Repository[]>} Promise that resolves to an array of Repository objects.
 * @throws {Error} When username is empty, user is not found, or API request fails.
 */
export async function fetchUserRepositories(
  username: string,
  token?: string
): Promise<Repository[]> {
  if (!username.trim()) {
    throw new Error("Username is required");
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add authorization if token is provided
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: GET_USER_REPOSITORIES,
      variables: {
        username,
        first: 30, // Fetch up to 30 repositories
      },
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const result: GitHubGraphQLResponse = await response.json();

  // Check for GraphQL errors
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }

  // Check if user exists
  if (!result.data?.user) {
    throw new Error(`User "${username}" not found`);
  }

  // Transform GraphQL response to our Repository type
  const repositories: Repository[] = result.data.user.repositories.nodes.map(
    (repo, index) => ({
      id: parseInt(repo.id) || index, // GraphQL IDs are strings, convert or use index
      name: repo.name,
      description: repo.description,
      html_url: repo.url,
      language: repo.primaryLanguage?.name || null,
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      updated_at: repo.updatedAt,
    })
  );

  return repositories;
}
