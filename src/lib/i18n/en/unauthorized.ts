/**
 * =========================================================
 * Unauthorized Locale (EN)
 * ---------------------------------------------------------
 * English translations for the Unauthorized page.
 *
 * This section is displayed when:
 * - The user session has expired
 * - The user tries to access a protected route
 * - The user does not have sufficient permissions
 *
 * The structure must remain synchronized with the
 * Spanish version located at:
 *
 * /es/unauthorized.ts
 *
 * =========================================================
 */

import { UnauthorizedLocale } from "../es/unauthorized";

/**
 * Unauthorized page translations
 */
export const unauthorized: UnauthorizedLocale = {

  /**
   * Main title displayed on the unauthorized page.
   */
  title: 'Session Expired',

  /**
   * Message explaining why the user cannot access the page.
   */
  message: 'Your session has expired or you are not authorized to access this page.',

  /**
   * Informational message shown while the user is
   * being redirected automatically to the login page.
   */
  redirect: 'Redirecting to login...',

  /**
   * Button label that allows the user to manually
   * navigate to the login page.
   */
  goToLogin: 'Go to login now',
};