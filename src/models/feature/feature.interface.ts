/**
 * =========================================================
 * Feature Interfaces
 * ---------------------------------------------------------
 * Define las interfaces utilizadas para representar
 * Features dentro de la aplicación.
 *
 * Estas interfaces modelan distintos niveles de
 * representación de una Feature:
 *
 * - IFeature           → entidad completa (base de datos)
 * - IFeatureList       → versión ligera para listados
 * - IFeaturePaginated  → respuesta paginada de la API
 *
 * Arquitectura:
 * - Interfaces compartidas entre backend y frontend
 * - Tipos utilizados en servicios, DTOs y RTK Query
 * - Soporte para contenido internacionalizado (i18n)
 *
 * Responsabilidades:
 * - definir contratos de datos para Features
 * - tipar respuestas de la API
 * - mantener consistencia entre capas del sistema
 *
 * Utilizado en:
 * - endpoints de Features
 * - servicios de datos
 * - slices de Redux / RTK Query
 * =========================================================
 */

import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { IPaginationData } from "@/shared/interfaces/pagination.interface";
import { Types } from "mongoose";

/**
 * =========================================================
 * IFeature
 * ---------------------------------------------------------
 * Representa la entidad Feature tal como existe en la
 * base de datos.
 *
 * Incluye:
 * - identificador único
 * - slug público
 * - contenido multilenguaje
 * - dominio funcional
 * - timestamps opcionales
 * =========================================================
 */
export interface IFeature {

  /**
   * Identificador único del documento.
   * Puede ser un ObjectId o su versión serializada.
   */
  _id: Types.ObjectId | string;

  /**
   * Slug único utilizado para rutas o identificación pública.
   */
  slug: string;

  /**
   * Contenido localizado por idioma.
   * Permite soporte de internacionalización (i18n).
   */
  content: {
    es: {
      /** Título de la feature en español */
      title: string;

      /** Descripción de la feature en español */
      description: string;
    };
    en: {
      /** Título de la feature en inglés */
      title: string;

      /** Descripción de la feature en inglés */
      description: string;
    };
  };

  /**
   * Dominio funcional al que pertenece la feature.
   */
  domain: FeatureDomain;

  /**
   * Fecha de creación del documento.
   */
  createdAt?: Date;

  /**
   * Fecha de última actualización del documento.
   */
  updatedAt?: Date;
}

/**
 * =========================================================
 * IFeatureList
 * ---------------------------------------------------------
 * Versión ligera de Feature utilizada en listados.
 *
 * Se utiliza en endpoints paginados donde no se requiere
 * la estructura completa de la entidad.
 * =========================================================
 */
export interface IFeatureList {

  /**
   * Identificador único serializado.
   */
  _id: Types.ObjectId | string;

  /**
   * Título de la feature según el idioma seleccionado.
   */
  title: string;

  /**
   * Descripción breve de la feature.
   */
  description: string;

  /**
   * Dominio funcional de la feature.
   */
  domain: FeatureDomain;
}

/**
 * =========================================================
 * IFeaturePaginated
 * ---------------------------------------------------------
 * Representa la respuesta paginada de features desde la API.
 *
 * Incluye:
 * - lista de features transformadas
 * - metadatos de paginación
 * =========================================================
 */
export interface IFeaturePaginated {

  /**
   * Lista de features en formato ligero.
   */
  data: IFeatureList[];

  /**
   * Información de paginación de la respuesta.
   */
  pagination: IPaginationData;
}