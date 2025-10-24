import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring transition-colors duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MoonIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      ) : (
        <SunIcon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
      )}
    </button>
  );
};
