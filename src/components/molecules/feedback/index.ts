/**
 * =========================================================
 * Feedback States Barrel
 * ---------------------------------------------------------
 * Punto central de exportación para todos los estados
 * visuales reutilizables del sistema.
 *
 * Propósito:
 * - Evitar imports con rutas profundas.
 * - Centralizar los estados de feedback.
 * - Mejorar mantenibilidad y consistencia.
 *
 * Uso recomendado:
 *   import { LoadingState, NoDataState } 
 *   from '@/components/molecules/feedback';
 * =========================================================
 */

export * from './LoadingState';
export * from './NoDataState';
export * from './DatabaseErrorState';