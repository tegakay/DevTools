# Developer Utility Toolkit

> A modern, scalable web application for developer utilities built with React, TypeScript, Vite, and Tailwind CSS.

## 🎯 Features

- ⚡ **Lightning Fast**: Built with Vite for instant dev server and optimized production builds
- 🎨 **Beautiful UI**: Tailwind CSS with responsive design and dark mode support
- 🧩 **Component-Based**: Reusable, maintainable component architecture
- 📦 **Code Splitting**: Lazy-loaded routes for optimal performance
- 🔒 **Type-Safe**: Full TypeScript support throughout
- 🌓 **Dark Mode**: Complete theme switching with persistence
- 📱 **Responsive**: Mobile-first design that works everywhere

## 🚀 Quick Start

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher (or yarn/pnpm)

### Installation

1. **Clone or download the project**
```bash
git clone <repository-url>
cd developer-utility-toolkit
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:5173
```

## 📋 Available Scripts

### Development
```bash
npm run dev      # Start Vite dev server with HMR
```

### Production
```bash
npm run build    # Build optimized production bundle
npm run preview  # Preview production build locally
```

### Code Quality
```bash
npm run lint     # Run ESLint
```

## 🛠️ Project Structure

```
developer-utility-toolkit/
├── .github/
│   └── copilot-instructions.md
├── public/                       # Static assets
├── src/
│   ├── assets/                   # Images, icons
│   ├── components/               # Reusable UI components
│   │   ├── Navbar.tsx           # Navigation bar with theme toggle
│   │   ├── Sidebar.tsx          # Tool navigation menu
│   │   └── ToolStub.tsx         # Placeholder component for new tools
│   ├── layout/
│   │   └── MainLayout.tsx       # App layout wrapper
│   ├── pages/
│   │   └── Home.tsx             # Homepage
│   ├── tools/                    # Feature modules
│   │   ├── diff-checker/        # ✅ Fully implemented
│   │   │   └── DiffChecker.tsx
│   │   └── image-compressor/    # ✅ Fully implemented
│   │       └── ImageCompressor.tsx
│   ├── routes/
│   │   └── index.tsx            # Route configuration
│   ├── hooks/
│   │   └── useTheme.tsx         # Theme context hook
│   ├── utils/
│   │   └── index.ts             # Utility functions
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Global styles
│   └── App.css                  # App styles
├── index.html                   # HTML entry point
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependencies
└── README.md                    # This file
```

## 📚 Available Tools

### Fully Implemented ✅

#### Diff Checker
**Route:** `/tools/diff-checker`

Compare two text blocks and see the differences highlighted:
- Real-time line-by-line comparison
- Color-coded output (red for removed, green for added)
- Side-by-side text inputs

**How to use:**
1. Paste original text in the left input
2. Paste modified text in the right input
3. View differences highlighted in the bottom section

#### Image Compressor
**Route:** `/tools/image-compressor`

Compress images with adjustable quality settings:
- Upload any image file
- Adjust compression quality from 10% to 100%
- See real-time size reduction
- Download compressed image
- File size analysis with percentage reduction

**How to use:**
1. Click "Upload Image" and select a file
2. Adjust the quality slider
3. View original vs compressed side-by-side
4. Click "Download" to save compressed image

### Coming Soon (Stubbed) 🚧

The following tools are stubbed and ready for implementation:
- SVG Generator (`/tools/svg-generator`)
- Favicon Generator (`/tools/favicon-generator`)
- JSON Formatter (`/tools/json-formatter`)
- URL Encoder (`/tools/url-encoder`)
- Base64 Encoder (`/tools/base64-encoder`)
- Color Picker (`/tools/color-picker`)
- Regex Tester (`/tools/regex-tester`)
- Password Generator (`/tools/password-generator`)
- And more...

## 🎨 Theme & Styling

### Dark Mode
Click the moon/sun icon in the top-right navbar to toggle between light and dark themes.
The preference is saved to localStorage and persists across sessions.

### Tailwind CSS
All styling uses Tailwind's utility classes:
- Use `dark:` prefix for dark mode styles
- Responsive breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- No custom CSS needed for most components

**Example:**
```jsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Content
</div>
```

