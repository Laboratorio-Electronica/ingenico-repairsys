import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { authorize } from "@/lib/auth/authorize";
import { Permission } from "@/shared/auth/permissions";

/**
 * Contexto del handler de la API.
 *
 * Permite tipar los parámetros dinámicos de rutas
 * en endpoints de Next.js.
 *
 * Ejemplo:
 * /api/projects/[id]
 */
type HandlerContext<P = unknown> = {
  params?: P;
};

/**
 * Tipo base para handlers de API protegidos.
 *
 * Representa una función que:
 * - recibe la request
 * - recibe el contexto con parámetros
 * - devuelve una respuesta NextResponse
 */
type Handler<P = unknown> = (
  req: NextRequest,
  context: HandlerContext<P>
) => Promise<NextResponse>;

/**
 * =========================================================
 * withAuthorization
 * ---------------------------------------------------------
 * Higher Order Function (HOF) que protege endpoints de API
 * mediante control de permisos basado en roles.
 *
 * Funcionalidad:
 * 1️⃣ Obtiene la sesión del usuario
 * 2️⃣ Verifica que exista un rol válido
 * 3️⃣ Evalúa si el rol tiene el permiso requerido
 * 4️⃣ Si pasa la validación ejecuta el handler original
 *
 * En caso contrario:
 * - Devuelve 401 → usuario no autenticado
 * - Devuelve 403 → usuario autenticado sin permisos
 *
 * Esto permite centralizar la lógica de autorización
 * y mantener los handlers de API más limpios.
 *
 * @param permission Permiso requerido para ejecutar el endpoint
 * @param handler Handler original de la ruta
 * @returns Handler protegido con control de acceso
 * =========================================================
 */
export function withAuthorization<P>(
  permission: Permission,
  handler: Handler<P>
): Handler<P> {
  return async (req, context) => {
    try {
      /**
       * Obtiene la sesión del usuario a partir de la request.
       */
      const session = await getSession(req);

      /**
       * Verifica que exista sesión y rol asociado.
       */
      if (!session?.role) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }

      /**
       * Verifica si el rol del usuario tiene el permiso requerido.
       */
      if (!authorize(session.role, permission)) {
        return NextResponse.json(
          { error: "Forbidden" },
          { status: 403 }
        );
      }

      /**
       * Si pasa todas las validaciones,
       * ejecuta el handler original.
       */
      return handler(req, context);

    } catch {
      /**
       * Manejo de errores inesperados relacionados
       * con autenticación o sesión.
       */
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
  };
}