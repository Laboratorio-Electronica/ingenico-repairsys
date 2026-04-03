import { forwardRef, SelectHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Select.module.scss';

/**
 * ==================================================
 * 🔽 Select (Atom)
 * --------------------------------------------------
 * Wrapper tipado y estilizado para <select>.
 *
 * Características:
 * - forwardRef para integrarse con forms y libs externas
 * - Extiende atributos nativos de <select>
 * - Override del prop HTML `size`
 * - Soporte de tamaños visuales (sm | md | lg)
 *
 * Props:
 * @property size Tamaño visual del componente
 * @property className Clases adicionales
 * ==================================================
 */

type Size = 'sm' | 'md' | 'lg';

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: Size;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = 'md', className, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={clsx(
          styles.select,
          styles[size],
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';