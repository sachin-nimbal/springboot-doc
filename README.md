# CrudX Framework Documentation

A modern, responsive documentation website for the CrudX Framework built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional interface with premium aesthetics
- **Dark/Light Mode**: Seamless theme switching with localStorage persistence
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Code highlighting, copy-to-clipboard, and smooth animations
- **Comprehensive Documentation**: Complete guide to CrudX Framework features
- **Type-Safe**: Built with TypeScript for better development experience
- **Performance Optimized**: Fast loading and smooth interactions

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Prism React Renderer** - Syntax highlighting
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible UI components
- **Framer Motion** - Smooth animations

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crudx-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build & Deploy

### Development
```bash
npm run dev          # Start dev server
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment
The built files will be in the `dist` folder. Deploy to any static hosting service:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop `dist` folder
- **GitHub Pages**: Push `dist` to `gh-pages` branch
- **AWS S3**: Upload `dist` contents to S3 bucket

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Alert.tsx       # Alert/notification component
│   ├── Badge.tsx       # Status badges and method badges
│   ├── Breadcrumbs.tsx # Navigation breadcrumbs
│   ├── Card.tsx        # Card container component
│   ├── CodeBlock.tsx   # Syntax-highlighted code blocks
│   ├── CopyButton.tsx  # Copy-to-clipboard button
│   ├── EndpointsTable.tsx # API endpoints documentation
│   ├── Footer.tsx      # Site footer
│   ├── Header.tsx      # Site header with navigation
│   ├── MobileDrawer.tsx # Mobile navigation drawer
│   ├── Pagination.tsx  # Page navigation component
│   ├── SearchBox.tsx   # Search input component
│   ├── Sidebar.tsx     # Desktop navigation sidebar
│   ├── SyntaxHighlighter.tsx # Code syntax highlighting
│   ├── Tabs.tsx        # Tabbed interface component
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   ├── TOC.tsx         # Table of contents
│   └── __tests__/      # Component tests
├── data/               # Static data files
│   ├── endpoints.json  # API endpoints data
│   └── toc.json       # Table of contents data
├── hooks/              # Custom React hooks
│   ├── useScrollSpy.ts # Scroll position tracking
│   └── useTheme.ts    # Theme management
├── pages/              # Page components
│   ├── Annotations.tsx # CrudX annotations guide
│   ├── Entities.tsx   # Base entities documentation
│   ├── GettingStarted.tsx # Quick setup guide
│   ├── Overview.tsx   # Framework overview
│   └── RestEndpoints.tsx # API reference
├── styles/             # Global styles
│   ├── globals.css    # Global CSS variables
│   └── typography.css # Typography styles
├── utils/              # Utility functions
│   ├── clipboard.ts   # Clipboard operations
│   ├── cn.ts         # Class name utilities
│   └── highlight.ts  # Code highlighting utilities
├── App.tsx            # Main application component
├── index.css         # Global styles and Tailwind imports
└── main.tsx          # Application entry point
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize the color palette:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0f9ff',
        500: '#0ea5e9',
        900: '#0c4a6e',
        // ... add your colors
      }
    }
  }
}
```

### Content
- **Navigation**: Edit `src/data/toc.json`
- **API Endpoints**: Edit `src/data/endpoints.json`
- **Page Content**: Edit files in `src/pages/`

### Styling
- **Global Styles**: Edit `src/index.css`
- **Component Styles**: Use Tailwind classes in components
- **Dark Mode**: Handled automatically via CSS variables

## 🧪 Testing

```bash
npm run test          # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: CSS Grid, Flexbox, CSS Variables, ES2020+

## 🔧 Configuration

### Environment Variables
Create a `.env` file for environment-specific settings:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_GITHUB_URL=https://github.com/sachinnimbal/crudx-framework
```

### Vite Configuration
Edit `vite.config.ts` for build customization:

```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Add your configuration
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CrudX Framework](https://github.com/sachinnimbal/crudx-framework) - The framework this documentation is for
- [Tailwind CSS](https://tailwindcss.com) - For the utility-first CSS framework
- [Heroicons](https://heroicons.com) - For the beautiful icons
- [Prism](https://prismjs.com) - For syntax highlighting
- [React](https://reactjs.org) - For the component library

## 📞 Support

- **Documentation**: [CrudX Docs](https://sachinnimbal.github.io/crudx-framework/)
- **Issues**: [GitHub Issues](https://github.com/sachinnimbal/crudx-framework/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sachinnimbal/crudx-framework/discussions)
- **Twitter**: [@sachinnimbal](https://twitter.com/sachinnimbal)

---

Built with ❤️ by [Sachin Nimbal](https://github.com/sachinnimbal)