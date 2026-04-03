/**
 * Define los niveles de experiencia disponibles.
 *
 * Puede utilizarse para:
 * - Clasificación de habilidades
 * - Filtros de búsqueda
 * - Reglas de negocio
 * - Control de progresión
 */
export enum ExperienceLevel {
  /** Explorando el área, sin conocimientos formales */
  EXPLORING = "EXPLORING",

  /** Conocimientos básicos o introductorios */
  BASIC = "BASIC",

  /** Manejo funcional sin profundidad avanzada */
  INTERMEDIATE = "INTERMEDIATE",

  /** Dominio sólido y experiencia práctica */
  ADVANCED = "ADVANCED",

  /** Alto nivel técnico y autonomía completa */
  EXPERT = "EXPERT",

  /** Nivel profesional aplicado en entorno laboral */
  PROFESSIONAL = "PROFESSIONAL",
}
