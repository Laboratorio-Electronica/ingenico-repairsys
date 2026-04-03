import React from 'react';
import styles from './Spinner.module.scss';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * ==================================================
 * 🔄 Spinner Component
 * --------------------------------------------------
 * Indicador visual de estado de carga.
 *
 * Responsabilidades:
 * - Mostrar animación circular CSS
 * - Mostrar mensaje traducido
 * - Proveer accesibilidad mediante ARIA
 *
 * Accesibilidad:
 * - role="status" informa a lectores de pantalla
 * - aria-live="polite" anuncia cambios sin interrumpir
 *
 * Dependencias:
 * - useTranslation → obtiene textos i18n
 * - Spinner.module.scss → estilos encapsulados
 * ==================================================
 */

const Spinner: React.FC = () => {

  /**
   * Obtiene textos localizados desde el hook
   */
  const { t } = useTranslation();
  const texts = t.common.spinner;

  return (
    <div
      className={styles.spinner}
      role="status"
      aria-live="polite"
    >
      {/* Círculo animado */}
      <div className={styles["spinner__circle"]} />

      {/* Texto descriptivo */}
      <p className={styles["spinner__text"]}>
        {texts.message}
      </p>
    </div>
  );
};

export default Spinner;