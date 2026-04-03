import { UpdateUserDTO } from "@/infrastructure/user/user.update.dto";
import { User } from "@/models/user/user.model";

/**
 * =========================================================
 * User Repository
 * ---------------------------------------------------------
 * Capa responsable de interactuar directamente con el
 * modelo de base de datos (Mongoose).
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - ejecutar consultas a MongoDB
 * - aplicar paginación
 * - persistir documentos
 *
 * Esta capa no contiene lógica de negocio.
 * =========================================================
 */


/**
 * =========================================================
 * findUsers
 * ---------------------------------------------------------
 * Obtiene una lista paginada de usuarios según filtros.
 *
 * @param filter Filtros de búsqueda
 * @param page Número de página (>=1)
 * @param limit Cantidad de registros por página
 *
 * @returns Lista de usuarios
 * =========================================================
 */
export async function findUsers(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return User
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}


/**
 * =========================================================
 * countUsers
 * ---------------------------------------------------------
 * Cuenta la cantidad total de usuarios que cumplen
 * con un filtro determinado.
 *
 * @param filter Filtros opcionales
 *
 * @returns Total de usuarios encontrados
 * =========================================================
 */
export async function countUsers(
  filter: Record<string, unknown> = {}
) {
  return User.countDocuments(filter);
}

export async function findUserById(id: string) {
  return User.findById(id)
}

/**
 * =========================================================
 * findUserByUsername
 * ---------------------------------------------------------
 * Busca un usuario por su nombre de usuario.
 *
 * Este método se usa principalmente en procesos
 * de autenticación.
 *
 * @param username Nombre de usuario
 *
 * @returns Usuario encontrado o null
 * =========================================================
 */
export async function findUserByEmailRepo(email: string) {
  return User.findOne({ email });
}

/**
 * =========================================================
 * createUserRepo
 * ---------------------------------------------------------
 * Crea un nuevo usuario en la base de datos.
 *
 * @param data Datos del usuario a persistir
 *
 * @returns Documento creado
 * =========================================================
 */
export async function createUserRepo(data: {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
}) {
  return User.create(data);
}

export async function updateUserRepo(id: string, data: UpdateUserDTO) {
  return User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

export async function deleteUserRepo(id: string) {
  return User.findByIdAndDelete(id);
}