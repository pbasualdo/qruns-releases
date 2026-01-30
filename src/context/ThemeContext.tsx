import React, { createContext, useContext, useEffect, useState } from 'react';
import { ACCENTS, type AccentColor, type Theme, type ViewMode, type UIScale } from './ThemeConstants';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  accent: AccentColor;
  setAccent: (accent: AccentColor) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  uiScale: UIScale;
  setUIScale: (scale: UIScale) => void;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (saved && (ACCENTS as Record<string, any>)[saved]) ? saved : 'indigo';
  });

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
      const saved = localStorage.getItem('viewMode') as ViewMode;
      return saved || 'comfortable';
  });

  const [uiScale, setUIScale] = useState<UIScale>(() => {
      const saved = localStorage.getItem('uiScale') as UIScale;
      return saved || 'normal';
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

  useEffect(() => {
      localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  useEffect(() => {
      document.documentElement.setAttribute('data-ui-scale', uiScale);
      localStorage.setItem('uiScale', uiScale);
  }, [uiScale]);

  const toggleTheme = () => {
    setTheme((prev: Theme) => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ 
        theme, toggleTheme, 
        accent, setAccent, 
        viewMode, setViewMode, 
        uiScale, setUIScale 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
