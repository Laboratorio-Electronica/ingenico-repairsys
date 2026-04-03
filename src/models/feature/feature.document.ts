import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { Document, Types } from "mongoose";

/**
 * Información localizada de una feature en un idioma específico
 */
interface LocalizedFeatureInfo {
  /** Título de la feature */
  title: string;
  /** Descripción de la feature */
  description: string;
}

/**
 * Documento de Mongoose que representa una feature en la base de datos
 */
export interface FeatureDocument extends Document {
  /** ID único del documento */
  _id: Types.ObjectId;

  /** Contenido multilenguaje de la feature */
  content: {
    /** Contenido en español */
    es: LocalizedFeatureInfo;
    /** Contenido en inglés */
    en: LocalizedFeatureInfo;
  };

  /** Dominio o categoría de la feature (técnico, funcional, UI, etc.) */
  domain: FeatureDomain;

  /** Fecha de creación del documento */
  createdAt: Date;

  /** Fecha de última actualización del documento */
  updatedAt: Date;
}
