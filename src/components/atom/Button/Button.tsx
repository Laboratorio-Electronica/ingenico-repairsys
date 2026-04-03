import { forwardRef, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

/**
 * ==================================================
 * 🔘 Button (Core Component)
 * --------------------------------------------------
 * Componente base reutilizable del sistema de diseño.
 *
 * Características:
 * - forwardRef para integración con forms y libs externas
 * - Variantes semánticas (primary, secondary, ghost)
 * - Tamaños escalables (sm, md, lg)
 * - Soporte para ancho completo
 * - Extiende atributos nativos de <button>
 *
 * Props:
 * @property variant   Variante visual
 * @property size      Tamaño visual
 * @property fullWidth Expande a 100%
 * ==================================================
 */

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[`button--${variant}`],
          styles[size],
          fullWidth && styles.fullWidth,
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';