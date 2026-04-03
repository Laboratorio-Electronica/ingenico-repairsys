import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  Platform,
  Status,
  ProjectType,
  Role,
  Visibility,
} from "@/shared/enums";
import { Types } from "mongoose";

/**
 * Identificador genérico de entidad.
 * En la capa de aplicación se maneja como string,
 * aunque en infraestructura puede mapearse a ObjectId.
 */
type EntityId = string;

/**
 * Campos de auditoría comunes.
 */
interface IAuditFields {
  /** Fecha de creación en formato ISO */
  createdAt?: string;

  /** Fecha de última actualización en formato ISO */
  updatedAt?: string;
}

/**
 * 📦 Modelo legado de proyecto (Versión 1).
 *
 * Representa una estructura plana utilizada
 * antes de la refactorización hacia un modelo
 * más orientado a dominio.
 */
export interface IProjectV1 extends IAuditFields {
  /** Identificador único del proyecto */
  _id: EntityId;

  /** Título principal */
  title: string;

  /** Slug único para rutas */
  slug: string;

  /** Descripción general */
  description: string;

  /** Tecnologías usadas (texto libre) */
  technologies: string[];

  /** URL del repositorio */
  repositoryUrl: string;

  /** URL del despliegue en producción */
  liveUrl: string;

  /** Imagen principal */
  imageUrl: string;

  /** Categorías asociadas */
  category: string[];

  /** Rol desempeñado */
  role: string;

  /** Tamaño del equipo */
  teamSize: number;

  /** Duración del proyecto */
  duration: string;

  /** Prioridad para ordenamiento */
  priority: number;

  /** Tipo de proyecto (string legacy) */
  projectType: string;
}

/**
 * Contenido localizado por idioma.
 */
interface ILocalizedContent {
  /** Título del proyecto */
  title: string;

  /** Descripción general */
  description: string;

  /** Problema que resuelve */
  problem: string;

  /** Solución implementada */
  solution: string;
}

/**
 * Información técnica y aprendizaje localizado.
 */
interface ILocalizedInsights {
  /** Retos técnicos enfrentados */
  technicalChallenges: string[];

  /** Impacto generado */
  impact: {
    /** Métrica relacionada a usuarios */
    users: string;
  };

  /** Aprendizajes clave */
  learnings: string[];
}

/**
 * 🚀 Modelo de dominio de proyecto (Versión 2).
 *
 * Diseño orientado a:
 * - Internacionalización
 * - Separación por contextos
 * - Relaciones normalizadas
 * - Tipado fuerte mediante enums
 */
export interface IProjectV2 {
  /** Identificador único (ObjectId en backend, string en API) */
  _id: Types.ObjectId | string;

  /** Slug único para rutas públicas */
  slug: string;

  /**
   * Contenido localizado del proyecto.
   * Permite expansión futura a más idiomas.
   */
  content: {
    es: ILocalizedContent;
    en: ILocalizedContent;
  };

  /**
   * Información del equipo y contexto organizacional.
   */
  teamInfo: {
    /** Rol desempeñado */
    role: Role;

    /** Número de integrantes */
    teamSize: number;

    /** Duración del proyecto */
    duration: string;

    /** Tipo de proyecto */
    projectType: ProjectType;

    /** Empresa o cliente */
    company: string;
  };

  /**
   * Arquitectura técnica del proyecto.
   */
  architecture: {
    /** Tipo de arquitectura (monolith, microservices, etc.) */
    type: ArchitectureType;

    /** Estilo arquitectónico */
    style: ArchitectureStyle;

    /** Comunicación interna y externa */
    communication: {
      internal: ArchitectureCommunication[];
      external: ArchitectureCommunication[];
    };

    /** Modelo de base de datos */
    databaseModel: DatabaseModel;
  };

  /**
   * Capacidades actuales y planificadas.
   */
  capabilities: {
    metrics: {
      /** Funcionalidades actuales */
      current: string[];

      /** Funcionalidades futuras */
      planned: string[];
    };
  };

  /** Plataforma principal del proyecto */
  platform: Platform;

  /**
   * Relaciones normalizadas con otras entidades.
   */
  relations: {
    technologyIds: EntityId[];
    featureIds: EntityId[];
    categoryIds: EntityId[];
  };

  /**
   * Información técnica y de impacto por idioma.
   */
  insights: {
    es: ILocalizedInsights;
    en: ILocalizedInsights;
  };

  /**
   * Resultado y estado del proyecto.
   */
  outcome: {
    /** Estado del resultado */
    status: Status;

    /** Casos de éxito asociados */
    successCaseId: EntityId[] | null;
  };

  /**
   * URLs relevantes del proyecto.
   */
  urls: {
    /** Repositorio principal */
    repository: string;

    /** URL en producción */
    live: string | null;

    /** Documentación técnica */
    documentation: string | null;
  };

  /**
   * Recursos visuales del proyecto.
   */
  cover: {
    /** Imagen principal */
    main: string;

    /** Imagen optimizada tipo blur */
    blur: string;
  };

  /** Puntuación interna para ordenamiento o relevancia */
  importanceScore: number;

  /** Estado operativo del proyecto */
  status: Status;

  /** Nivel de visibilidad pública */
  visibility: Visibility;

  /**
   * Línea temporal del proyecto.
   */
  timeline: {
    /** Fecha de lanzamiento inicial (ISO string) */
    initialRelease: string;

    /** Indica si tendrá expansión futura */
    futureExpansion: boolean;
  };
}
