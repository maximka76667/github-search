import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { MissingTokenError } from "./components/features/MissingTokenError/MissingTokenError";

const token = import.meta.env.VITE_GITHUB_TOKEN;

if (!token) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MissingTokenError />
    </StrictMode>
  );
} else {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: "https://api.github.com/graphql",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
