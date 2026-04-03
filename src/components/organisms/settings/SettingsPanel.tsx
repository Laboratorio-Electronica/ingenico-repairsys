import { ChangeEvent } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeContext } from '@/context/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useI18n } from '@/hooks/useI18n';
import styles from './SettingsPanel.module.scss';
import { FormField } from '@/components/molecules/FormField/FormField';
import { Select } from '@/components/atom/Select/Select';
import { Switch } from '@/components/atom/Switch/Switch';

/**
 * ==================================================
 * ⚙ SettingsPanel
 * --------------------------------------------------
 * Panel de configuración global de la aplicación.
 *
 * Permite:
 * - Cambiar idioma (ES / EN)
 * - Alternar tema (light / dark)
 *
 * Arquitectura:
 * - Atom / Molecule composition
 * - Context API para estado global
 * - Internacionalización desacoplada
 * - Componentes accesibles
 *
 * Dependencias:
 * - ThemeContext
 * - LanguageContext
 * - useI18n
 * ==================================================
 */

interface Props {
  className: string;
}

export const SettingsPanel: React.FC<Props> = ({ className }) => {

  /* ===============================
    🌍 Language
  =============================== */
  const { language, setLanguage } = useLanguage();

  /* ===============================
    🎨 Theme
  =============================== */
  const { theme, toggleTheme } = useThemeContext();

  /* ===============================
    🌐 Translations
  =============================== */
  const t = useI18n(language);

  /**
   * Maneja el cambio de idioma
   */
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'es' | 'en');
  };

  return (
    <div className={className}>

      {/* ===============================
        🌍 LANGUAGE FORM
      =============================== */}
      <form className={styles['panel__form']}>
        <FormField
          label={t.settings.selectLanguage}
          htmlFor="language-select"
        >
          <Select
            id="language-select"
            name="language"
            value={language}
            onChange={handleLanguageChange}
            aria-label={t.settings.selectLanguage}
            size="sm"
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇺🇸 English</option>
          </Select>
        </FormField>
      </form>

      {/* ===============================
        🎨 THEME FORM
      =============================== */}
      <form className={styles['panel__form']}>
        <FormField
          label={t.settings.theme}
          htmlFor="theme-toggle"
        >
          <div className={styles['panel__switchWrapper']}>
            <FaSun
              className={styles['panel__icon']}
              aria-hidden
            />

            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              ariaLabel={t.settings.theme}
            />

            <FaMoon
              className={styles['panel__icon']}
              aria-hidden
            />
          </div>
        </FormField>
      </form>

    </div>
  );
};

export default SettingsPanel;