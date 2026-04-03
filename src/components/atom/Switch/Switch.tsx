import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Switch.module.scss';

/**
 * ==================================================
 * 🔘 Switch (Atom)
 * --------------------------------------------------
 * Componente toggle accesible basado en input checkbox.
 *
 * Características:
 * - forwardRef para integración con formularios
 * - role="switch" para semántica accesible
 * - aria-label opcional
 * - Estilizado con patrón input + slider
 *
 * Props:
 * - Extiende atributos nativos de <input>
 * - Omite 'type' para forzar checkbox
 * - ariaLabel para accesibilidad
 * ==================================================
 */

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  ariaLabel?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, ariaLabel, ...props }, ref) => {
    return (
      <label className={clsx(styles.switch, className)}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className={styles.input}
          aria-label={ariaLabel}
          {...props}
        />
        <span className={styles.slider} />
      </label>
    );
  }
);

Switch.displayName = 'Switch';