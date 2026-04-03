/**
 * Error base de la aplicación.
 *
 * - Extiende la clase nativa Error
 * - Define un código HTTP asociado al error
 * - Marca el error como operacional (esperado/controlado)
 * - Sirve como raíz para errores de dominio y aplicación
 */
export abstract class AppError extends Error {
  /** Código HTTP que representa el error */
  abstract readonly statusCode: number;

  /** Indica si el error es controlado (no crítico) */
  readonly isOperational = true;

  /**
   * Constructor base del error.
   * @param message Mensaje descriptivo del error
   */
  protected constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
