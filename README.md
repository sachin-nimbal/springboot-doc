## Premium Docs (React + TypeScript + Tailwind)

Production-ready documentation site built with React 18, Vite, TypeScript, Tailwind CSS, Prism, and Heroicons. Includes light/dark mode, sticky sidebar, TOC highlighting, responsive mobile drawer, code blocks with copy, and accessible interactions.

### Requirements
- Node.js 18+

### Setup
```bash
npm install
npm run dev
```

Open http://localhost:5173

### Build
```bash
npm run build
npm run preview
```

### Features
- Light/Dark mode with localStorage persistence
- Responsive layout with sticky nav and TOC
- Prism-based code highlighting (lazy-loaded)
- Copy-to-clipboard with feedback
- Keyboard shortcuts: Cmd/Ctrl+K to search
- Accessible components, focus rings, ARIA labels

### Tech Stack
- React 18 + Vite + SWC
- TypeScript
- Tailwind CSS 3
- Prism React Renderer
- @heroicons/react

### Notes
- Colors tuned to an indigo/purple brand
- Theme applied on first paint to avoid FOUC
