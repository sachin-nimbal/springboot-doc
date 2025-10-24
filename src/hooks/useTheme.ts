import { useState, useEffect } from 'react';
import { getTheme, setTheme, toggleTheme as toggleThemeUtil, type Theme } from '../utils/theme';

export const useTheme = () => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = toggleThemeUtil();
    setThemeState(newTheme);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return {
    theme,
    toggleTheme,
    changeTheme,
  };
};
