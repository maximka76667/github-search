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
- GitHub GraphQL API v4
- Radix UI Components
- Storybook (Component documentation)
- Vitest (Testing framework)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or bun package manager
- GitHub Personal Access Token (optional, but recommended for higher rate limits)

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

### 3. Set up environment variables (Optional but Recommended)

Create a `.env` file in the root directory:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

**How to get a GitHub Personal Access Token:**

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token"
3. Select `public_repo` scope
4. Generate and copy the token
5. Add it to your `.env` file

> **Note:** Without a token, you're limited to 60 requests/hour. With authentication, you get 5,000 requests/hour.

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

You can interact with all components, view their stories, and test them in isolation.

### Run Vitest Tests

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

## 📝 Project Structure

```
github-search/
├── src/
│   ├── components/
│   │   ├── features/          # Feature components
│   │   │   ├── FilterBar/
│   │   │   ├── RepositoryCard/
│   │   │   ├── RepositoryList/
│   │   │   ├── RepositorySkeleton/
│   │   │   └── SearchHeader/
│   │   └── ui/                # Reusable UI components
│   │       ├── badge/
│   │       ├── button/
│   │       ├── card/
│   │       ├── collapsible/
│   │       ├── input/
│   │       ├── select/
│   │       ├── separator/
│   │       └── skeleton/
│   ├── constants/             # Constants (language colors, etc.)
│   ├── lib/                   # Utility functions
│   ├── services/              # API services (GitHub)
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx               # Main application component
│   └── main.tsx              # Application entry point
├── public/                    # Static assets
└── .storybook/               # Storybook configuration
```

## 🔮 Future Improvements

### Features

- [ ] **Pagination Support** - Load more than 30 repositories per user with infinite scroll or pagination
- [ ] **Advanced Sorting** - Sort repositories by stars, forks, name, or last updated date
- [ ] **Repository Details Modal** - Show detailed stats including contributors, issues, and pull requests
- [ ] **Search History** - Remember and suggest recently searched users
- [ ] **Bookmarking/Favorites** - Save favorite repositories to local storage
- [ ] **Dark/Light Mode Toggle** - User-selectable theme with system preference detection
- [ ] **Organization Support** - Search for organization repositories in addition to users
- [ ] **Multi-User Comparison** - Compare repositories across different users side-by-side
- [ ] **Export Functionality** - Export repository lists as CSV, JSON, or PDF
- [ ] **Repository Topics/Tags** - Display and filter by repository topics
- [ ] **Advanced Filters** - Filter by star count range, fork count, last update date range
- [ ] **User Profile Display** - Show user avatar, bio, and statistics

### Technical Enhancements

- [ ] **Comprehensive Unit Tests** - Add unit tests for all components and services
- [ ] **E2E Testing** - Implement end-to-end tests using Playwright
- [ ] **Error Boundaries** - Add React error boundaries for graceful error handling
- [ ] **Request Caching** - Implement caching strategy to reduce API calls and improve performance
- [ ] **Rate Limit Display** - Show remaining API rate limit to users
- [ ] **Progressive Web App (PWA)** - Make the app installable with offline support
- [ ] **Performance Monitoring** - Integrate analytics and performance tracking
- [ ] **SEO Optimization** - Add meta tags and improve SEO for better discoverability
- [ ] **Code Splitting** - Implement lazy loading for better initial load performance
- [ ] **GraphQL Subscriptions** - Real-time updates when repository data changes

### UX/UI Improvements

- [ ] **Smooth Animations** - Add transitions and micro-interactions for better UX
- [ ] **Enhanced Loading States** - More sophisticated skeleton loaders and progress indicators
- [ ] **Empty State Illustrations** - Add custom illustrations for empty and error states
- [ ] **Keyboard Shortcuts** - Add keyboard navigation support for power users
- [ ] **Accessibility Audit** - Comprehensive WCAG 2.1 AA compliance review
- [ ] **Internationalization (i18n)** - Support for multiple languages
- [ ] **Responsive Table View** - Alternative table layout for repository data
- [ ] **Search Suggestions** - Auto-complete for GitHub usernames
- [ ] **Toast Notifications** - Non-intrusive notifications for user actions
- [ ] **Repository Cards Customization** - Let users choose what information to display

### DevOps & Deployment

- [ ] **CI/CD Pipeline** - Automated testing and deployment workflow
- [ ] **Docker Support** - Containerize the application for easy deployment
- [ ] **Environment-based Configuration** - Better config management for different environments
- [ ] **Error Tracking** - Integrate Sentry or similar for error monitoring
- [ ] **Performance Budgets** - Set and enforce bundle size limits

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
