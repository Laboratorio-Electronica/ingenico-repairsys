'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

// Defines the possible theme types: 'light' or 'dark'.
type Theme = 'light' | 'dark';

// Defines the structure of the context, which includes the current theme and a method to toggle it.
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Creates the Theme context, which will be used to manage and access the current theme globally.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component that manages the current theme ('light' or 'dark') state.
// It provides the theme and a method to toggle between themes.
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Effect hook to read the stored theme from localStorage or detect system preferences on first render.
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);  // If a theme is stored, use it.
    } else {
      // If no theme is stored, detect the system's color scheme preference.
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Effect hook to apply the selected theme to the document and store it in localStorage.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);  // Apply the theme to the HTML element.
    localStorage.setItem('theme', theme);  // Save the selected theme in localStorage.
  }, [theme]);

  // Function to toggle between 'light' and 'dark' themes.
  const toggleTheme = useCallback(() => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));  // Toggle theme on click.
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}  {/* Render the child components, providing them with theme context. */}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context.
// Throws an error if used outside of a ThemeProvider.
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;  // Return the theme context (current theme and toggle function).
};
