# ruth or Dare Game - Next.js Application
A modern Truth or Dare game built with Next.js, Tailwind CSS, and TypeScript.

## Project Structure
This project follows a feature-based modular architecture:

```
└── src/
    ├── app/            # Next.js App Router pages
    │   ├── api/        # API routes
    │   ├── blog/       # Blog pages
    │   ├── feedback/   # Feedback pages
    │   ├── questions/  # Questions pages
    │   └── huong-dan/  # Guide pages
    ├── assets/         # Static assets (icons, images)
    ├── data/           # Game data and questions
    │   └── questions/  # Question sets by category
    ├── features/       # Feature-based modules
    │   ├── game/       # Game logic and components
    │   ├── participants/ # Participant management
    │   ├── questions/  # Question handling
    │   ├── rating/     # Rating functionality
    │   └── theme/      # Theme customization
    ├── lib/            # Utility libraries
    │   └── validations/ # Data validation schemas
    ├── shared/         # Shared code across features
    │   ├── components/ # Reusable UI components
    │   ├── hooks/      # Shared custom hooks
    │   ├── lib/        # Shared libraries
    │   ├── services/   # Shared services and API calls
    │   ├── types/      # Shared TypeScript types
    │   └── utils/      # Utility functions
    ├── styles/         # Global styles
    └── types/          # Global TypeScript types
```
## Features
This Truth or Dare game includes:

- ⚡️ Next.js 14 with App Router
- ⚛️ React 18
- ✨ TypeScript
- 💨 Tailwind CSS 3
- 🎮 Multiple question categories
- 👥 Participant management
- 🌓 Theme customization
- ⭐ Rating system
- 📱 Responsive design for all devices
- 🧪 Jest for testing
- 📏 ESLint and Prettier for code quality
## Getting Started
### 1. Clone this repository
```
git clone <repository-url>
cd truth-or-dare
```
### 2. Install dependencies
It is recommended to use pnpm for dependency management:

```
pnpm install
```
### 3. Run the development server
```
pnpm dev
```
Open http://localhost:3000 with your browser to see the application.

### 4. Build for production
```
pnpm build
```
## Commit Message Convention
This project uses conventional commits for standardized commit messages.

## License
MIT