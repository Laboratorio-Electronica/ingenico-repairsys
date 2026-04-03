import { DomainError } from "../base/domain.error";

/**
 * Error de dominio lanzado cuando se intenta
 * crear o actualizar una entidad con un slug duplicado.
 *
 * Se mapea a HTTP 409 (Conflict), ya que el recurso
 * entra en conflicto con uno existente.
 */
export class SlugAlreadyExistsError extends DomainError {
  /**
   * Código HTTP asociado al error.
   */
  readonly statusCode = 409;

  /**
   * Crea una nueva instancia del error
   * con un mensaje descriptivo por defecto.
   */
  constructor() {
    super("Slug already exists");
  }
}
