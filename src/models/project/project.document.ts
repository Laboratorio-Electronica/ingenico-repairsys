/**
 * =========================================================
 * ProjectDocument Interface
 * ---------------------------------------------------------
 * Define la estructura del documento Project tal como
 * se almacena y se recupera desde MongoDB mediante Mongoose.
 *
 * Este tipo representa el modelo completo de persistencia
 * incluyendo:
 * - contenido internacionalizado
 * - información del equipo
 * - arquitectura del sistema
 * - relaciones con tecnologías y features
 * - insights del proyecto
 * - outcome o caso de éxito relacionado
 * - recursos visuales y URLs
 * - estado, visibilidad y timeline
 *
 * Arquitectura:
 * - interfaz usada por el modelo de Mongoose
 * - representa la capa de persistencia
 * - utilizada por mappers que transforman a DTOs
 *
 * Responsabilidades:
 * - tipar documentos provenientes de MongoDB
 * - definir relaciones populadas
 * - servir como base para transformación a DTOs
 *
 * Utilizado en:
 * - modelos de Mongoose
 * - mappers de infraestructura
 * - servicios de aplicación
 * =========================================================
 */

import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  ProjectType
} from "@/shared/enums";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { Document } from "mongoose";

/**
 * =========================================================
 * LocalizedContent
 * ---------------------------------------------------------
 * Contenido localizado principal del proyecto.
 * Incluye título, descripción, problema y solución.
 * =========================================================
 */
interface LocalizedContent {
  title: string;
  description: string;
  problem: string;
  solution: string;
}

/**
 * =========================================================
 * LocalizedInsight
 * ---------------------------------------------------------
 * Insights técnicos y estratégicos obtenidos durante
 * el desarrollo del proyecto.
 * =========================================================
 */
interface LocalizedInsight {

  /**
   * Desafíos técnicos encontrados durante el proyecto.
   */
  technicalChallenges: string[];

  /**
   * Impacto generado por el proyecto.
   */
  impact: {
    users: string;
  };

  /**
   * Aprendizajes obtenidos durante el desarrollo.
   */
  learnings: string[];
}

/**
 * =========================================================
 * ProjectDocument
 * ---------------------------------------------------------
 * Representa el documento completo de un proyecto en MongoDB.
 *
 * Extiende `Document` de Mongoose para incluir
 * propiedades propias del modelo.
 * =========================================================
 */
export interface ProjectDocument extends Document {

  /**
   * Slug único utilizado para rutas públicas.
   */
  slug: string;

  /**
   * Contenido internacionalizado del proyecto.
   */
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };

  /**
   * Información sobre el equipo y contexto del proyecto.
   */
  teamInfo: {
    role: string;
    teamSize: number;
    duration: string;
    projectType: ProjectType;
    company: string | null;
  };

  /**
   * Configuración arquitectónica del sistema.
   */
  architecture: {
    type: ArchitectureType;
    style: ArchitectureStyle;
    communication: {

      /**
       * Comunicación interna entre servicios o módulos.
       */
      internal: ArchitectureCommunication[];

      /**
       * Comunicación externa con sistemas o servicios.
       */
      external: ArchitectureCommunication[];
    };

    /**
     * Modelo de base de datos utilizado.
     */
    databaseModel: DatabaseModel;
  };

  /**
   * Plataforma principal del proyecto.
   */
  platform: string;

  /**
   * Capacidades del sistema.
   */
  capabilities: {
    metrics: {

      /**
       * Métricas actuales del sistema.
       */
      current: string[];

      /**
       * Métricas planificadas o futuras.
       */
      planned: string[];
    }
  }

  /**
   * Relaciones con otras entidades del dominio.
   */
  relations: {

    /**
     * Tecnologías utilizadas en el proyecto.
     */
    technologyIds: {
      name: string;

      /**
       * Categoría de la tecnología (populada).
       */
      categoryId: {
        content: {
          es: { title: string },
          en: { title: string }
        }
      };

      /**
       * URL del ícono de la tecnología.
       */
      iconUrl: string;

      /**
       * Nivel de experiencia con la tecnología.
       */
      experienceLevel: string;
    }[];

    /**
     * Features o funcionalidades implementadas.
     */
    featureIds: {
      id: string;
      slug: string;

      /**
       * Contenido localizado de la feature.
       */
      content: {
        es: {
          title: string
          description: string;
        },
        en: {
          title: string
          description: string;
        }
      };

      /**
       * Dominio funcional de la feature.
       */
      domain: FeatureDomain;
    }[];
  }

  /**
   * Insights del proyecto (multi-idioma).
   */
  insights: {
    es: LocalizedInsight
    en: LocalizedInsight
  }

  /**
   * Caso de éxito asociado al proyecto.
   */
  outcome: {
    slug: string;

    content: {
      es: {
        title: string;
        solution: string;
      },
      en: {
        title: string;
        solution: string;
      },
    },

    /**
     * Recursos multimedia asociados al outcome.
     */
    media: {
      cover: {
        src: string;
        blurDataUrl: string;
      };
    };
  } | null

  /**
   * URLs relacionadas con el proyecto.
   */
  urls: {

    /**
     * Repositorio de código fuente.
     */
    repository: string;

    /**
     * URL pública del proyecto en producción.
     */
    live: string | null;

    /**
     * Documentación técnica del proyecto.
     */
    documentation: string | null;
  };

  /**
   * Recursos visuales principales del proyecto.
   */
  cover: {

    /**
     * Imagen principal.
     */
    main: string;

    /**
     * Placeholder blur para carga progresiva.
     */
    blur: string;
  };

  /**
   * Nivel de importancia del proyecto.
   */
  importanceScore: number;

  /**
   * Estado actual del proyecto.
   */
  status: string;

  /**
   * Nivel de visibilidad pública.
   */
  visibility: string;

  /**
   * Información temporal del proyecto.
   */
  timeline: {

    /**
     * Fecha de lanzamiento inicial.
     */
    initialRelease: Date;

    /**
     * Indica si el proyecto tiene expansión futura.
     */
    futureExpansion: boolean;
  }

  /**
   * Fecha de creación del documento.
   */
  createdAt: Date;

  /**
   * Fecha de última actualización.
   */
  updatedAt: Date;
}