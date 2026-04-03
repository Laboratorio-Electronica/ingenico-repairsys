import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * ==================================================
 * 🔐 Auth API Slice (RTK Query)
 * --------------------------------------------------
 * Maneja las operaciones relacionadas con autenticación:
 * - Login
 * - Verificación de perfil
 * - Logout
 *
 * Base URL:
 * /api/v2/auth
 *
 * Implementado con Redux Toolkit Query para:
 * - Cache automática
 * - Invalidación controlada
 * - Hooks generados automáticamente
 * ==================================================
 */

export const authApi = createApi({
  reducerPath: "authApi",

  /**
   * BaseQuery define configuración base para todas
   * las peticiones del slice.
   */
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/auth",
  }),

  /**
   * Endpoints de autenticación
   */
  endpoints: (builder) => ({

    /**
     * 🔑 Login
     * Envía credenciales y recibe token JWT.
     */
    login: builder.mutation<
      { token: string },
      { username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
    }),

    /**
     * 👤 Verificación de perfil
     * Obtiene información del usuario autenticado.
     */
    verifyProfile: builder.query({
      query: () => "/",
    }),

    /**
     * 🚪 Logout
     * Invalida sesión en backend.
     */
    logout: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
        body: "",
      }),
    }),
  }),
});

/**
 * Hooks auto-generados por RTK Query
 */
export const {
  useLoginMutation,
  useVerifyProfileQuery,
  useLogoutMutation
} = authApi;