import { useI18n } from "./useI18n";
import { useLanguage } from "./useLanguage";

/**
 * useTranslation
 * ----------------
 * Custom hook que combina LanguageContext y el objeto i18n.
 *
 * @returns {Object} - {
 *   t: objeto de traducciones según el idioma actual,
 *   language: idioma actual ('es' | 'en')
 * }
 *
 * Uso típico:
 * const { t, language } = useTranslation();
 * <p>{t.logo.header}</p>
 */
export function useTranslation() {
  const { language } = useLanguage(); // obtiene el idioma del contexto
  const t = useI18n(language); // obtiene las traducciones del idioma actual

  return { t, language };
}
