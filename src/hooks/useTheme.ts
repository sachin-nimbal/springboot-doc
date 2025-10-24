import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme-dark';

/**
 * Custom hook for theme management with localStorage persistence
 * Uses system preference as fallback
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === '1') return 'dark';
    if (stored === '') return 'light';
    
    // Fallback to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Persist theme to localStorage
    localStorage.setItem(STORAGE_KEY, theme === 'dark' ? '1' : '');
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, setTheme, toggleTheme };
}
