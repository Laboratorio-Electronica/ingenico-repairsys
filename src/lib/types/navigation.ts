import { IconType } from "react-icons";

/* ===== Tipos de navegación ===== */

/**
 * Representa un enlace de menú simple con rutas y títulos en distintos idiomas
 */
export interface NavLink {
  path: string; // Ruta a la que apunta el enlace
  title: {
    es: string; // Título en español
    en: string; // Título en inglés
  };
}

/**
 * Props que reciben los componentes de menú
 */
export interface MenuProps {
  links?: NavLink[]; // Enlaces adicionales que se pueden renderizar
  isPhone?: boolean; // Indica si el menú es para versión móvil
  onlyIcons?: boolean; // Renderiza solo iconos sin texto
}

/**
 * Representa un item de navegación completo con icono
 */
export type NavItem = {
  path: string; // Ruta a la que apunta
  label: { es: string; en: string }; // Texto en ambos idiomas
  icon: IconType; // Icono del item de navegación (react-icons)
};
