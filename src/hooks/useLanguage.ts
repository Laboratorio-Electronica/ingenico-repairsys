import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

/**
 * useLanguage
 * ----------
 * Custom hook para acceder al idioma actual y su setter desde el LanguageContext.
 *
 * @returns {LanguageContextType} - { language, setLanguage }
 * @throws Error si se usa fuera del LanguageContextProvider
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used within LanguageContextProvider');
  }

  return context;
};
