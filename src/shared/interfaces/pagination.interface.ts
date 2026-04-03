/**
 * =========================================================
 * Pagination Data Interface
 * ---------------------------------------------------------
 * Representa la información de paginación incluida en
 * respuestas de endpoints que devuelven resultados paginados.
 *
 * Esta estructura normalmente acompaña a un arreglo de datos:
 *
 * {
 *   data: T[],
 *   pagination: IPaginationData
 * }
 *
 * Permite al cliente conocer:
 * - cuántos registros existen
 * - cuántos registros se devuelven por página
 * - la página actual
 * - el número total de páginas disponibles
 * =========================================================
 */
export interface IPaginationData {

  /**
   * Número total de registros que cumplen el filtro.
   */
  total: number;

  /**
   * Cantidad máxima de registros por página.
   */
  limit: number;

  /**
   * Página actual solicitada por el cliente.
   */
  currentPage: number;

  /**
   * Número total de páginas disponibles.
   */
  totalPages: number;
}