/**
 * Define los distintos roles técnicos que puede asumir
 * una persona dentro de un proyecto tecnológico.
 *
 * Permite identificar responsabilidades principales
 * y áreas de especialización.
 */
export enum Role {

  /**
   * Desarrollador Full Stack.
   * Participa tanto en frontend como en backend,
   * incluyendo integración y base de datos.
   */
  FULL_STACK = "FULL_STACK",

  /**
   * Desarrollador Frontend.
   * Responsable de la interfaz de usuario,
   * experiencia y lógica del lado cliente.
   */
  FRONTEND = "FRONTEND",

  /**
   * Desarrollador Backend.
   * Encargado de la lógica de negocio,
   * APIs, seguridad y persistencia.
   */
  BACKEND = "BACKEND",

  /**
   * Ingeniero de Automatización.
   * Diseño e implementación de sistemas
   * de control y procesos industriales.
   */
  AUTOMATION = "AUTOMATION",

  /**
   * Especialista en IoT.
   * Desarrollo e integración de dispositivos
   * conectados y sistemas distribuidos.
   */
  IOT = "IOT",

  /**
   * Ingeniero de sistemas embebidos.
   * Desarrollo de firmware y software
   * en hardware dedicado.
   */
  EMBEDDED = "EMBEDDED",

  /**
   * Ingeniero DevOps.
   * Automatización de despliegues,
   * infraestructura y pipelines CI/CD.
   */
  DEVOPS = "DEVOPS",

  /**
   * Líder técnico.
   * Define decisiones arquitectónicas,
   * estándares y guía al equipo.
   */
  TECH_LEAD = "TECH_LEAD",
}
