/**
 * =========================================================
 * Notice Metadata Configuration
 * ---------------------------------------------------------
 * Define la configuración visual y semántica para los
 * distintos tipos de avisos o notificaciones informativas
 * que pueden mostrarse dentro de la aplicación.
 *
 * Cada tipo de aviso incluye:
 * - Un icono representativo
 * - Un color asociado al contexto del mensaje
 *
 * Este archivo permite mantener centralizada la
 * configuración de avisos para facilitar consistencia
 * visual y reutilización en componentes UI.
 *
 * Arquitectura:
 * - Tipado fuerte mediante union type (NoticeType)
 * - Uso de Record<K, V> para mapear cada tipo de aviso
 * - Integración con react-icons para iconografía
 *
 * Responsabilidades:
 * - Definir la identidad visual de los avisos
 * - Permitir renderizado dinámico según tipo de aviso
 * - Mantener coherencia visual en la interfaz
 *
 * Utilizado en:
 * - banners informativos
 * - placeholders de contenido
 * - estados temporales de funcionalidades
 * =========================================================
 */

import {
  FaDatabase,
  FaTools,
  FaExclamationTriangle,
  FaWrench,
  FaHourglassHalf,
  FaFlask,
  FaBug,
} from 'react-icons/fa';
import { IconType } from 'react-icons';

/**
 * =========================================================
 * NoticeType
 * ---------------------------------------------------------
 * Define los distintos tipos de avisos disponibles
 * en la aplicación.
 *
 * dummy         -> contenido de ejemplo o datos simulados
 * construction  -> sección en construcción
 * incomplete    -> funcionalidad incompleta
 * maintenance   -> sistema en mantenimiento
 * comingSoon    -> funcionalidad próximamente disponible
 * beta          -> funcionalidad en fase beta
 * bugs          -> aviso de errores conocidos
 * =========================================================
 */
export type NoticeType =
  | 'dummy'
  | 'construction'
  | 'incomplete'
  | 'maintenance'
  | 'comingSoon'
  | 'beta'
  | 'bugs';

/**
 * =========================================================
 * NoticeMeta Interface
 * ---------------------------------------------------------
 * Define la estructura de metadatos visuales asociados
 * a cada tipo de aviso.
 *
 * @property icon  -> icono representativo del aviso
 * @property color -> color asociado al aviso
 * =========================================================
 */
export interface NoticeMeta {
  icon: IconType;
  color: string;
}

/**
 * =========================================================
 * noticeMeta
 * ---------------------------------------------------------
 * Mapa de metadatos visuales asociado a cada tipo de aviso.
 *
 * Estructura:
 * Record<NoticeType, NoticeMeta>
 *
 * Cada entrada define:
 * - icono representativo
 * - color visual asociado al estado del aviso
 * =========================================================
 */
export const noticeMeta: Record<NoticeType, NoticeMeta> = {

  /**
   * Aviso utilizado cuando se muestran datos ficticios
   * o simulados (dummy data).
   */
  dummy: {
    icon: FaDatabase,
    color: '#6c757d',
  },

  /**
   * Indica que la sección o funcionalidad se encuentra
   * actualmente en construcción.
   */
  construction: {
    icon: FaTools,
    color: '#17a2b8',
  },

  /**
   * Indica que una funcionalidad aún no está completamente
   * implementada.
   */
  incomplete: {
    icon: FaExclamationTriangle,
    color: '#ffc107',
  },

  /**
   * Aviso mostrado cuando el sistema o módulo está
   * temporalmente en mantenimiento.
   */
  maintenance: {
    icon: FaWrench,
    color: '#6c757d',
  },

  /**
   * Aviso utilizado para indicar que una funcionalidad
   * estará disponible próximamente.
   */
  comingSoon: {
    icon: FaHourglassHalf,
    color: '#28a745',
  },

  /**
   * Identifica funcionalidades que se encuentran en
   * fase beta o de prueba.
   */
  beta: {
    icon: FaFlask,
    color: '#007bff',
  },

  /**
   * Aviso que indica la existencia de errores conocidos
   * o problemas en la funcionalidad.
   */
  bugs: {
    icon: FaBug,
    color: '#dc3545',
  },
};