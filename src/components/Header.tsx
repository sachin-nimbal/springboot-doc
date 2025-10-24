import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import ThemeToggle from './ThemeToggle';
import { SearchButton } from './SearchBox';
import { cn } from '@/utils/cn';

interface HeaderProps {
  onMenuClick: () => void;
  onSearchClick: () => void;
  isSearchOpen: boolean;
  onSearchClose: () => void;
}

/**
 * Header component with logo, search, theme toggle, and mobile menu
 * Fixed position with backdrop blur effect
 */
export default function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section - Logo and mobile menu */}
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-foreground leading-none">
                CrudX
              </span>
              <span className="text-xs text-muted-foreground leading-none">
                Framework
              </span>
            </div>
          </Link>
        </div>

        {/* Center section - Search (hidden on mobile) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <SearchButton onClick={onSearchClick} className="w-full" />
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search button */}
          <button
            onClick={onSearchClick}
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <ThemeToggle />

          {/* Get Started button */}
          <Link
            to="/getting-started"
            className={cn(
              'hidden sm:inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors'
            )}
          >
            Get Started
          </Link>

          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center justify-center rounded-lg p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="GitHub"
          >
            <svg
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
