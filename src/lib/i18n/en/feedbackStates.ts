/**
 * =========================================================
 * Feedback States Localization (EN)
 * ---------------------------------------------------------
 * Define los textos localizados en inglés utilizados para
 * representar distintos estados de feedback en la interfaz
 * de usuario.
 *
 * Estos estados se muestran típicamente cuando:
 * - no hay datos disponibles
 * - una consulta no retorna resultados
 * - ocurre un error de conexión con el backend
 *
 * Arquitectura:
 * - parte del sistema de internacionalización (i18n)
 * - implementa la estructura tipada `FeedbackStatesLocale`
 * - separado por idioma para facilitar mantenimiento
 *
 * Responsabilidades:
 * - proveer textos de UI para estados de feedback
 * - mantener consistencia de mensajes en la aplicación
 * - permitir cambio de idioma dinámico
 *
 * Utilizado en:
 * - componentes de estados vacíos (empty states)
 * - mensajes de error de conexión
 * - vistas de resultados filtrados sin coincidencias
 * =========================================================
 */

import { FeedbackStatesLocale } from "../es/feedbackStates";

/**
 * =========================================================
 * feedbackStates
 * ---------------------------------------------------------
 * Objeto que contiene los textos de feedback en inglés
 * para diferentes estados de la interfaz.
 *
 * Tipos de estado:
 * - noData → cuando no existen registros o resultados
 * - error  → cuando ocurre un fallo de conexión
 * =========================================================
 */
export const feedbackStates: FeedbackStatesLocale = {

  /**
   * Estados cuando no hay datos disponibles.
   */
  noData: {

    /**
     * Caso donde hay filtros activos pero
     * no se encontraron resultados.
     */
    filterTrue: {
        title: 'No results found',
        subtitle: 'Try adjusting the filters or searching with different criteria.',
    },

    /**
     * Caso donde no existen registros
     * en la base de datos.
     */
    filterFalse: {
        title: 'No data available',
        subtitle: 'There is no information recorded in the database yet.',
    }
  },

  /**
   * Estado de error cuando falla la conexión
   * con el backend o la base de datos.
   */
  error: {
      title: 'Connection Error',
      message: 'We couldn’t connect to the database at this moment. Please check your connection or try again later.',
  }
};