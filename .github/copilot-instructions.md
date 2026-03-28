# Developer Utility Toolkit - Project Instructions

## Project Overview
A modern web application providing a collection of useful developer tools built with React, TypeScript, Vite, and Tailwind CSS.

## Technology Stack
- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with dark mode support
- **Routing**: React Router v6 with lazy loading
- **State Management**: React Context (Theme)

## Project Goals
1. Create a scalable platform for developer utility tools
2. Provide responsive, accessible UI with dark mode support
3. Optimize performance with code splitting and lazy loading
4. Maintain clean, consistent code architecture

## Folder Structure
```
src/
├── components/           # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar with theme toggle
│   ├── Sidebar.tsx      # Tool navigation sidebar
│   └── ToolStub.tsx     # Placeholder for coming soon tools
├── layout/
│   └── MainLayout.tsx   # Main application wrapper
├── pages/
│   └── Home.tsx         # Homepage with tool grid
├── tools/               # Individual tool implementations
│   ├── diff-checker/
│   │   └── DiffChecker.tsx     # Text diff comparison tool
│   └── image-compressor/
│       └── ImageCompressor.tsx # Image compression utility
├── routes/
│   └── index.tsx        # Centralized route configuration
├── hooks/
│   └── useTheme.tsx     # Theme context and hook
├── utils/
│   └── index.ts         # Utility functions (formatFileSize, debounce, etc.)
├── App.tsx              # Main application component
├── main.tsx             # Entry point with providers
└── index.css            # Global styles with Tailwind directives
```

## Key Features

### Implemented Tools
1. **Diff Checker** (`/tools/diff-checker`)
   - Real-time text comparison
   - Color-coded diff highlighting (added/removed/unchanged)
   - Line-by-line analysis

2. **Image Compressor** (`/tools/image-compressor`)
   - File upload with preview
   - Adjustable quality slider (10-100%)
   - Real-time compression
   - Download functionality
   - File size analysis with reduction percentage

### Theme Management
- Dark/Light mode toggle in Navbar
- Persistent theme selection with localStorage
- Tailwind CSS dark mode configuration (class-based)

### Routing
- Lazy-loaded pages for better performance
- Centralized route configuration in `src/routes/index.tsx`
- Responsive sidebar navigation
- Breadcrumb-ready structure

## Development Guidelines

### Adding New Tools
1. Create a new directory in `src/tools/[tool-name]/`
2. Implement your tool component (e.g., `YourTool.tsx`)
3. Add route to `src/routes/index.tsx`
4. Add tool info to `src/components/Sidebar.tsx` tools array
5. Update `src/pages/Home.tsx` with tool description

### Component Conventions
- Use functional components with React hooks
- Implement TypeScript interfaces/types for all props
- Use Tailwind CSS utility classes for styling
- Follow React naming conventions (PascalCase for components)

### Styling Standards
- Use Tailwind CSS exclusively
- Support dark mode with `dark:` prefix
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Color palette: grays for neutral, blues for actions

### Code Organization
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use `src/utils/` for shared utility functions
- Group related tools in `src/tools/` directories

## File Naming Conventions
- Components: PascalCase (e.g., `DiffChecker.tsx`)
- Utilities/hooks: camelCase (e.g., `useTheme.tsx`)
- Directories: kebab-case (e.g., `diff-checker/`)

## Performance Optimizations
- Route-based code splitting with React Router lazy()
- Image compression handled client-side (no server needed)
- Debouncing for text input handlers
- Efficient state management with Context API

## Configuration Files
- `vite.config.ts`: Vite build configuration
- `tailwind.config.js`: Tailwind CSS configuration with dark mode
- `postcss.config.js`: PostCSS configuration
- `tsconfig.json`: TypeScript configuration
- `tsconfig.app.json`: App-specific TypeScript settings
- `tsconfig.node.json`: Build tool TypeScript settings
- `eslint.config.js`: ESLint rules

## Dependencies
### Core
- react@^18
- react-dom@^18
- react-router-dom@latest

### DevDependencies
- vite
- @vitejs/plugin-react
- typescript
- tailwindcss
- postcss
- autoprefixer
- eslint

## Setup & Development
See [README.md](../README.md) for detailed setup and development instructions.

## Common Tasks

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Run Type Checking
```bash
npx tsc --noEmit
```

## Architecture Decisions

### Why React Context for Theme?
- Simple state management for app-wide theme
- No external dependency needed
- Sufficient for current requirements
- Easy to upgrade to Zustand if needed in future

### Why Lazy Loading Routes?
- Reduces initial bundle size
- Improves First Contentful Paint (FCP)
- Each tool load independently
- Better performance for large tool collections

### Why Tailwind CSS?
- Utility-first approach for rapid development
- Built-in dark mode support
- Small production bundle when purged
- Consistent design system

## Future Enhancements
- [ ] Add more developer tools (30+ total)
- [ ] Implement tool categories/grouping
- [ ] Add search/filter functionality
- [ ] Create tool collection/favorites feature
- [ ] Add keyboard shortcuts
- [ ] Implement offline mode with service workers
- [ ] Add analytics for tool usage

## Maintenance Notes
- Keep React Router updated for latest features
- Monitor Vite releases for build improvements
- Update Tailwind CSS for new utilities
- Regular security updates for dependencies
