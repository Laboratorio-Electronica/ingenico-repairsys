/**
 * ==================================================
 * 🗺️ Dynamic Sitemap Generator
 * --------------------------------------------------
 * Genera el sitemap.xml dinámicamente usando:
 * - Rutas estáticas
 * - Proyectos almacenados en base de datos
 *
 * Utiliza el sistema de metadata nativo de Next.js
 * (App Router).
 *
 * SEO:
 * - Incluye lastModified para mejorar indexación.
 * - Genera URLs absolutas.
 * ==================================================
 */

import { MetadataRoute } from 'next'
import connectDB from '@/lib/db/connectDB'
import { ProjectV2 } from '@/models'

/**
 * URL base del sitio.
 * Debe coincidir con dominio productivo.
 */
const siteUrl = 'https://krlozmedina.dev'

/**
 * sitemap()
 * --------------------------------------------------
 * Se ejecuta en build o request time (según config).
 * Retorna un array compatible con MetadataRoute.Sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  /**
   * Asegura conexión activa a la base de datos
   * antes de consultar proyectos.
   */
  await connectDB()

  /**
   * Obtiene únicamente los campos necesarios
   * para el sitemap (optimización).
   */
  const projects = await ProjectV2
    .find({}, 'slug updatedAt')
    .lean()

  /**
   * Rutas estáticas del sitio.
   */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/profile/about`,
      lastModified: new Date(),
    },
  ]

  /**
   * Rutas dinámicas generadas desde base de datos.
   */
  const projectRoutes: MetadataRoute.Sitemap = projects.map(
    (project: any) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt || new Date(),
    })
  )

  /**
   * Combina rutas estáticas y dinámicas.
   */
  return [...staticRoutes, ...projectRoutes]
}