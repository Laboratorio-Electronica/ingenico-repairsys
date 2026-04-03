import { Document } from "mongoose";
import { Status, Visibility } from "@/shared/enums";

/**
 * Contenido localizado del caso de éxito.
 */
interface LocalizedContent {
  title: string;
  summary: string;
  problem: string;
  solution: string;
}

/**
 * Impacto generado por el proyecto (localizado).
 */
interface LocalizedImpact {
  operational: string[];
  business: string[];
  users: string;
}

/**
 * Métrica cuantificable con unidad y fuente verificable.
 */
interface ValueMetric {
  value: number;
  unit: string;
  source: string;
}

/**
 * Recurso multimedia optimizado.
 */
interface Media {
  src: string;
  blurDataURL: string;
}

/**
 * Documento de MongoDB que representa un caso de éxito.
 *
 * Extiende de `mongoose.Document`, por lo tanto incluye:
 * - _id
 * - métodos internos de mongoose
 * - metadata del documento
 */
export interface SuccessCaseDocument extends Document {
  /**
   * Identificador público para rutas dinámicas.
   */
  slug: string;

  /**
   * Contenido principal del caso (multi-idioma).
   */
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };

  /**
   * Impacto generado (multi-idioma).
   */
  impact: {
    es: LocalizedImpact;
    en: LocalizedImpact;
  };

  /**
   * Métricas cuantitativas y cualitativas.
   */
  metrics: {
    quantitative: {
      uptime: ValueMetric;
      manualRecordsReduction: ValueMetric;
    };
    qualitative: {
      es: string[];
      en: string[];
    };
  };

  /**
   * Recursos multimedia asociados.
   */
  media: {
    cover: Media;
    gallery: Media[];
  };

  /**
   * Proyectos relacionados.
   * Nota: Si en el schema esto es un ObjectId ref,
   * este tipado no es correcto y debería ser Types.ObjectId[].
   */
  projectIds: {
    slug: string;
  }[];

  /**
   * Rol desempeñado en el proyecto.
   */
  role: string;

  /**
   * Estado interno del caso.
   */
  status: Status;

  /**
   * Información sobre escalabilidad (multi-idioma).
   */
  scalability: {
    es: string;
    en: string;
  };

  /**
   * Configuración y métricas de comentarios.
   */
  commentsEnabled: boolean;
  commentsCount: number;

  /**
   * Nivel de visibilidad pública.
   */
  visibility: Visibility;

  /**
   * Periodo de ejecución del proyecto.
   */
  timeline: {
    start: Date;
    end: Date;
  };

  /**
   * Fecha de creación del documento.
   */
  createdAt: Date;

  /**
   * Fecha de última actualización del documento.
   */
  updatedAt: Date;
}
