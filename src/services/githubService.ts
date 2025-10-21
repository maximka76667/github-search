interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubGraphQLResponse {
  data?: {
    user: {
      repositories: {
        nodes: Array<{
          id: string;
          name: string;
          description: string | null;
          url: string;
          primaryLanguage: {
            name: string;
          } | null;
          stargazerCount: number;
          forkCount: number;
          updatedAt: string;
        }>;
      };
    };
  };
  errors?: Array<{
    message: string;
  }>;
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// GitHub GraphQL query to fetch user repositories
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
 * Fetches repositories for a given GitHub user using GraphQL API v4
 * @param username - GitHub username
 * @param token - Optional GitHub personal access token for higher rate limits
 * @returns Promise with array of repositories
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
