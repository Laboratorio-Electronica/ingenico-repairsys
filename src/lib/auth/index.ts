/**
 * =========================================================
 * Auth Module Exports
 * ---------------------------------------------------------
 * Punto central de exportación para todas las utilidades
 * relacionadas con autenticación y autorización.
 *
 * Permite importar funcionalidades del módulo de seguridad
 * desde un único punto, evitando múltiples imports
 * distribuidos por la aplicación.
 *
 * Ejemplo de uso:
 *
 * import { getSession, authorize } from "@/lib/auth";
 *
 * Este archivo reexporta:
 *
 * - Control de acceso basado en roles (RBAC)
 * - Validación de rutas y endpoints
 * - Manejo de sesiones
 * - Manejo de tokens JWT
 * - Middleware de autorización
 * - Utilidades de cookies y configuración
 * =========================================================
 */

/** Funciones de control de acceso a features */
export * from './access'

/** Validación de acceso a endpoints de API */
export * from './api-access'

/** Lógica de autorización basada en roles */
export * from './authorize';

/** Configuración de autenticación */
export * from './config';

/** Utilidades para manejo de cookies */
export * from './cookies';

/** Configuración de permisos RBAC */
export * from './rbac.config'

/** Validación de acceso a rutas del frontend */
export * from './route-access'

/** Manejo de sesión de usuario */
export * from './session';

/** Creación y verificación de tokens JWT */
export * from './token';

/** Tipos utilizados en el módulo de autenticación */
export * from './types';

/** Wrapper para proteger handlers de API */
export * from './withAuthorization';