/**
 * Define los principales estilos de arquitectura de software.
 *
 * Cada valor representa una forma estructural de organizar
 * responsabilidades, dependencias y reglas dentro del sistema.
 */
export enum ArchitectureStyle {

  /**
   * Model - View - Controller.
   * Separa la lógica de negocio (Model), la interfaz (View)
   * y el manejo de eventos/flujo (Controller).
   */
  MVC = "MVC",

  /**
   * Arquitectura en capas.
   * Divide el sistema en niveles (presentación, aplicación,
   * dominio, infraestructura) con dependencias descendentes.
   */
  LAYERED = "LAYERED",

  /**
   * Clean Architecture.
   * Centrada en el dominio y en la inversión de dependencias.
   * La lógica de negocio es independiente de frameworks.
   */
  CLEAN = "CLEAN",

  /**
   * Arquitectura Hexagonal (Ports & Adapters).
   * Aísla el núcleo del sistema mediante puertos e
   * implementaciones adaptadoras externas.
   */
  HEXAGONAL = "HEXAGONAL",

  /**
   * Domain-Driven Design.
   * Enfoque estratégico y táctico basado en el modelado
   * profundo del dominio y lenguaje ubicuo.
   */
  DDD = "DDD",
}
