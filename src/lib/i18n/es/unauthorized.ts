/**
 * =========================================================
 * Unauthorized Locale (ES)
 * ---------------------------------------------------------
 * Traducciones en español para la página de acceso
 * no autorizado o sesión expirada.
 *
 * Esta página se muestra cuando:
 * - La sesión del usuario ha expirado
 * - El usuario intenta acceder a una ruta protegida
 * - El usuario no tiene permisos suficientes
 *
 * La estructura definida aquí sirve como fuente de
 * verdad para otros idiomas del sistema i18n.
 *
 * Ejemplo:
 *   /en/unauthorized.ts
 *
 * El tipo `UnauthorizedLocale` garantiza que todos
 * los idiomas mantengan la misma estructura.
 * =========================================================
 */

export const unauthorized = {

  /**
   * Título principal mostrado en la página.
   */
  title: 'Sesión expirada',

  /**
   * Mensaje principal que explica el motivo del acceso
   * no autorizado.
   */
  message:
    'Tu sesión ha caducado o no tienes autorización para acceder a esta página.',

  /**
   * Texto informativo que indica que el usuario será
   * redirigido automáticamente al login.
   */
  redirect: 'Redirigiendo al inicio de sesión...',

  /**
   * Texto del botón que permite ir manualmente
   * a la página de login.
   */
  goToLogin: 'Ir al login ahora',
};


/**
 * Tipo derivado automáticamente del objeto locale.
 *
 * Este tipo se utiliza para asegurar que todos los
 * archivos de traducción (por ejemplo en inglés)
 * tengan exactamente la misma estructura.
 */
export type UnauthorizedLocale = typeof unauthorized;