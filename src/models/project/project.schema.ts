import { Schema } from "mongoose";
import { IProjectV1, IProjectV2 } from "@/models/project/project.interface";
import { slugify } from "@/lib/utils/slugify";
import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  Platform,
  ProjectType,
  Role,
  Status,
  Visibility,
} from "@/shared/enums";

/**
 * Validador básico de URL.
 * Acepta URLs con o sin protocolo.
 */
const isValidUrl = (url: string) =>
  /^(https?:\/\/)?([\w.-]+)+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
    url
  );

/**
 * Helper para campos string simples.
 */
const stringField = (required = true) => ({ type: String, required });

/**
 * Helper para arrays de string.
 */
const stringArrayField = (required = true) => ({
  type: [String],
  required,
});

/**
 * Helper para campos URL con validación.
 */
const urlField = (required = true) => ({
  type: String,
  required,
  validate: { validator: isValidUrl, message: "La URL no es válida." },
});

/**
 * Helper para campos numéricos con restricciones opcionales.
 */
const numberField = (
  options: Partial<{ required: boolean; min: number; max: number }> = {}
) => ({
  type: Number,
  ...options,
});

/* ============================================================
   ======================= PROJECT V1 =========================
   ============================================================ */

/**
 * 📦 Esquema legado (estructura plana).
 * Utilizado antes de la migración a un modelo
 * más modular y orientado a dominio.
 */
export const projectV1Schema = new Schema<IProjectV1>(
  {
    title: { ...stringField(), unique: true },
    slug: stringField(),
    description: stringField(),
    technologies: stringArrayField(),
    repositoryUrl: urlField(),
    liveUrl: urlField(),
    imageUrl: stringField(),
    category: stringArrayField(),
    role: { type: String },
    teamSize: numberField(),
    duration: stringField(false),
    priority: numberField({ required: true, min: 1, max: 10 }),
    projectType: stringField(),
  },
  { timestamps: true }
);

/* ============================================================
   ======================= SUBSCHEMAS =========================
   ============================================================ */

/**
 * Subdocumento de contenido localizado.
 */
const ContentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
  },
  { _id: false }
);

/**
 * Subdocumento de insights técnicos y métricas.
 */
const InsightSchema = new Schema(
  {
    technicalChallenges: [{ type: String }],
    impact: {
      users: { type: String },
    },
    learnings: [{ type: String }],
  },
  { _id: false }
);

/* ============================================================
   ======================= PROJECT V2 =========================
   ============================================================ */

/**
 * 🚀 Esquema principal del Proyecto V2.
 *
 * Diseño orientado a:
 * - Internacionalización
 * - Separación por contextos
 * - Relaciones normalizadas
 * - Validación fuerte con enums
 */
export const ProjectV2Schema = new Schema<IProjectV2>(
  {
    /**
     * Slug único autogenerado.
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    /**
     * Contenido localizado (ES / EN).
     */
    content: {
      es: ContentSchema,
      en: ContentSchema,
    },

    /**
     * Información del equipo y contexto organizacional.
     */
    teamInfo: {
      role: {
        type: String,
        enum: Object.values(Role),
        required: true,
      },
      teamSize: { type: Number },
      duration: { type: String },
      projectType: {
        type: String,
        enum: Object.values(ProjectType),
        required: true,
      },
      company: { type: String },
    },

    /**
     * Plataforma principal.
     */
    platform: {
      type: String,
      enum: Object.values(Platform),
      required: true,
    },

    /**
     * Definición arquitectónica del sistema.
     */
    architecture: {
      type: {
        type: String,
        enum: Object.values(ArchitectureType),
        required: true,
      },
      style: {
        type: String,
        enum: Object.values(ArchitectureStyle),
        required: true,
      },
      communication: {
        internal: [
          {
            type: String,
            enum: Object.values(ArchitectureCommunication),
          },
        ],
        external: [
          {
            type: String,
            enum: Object.values(ArchitectureCommunication),
          },
        ],
      },
      databaseModel: {
        type: String,
        enum: Object.values(DatabaseModel),
      },
    },

    /**
     * Capacidades actuales y futuras.
     */
    capabilities: {
      metrics: {
        current: [{ type: String }],
        planned: [{ type: String }],
      },
    },

    /**
     * Relaciones normalizadas con otras entidades.
     */
    relations: {
      technologyIds: [
        { type: Schema.Types.ObjectId, ref: "Technology", required: true },
      ],
      featureIds: [
        { type: Schema.Types.ObjectId, ref: "Feature", required: true },
      ],
      categoryIds: [
        { type: Schema.Types.ObjectId, ref: "Category", required: true },
      ],
    },

    /**
     * Insights por idioma.
     */
    insights: {
      es: InsightSchema,
      en: InsightSchema,
    },

    /**
     * Relación con caso de éxito.
     */
    outcome: { type: Schema.Types.ObjectId, ref: "SuccessCase" },

    /**
     * URLs relevantes del proyecto.
     */
    urls: {
      repository: { type: String, required: true },
      live: { type: String },
      documentation: { type: String },
    },

    /**
     * Recursos visuales.
     */
    cover: {
      main: { type: String, required: true },
      blur: { type: String, required: true },
    },

    /**
     * Score interno de relevancia.
     */
    importanceScore: { type: Number, required: true },

    /**
     * Estado operativo del proyecto.
     */
    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
    },

    /**
     * Nivel de visibilidad.
     */
    visibility: {
      type: String,
      enum: Object.values(Visibility),
      required: true,
    },

    /**
     * Línea temporal.
     */
    timeline: {
      initialRelease: { type: Date },
      futureExpansion: { type: Boolean },
    },
  },
  { timestamps: true }
);

/* ============================================================
   ======================= MIDDLEWARES ========================
   ============================================================ */

/**
 * Genera automáticamente el slug antes de validar,
 * usando el título en inglés o español.
 */
ProjectV2Schema.pre("validate", function (next) {
  if (!this.slug) {
    const source = this.content.en?.title || this.content.es?.title;
    if (source) this.slug = slugify(source);
  }
  next();
});

/**
 * Recalcula el slug si el título cambia
 * en operaciones findOneAndUpdate.
 */
ProjectV2Schema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.$set?.content?.en?.title ||
    update?.$set?.content?.es?.title ||
    update?.content?.en?.title ||
    update?.content?.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});
