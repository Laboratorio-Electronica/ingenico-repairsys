/**
 * =========================================================
 * Page (Type)
 * ---------------------------------------------------------
 * Unión literal que define todas las páginas válidas
 * dentro del sistema.
 *
 * Propósito:
 * - Evitar strings mágicos.
 * - Garantizar tipado fuerte en navegación.
 * - Asegurar coherencia con i18n (t[page]).
 * - Servir como contrato entre:
 *    • Hero
 *    • Layouts
 *    • Rutas
 *    • Configuración global
 *
 * Nota arquitectónica:
 * Cada valor debe corresponder a:
 * - Una clave en el diccionario de traducciones.
 * - Una posible sección o ruta válida.
 *
 * Si se agrega una nueva página, debe:
 * 1. Añadirse aquí.
 * 2. Añadirse en i18n.
 * 3. Añadirse en ROUTES_LIST si aplica.
 * =========================================================
 */
export type Page =
  'about'        |
  'blog'         |
  'successCases' |
  'clients'      |
  'contact'      |
  'dashboard'    |
  'education'    |
  'experience'   |
  'gallery'      |
  'profile'      |
  'projects'     |
  'resources'    |
  'resume'       |
  'service'      |
  'skills'       |
  'testimonials';