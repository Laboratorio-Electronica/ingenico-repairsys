import { Status, Visibility } from "@/shared/enums";
import { Types } from "mongoose";

/* ======================================================
   Sub-interfaces internas
====================================================== */

/**
 * Contenido principal localizado del caso de éxito.
 */
interface ILocalizedContent {
  title: string;
  summary: string;
  problem: string;
  solution: string;
}

/**
 * Impacto del caso de éxito por área.
 */
interface ILocalizedImpact {
  operational: string[];
  business: string[];
  users: string;
}

/**
 * Métrica cuantitativa asociada a resultados medibles.
 */
interface IValueMetric {
  value: number;
  unit: string;
  source: string;
}

/**
 * Representación básica de recurso multimedia.
 */
interface IMedia {
  src: string;
  blurDataURL: string;
}

/* ======================================================
   Entidad principal
====================================================== */

/**
 * Representa un Success Case en el dominio del sistema.
 *
 * Contiene:
 * - Identificación (_id, slug)
 * - Contenido multilenguaje
 * - Impacto operacional y de negocio
 * - Métricas cuantitativas y cualitativas
 * - Media asociada
 * - Estado y visibilidad
 * - Línea de tiempo
 *
 * Puede representar tanto el documento persistido
 * como la entidad transportada entre capas.
 */
export interface ISuccessCase {
  /** Identificador único */
  _id: Types.ObjectId | string;

  /** Slug único para uso en rutas públicas */
  slug: string;

  /** Contenido localizado */
  content: {
    es: ILocalizedContent;
    en: ILocalizedContent;
  };

  /** Impacto localizado */
  impact: {
    es: ILocalizedImpact;
    en: ILocalizedImpact;
  };

  /** Métricas del caso */
  metrics: {
    quantitative: {
      uptime: IValueMetric;
      manualRecordsReduction: IValueMetric;
    };
    qualitative: {
      es: string[];
      en: string[];
    };
  };

  /** Recursos multimedia */
  media: {
    cover: IMedia;
    gallery: IMedia[];
  };

  /** Proyectos relacionados */
  projectIds: Types.ObjectId[] | string[];

  /** Rol desempeñado en el proyecto */
  role: string;

  /** Estado dentro del ciclo de vida */
  status: Status;

  /** Descripción de escalabilidad */
  scalability: {
    es: string;
    en: string;
  };

  /** Control de comentarios */
  commentsEnabled: boolean;
  commentsCount: number;

  /** Nivel de visibilidad */
  visibility: Visibility;

  /** Línea de tiempo del proyecto */
  timeline: {
    start: Date;
    end: Date;
  };
}
