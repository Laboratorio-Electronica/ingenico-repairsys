'use client';

import { useThemeContext } from '@/context/ThemeContext'; // Custom hook to manage theme (light/dark)
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa'; // Icons for theme representation
import style from './ThemeToggle.module.css'; // Module CSS for component styling

/**
 * COMPONENT: ThemeToggle
 *
 * This button component allows the user to toggle between light and dark themes.
 * It uses a custom `useThemeContext` hook to access and update the current theme,
 * and it retrieves the selected language from `LanguageContext` to update accessibility labels accordingly.
 *
 * Accessibility:
 * - The button has an `aria-label` and `title` that adapt to the current language (English or Spanish).
 * - The icon also changes visually to indicate the current theme: a moon icon for light mode (to switch to dark) and a sun icon for dark mode (to switch to light).
 */

interface ThemeProps {
  language: 'es' | 'en'
}

const texts = {
  darkTrue: {
    es: 'Cambiar a claro',
    en: 'Switch to light'
  },
  darkFalse: {
    es: 'Cambiar a oscuro',
    en: 'Switch to dark'
  }
}

const ThemeToggle: React.FC<ThemeProps> = ({ language = 'es' }) => {
  const { theme, toggleTheme } = useThemeContext(); // Get current theme and function to toggle it

  const isDark = theme === 'dark'; // Boolean to check if the current theme is dark

  // Determine the icon to show: FaSun (☀️) if dark mode is active, else FaMoon (🌙)
  const Icon = isDark ? FaSun : FaMoon;

  // Define the label for both the aria-label and title attributes
  const label = isDark ? texts.darkTrue[language] : texts.darkFalse[language];

  return (
    <button
      onClick={toggleTheme} // Toggle the theme when button is clicked
      className={style["theme-toggle"]} // Apply scoped CSS module class
      aria-label={label} // Accessibility: screen reader label
      title={label} // Tooltip when hovering
    >
      <Icon size={28} className={style["theme-toggle__icon"]} /> {/* Render selected icon */}
    </button>
  );
}

export default ThemeToggle;