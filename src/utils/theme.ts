export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'crudx-theme';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
  if (stored && (stored === 'light' || stored === 'dark')) {
    return stored;
  }
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const toggleTheme = (): Theme => {
  const currentTheme = getTheme();
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);
  return newTheme;
};

export const initializeTheme = (): void => {
  if (typeof window === 'undefined') return;
  
  const theme = getTheme();
  setTheme(theme);
};
