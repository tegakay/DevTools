# Developer Utility Toolkit

> A modern, scalable web application for developer utilities built with React, TypeScript, Vite, and Tailwind CSS.

A production-ready boilerplate for creating a collection of useful developer tools with excellent UX and performance.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:5173
```

## 🎯 Features

- ⚡ **Lightning Fast**: Vite-powered instant dev server and optimized builds
- 🎨 **Beautiful UI**: Tailwind CSS with dark mode support
- 🧩 **Component-Based**: Reusable, maintainable architecture
- 📦 **Code Splitting**: Lazy-loaded routes for optimal performance  
- 🔒 **Type-Safe**: Full TypeScript support throughout
- 📱 **Responsive**: Mobile-first design
- 🌓 **Dark Mode**: Complete theme switching with persistence

## 📚 Documentation

- **[SCAFFOLD.md](SCAFFOLD.md)** — Complete setup & feature guide for users
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** — Technical architecture & development guidelines

## 🛠️ Available Tools

### ✅ Fully Implemented
- **Diff Checker** — Compare text with visual highlighting
- **Image Compressor** — Compress images with quality control

### 🚧 Coming Soon (Stubbed & Ready)
- SVG Generator
- Favicon Generator  
- JSON Formatter
- URL Encoder / Base64 Encoder
- Color Picker
- Regex Tester
- Password Generator
- And more...

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router v6 |
| **Styling** | Tailwind CSS |
| **State** | React Context |
| **Dev Tools** | ESLint |

## 🚀 Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📁 Project Structure

```
src/
├── components/          # UI components (Navbar, Sidebar, etc.)
├── layout/              # Layout wrapper (MainLayout)
├── pages/               # Page components (Home)
├── tools/               # Tool implementations
│   ├── diff-checker/
│   └── image-compressor/
├── routes/              # Route configuration
├── hooks/               # Custom hooks (useTheme)
├── utils/               # Utility functions
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## 🎨 Dark Mode

Click the moon/sun icon to toggle themes. Preference auto-saves to localStorage.

## 🔧 Adding Tools

1. Create tool directory: `src/tools/my-tool/`
2. Implement component: `MyTool.tsx`
3. Add route in `src/routes/index.tsx`
4. Add to sidebar in `src/components/Sidebar.tsx`
5. Add to homepage in `src/pages/Home.tsx`

**See [SCAFFOLD.md](SCAFFOLD.md#-adding-new-tools) for detailed instructions.**

## 📋 Component Patterns

### Using Theme Hook
```tsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>Toggle Theme</button>;
};
```

### Using Utilities
```tsx
import { formatFileSize, debounce } from '../utils';

const size = formatFileSize(1024 * 1024); // "1 MB"
const handleSearch = debounce((q) => search(q), 300);
```

## 🚀 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
Push to GitHub and connect repository. Set:
- Build command: `npm run build`
- Publish directory: `dist`

## 🧠 Best Practices

- ✅ Use functional components with hooks
- ✅ Implement TypeScript types for all props
- ✅ Use Tailwind for all styling
- ✅ Support dark mode with `dark:` prefix
- ✅ Keep components single-purpose
- ✅ Extract logic into custom hooks
- ✅ Use utility functions for shared logic

## 🐛 Troubleshooting

**Port already in use?**  
Vite auto-tries next ports (5174, 5175, etc.)

**Build errors?**  
Clear and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

**More help?**  
See [SCAFFOLD.md](SCAFFOLD.md#-troubleshooting) for detailed troubleshooting.

## 📚 Resources

- [Vite Docs](https://vitejs.dev/)
- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/my-tool`
2. Follow patterns in [SCAFFOLD.md](SCAFFOLD.md)
3. Test thoroughly
4. Push and create PR

## 📄 License

MIT — Use for personal or commercial projects.

---

**Need more info?** Check [SCAFFOLD.md](SCAFFOLD.md) for comprehensive documentation including setup, features, component patterns, and troubleshooting.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
