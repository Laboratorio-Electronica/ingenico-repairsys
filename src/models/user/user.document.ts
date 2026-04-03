import { Types, Document } from "mongoose";
import { IUser } from "./user.interface";

/**
 * Representa el documento completo de usuario
 * tal como lo devuelve Mongoose.
 */
export interface UserDocument extends IUser, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}