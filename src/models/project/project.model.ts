import mongoose from "mongoose";
import { projectV1Schema, ProjectV2Schema } from "./project.schema";
import { IProjectV1, IProjectV2 } from "./project.interface";

/* ============================================================
   ======================= PROJECT V1 =========================
   ============================================================ */

/**
 * 📦 Modelo Mongoose para Project V1 (estructura legacy).
 *
 * - Reutiliza el modelo si ya existe (evita OverwriteModelError en dev).
 * - Mantiene compatibilidad con la colección original.
 */
export const ProjectV1 =
(mongoose.models.Project as mongoose.Model<IProjectV1>) ||
mongoose.model<IProjectV1>("Project", projectV1Schema);

/* ============================================================
   ======================= PROJECT V2 =========================
   ============================================================ */

/**
 * 🚀 Modelo Mongoose para Project V2.
 *
 * - Usa colección explícita: "projectsV2".
 * - Separado del modelo legacy.
 * - Estructura orientada a dominio.
 */
export const ProjectV2 =
mongoose.models.ProjectV2 ||
mongoose.model("ProjectV2", ProjectV2Schema, "projectsV2");
