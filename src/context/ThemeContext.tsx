import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';
export type AccentColor = 'indigo' | 'emerald' | 'rose' | 'amber' | 'cyan';

export const ACCENTS: Record<AccentColor, { primary: string; secondary: string }> = {
    indigo: { primary: '#6366F1', secondary: '#818CF8' },
    emerald: { primary: '#10B981', secondary: '#34D399' },
    rose: { primary: '#F43F5E', secondary: '#FB7185' },
    amber: { primary: '#F59E0B', secondary: '#FBBF24' },
    cyan: { primary: '#06B6D4', secondary: '#22D3EE' }
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  const [accent, setAccent] = useState<AccentColor>(() => {
      const saved = localStorage.getItem('accent') as AccentColor;
      return (saved && ACCENTS[saved]) ? saved : 'indigo';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
      const colors = ACCENTS[accent];
      document.documentElement.style.setProperty('--accent-primary', colors.primary);
      document.documentElement.style.setProperty('--accent-secondary', colors.secondary);
      localStorage.setItem('accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
