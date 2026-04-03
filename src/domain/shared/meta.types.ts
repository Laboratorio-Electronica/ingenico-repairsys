/**
 * =========================================================
 * Entity Metadata Types
 * ---------------------------------------------------------
 * Define las estructuras tipadas utilizadas para describir
 * metadatos asociados a entidades dentro del sistema.
 *
 * Estas estructuras permiten estandarizar información
 * descriptiva utilizada en la interfaz, como:
 * - etiquetas localizadas
 * - descripciones
 * - iconos representativos
 * - colores asociados
 *
 * Arquitectura:
 * - Tipos reutilizables en todo el dominio
 * - Soporte para internacionalización (i18n)
 * - Integración con iconografía de lucide-react
 *
 * Responsabilidades:
 * - Definir el contrato de metadatos para entidades
 * - Permitir tipado fuerte en configuraciones META
 * - Facilitar renderizado consistente en UI
 *
 * Utilizado en:
 * - archivos *_META.ts
 * - catálogos de entidades
 * - componentes de visualización de metadatos
 * =========================================================
 */

import { LucideIcon } from "lucide-react";

/**
 * =========================================================
 * LocalizedMeta
 * ---------------------------------------------------------
 * Define la estructura de metadatos localizados para un
 * idioma específico.
 *
 * @property labels - Etiqueta o nombre corto mostrado en UI.
 * @property description - Descripción detallada de la entidad.
 * =========================================================
 */
interface LocalizedMeta {
  labels: string;
  description: string;
}

/**
 * =========================================================
 * EntityMeta
 * ---------------------------------------------------------
 * Estructura principal de metadatos para una entidad del
 * sistema.
 *
 * Incluye:
 * - información localizada (es / en)
 * - icono representativo
 * - color asociado para UI
 *
 * @property es - Metadatos localizados en español.
 * @property en - Metadatos localizados en inglés.
 * @property icon - Icono asociado a la entidad.
 * @property color - Color representativo utilizado en UI.
 * =========================================================
 */
export type EntityMeta = {
  es: LocalizedMeta;
  en: LocalizedMeta;
  icon: LucideIcon;
  color: string;
};