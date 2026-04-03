import { AppError } from "../base/app.error";

/**
 * Error de dominio para recursos no encontrados.
 *
 * Se utiliza cuando una entidad solicitada no existe
 * (por ejemplo: Project, Feature, Category, etc.).
 *
 * - statusCode: 404 (Not Found)
 * - isOperational: true → error esperado y controlado
 */
export class NotFoundError extends AppError {
  /** Código HTTP asociado al error */
  readonly statusCode = 404;

  /** Marca el error como operacional (no crítico) */
  readonly isOperational = true;

  /**
   * @param resource Nombre del recurso no encontrado
   *                 (por defecto: "Resource")
   */
  constructor(resource = "Resource") {
    super(`${resource} not found`);
  }
}
