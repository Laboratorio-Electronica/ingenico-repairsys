/**
 * =========================================================
 * Feedback States Localization (ES)
 * ---------------------------------------------------------
 * Define los textos de interfaz utilizados para mostrar
 * distintos estados de feedback al usuario en idioma
 * español.
 *
 * Estos estados permiten comunicar situaciones comunes
 * dentro de la aplicación, tales como:
 * - ausencia de datos
 * - resultados vacíos al aplicar filtros
 * - errores de conexión con el backend o la base de datos
 *
 * Arquitectura:
 * - parte del sistema de internacionalización (i18n)
 * - sirve como referencia base para otros idiomas
 * - el tipo `FeedbackStatesLocale` se deriva
 *   automáticamente de la estructura del objeto
 *
 * Responsabilidades:
 * - centralizar los mensajes de feedback del sistema
 * - garantizar consistencia entre idiomas
 * - servir como contrato tipado para otras traducciones
 *
 * Utilizado en:
 * - componentes de empty states
 * - estados de error de conexión
 * - vistas de resultados filtrados
 * =========================================================
 */

/**
 * =========================================================
 * feedbackStates
 * ---------------------------------------------------------
 * Objeto que contiene los textos de feedback en español
 * utilizados por la interfaz de usuario.
 *
 * Estados soportados:
 * - noData → ausencia de datos
 * - error  → fallo de conexión
 * =========================================================
 */
export const feedbackStates = {

  /**
   * Estados donde no existen datos disponibles.
   */
  noData : {

    /**
     * Caso donde existen filtros activos
     * pero no se encontraron resultados.
     */
    filterTrue: {
        title: 'Sin resultados encontrados',
        subtitle: 'Intenta ajustar los filtros o buscar con otros criterios.',
    },

    /**
     * Caso donde la base de datos
     * aún no contiene registros.
     */
    filterFalse: {
        title: 'No hay datos disponibles',
        subtitle: 'Aún no hay información registrada en la base de datos.',
    }
  },

  /**
   * Estado mostrado cuando ocurre un error
   * al conectar con el backend o la base de datos.
   */
  error: {
      title: 'Error de Conexión',
      message: 'No pudimos conectarnos con la base de datos en este momento. Por favor, verifica tu conexión o intenta de nuevo más tarde.',
  }
};

/**
 * =========================================================
 * FeedbackStatesLocale
 * ---------------------------------------------------------
 * Tipo derivado automáticamente de la estructura de
 * `feedbackStates`.
 *
 * Permite garantizar que otras traducciones (ej. inglés)
 * mantengan exactamente la misma estructura de claves
 * y propiedades.
 * =========================================================
 */
export type FeedbackStatesLocale = typeof feedbackStates;