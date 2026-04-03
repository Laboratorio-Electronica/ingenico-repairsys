/**
 * =========================================================
 * Feature Enum
 * ---------------------------------------------------------
 * Define los módulos o secciones principales del sistema.
 *
 * Cada feature representa una funcionalidad o área de la
 * aplicación que puede estar asociada a permisos o control
 * de acceso basado en roles (RBAC).
 *
 * Se utiliza normalmente para:
 * - controlar acceso a rutas
 * - organizar permisos por módulo
 * - habilitar/deshabilitar secciones del sistema
 * =========================================================
 */
export enum Feature {
  CALIBRATION = "CALIBRATION",
  CALIBRATION_TORQUE = 'CALIBRATION_TORQUE',
  HOME = "HOME",
  ADMIN = "ADMIN",
}