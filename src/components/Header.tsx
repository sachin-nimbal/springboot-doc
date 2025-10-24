import { Link } from 'react-router-dom';
import { Menu, Search, Command, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import SearchBox from './SearchBox';
import { cn } from '../utils/cn';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

export default function Header({ onMenuClick, onSearchClick, isSearchOpen, onSearchClose }: HeaderProps) {
  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-30 glass border-b border-border/50"
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Logo + Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <Link to="/" className="flex items-center gap-3 focus-ring rounded-lg">
                {/* CrudX Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-crudx-purple to-crudx-indigo rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-lg font-bold gradient-text">CrudX</div>
                    <div className="text-xs text-muted-foreground">Framework Documentation</div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <button
                onClick={onSearchClick}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2 rounded-lg',
                  'border border-border bg-background/50',
                  'hover:bg-accent transition-colors focus-ring',
                  'text-sm text-muted-foreground'
                )}
              >
                <Search className="w-4 h-4" />
                <span className="flex-1 text-left">Search documentation...</span>
                <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-muted rounded">
                  <Command className="w-3 h-3" />K
                </kbd>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={onSearchClick}
                className="md:hidden p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <a
                href="https://github.com/sachinnimbal/crudx-framework"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-accent rounded-lg focus-ring transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>

              <ThemeToggle />

              <Link
                to="/quick-setup"
                className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 focus-ring transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Search Modal */}
      <SearchBox isOpen={isSearchOpen} onClose={onSearchClose} />
    </>
  );
}
