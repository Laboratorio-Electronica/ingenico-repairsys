import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema, loginUser } from '@/lib/helpers/auth';
import { deleteAuthToken, setAuthToken } from '@/lib/auth/cookies';
import { getSession } from '@/lib/auth/session';
import { handleApiError } from '@/lib/http/handle-api-error';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store',
};

// ✅ FIX: NO borrar cookie en GET
export async function GET(req: NextRequest) {
  const session = await getSession(req);

  if (!session) {
    return NextResponse.json(
      { isAuth: false },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json(
    {
      isAuth: true,
      userId: session.userId,
      username: session.username,
      role: session.role,
    },
    { headers: NO_STORE_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const credentials = LoginSchema.parse(await req.json());

    const token = await loginUser(
      credentials.email,
      credentials.password
    );

    if (!token) {
      // ✅ FIX: limpiar posible sesión previa
      await deleteAuthToken();

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401, headers: NO_STORE_HEADERS }
      );
    }

    await setAuthToken(token);

    return NextResponse.json(
      { message: 'Login successful' },
      { status: 200, headers: NO_STORE_HEADERS }
    );
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE() {
  await deleteAuthToken();

  return NextResponse.json(
    { message: 'Logout successful' },
    { status: 200, headers: NO_STORE_HEADERS }
  );
}

// import { NextRequest, NextResponse } from 'next/server';
// import { LoginSchema, loginUser } from '@/lib/helpers/auth';
// import { deleteAuthToken, setAuthToken } from '@/lib/auth/cookies';
// import { getSession } from '@/lib/auth/session';
// import { handleApiError } from '@/lib/http/handle-api-error';

// const NO_STORE_HEADERS = {
//   'Cache-Control': 'no-store',
// };

// // ✅ FIX: NO borrar cookie en GET
// export async function GET(req: NextRequest) {
//   const session = await getSession(req);

//   if (!session) {
//     return NextResponse.json(
//       { isAuth: false },
//       { status: 401, headers: NO_STORE_HEADERS }
//     );
//   }

//   return NextResponse.json(
//     {
//       isAuth: true,
//       username: session.username,
//       role: session.role,
//     },
//     { headers: NO_STORE_HEADERS }
//   );
// }

// export async function POST(req: NextRequest) {
//   try {
//     const credentials = LoginSchema.parse(await req.json());

//     const token = await loginUser(
//       credentials.email,
//       credentials.password
//     );

//     if (!token) {
//       // ✅ FIX: limpiar posible sesión previa
//       await deleteAuthToken();

//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401, headers: NO_STORE_HEADERS }
//       );
//     }

//     await setAuthToken(token);

//     return NextResponse.json(
//       { message: 'Login successful' },
//       { status: 200, headers: NO_STORE_HEADERS }
//     );
//   } catch (error) {
//     return handleApiError(error);
//   }
// }

// export async function DELETE() {
//   await deleteAuthToken();

//   return NextResponse.json(
//     { message: 'Logout successful' },
//     { status: 200, headers: NO_STORE_HEADERS }
//   );
// }

// // import { NextRequest, NextResponse } from 'next/server';
// // import { LoginSchema, loginUser } from '@/lib/helpers/auth';
// // import { deleteAuthToken, setAuthToken } from '@/lib/auth/cookies';
// // import { getSession } from '@/lib/auth/session';
// // import { handleApiError } from '@/lib/http/handle-api-error';

// // /**
// //  * Headers utilizados para evitar cache en respuestas
// //  * relacionadas con autenticación.
// //  *
// //  * Esto previene que proxies o navegadores almacenen
// //  * respuestas sensibles como estado de sesión.
// //  */
// // const NO_STORE_HEADERS = {
// //   'Cache-Control': 'no-store',
// // };

// // /**
// //  * =========================================================
// //  * GET /api/auth
// //  * ---------------------------------------------------------
// //  * Verifica si existe una sesión activa basada en el
// //  * token JWT almacenado en cookies.
// //  *
// //  * Flujo:
// //  *
// //  * 1. Obtiene la sesión mediante `getSession`
// //  * 2. Si no existe sesión:
// //  *    - Elimina la cookie de autenticación
// //  *    - Retorna estado 401
// //  *    - isAuth = false
// //  * 3. Si existe sesión:
// //  *    - Retorna información básica del usuario
// //  *
// //  * Respuesta exitosa:
// //  * {
// //  *   isAuth: true,
// //  *   username: string,
// //  *   role: Role
// //  * }
// //  * =========================================================
// //  */
// // export async function GET() {
// //   const session = await getSession();

// //   /**
// //    * Si no hay sesión válida:
// //    * - Se limpia la cookie de autenticación
// //    * - Se informa que el usuario no está autenticado
// //    */
// //   if (!session) {
// //     await deleteAuthToken();

// //     return NextResponse.json(
// //       { isAuth: false },
// //       { status: 401, headers: NO_STORE_HEADERS }
// //     );
// //   }

// //   /**
// //    * Si existe sesión activa, se devuelve
// //    * la información básica del usuario.
// //    */
// //   return NextResponse.json(
// //     {
// //       isAuth: true,
// //       username: session.username,
// //       role: session.role,
// //     },
// //     { headers: NO_STORE_HEADERS }
// //   );
// // }

// // /**
// //  * =========================================================
// //  * POST /api/auth
// //  * ---------------------------------------------------------
// //  * Autentica al usuario utilizando credenciales
// //  * y genera una sesión basada en JWT.
// //  *
// //  * Flujo:
// //  *
// //  * 1. Se valida el body con `LoginSchema`
// //  * 2. Se ejecuta `loginUser`
// //  *    - Verifica credenciales
// //  *    - Genera token JWT
// //  * 3. Si las credenciales son inválidas:
// //  *    - Retorna 401
// //  * 4. Si son válidas:
// //  *    - Se guarda el token en cookie segura
// //  *    - Se confirma el login
// //  *
// //  * Respuesta exitosa:
// //  * {
// //  *   message: "Login successful"
// //  * }
// //  * =========================================================
// //  */
// // export async function POST(req: NextRequest) {
// //   try {

// //     /**
// //      * Obtiene y valida las credenciales
// //      * enviadas en el body de la petición.
// //      */
// //     const credentials = LoginSchema.parse(await req.json());
// //     /**
// //      * Ejecuta proceso de autenticación.
// //      * Si las credenciales son válidas,
// //      * retorna un token JWT.
// //      */
// //     const token = await loginUser(
// //       credentials.email,
// //       credentials.password
// //     );

// //     /**
// //      * Si el login falla, se devuelve error 401.
// //      */
// //     if (!token) {
// //       return NextResponse.json(
// //         { error: 'Invalid credentials' },
// //         { status: 401, headers: NO_STORE_HEADERS }
// //       );
// //     }

// //     /**
// //      * Guarda el token en cookie httpOnly segura.
// //      */
// //     await setAuthToken(token);

// //     /**
// //      * Respuesta exitosa de autenticación.
// //      */
// //     return NextResponse.json(
// //       { message: 'Login successful' },
// //       { status: 200, headers: NO_STORE_HEADERS }
// //     );
// //   } catch (error) {

// //     /**
// //      * Manejo centralizado de errores
// //      * (validación, errores de aplicación, etc).
// //      */
// //     return handleApiError(error);
// //   }
// // }

// // /**
// //  * =========================================================
// //  * DELETE /api/auth
// //  * ---------------------------------------------------------
// //  * Cierra la sesión del usuario eliminando el token
// //  * almacenado en cookies.
// //  *
// //  * Flujo:
// //  *
// //  * 1. Elimina la cookie de autenticación
// //  * 2. Retorna confirmación de logout
// //  *
// //  * Respuesta:
// //  * {
// //  *   message: "Logout successful"
// //  * }
// //  *
// //  * Nota:
// //  * Si el sistema implementa revocación de tokens
// //  * (blacklist de JWT), este endpoint debería
// //  * registrar el token como revocado.
// //  * =========================================================
// //  */
// // export async function DELETE() {

// //   /**
// //    * Elimina la cookie que contiene el token JWT.
// //    */
// //   await deleteAuthToken();

// //   /**
// //    * Respuesta confirmando cierre de sesión.
// //    */
// //   return NextResponse.json(
// //     { message: 'Logout successful' },
// //     { status: 200, headers: NO_STORE_HEADERS }
// //   );
// // }