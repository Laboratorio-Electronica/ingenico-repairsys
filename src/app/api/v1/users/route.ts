import { NextRequest, NextResponse } from "next/server";
import { querySchema } from "@/shared/interfaces/query.schema";
import { sanitizeRegex } from "@/lib/db/sanitize-regex";
import { createUser, getTotalUsers, getUsers } from "@/services/users/users.service";
import { toUserEntityDTO } from "@/infrastructure/user/user.mapper";
import { handleApiError } from "@/lib/http/handle-api-error";
import { createUserSchema } from "@/infrastructure/user/user.create.dto";
import { withAuthorization } from "@/lib/auth";
import { PERMISSIONS } from "@/shared/auth/permissions";

/**
 * Construye el filtro de búsqueda para usuarios.
 *
 * Si existe el parámetro `search`, se genera una expresión
 * regular segura que permite buscar por:
 *
 * - username
 * - email
 *
 * Se usa `sanitizeRegex` para evitar inyección de expresiones
 * regulares y limitar el tamaño de la búsqueda.
 *
 * @param search Texto de búsqueda opcional
 * @returns Filtro compatible con MongoDB
 */
function buildUserFilter(search?: string) {
  const filter: Record<string, unknown> = {};

  if (search) {
    const safeSearch = sanitizeRegex(search.slice(0, 100));

    filter.$or = [
      { "content.username": { $regex: safeSearch, $options: "i" } },
      { "content.email": { $regex: safeSearch, $options: "i" } },
    ];
  }

  return filter;
}

/**
 * =========================================================
 * GET /api/v2/users
 * ---------------------------------------------------------
 * Endpoint para obtener usuarios paginados.
 *
 * Funcionalidades:
 *
 * - Soporta paginación (page, limit)
 * - Permite búsqueda por username o email
 * - Devuelve metadata de paginación
 *
 * Seguridad:
 * - Requiere permiso READ mediante `withAuthorization`
 *
 * Respuesta:
 * {
 *   data: UserEntityDTO[],
 *   pagination: {
 *     total: number,
 *     limit: number,
 *     currentPage: number,
 *     totalPages: number
 *   }
 * }
 * =========================================================
 */
export const GET = withAuthorization(
  PERMISSIONS.READ,
  async (req: NextRequest) => {
    try {

      /**
       * Obtiene los query params de la URL.
       */
      const query = Object.fromEntries(req.nextUrl.searchParams.entries());

      /**
       * Valida y normaliza los parámetros de consulta
       * utilizando el schema de Zod.
       */
      const { limit = 10, page = 1, search } = querySchema.parse(query);

      /**
       * Protecciones de seguridad:
       *
       * - limit máximo de 100
       * - page entre 1 y 1000
       */
      const safeLimit = Math.min(limit, 100);
      const safePage = Math.min(Math.max(page, 1), 1000);

      /**
       * Construye filtro de búsqueda dinámico.
       */
      const filter = buildUserFilter(search);

      /**
       * Obtiene usuarios y total de registros en paralelo.
       */
      const [users, total] = await Promise.all([
        getUsers(filter, safePage, safeLimit),
        getTotalUsers(filter),
      ]);

      /**
       * Calcula el total de páginas.
       */
      const totalPages = safeLimit > 0 ? Math.ceil(total / safeLimit) : 0;

      /**
       * Devuelve la respuesta con datos y metadata.
       */
      return NextResponse.json(
        {
          data: users.map(toUserEntityDTO),
          pagination: {
            total,
            limit: safeLimit,
            currentPage: safePage,
            totalPages,
          },
        },
        { status: 200 }
      );
    } catch (error) {

      /**
       * Manejo centralizado de errores.
       */
      return handleApiError(error);
    }
  }
);

/**
 * =========================================================
 * POST /api/v2/users
 * ---------------------------------------------------------
 * Endpoint para crear un nuevo usuario.
 *
 * Flujo:
 *
 * 1. Se valida el body con Zod (`createUserSchema`)
 * 2. Se crea el usuario mediante el servicio
 * 3. Se devuelve el ID del documento creado
 *
 * Seguridad:
 * - Requiere permiso CREATE
 *
 * Respuesta:
 * {
 *   id: string
 * }
 * =========================================================
 */
export const POST = withAuthorization(
  PERMISSIONS.CREATE,
  async (req: NextRequest) => {
    try {

      /**
       * Obtiene el body de la petición.
       */
      const body = await req.json();

      /**
       * Valida el body utilizando Zod.
       */
      const data = createUserSchema.parse(body);

      /**
       * Crea el usuario en la base de datos.
       */
      const created = await createUser(data);

      /**
       * Devuelve el ID del nuevo usuario.
       */
      return NextResponse.json(
        { id: created._id },
        { status: 201 }
      );
    } catch (error) {

      /**
       * Manejo centralizado de errores.
       */
      return handleApiError(error);
    }
  }
);