'use client';

/**
 * ==================================================
 * ⏳ Loading Route (App Router)
 * --------------------------------------------------
 * Componente especial de Next.js que se renderiza
 * automáticamente mientras la página o segmento
 * está cargando datos.
 *
 * Responsabilidades:
 * - Mostrar estado visual de carga
 * - Reutilizar StatusTemplate como layout base
 * - Renderizar Spinner accesible
 *
 * No contiene:
 * - Lógica de negocio
 * - Fetch
 * - Estado interno
 *
 * Nota:
 * Se marca como "use client" porque Spinner usa
 * hooks (useTranslation) y requiere entorno cliente.
 * ==================================================
 */

import Spinner from '@/components/atom/feedback/Spinner';
import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';

export default function Loading() {
  return (
    <StatusTemplate status="loading" withBackground>
      <Spinner />
    </StatusTemplate>
  );
}