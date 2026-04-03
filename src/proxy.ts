import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { getSession } from '@/lib/auth/session';
import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';
import { hasApiAccess } from './lib/auth/api-access';
import { hasRouteAccess } from './lib/auth/route-access';

export async function proxy(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  const session = await getSession(request);
  const isAuthenticated = Boolean(session);

  const isApiRoute = pathname.startsWith('/api/');

  // ✅ FIX: proteger también GET
  if (isApiRoute) {
    if (
      pathname.startsWith('/api/v1/') &&
      !pathname.startsWith('/api/v1/auth')
    ) {
      if (!session) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      if (!hasApiAccess(pathname, session.role)) {
        return NextResponse.json(
          { error: 'Forbidden' },
          { status: 403 }
        );
      }
    }

    return NextResponse.next();
  }

  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const isPublicRoute = PUBLIC_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
  }

  if (isAuthenticated && session && !hasRouteAccess(pathname, session.role)) {
    return NextResponse.redirect(`${origin}/unauthorized`);
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toHome}`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/calibration/:path*',
    '/home/:path*',
    '/admin/:path*',
  ],
};

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// import { getSession } from '@/lib/auth/session';
// import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';
// import { hasApiAccess } from './lib/auth/api-access';
// import { hasRouteAccess } from './lib/auth/route-access';

// export async function proxy(request: NextRequest) {
//   const { pathname, origin } = request.nextUrl;

//   const session = await getSession(request);
//   const isAuthenticated = Boolean(session);

//   const isApiRoute = pathname.startsWith('/api/');

//   // ✅ FIX: proteger también GET
//   if (isApiRoute) {
//     if (
//       pathname.startsWith('/api/v1/') &&
//       !pathname.startsWith('/api/v1/auth')
//     ) {
//       if (!session) {
//         return NextResponse.json(
//           { error: 'Unauthorized' },
//           { status: 401 }
//         );
//       }

//       if (!hasApiAccess(pathname, session.role)) {
//         return NextResponse.json(
//           { error: 'Forbidden' },
//           { status: 403 }
//         );
//       }
//     }

//     return NextResponse.next();
//   }

//   const isProtectedRoute = PROTECTED_ROUTES.some(route =>
//     pathname.startsWith(route)
//   );

//   const isPublicRoute = PUBLIC_ROUTES.some(route =>
//     pathname.startsWith(route)
//   );

//   if (isProtectedRoute && !isAuthenticated) {
//     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
//   }

//   if (isAuthenticated && session && !hasRouteAccess(pathname, session.role)) {
//     return NextResponse.redirect(`${origin}/unauthorized`);
//   }

//   if (isPublicRoute && isAuthenticated) {
//     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toHome}`);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   // matcher: [
//   //   '/calibration/:path*',
//   //   '/home/:path*',
//   //   '/admin/:path*',
//   // ],
//   matcher: [
//   '/calibration',
//   '/calibration/:path*',
//   '/home',
//   '/home/:path*',
//   '/admin',
//   '/admin/:path*',
// ],
// };

// // import { NextResponse } from 'next/server';
// // import type { NextRequest } from 'next/server';

// // import { getSession } from '@/lib/auth/session';
// // import { REDIRECT_ROUTES, PROTECTED_ROUTES, PUBLIC_ROUTES } from '@/lib/config';
// // import { hasApiAccess } from './lib/auth/api-access';
// // import { hasRouteAccess } from './lib/auth/route-access';

// // /**
// //  * =========================================================
// //  * Proxy Middleware
// //  * ---------------------------------------------------------
// //  * Middleware encargado de controlar:
// //  *
// //  * - autenticación
// //  * - autorización basada en roles
// //  * - acceso a rutas públicas y protegidas
// //  * - acceso a endpoints de API
// //  *
// //  * Se ejecuta antes de que la request llegue a la ruta.
// //  *
// //  * Responsabilidades:
// //  * - bloquear acceso no autenticado a rutas protegidas
// //  * - evitar acceso a rutas públicas si ya existe sesión
// //  * - validar permisos de rol para páginas
// //  * - validar permisos de rol para endpoints API
// //  *
// //  * Arquitectura de control:
// //  *
// //  * Request
// //  *   ↓
// //  * Middleware (auth + role)
// //  *   ↓
// //  * Route / API
// //  *
// //  * =========================================================
// //  */
// // export async function proxy(request: NextRequest) {

