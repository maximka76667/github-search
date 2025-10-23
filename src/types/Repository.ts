/**
 * @fileoverview Repository type definition representing a GitHub repository.
 */

/**
 * Represents a GitHub repository with essential metadata.
 * @interface
 */
export default interface Repository {
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
