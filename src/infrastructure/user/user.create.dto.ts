import { Role } from "@/shared/auth/role.enum";
import z from "zod";

/**
 * =========================================================
 * createUserSchema
 * ---------------------------------------------------------
 * Schema de validación para la creación de usuarios.
 *
 * Utiliza Zod para garantizar que los datos recibidos
 * en el endpoint de creación cumplan con la estructura
 * esperada antes de ser procesados por la aplicación.
 *
 * Validaciones aplicadas:
 * - username → obligatorio
 * - email → obligatorio
 * - password → entre 8 y 24 caracteres
 * - role → debe ser uno de los valores definidos en Role
 * =========================================================
 */
export const createUserSchema = z.object({

  /** Nombre de usuario único */
  username: z.string().min(1),

  /** Correo electrónico del usuario */
  email: z.string().min(1),

  /**
   * Contraseña en texto plano recibida desde el cliente.
   * Posteriormente será convertida a hash antes de
   * almacenarse en la base de datos.
   */
  password: z.string().min(8).max(24),

  /** Rol asignado al usuario dentro del sistema */
  role: z.enum(Role)
})

/**
 * =========================================================
 * CreateUserDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado en la capa de aplicación
 * para representar los datos necesarios para crear
 * un nuevo usuario.
 *
 * Este DTO coincide con la estructura validada por
 * `createUserSchema`.
 * =========================================================
 */
export type CreateUserDTO = {

  /** Nombre de usuario */
  username: string;

  /** Email del usuario */
  email: string;

  /** Contraseña en texto plano (se convertirá a hash) */
  password: string;

  /** Rol del usuario */
  role: Role;
}