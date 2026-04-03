import { AppError } from "./app.error";

/**
 * Error base para la capa de dominio.
 *
 * - Representa errores propios de las reglas de negocio
 * - No depende de frameworks ni de detalles de infraestructura
 * - Debe ser extendido por errores de dominio específicos
 */
export abstract class DomainError extends AppError {}
