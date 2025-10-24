# CrudX Framework Documentation

A modern, responsive documentation website for the CrudX Framework built with React, TypeScript, and Tailwind CSS. This project replicates the design and functionality of the original CrudX documentation site with enhanced features and modern tooling.

## 🚀 Features

- **Modern Design**: Pixel-perfect recreation of the CrudX documentation design
- **Dark/Light Mode**: Toggle between themes with persistent localStorage
- **Responsive Layout**: Mobile-first design that works on all screen sizes
- **Syntax Highlighting**: Beautiful code blocks with PrismJS
- **Interactive Components**: Collapsible sections, search, and navigation
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized with Vite and lazy loading

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **PrismJS** - Syntax highlighting
- **Lucide React** - Beautiful icons

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crudx-documentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the documentation.

## 🏗️ Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Left navigation sidebar
│   ├── MobileDrawer.tsx # Mobile navigation drawer
│   ├── Footer.tsx      # Site footer
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   ├── TOC.tsx         # Table of contents
│   ├── CodeBlock.tsx   # Syntax highlighted code blocks
│   ├── EndpointsTable.tsx # API endpoints table
│   └── ...             # Other components
├── pages/              # Documentation pages
│   ├── Overview.tsx    # Home page
│   ├── QuickSetup.tsx  # Getting started guide
│   ├── CoreAnnotations.tsx # Annotations documentation
│   ├── BaseEntities.tsx # Entities documentation
│   └── RestEndpoints.tsx # API reference
├── data/               # Static data files
│   ├── toc.json        # Table of contents data
│   └── endpoints.json  # API endpoints data
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme management
│   └── useScrollSpy.ts # Scroll spy for TOC
├── utils/              # Utility functions
│   ├── cn.ts          # Class name utility
│   ├── clipboard.ts   # Clipboard operations
│   └── highlight.ts   # Syntax highlighting
└── styles/             # Global styles
    └── globals.css     # Tailwind and custom CSS
```

## 🎨 Design System

### Colors
- **Primary**: Purple/Indigo gradient (`#8B5CF6` to `#6366F1`)
- **Accent**: Pink (`#EC4899`)
- **Success**: Green (`#10B981`)
- **Warning**: Yellow (`#F59E0B`)
- **Error**: Red (`#EF4444`)

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Headings**: Responsive sizing with clamp()
- **Body**: 16px base with 1.5 line height

### Components
- **Cards**: Rounded corners with subtle borders
- **Buttons**: Consistent padding and hover states
- **Forms**: Accessible with focus rings
- **Code Blocks**: Syntax highlighting with copy functionality

## 🔧 Customization

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.tsx`
3. Update navigation in `src/components/Sidebar.tsx`
4. Add TOC data to `src/data/toc.json`

### Modifying Styles
- Global styles: `src/styles/globals.css`
- Component styles: Use Tailwind classes
- Custom utilities: Add to `@layer utilities` in globals.css

### Adding New Components
1. Create component in `src/components/`
2. Export from component file
3. Import where needed
4. Follow existing patterns for consistency

## 📱 Responsive Design

The documentation is fully responsive with breakpoints:
- **Mobile**: < 768px (drawer navigation)
- **Tablet**: 768px - 1024px (sidebar navigation)
- **Desktop**: > 1024px (full sidebar + TOC)

## 🌙 Dark Mode

Dark mode is implemented using:
- CSS custom properties for theming
- `class` strategy with Tailwind
- localStorage persistence
- Smooth transitions between themes

## 🚀 Performance

- **Code Splitting**: Lazy-loaded components
- **Tree Shaking**: Unused code elimination
- **Image Optimization**: Optimized assets
- **Bundle Analysis**: Use `npm run build` to analyze

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original CrudX Framework documentation design
- Tailwind CSS for the utility-first approach
- React team for the amazing framework
- Vite team for the fast build tool

---

Built with ❤️ using React, TypeScript, and Tailwind CSS