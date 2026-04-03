/**
 * =========================================================
 * Textarea Component
 * ---------------------------------------------------------
 * Componente reutilizable de textarea para formularios
 * dentro del sistema de diseño de la aplicación.
 *
 * Este componente encapsula:
 * - estilos consistentes mediante SCSS Modules
 * - variantes de tamaño
 * - soporte completo para atributos nativos de textarea
 * - forwarding de ref para integraciones con formularios
 *
 * Arquitectura:
 * - Basado en React + TypeScript
 * - Usa SCSS Modules para estilos encapsulados
 * - Utiliza clsx para composición segura de clases
 *
 * Responsabilidades:
 * - Renderizar un textarea estilizado consistente
 * - Permitir variantes de tamaño (sm | md | lg)
 * - Aceptar todos los atributos nativos de HTML textarea
 * - Permitir acceso a ref para librerías como:
 *   - react-hook-form
 *   - formik
 *   - validaciones personalizadas
 *
 * Utilizado en:
 * - Formularios de contacto
 * - Campos de comentarios
 * - Entradas de texto multilínea
 * =========================================================
 */

import { forwardRef, TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Textarea.module.scss';

/**
 * =========================================================
 * Size Type
 * ---------------------------------------------------------
 * Define las variantes de tamaño disponibles
 * para el componente Textarea.
 *
 * sm  -> tamaño pequeño
 * md  -> tamaño estándar (por defecto)
 * lg  -> tamaño grande
 * =========================================================
 */
type Size = 'sm' | 'md' | 'lg';

/**
 * =========================================================
 * TextareaProps Interface
 * ---------------------------------------------------------
 * Props del componente Textarea.
 *
 * Extiende los atributos nativos de HTML textarea,
 * permitiendo usar propiedades como:
 * - placeholder
 * - disabled
 * - required
 * - value
 * - onChange
 * - etc.
 *
 * Props adicionales:
 * @property size - Variante de tamaño del textarea.
 * =========================================================
 */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: Size;
}

/**
 * =========================================================
 * Textarea Component
 * ---------------------------------------------------------
 * Componente funcional que renderiza un textarea estilizado
 * utilizando SCSS Modules y soporta forwardRef.
 *
 * @param size - Variante de tamaño del textarea (default: 'md')
 * @param className - Clases adicionales para extender estilos
 * @param props - Resto de atributos nativos del textarea
 * @param ref - Referencia al elemento textarea subyacente
 *
 * @returns JSX.Element
 * =========================================================
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ size = 'md', className, ...props }, ref) => {
    return (
      /**
       * Elemento textarea con:
       * - estilos base
       * - modificador de tamaño
       * - clases adicionales opcionales
       */
      <textarea
        ref={ref}
        className={clsx(
          styles.textarea,
          styles[`textarea--${size}`],
          className
        )}
        {...props}
      />
    );
  }
);

/**
 * Nombre del componente para debugging en React DevTools.
 */
Textarea.displayName = 'Textarea';