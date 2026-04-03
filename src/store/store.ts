/**
 * =========================================================
 * Redux Store Configuration
 * ---------------------------------------------------------
 * Configuración central del store de Redux Toolkit.
 *
 * Responsabilidades:
 * - Registrar reducers locales (slices)
 * - Registrar reducers de servicios RTK Query
 * - Configurar middlewares de RTK Query
 * - Habilitar listeners para refetch automático
 *
 * Tecnologías usadas:
 * - Redux Toolkit
 * - RTK Query
 *
 * Este store actúa como el punto único de estado global
 * de la aplicación.
 * =========================================================
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

/**
 * Slice local para manejar filtros
 */
import filterReducer from './slices/filterSlice';

/**
 * =========================================================
 * RTK Query Services
 * ---------------------------------------------------------
 * APIs declaradas mediante createApi.
 * Cada servicio incluye:
 * - reducer
 * - middleware
 * - hooks auto-generados
 * =========================================================
 */

import { authApi } from '../infrastructure/auth/auth.api';
// import { projectsApi } from '../infrastructure/project/projects.api';
// import { technologiesApi } from '../infrastructure/technology/technologies.api';
// import { caseStudiesApi } from '../infrastructure/success-case/success-case.api';
// import { featureApi } from '../infrastructure/feature/feature.api';
// import { calibrationApi } from '@/infrastructure/calibration/calibration.api';


/**
 * =========================================================
 * Store Configuration
 * ---------------------------------------------------------
 * Combina reducers locales y reducers generados por
 * RTK Query.
 *
 * reducer:
 *  - Estado local de la aplicación
 *  - Estado cacheado de APIs
 *
 * middleware:
 *  - Middleware necesario para manejar cache,
 *    invalidaciones y refetch de RTK Query
 * =========================================================
 */

export const store = configureStore({

  reducer: {

    /**
     * Slice local para filtros de proyectos
     */
    filters: filterReducer,

    /**
     * Reducers generados automáticamente por RTK Query
     */
    [authApi.reducerPath]: authApi.reducer,
    // [projectsApi.reducerPath]: projectsApi.reducer,
    // [featureApi.reducerPath]: featureApi.reducer,
    // [technologiesApi.reducerPath]: technologiesApi.reducer,
    // [caseStudiesApi.reducerPath]: caseStudiesApi.reducer,
    // [calibrationApi.reducerPath]: calibrationApi.reducer,
  },

  /**
   * =========================================================
   * Middleware
   * ---------------------------------------------------------
   * Se agregan los middlewares de cada servicio RTK Query
   * para habilitar:
   *
   * - caching automático
   * - invalidación de queries
   * - refetch
   * - polling
   * =========================================================
   */

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      // projectsApi.middleware,
      // featureApi.middleware,
      // technologiesApi.middleware,
      // caseStudiesApi.middleware,
      // calibrationApi.middleware,
    ),
});


/**
 * =========================================================
 * RTK Query Listeners
 * ---------------------------------------------------------
 * Habilita comportamientos automáticos como:
 *
 * - refetchOnFocus
 * - refetchOnReconnect
 *
 * Esto mejora la sincronización de datos cuando
 * el usuario vuelve a la pestaña o recupera conexión.
 * =========================================================
 */
setupListeners(store.dispatch);


/**
 * =========================================================
 * Global Redux Types
 * ---------------------------------------------------------
 * Tipos reutilizables para TypeScript en toda la app.
 *
 * RootState  → tipo del estado global
 * AppDispatch → tipo del dispatch de Redux
 * =========================================================
 */

/**
 * Tipo del estado global del store
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Tipo del dispatch de Redux
 */
export type AppDispatch = typeof store.dispatch;