# CrudX Documentation Website

A modern, responsive documentation website built with React, TypeScript, and Tailwind CSS. This project replicates the design and functionality of the CrudX Framework documentation site with a pixel-perfect, production-ready implementation.

## 🚀 Features

- **Modern Design**: Clean, professional UI with CrudX branding
- **Dark/Light Mode**: Toggle between themes with localStorage persistence
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: 
  - Syntax-highlighted code blocks with copy functionality
  - Expandable API endpoint documentation
  - Sticky table of contents with scroll spy
  - Search functionality (UI ready)
- **Accessibility**: ARIA labels, keyboard navigation, focus management
- **Performance**: Optimized with lazy loading and efficient rendering

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Prism React Renderer** - Syntax highlighting
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible UI components

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

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Build & Deploy

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   The `dist` folder contains the built application ready for deployment to any static hosting service.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Top navigation bar
│   ├── Sidebar.tsx     # Left navigation sidebar
│   ├── Footer.tsx      # Site footer
│   ├── TOC.tsx         # Table of contents
│   ├── CodeBlock.tsx   # Syntax-highlighted code
│   ├── EndpointsTable.tsx # API endpoint documentation
│   └── ...            # Other UI components
├── pages/              # Page components
│   ├── Overview.tsx    # Homepage
│   ├── GettingStarted.tsx
│   ├── Annotations.tsx
│   ├── Entities.tsx
│   └── RestEndpoints.tsx
├── data/               # Static data
│   ├── toc.json        # Navigation structure
│   └── endpoints.json  # API endpoint data
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme management
│   └── useScrollSpy.ts # Scroll spy functionality
├── utils/              # Utility functions
│   ├── theme.ts        # Theme utilities
│   └── cn.ts          # Class name utility
└── styles/             # Global styles
    └── globals.css     # Tailwind CSS imports
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.ts`. The design uses:
- **Primary**: Indigo/Purple gradient
- **Method Colors**: Green (GET), Blue (POST), Yellow (PUT), Red (DELETE)
- **Dark Mode**: Custom dark theme with proper contrast

### Content
- Update `src/data/toc.json` to modify navigation structure
- Update `src/data/endpoints.json` to modify API documentation
- Edit page components in `src/pages/` to update content

### Styling
- All styling uses Tailwind CSS classes
- Custom CSS variables are defined in `src/index.css`
- Component variants are handled through props

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture
- Custom hooks for reusable logic

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px (hamburger menu, stacked layout)
- **Tablet**: 768px - 1024px (adjusted spacing)
- **Desktop**: > 1024px (full sidebar, optimal spacing)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- High contrast ratios
- Screen reader friendly

## 🚀 Performance

- Lazy loading for heavy components
- Optimized images and assets
- Efficient re-rendering with React hooks
- Minimal bundle size
- Fast page transitions

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
