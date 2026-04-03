/**
 * Define los principales modelos de bases de datos
 * según su estructura de almacenamiento y consulta.
 *
 * Cada valor representa un paradigma distinto de
 * organización y acceso a los datos.
 */
export enum DatabaseModel {

  /**
   * Modelo relacional.
   * Datos organizados en tablas con filas y columnas,
   * utilizando SQL y relaciones mediante claves.
   */
  RELATIONAL = "RELATIONAL",

  /**
   * Modelo orientado a documentos.
   * Almacena información en estructuras tipo JSON/BSON,
   * flexible y sin esquema rígido.
   */
  DOCUMENT = "DOCUMENT",

  /**
   * Modelo clave-valor.
   * Estructura simple basada en pares key-value,
   * optimizada para alta velocidad de lectura/escritura.
   */
  KEY_VALUE = "KEY_VALUE",

  /**
   * Modelo de grafos.
   * Representa datos como nodos y relaciones,
   * ideal para estructuras altamente conectadas.
   */
  GRAPH = "GRAPH",

  /**
   * Modelo de series temporales.
   * Optimizado para datos indexados por tiempo,
   * común en monitoreo y telemetría.
   */
  TIMESERIES = "TIMESERIES",

  /**
   * Modelo híbrido.
   * Combina múltiples paradigmas de almacenamiento
   * dentro de un mismo motor de base de datos.
   */
  HYBRID = "HYBRID",
}
