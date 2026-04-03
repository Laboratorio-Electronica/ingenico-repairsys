/**
 * Define los tipos de arquitectura según la forma en que
 * se despliega y organiza el sistema a nivel estructural.
 *
 * Cada valor representa un enfoque distinto de distribución,
 * escalabilidad y separación de responsabilidades.
 */
export enum ArchitectureType {

  /**
   * Monolito.
   * Toda la aplicación se ejecuta como una única unidad
   * desplegable y base de código integrada.
   */
  MONOLITH = "MONOLITH",

  /**
   * Microservicios.
   * Sistema compuesto por múltiples servicios pequeños,
   * independientes y desplegables de forma autónoma.
   */
  MICROSERVICES = "MICROSERVICES",

  /**
   * Arquitectura modular.
   * División interna en módulos bien definidos dentro
   * de una misma aplicación o dominio.
   */
  MODULAR = "MODULAR",

  /**
   * Arquitectura orientada a eventos.
   * Componentes desacoplados que se comunican mediante
   * publicación y suscripción de eventos.
   */
  EVENT_DRIVEN = "EVENT_DRIVEN",

  /**
   * Edge Computing.
   * Procesamiento distribuido cercano a la fuente
   * de datos o dispositivos finales.
   */
  EDGE = "EDGE",
}
