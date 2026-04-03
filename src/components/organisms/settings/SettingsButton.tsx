import { useState } from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import clsx from 'clsx';

import SettingsPanel from './SettingsPanel';
import styles from './SettingsPanel.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/atom/Button/Button';

/**
 * ==================================================
 * ⚙ SettingsButton
 * --------------------------------------------------
 * Botón controlador del panel de configuración.
 *
 * Modos:
 * - Floating: solo icono (FAB-style)
 * - Menu: texto + caret
 *
 * Características:
 * - Estado interno de apertura
 * - Integración con i18n
 * - Accesibilidad con aria-label dinámico
 * - Render condicional del panel
 * ==================================================
 */

interface Props {
  isFloating?: boolean;
  className?: string;
}

const SettingsButton: React.FC<Props> = ({
  isFloating = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const label = isOpen
    ? t.settingsButton.close
    : t.settingsButton.open;

  return isFloating ? (
    <div
      className={clsx(
        styles['settings-button'],
        styles['settings'],
        className
      )}
    >
      <Button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        variant="ghost"
        size="md"
        aria-label={label}
      >
        {isOpen ? <FaTimes /> : <FaCog />}
      </Button>

      {isOpen && (
        <SettingsPanel
          className={clsx(
            styles['panel__container'],
            styles['panel__container-button']
          )}
        />
      )}
    </div>
  ) : (
    <div
      className={clsx(
        styles['settings-menu'],
        styles['settings'],
        className
      )}
    >
      <Button
        type="button"
        onClick={() => setIsOpen(v => !v)}
        variant="ghost"
        size="lg"
        aria-label={label}
      >
        {t.settingsButton.title}
        {isOpen ? <BiCaretUp /> : <BiCaretDown />}
      </Button>

      {isOpen && (
        <SettingsPanel
          className={clsx(
            styles['panel__container'],
            styles['panel__container-menu']
          )}
        />
      )}
    </div>
  );
};

export default SettingsButton;