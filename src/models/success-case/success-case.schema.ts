import { Schema } from "mongoose";
import { Status, Visibility } from "@/shared/enums";
import { slugify } from "@/lib/utils/slugify";
import { ISuccessCase } from "./success-case.interface";

/* ======================================================
   Sub-schemas reutilizables
====================================================== */

/**
 * Contenido localizado principal.
 */
const LocalizedContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    solution: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * Impacto localizado del caso de éxito.
 */
const LocalizedImpactSchema = new Schema(
  {
    operational: [
      {
        type: String,
        required: true,
      },
    ],
    business: [
      {
        type: String,
        required: true,
      },
    ],
    users: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * Métrica cuantitativa medible.
 */
const ValueMetricSchema = new Schema(
  {
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

/**
 * Media asociada (imagen principal o galería).
 */
const MediaSchema = new Schema(
  {
    src: {
      type: String,
      required: true,
    },
    blurDataURL: {
      type: String,
    },
  },
  { _id: false }
);

/* ======================================================
   Schema principal
====================================================== */

/**
 * Schema de SuccessCase.
 *
 * Modela:
 * - Contenido multilenguaje
 * - Impacto
 * - Métricas
 * - Media
 * - Relación con proyectos
 * - Estado, visibilidad y comentarios
 * - Línea de tiempo
 */
export const SuccessCaseSchema = new Schema<ISuccessCase>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    content: {
      es: LocalizedContentSchema,
      en: LocalizedContentSchema,
    },

    impact: {
      es: LocalizedImpactSchema,
      en: LocalizedImpactSchema,
    },

    metrics: {
      quantitative: {
        uptime: ValueMetricSchema,
        manualRecordsReduction: ValueMetricSchema,
      },
      qualitative: {
        es: [{ type: String }],
        en: [{ type: String }],
      },
    },

    media: {
      cover: MediaSchema,
      gallery: [MediaSchema],
    },

    projectIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "ProjectV2",
        required: true,
      },
    ],

    role: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(Status),
      required: true,
    },

    scalability: {
      es: {
        type: String,
        required: true,
      },
      en: {
        type: String,
        required: true,
      },
    },

    visibility: {
      type: String,
      enum: Object.values(Visibility),
      required: true,
    },

    commentsEnabled: {
      type: Boolean,
      required: true,
    },

    commentsCount: {
      type: Number,
      required: true,
    },

    timeline: {
      start: { type: Date },
      end: { type: Date },
    },
  },
  { timestamps: true }
);

/* ======================================================
   Hooks
====================================================== */

/**
 * Pre-validate
 *
 * Genera automáticamente el slug si no fue definido.
 * Se basa en el título en inglés.
 */
SuccessCaseSchema.pre("validate", function (next) {
  if (!this.slug) {
    const source = this.content?.en?.title;

    if (source) {
      this.slug = slugify(source);
    }
  }
  next();
});

/**
 * Pre-findOneAndUpdate
 *
 * Regenera el slug si cambia el título en inglés.
 * Compatible con updates directos o con `$set`.
 */
SuccessCaseSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const newTitle =
    update?.content?.en?.title ||
    update?.$set?.content?.en?.title;

  if (newTitle) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(newTitle),
    };
  }

  next();
});
