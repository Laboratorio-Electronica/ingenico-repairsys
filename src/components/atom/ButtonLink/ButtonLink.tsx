import Link from "next/link";
import clsx from "clsx";
import styles from "../Button/Button.module.scss";

/**
 * Variantes visuales soportadas.
 */
type Variant = "primary" | "secondary" | "ghost";

/**
 * Tamaños disponibles.
 */
type Size = "sm" | "md" | "lg";

/**
 * Props del componente ButtonLink
 */
interface ButtonLinkProps {
  /** URL destino */
  href: string;

  /** Variante visual */
  variant?: Variant;

  /** Tamaño del botón */
  size?: Size;

  /** Si ocupa todo el ancho disponible */
  fullWidth?: boolean;

  /** Clases adicionales */
  className?: string;

  /** Contenido interno */
  children: React.ReactNode;

  /** Target HTML (ej: _blank) */
  target?: string;

  /** Rel HTML (ej: noopener noreferrer) */
  rel?: string;
}

/**
 * =========================================================
 * ButtonLink
 * ---------------------------------------------------------
 * Componente híbrido que renderiza:
 * - <Link> de Next.js para rutas internas
 * - <a> tradicional para URLs externas
 *
 * Responsabilidades:
 * - Unificar estilos de botón + enlace.
 * - Detectar automáticamente enlaces externos.
 * - Mantener consistencia visual del design system.
 *
 * Ventaja:
 * - Evita usar Link incorrectamente para URLs externas.
 * =========================================================
 */
export const ButtonLink = ({
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  target,
  rel,
}: ButtonLinkProps) => {

  /**
   * Detecta si el enlace es externo.
   */
  const isExternal = href.startsWith("http");

  /**
   * Clases finales aplicadas.
   */
  const classes = clsx(
    styles.button,
    styles[`button--${variant}`],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  );

  /* ================= EXTERNAL ================= */

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
      >
        {children}
      </a>
    );
  }

  /* ================= INTERNAL ================= */

  return (
    <Link
      href={href}
      className={classes}
    >
      {children}
    </Link>
  );
};