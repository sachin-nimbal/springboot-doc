import { useState, useEffect } from 'react';
import { applyTheme, getInitialTheme, persistTheme, type Theme } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    persistTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return { theme, setTheme, toggleTheme };
}
