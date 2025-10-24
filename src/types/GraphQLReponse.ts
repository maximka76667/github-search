/**
 * @fileoverview GraphQL response type definitions for GitHub API queries.
 */

import type Repository from "./Repository";

/**
 * GraphQL response structure for the getUserRepositories query.
 */
export interface GetUserRepositoriesResponse {
  user: {
    repositories: {
      nodes: Array<Repository>;
    };
  } | null;
}

/**
 * Variables for the getUserRepositories query.
 */
export interface GetUserRepositoriesVariables {
  username: string;
  first: number;
}
