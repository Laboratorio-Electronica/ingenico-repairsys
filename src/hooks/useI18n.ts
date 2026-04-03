import { i18n, Language } from '@/lib/i18n';

/**
 * useI18n
 * ----------
 * Custom hook para obtener las traducciones según el idioma.
 *
 * @param language - idioma actual ('es' | 'en')
 * @returns el objeto de traducciones correspondiente al idioma
 */
export function useI18n(language: Language) {
  return i18n[language];
}
