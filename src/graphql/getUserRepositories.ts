import { gql } from "@apollo/client";

/**
 * GraphQL query to fetch a user's public repositories.
 * Retrieves the most recently updated repositories with relevant metadata.
 */
export const getUserRepositories = gql`
  query ($username: String!, $first: Int!) {
    user(login: $username) {
      repositories(
        first: $first
        orderBy: { field: UPDATED_AT, direction: DESC }
        privacy: PUBLIC
      ) {
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