## 🔧 Adding New Tools

### Step 1: Create Tool Directory
```bash
mkdir src/tools/my-tool
touch src/tools/my-tool/MyTool.tsx
```

### Step 2: Implement Component
```tsx
// src/tools/my-tool/MyTool.tsx
const MyTool = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Tool
      </h1>
      {/* Your tool UI here */}
    </div>
  );
};

export default MyTool;
```

### Step 3: Add Route
```tsx
// In src/routes/index.tsx
import MyTool from '../tools/my-tool/MyTool';

export const routes: RouteObject[] = [
  // ... other routes
  {
    path: '/tools/my-tool',
    element: <MyTool />,
  },
];
```

### Step 4: Add to Sidebar
```tsx
// In src/components/Sidebar.tsx
const tools = [
  // ... existing tools
  { name: 'My Tool', path: '/tools/my-tool' },
];
```

### Step 5: Add to Home Page
```tsx
// In src/pages/Home.tsx
const tools = [
  // ... existing tools
  { name: 'My Tool', description: 'What it does', path: '/tools/my-tool' },
];
```

## 🧠 Component Patterns

### Using the Theme Hook
```tsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
};
```

### Using Utility Functions
```tsx
import { formatFileSize, debounce, copyToClipboard } from '../utils';

// Format bytes to human-readable size
const size = formatFileSize(1024 * 1024); // "1 MB"

// Debounce function calls
const handleSearch = debounce((query) => {
  console.log('Search:', query);
}, 300);

// Copy to clipboard
await copyToClipboard('Text to copy');
```

## 📱 Responsive Design

Components are built mobile-first:
- **Mobile** (default): Full-width layouts
- **Tablet** (`md:`): 2-column grids
- **Desktop** (`lg:`): 3-column grids

Example:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

## ⚡ Performance Tips

1. **Route Lazy Loading**: Routes are lazy-loaded automatically
2. **Image Optimization**: Use Next.js Image component patterns
3. **Code Splitting**: Tree-shaking enabled automatically
4. **Debouncing**: Use debounce for frequent event handlers
5. **Memoization**: Use React.memo for expensive components

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is in use, Vite will automatically try port 5174, 5175, etc.

To specify a port explicitly:
```bash
npm run dev -- --port 3000
```

### Build Errors
1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Vite cache:
```bash
rm -rf node_modules/.vite
npm run dev
```

### TypeScript Errors
Run type checking:
```bash
npx tsc --noEmit
```

## 📦 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized `dist/` folder ready for deployment.

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🎓 Learning Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## 🤝 Contributing

To add new tools or features:

1. Create a new branch: `git checkout -b feature/new-tool`
2. Follow the "Adding New Tools" section above
3. Test thoroughly in browser
4. Commit with clear messages
5. Push and create pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🎯 Roadmap

- [x] Basic project setup
- [x] Diff Checker tool
- [x] Image Compressor tool
- [x] Dark mode support
- [ ] Add 20+ more tools
- [ ] Tool categories/filters
- [ ] Search functionality
- [ ] Favorites/bookmarks
- [ ] Keyboard shortcuts
- [ ] PWA/Offline support

## 💡 Tips & Tricks

### Keyboard Navigation
- `Alt + D` → Open Diff Checker (Add in future)
- `Alt + I` → Open Image Compressor (Add in future)
- `Ctrl + .` → Toggle Dark Mode (Add in future)

### Development Shortcuts
- `npm run dev` → Start dev server
- `npm run build && npm run preview` → Test production build
- `npm run lint` → Check for linting issues

### File Size Optimization
The production build is optimized automatically:
- CSS purging removes unused Tailwind classes
- JavaScript is minified
- Images optimized by Vite

## ❓ FAQ

**Q: Can I add more tools?**
A: Yes! Follow the "Adding New Tools" section above.

**Q: How do I customize the colors?**
A: Edit `tailwind.config.js` and update the theme colors.

**Q: Is this production-ready?**
A: Yes, the architecture is scalable for production use.

**Q: Can I use this template for client projects?**
A: Yes, MIT license allows commercial use.

---

**Built with ❤️ for developers, by developers**

Questions? Check the `.github/copilot-instructions.md` file for detailed technical documentation.
