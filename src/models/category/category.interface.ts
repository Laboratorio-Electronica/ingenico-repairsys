import { Types } from "mongoose";

/**
 * Representa la estructura base de una categoría.
 * Se utiliza como contrato interno y para el tipado del schema de Mongoose.
 */
export interface ICategory {
  /**
   * Identificador único del documento en MongoDB.
   * Generalmente corresponde a un ObjectId serializado.
   */
  _id: Types.ObjectId | string;

  /**
   * Slug único de la categoría.
   * Se usa para URLs legibles y búsquedas.
   */
  slug: string;

  /**
   * Contenido localizado por idioma.
   */
  content: {
    /**
     * Contenido en español.
     */
    es: {
      /** Título de la categoría */
      title: string;

      /** Descripción de la categoría */
      description: string;
    };

    /**
     * Contenido en inglés.
     */
    en: {
      /** Título de la categoría */
      title: string;

      /** Descripción de la categoría */
      description: string;
    };
  };
  createdAt?: Date;
  updatedAt?: Date;
}
