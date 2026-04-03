import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

/**
 * =========================================================
 * Input Sizes
 * ---------------------------------------------------------
 * Tamaños disponibles para el componente Input.
 *
 * sm → pequeño
 * md → mediano (default)
 * lg → grande
 * =========================================================
 */
type Size = 'sm' | 'md' | 'lg';

/**
 * =========================================================
 * InputProps
 * ---------------------------------------------------------
 * Props del componente Input.
 *
 * Extiende las propiedades nativas de un input HTML,
 * excluyendo la propiedad `size` para evitar conflictos
 * con la variante de tamaño definida en el componente.
 *
 * size → define el tamaño visual del input.
 * =========================================================
 */
interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: Size;
}

/**
 * =========================================================
 * Input Component (Atom)
 * ---------------------------------------------------------
 * Componente base reutilizable para campos de entrada.
 *
 * Características:
 * - Soporte para tamaños (sm, md, lg)
 * - Reenvío de referencias con `forwardRef`
 * - Compatible con formularios controlados o no controlados
 * - Permite extender estilos mediante `className`
 *
 * Ejemplo de uso:
 *
 * <Input
 *   type="text"
 *   placeholder="Username"
 *   size="md"
 * />
 *
 * <Input
 *   type="password"
 *   size="lg"
 *   disabled
 * />
 *
 * =========================================================
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      <input
        ref={ref}

        /**
         * Combina:
         * - estilo base del input
         * - variante de tamaño
         * - clases externas opcionales
         */
        className={clsx(styles.input, styles[size], className)}

        /**
         * Propaga el resto de props al input nativo
         */
        {...props}
      />
    );
  }
);

/**
 * Nombre del componente para DevTools
 */
Input.displayName = 'Input';