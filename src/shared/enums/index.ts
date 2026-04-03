/**
 * =========================================================
 * Shared Enums & Constants Barrel
 * ---------------------------------------------------------
 * Punto central de re-exportación para enums y constantes
 * compartidas en toda la aplicación.
 *
 * Objetivos:
 * - Evitar imports con rutas profundas.
 * - Garantizar consistencia en el uso de enums.
 * - Mejorar mantenibilidad y descubribilidad.
 * - Servir como contrato transversal entre capas
 *   (domain, application, infrastructure, UI).
 *
 * Uso recomendado:
 *   import { StatusEnum, PlatformEnum } from '@/shared/enums';
 *
 * En lugar de:
 *   import { StatusEnum } from '@/shared/enums/status.enum';
 * =========================================================
 */


/* =========================================================
  Shared Quotes or Text Constants
  ========================================================= */
export * from './quotes';


/* =========================================================
  Architecture Enums
  ========================================================= */
export * from './architecture-communication.enum';
export * from './architecture-style.enum';
export * from './architecture-type.enum';


/* =========================================================
  Database Modeling Strategy
  ========================================================= */
export * from './database-model.enum';


/* =========================================================
  Target Platform (web, mobile, backend, etc.)
  ========================================================= */
export * from './platform.enum';


/* =========================================================
  Project Lifecycle / Status
  ========================================================= */
export * from './status.enum';


/* =========================================================
  Project Classification / Type
  ========================================================= */
export * from './project-type.enum';


/* =========================================================
  Team, Visibility & Experience
  ========================================================= */
export * from './role.enum';
export * from './visibility.enum';
export * from './experience-level.enum';
export * from './area.enum';
export * from './tool-status.enum';
export * from './tool-type.enum';
export * from './terminal-technology.enum';
export * from './terminal-status.enum'