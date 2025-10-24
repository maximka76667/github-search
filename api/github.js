/**
 * @fileoverview Vercel serverless function to proxy GitHub GraphQL API requests.
 * Keeps the GitHub token secure on the server side.
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Get token from server-side environment variable (not exposed to client)
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(500).json({
      error: "GitHub token not configured on server",
    });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "User-Agent": "github-repository-explorer",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("GitHub API Error:", error);
    return res.status(500).json({
      error: "Failed to fetch from GitHub API",
    });
  }
}
