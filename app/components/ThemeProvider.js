'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const DEFAULT_THEME = 'system';

const ThemeContext = createContext({
  theme: DEFAULT_THEME,
  resolvedTheme: 'light',
  toggleTheme: () => {},
});

const readStoredTheme = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('theme');
  } catch (error) {
    return null;
  }
};

const writeStoredTheme = (value) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('theme', value);
  } catch (error) {}
};

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const applyThemeToDocument = (theme) => {
  if (typeof document === 'undefined') {
    return theme === 'system' ? 'light' : theme;
  }

  const resolved = theme === 'system' ? getSystemTheme() : theme;
  const root = document.documentElement;

  root.classList.toggle('dark', resolved === 'dark');
  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  return resolved;
};

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [resolvedTheme, setResolvedTheme] = useState(() => applyThemeToDocument(DEFAULT_THEME));

  useEffect(() => {
    const storedTheme = readStoredTheme() || DEFAULT_THEME;
    setTheme(storedTheme);
    setResolvedTheme(applyThemeToDocument(storedTheme));
  }, []);

  useEffect(() => {
    if (theme !== 'system') return undefined;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => setResolvedTheme(applyThemeToDocument('system'));

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [theme]);

  useEffect(() => {
    setResolvedTheme(applyThemeToDocument(theme));
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const systemTheme = getSystemTheme();
    const nextTheme =
      theme === 'system'
        ? systemTheme === 'dark'
          ? 'light'
          : 'dark'
        : theme === 'dark'
          ? 'light'
          : 'dark';

    setTheme(nextTheme);
    writeStoredTheme(nextTheme);
    setResolvedTheme(applyThemeToDocument(nextTheme));
  }, [theme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, toggleTheme }),
    [theme, resolvedTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
