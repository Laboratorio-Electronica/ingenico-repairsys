import { IconType } from 'react-icons';
import clsx from 'clsx';
import styles from './Icon.module.scss';

/**
 * ==================================================
 * 🧩 Icon Component
 * --------------------------------------------------
 * Wrapper genérico para iconos de react-icons.
 *
 * Responsabilidades:
 * - Estandarizar estilos base (.icon)
 * - Permitir tamaño configurable
 * - Permitir clases adicionales
 * - Soporte básico de accesibilidad
 *
 * Props:
 * @property icon      → Componente icono (react-icons)
 * @property size      → Tamaño en px (default: 24)
 * @property className → Clases adicionales
 * @property ariaLabel → Etiqueta accesible opcional
 *
 * Accesibilidad:
 * - Si ariaLabel existe → role="img"
 * - Si no existe → icono decorativo
 * ==================================================
 */

type IconProps = {
  icon: IconType;
  size?: number;
  className?: string;
  ariaLabel?: string;
};

export const Icon = ({
  icon: IconComponent,
  size = 24,
  className,
  ariaLabel,
}: IconProps) => {
  return (
    <IconComponent
      size={size}
      className={clsx(styles.icon, className)}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    />
  );
};