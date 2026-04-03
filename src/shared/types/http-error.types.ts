/**
 * Estructura estándar para respuestas de error.
 *
 * Usado típicamente para errores de base de datos o validación.
 */
export interface ErrorResponse {
  data: {
    /** Información sobre clave duplicada (unique index) */
    duplicateKey: {
      name?: string; // Nombre del campo que generó el conflicto
    };

    /** Mensaje de error general */
    error?: string;
  };
}
