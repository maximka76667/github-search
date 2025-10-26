# GitHub Repository Explorer

A modern, responsive web application for searching and exploring GitHub user repositories. Search for any GitHub user by their username and browse through their public repositories with advanced filtering capabilities by name and programming language.

## 🚀 Features

- Search for GitHub users by username
- View user's public repositories with detailed information
- Filter repositories by name (search)
- Filter repositories by programming language
- Modern, responsive UI with Tailwind CSS
- Real-time repository statistics (stars, forks, last update)
- Language color coding for easy identification
- Collapsible header for better content viewing

## 🛠️ Tech Stack

- React 19 + TypeScript
- Vite 7 (Build tool)
- Tailwind CSS 4
- Apollo Client (GraphQL client)
- GitHub GraphQL API v4
- ShadCN UI Components
- Storybook (Component documentation)
- Vitest (Testing framework)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager
- **GitHub Personal Access Token** (required for development - [get one here](https://github.com/settings/tokens))

## 🏃 How to Run the Project

### 1. Clone the repository

```bash
git clone "https://github.com/maximka76667/github-search"
cd github-search
```

### 2. Install dependencies

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

Using bun:

```bash
bun install
```

### 3. Set up environment variables (Required for Development)

Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

**⚠️ Important:** The GitHub token is **required** for the application to work in development mode. Without it, the app will display an error screen with setup instructions.

**How to get a GitHub Personal Access Token:**

1. Go to [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a descriptive name (e.g., "GitHub Repository Explorer")
4. Select the `public_repo` scope (read access to public repositories)
5. Click "Generate token" at the bottom
6. Copy the generated token immediately (you won't be able to see it again)
7. Add it to your `.env` file as shown above

> **Note:** In development mode, the app connects directly to GitHub's GraphQL API using your token. In production, the app uses a server-side proxy endpoint to keep the token secure.

### 4. Start the development server

Using npm:

```bash
npm run dev
```

Using yarn:

```bash
yarn dev
```

Using bun:

```bash
bun dev
```

The application will be available at `http://localhost:5173`

### 5. Build for production

```bash
npm run build
```

Then preview the production build:

```bash
npm run preview
```

## 🧪 How to Run the Test Suite

This project uses Storybook with Vitest for component testing.

### Run Storybook (Component Development & Testing)

Start Storybook development server:

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

You can interact with all components, view their stories, and test them in isolation. **All component tests are visible in the "Interactions" tab** of each story.

### Run Vitest Tests

⚠️ **Known Issue**: The Storybook + Vitest browser mode integration can be flaky and may intermittently fail with module loading errors. This is a known limitation of the integration.

**Recommended approach** (most reliable):

```bash
# Terminal 1: Start Storybook first
npm run storybook

# Terminal 2: Wait for Storybook to fully load at http://localhost:6006, then run tests
npm test
```

**Alternative commands:**

Run all tests:

```bash
npx vitest run
```

Run tests in watch mode:

```bash
npx vitest
```

Run tests with coverage:

```bash
npx vitest --coverage
```

**If tests fail intermittently:**

- Ensure Storybook is fully loaded before running tests
- Try running tests 2-3 times (retry logic is configured)
- Tests can also be run interactively in the Storybook UI, which is more stable for debugging

### Build Storybook for Deployment

```bash
npm run build-storybook
```

This creates a static Storybook build in the `storybook-static` folder.

## 📖 How to Use the Application

1. **Enter a GitHub username** in the search bar at the top
2. **Click the "Search" button** or press Enter
3. **View the repositories** displayed in cards below
4. **Filter by name** using the search input in the filter bar
5. **Filter by language** using the language dropdown
6. **Click on repository card title** to visit it on GitHub
7. **Toggle the header** using the chevron button to maximize viewing space

## 🏗️ API Architecture & Proxy Setup

This application uses a dual-mode API architecture to balance development convenience with production security:

### Development Mode (Local)

In development, the app connects **directly to GitHub's GraphQL API** using your personal access token:

- API Endpoint: `https://api.github.com/graphql`
- Authentication: Bearer token from `VITE_GITHUB_TOKEN` environment variable
- Token is exposed only in your local environment (never committed to version control)
- **Token is required** - the app will not run without it

### Production Mode (Deployed)

In production, the app uses a **server-side proxy** to keep your GitHub token secure:

- Frontend: Makes requests to `/api/github` (relative path)
- Backend Proxy: Located in `api/github.js` (Vercel serverless function)
- The proxy forwards requests to GitHub's API with the token stored securely on the server
- Client-side code never has access to the token

**Setting up the production proxy:**

1. **Deploy the serverless function**: The `api/github.js` file is automatically deployed as a serverless function on Vercel or similar platforms
2. **Configure environment variable**: Set `GITHUB_TOKEN` (not `VITE_GITHUB_TOKEN`) in your deployment platform's environment settings
3. **Token security**: The token is only accessible server-side and never exposed to the client

**Proxy benefits:**

- ✅ Keeps your GitHub token secure and never exposed to clients
- ✅ Prevents token theft from browser DevTools or network inspection
- ✅ Centralizes rate limiting and request monitoring
- ✅ Allows token rotation without redeploying the frontend

## 📝 Project Structure

```
github-search/
├── api/
│   └── github.js             # Serverless proxy for GitHub API (production)
├── src/
│   ├── components/
│   │   ├── features/          # Feature components
│   │   │   ├── FilterBar/
│   │   │   ├── MissingTokenError/
│   │   │   ├── RepositoryCard/
│   │   │   ├── RepositoryList/
│   │   │   ├── RepositorySkeleton/
│   │   │   └── SearchHeader/
│   │   └── ui/                # Reusable UI components (shadcn/ui)
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       ├── collapsible/
│   │       ├── input/
│   │       ├── select/
│   │       ├── separator/
│   │       └── skeleton/
│   ├── constants/             # Constants (language colors, etc.)
│   ├── graphql/               # GraphQL queries
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point & Apollo Client setup
├── public/                    # Static assets
├── .storybook/               # Storybook configuration
└── coverage/                 # Test coverage reports
```

## 🔮 Potential Improvements

- [ ] Pagination support for loading more than 30 repositories
- [ ] Repository sorting (by stars, forks, name, last updated)
- [ ] Dark/light mode toggle
- [ ] Enhanced error handling with React error boundaries
- [ ] Request caching to optimize API usage
- [ ] Comprehensive test coverage (unit and E2E tests)
- [ ] CI/CD pipeline for automated deployments
- [ ] Performance optimizations (code splitting, lazy loading)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
