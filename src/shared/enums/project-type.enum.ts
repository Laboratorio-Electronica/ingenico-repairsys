/**
 * Define la clasificación de un proyecto según
 * su contexto de origen o propósito principal.
 *
 * Permite distinguir el tipo de experiencia
 * o entorno en el que fue desarrollado.
 */
export enum ProjectType {

  /**
   * Proyecto personal.
   * Iniciativa propia orientada a aprendizaje,
   * experimentación o portafolio.
   */
  PERSONAL = "PERSONAL",

  /**
   * Proyecto laboral.
   * Desarrollado dentro de una empresa
   * o como parte de un rol profesional.
   */
  WORK = "WORK",

  /**
   * Proyecto freelance.
   * Realizado de manera independiente
   * para un cliente externo.
   */
  FREELANCE = "FREELANCE",

  /**
   * Proyecto académico.
   * Desarrollado en el contexto de estudios
   * formales o formación técnica/universitaria.
   */
  ACADEMIC = "ACADEMIC",
}
