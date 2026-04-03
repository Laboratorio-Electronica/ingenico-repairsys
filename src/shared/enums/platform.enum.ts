/**
 * Define las plataformas objetivo donde se ejecuta
 * o despliega una solución tecnológica.
 *
 * Cada valor representa el entorno principal
 * para el cual fue diseñada la aplicación o sistema.
 */
export enum Platform {

  /**
   * Aplicación web accesible desde navegador.
   * Puede ser SPA, SSR o tradicional.
   */
  WEB = "WEB",

  /**
   * Aplicación móvil.
   * Nativa, híbrida o multiplataforma (iOS / Android).
   */
  MOBILE = "MOBILE",

  /**
   * Aplicación de escritorio.
   * Ejecutada en sistemas operativos como
   * Windows, macOS o Linux.
   */
  DESKTOP = "DESKTOP",

  /**
   * Plataforma IoT.
   * Dispositivos conectados, sensores,
   * actuadores y sistemas embebidos.
   */
  IOT = "IOT",

  /**
   * Plataforma industrial.
   * Sistemas de automatización, control,
   * SCADA, PLC y entornos productivos.
   */
  INDUSTRIAL = "INDUSTRIAL",

  /**
   * Servicio backend.
   * Lógica de negocio, procesamiento y
   * persistencia ejecutada en servidor.
   */
  BACKEND = "BACKEND",

  /**
   * Interfaz de programación de aplicaciones.
   * Servicio expuesto para integración
   * con otros sistemas.
   */
  API = "API",
}
