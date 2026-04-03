import connectDB from "@/lib/db/connectDB";
import * as repo from "./users.repository";
import { CreateUserDTO } from "@/infrastructure/user/user.create.dto";
import bcrypt from "bcryptjs";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { UpdateUserDTO } from "@/infrastructure/user/user.update.dto";

/**
 * =========================================================
 * User Service
 * ---------------------------------------------------------
 * Capa de servicio responsable de coordinar la lógica de
 * aplicación relacionada con usuarios.
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - establecer conexión con la base de datos
 * - aplicar lógica de negocio (ej. hashing de contraseña)
 * - delegar operaciones al repositorio
 *
 * =========================================================
 */


/**
 * =========================================================
 * getUsers
 * ---------------------------------------------------------
 * Obtiene una lista paginada de usuarios aplicando
 * filtros dinámicos.
 *
 * @param filter Filtros de búsqueda
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad de registros por página
 *
 * @returns Lista de usuarios
 * =========================================================
 */
export async function getUsers(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findUsers(filter, safePage, safeLimit);
}


/**
 * =========================================================
 * getTotalUsers
 * ---------------------------------------------------------
 * Devuelve el número total de usuarios que cumplen
 * con los filtros especificados.
 *
 * Este valor se utiliza para metadata de paginación.
 *
 * @param filter Filtros opcionales
 * @returns Total de usuarios encontrados
 * =========================================================
 */
export async function getTotalUsers(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countUsers(filter);
}

export async function getUserById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findUserById(id);
}

/**
 * =========================================================
 * getUserByUsername
 * ---------------------------------------------------------
 * Obtiene un usuario mediante su nombre de usuario.
 *
 * Este método se utiliza principalmente durante
 * procesos de autenticación.
 *
 * @param username Nombre de usuario
 *
 * @returns Usuario encontrado o null
 * =========================================================
 */
export async function getUserByEmail(email: string) {
  await connectDB();
  return repo.findUserByEmailRepo(email);
}

/**
 * =========================================================
 * createUser
 * ---------------------------------------------------------
 * Crea un nuevo usuario en el sistema.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Generar hash seguro de la contraseña
 * 3. Persistir el usuario en la base de datos
 *
 * Se utiliza bcrypt para almacenar contraseñas
 * de forma segura.
 *
 * @param data Datos validados del usuario
 *
 * @returns Usuario creado
 * =========================================================
 */
export async function createUser(data: CreateUserDTO) {
  await connectDB();

  const hash = await bcrypt.hash(data.password, 10);

  return repo.createUserRepo({
    username: data.username,
    email: data.email,
    passwordHash: hash,
    role: data.role
  });
}

export async function updateUser(
  id: string,
  data: UpdateUserDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateUserRepo(id, data);
  } catch (error: any) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteUserRepo(id);
}