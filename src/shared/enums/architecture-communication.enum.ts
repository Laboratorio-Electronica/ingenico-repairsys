/**
 * Define los distintos mecanismos de comunicación utilizados
 * en arquitecturas de software y sistemas distribuidos.
 *
 * Cada valor representa un protocolo o estilo de integración
 * comúnmente empleado para la interoperabilidad entre servicios,
 * aplicaciones o dispositivos.
 */
export enum ArchitectureCommunication {

  /**
   * Arquitectura basada en HTTP y principios REST.
   * Comunicación síncrona request-response.
   */
  REST = "REST",

  /**
   * API basada en consultas tipadas mediante GraphQL.
   * Permite solicitar únicamente los datos necesarios.
   */
  GRAPHQL = "GRAPHQL",

  /**
   * Comunicación bidireccional persistente en tiempo real
   * sobre una conexión TCP (generalmente sobre HTTP).
   */
  WEBSOCKET = "WEBSOCKET",

  /**
   * Arquitectura basada en eventos asíncronos.
   * Los servicios reaccionan a eventos publicados.
   */
  EVENT_DRIVEN = "EVENT_DRIVEN",

  /**
   * Protocolo ligero de mensajería publish/subscribe.
   * Muy utilizado en IoT y sistemas embebidos.
   */
  MQTT = "MQTT",

  /**
   * OPC Unified Architecture.
   * Estándar industrial para interoperabilidad en
   * automatización y sistemas de control.
   */
  OPCUA = "OPCUA",

  /**
   * Java Database Connectivity.
   * API para conexión y ejecución de consultas
   * sobre bases de datos relacionales.
   */
  JDBC = "JDBC",
}
