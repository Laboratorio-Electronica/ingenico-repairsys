/**
 * ==================================================
 * 🤖 Robots.txt Configuration
 * --------------------------------------------------
 * Genera dinámicamente el archivo robots.txt
 * usando el sistema de metadata de Next.js (App Router).
 *
 * Controla:
 * - Acceso de crawlers a rutas específicas
 * - Declaración del sitemap oficial
 *
 * SEO:
 * - Permite indexación global
 * - Restringe rutas específicas para bots concretos
 * ==================================================
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      /**
       * Restricción específica para Googlebot.
       * Bloquea acceso a rutas internas no deseadas.
       */
      {
        userAgent: 'Googlebot',
        disallow: '/nogooglebot/',
      },

      /**
       * Regla general para todos los bots.
       * Permite indexar todo el sitio.
       */
      {
        userAgent: '*',
        allow: '/',
      },
    ],

    /**
     * Declaración del sitemap principal.
     */
    sitemap: 'https://krlozmedina.dev/sitemap.xml',
  }
}