// //   const { pathname, origin } = request.nextUrl;

// //   /**
// //    * Obtiene la sesión del usuario si existe.
// //    */
// //   const session = await getSession(request);
// //   const isAuthenticated = Boolean(session);

// //   /**
// //    * Detecta si la request es hacia la API.
// //    */
// //   const isApiRoute = pathname.startsWith('/api/');

// //   /**
// //    * ======================================================
// //    * API ROUTE ACCESS CONTROL
// //    * ======================================================
// //    */
// //   if (isApiRoute) {

// //     /**
// //      * Solo protegemos endpoints de escritura en API v2.
// //      *
// //      * GET permanece público.
// //      */
// //     if (
// //       pathname.startsWith('/api/v1/') &&
// //       !pathname.startsWith('/api/v1/auth') &&
// //       request.method !== 'GET'
// //     ) {

// //       if (!session) {
// //         return NextResponse.json(
// //           { error: 'Unauthorized' },
// //           { status: 401 }
// //         );
// //       }

// //       /**
// //        * Validación de permisos por rol
// //        */
// //       if (!hasApiAccess(pathname, session.role)) {
// //         return NextResponse.json(
// //           { error: 'Forbidden' },
// //           { status: 403 }
// //         );
// //       }
// //     }

// //     return NextResponse.next();
// //   }

// //   /**
// //    * ======================================================
// //    * PAGE ROUTE ACCESS CONTROL
// //    * ======================================================
// //    */

// //   const isProtectedRoute = PROTECTED_ROUTES.some(route =>
// //     pathname.startsWith(route)
// //   );

// //   const isPublicRoute = PUBLIC_ROUTES.some(route =>
// //     pathname.startsWith(route)
// //   );

// //   /**
// //    * Redirige a login si intenta acceder
// //    * a una ruta protegida sin sesión.
// //    */
// //   if (isProtectedRoute && !isAuthenticated) {
// //     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toLogin}`);
// //   }

// //   /**
// //    * Valida permisos de rol en rutas protegidas.
// //    */
// //   if (isAuthenticated && session && !hasRouteAccess(pathname, session.role)) {
// //     return NextResponse.redirect(`${origin}/unauthorized`);
// //   }

// //   /**
// //    * Evita que usuarios autenticados accedan
// //    * a páginas públicas como login.
// //    */
// //   if (isPublicRoute && isAuthenticated) {
// //     return NextResponse.redirect(`${origin}${REDIRECT_ROUTES.toHome}`);
// //   }

// //   return NextResponse.next();
// // }

// // /**
// //  * =========================================================
// //  * Middleware Matcher
// //  * ---------------------------------------------------------
// //  * Define las rutas donde se ejecutará el middleware.
// //  *
// //  * Esto evita ejecutarlo en:
// //  * - assets
// //  * - imágenes
// //  * - static files
// //  * =========================================================
// //  */
// // export const config = {
// //   matcher: [
// //     // '/blog/:path*',
// //     '/calibration/:path*',
// //     '/home/:path*',
// //     '/admin/:path*',
// //     // '/clients/:path*',
// //     // '/contact/:path*',
// //     // '/dashboard/:path*',
// //     // '/gallery/:path*',
// //     // '/laboratory/:path*',
// //     // '/login',
// //     // '/profile/:path*',
// //     // '/projects/:path*',
// //     // '/resources/:path*',
// //     // '/resume/:path*',
// //     // '/unauthorized'
// //   ],
// // };