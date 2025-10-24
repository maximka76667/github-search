import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { MissingTokenError } from "./components/features/MissingTokenError/MissingTokenError";

// In production, use the proxy endpoint. In development, use direct API with token.
const isDevelopment = import.meta.env.DEV;
const token = import.meta.env.VITE_GITHUB_TOKEN;

console.log("=== APOLLO CLIENT DEBUG ===");
console.log("isDevelopment:", isDevelopment);
console.log("token exists:", !!token);
console.log(
  "Will use URI:",
  isDevelopment ? "https://api.github.com/graphql" : "/api/github"
);

// Development: require token for direct API access
// Production: use proxy endpoint (no token needed client-side)
if (isDevelopment && !token) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MissingTokenError />
    </StrictMode>
  );
} else {
  const client = new ApolloClient({
    link: new HttpLink({
      // Use proxy in production, direct API in development
      uri: isDevelopment ? "https://api.github.com/graphql" : "/api/github",
      headers:
        isDevelopment && token ? { Authorization: `Bearer ${token}` } : {},
    }),
    cache: new InMemoryCache(),
  });

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>
  );
}
