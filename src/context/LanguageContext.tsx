'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';
import type { Language } from '@/lib/i18n';

// =======================
// 🔹 Tipo del contexto
// =======================
export interface LanguageContextType {
  language: Language; // idioma actual ('es' | 'en')
  setLanguage: (lang: Language) => void; // función para actualizar el idioma
}

// =======================
// 🔹 Creación del contexto
// =======================
export const LanguageContext =
  createContext<LanguageContextType | undefined>(undefined);

// =======================
// 🌐 Proveedor de contexto
// =======================
export function LanguageContextProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es'); // valor por defecto

  // Efecto para cargar idioma desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored === 'es' || stored === 'en') {
      setLanguage(stored as Language);
    }
  }, []);

  // Efecto para guardar el idioma cada vez que cambia
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
