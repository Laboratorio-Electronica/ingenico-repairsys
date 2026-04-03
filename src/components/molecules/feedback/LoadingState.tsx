import StatusTemplate from "@/components/templates/StatusTemplate/StatusTemplate";
import Spinner from "@/components/atom/feedback/Spinner";

/**
 * =========================================================
 * LoadingState
 * ---------------------------------------------------------
 * Componente de estado reutilizable para representar
 * cargas en progreso.
 *
 * Responsabilidades:
 * - Encapsular el estado "loading".
 * - Delegar estructura visual a StatusTemplate.
 * - Mostrar indicador visual mediante Spinner.
 *
 * Uso típico:
 * - Mientras se resuelven queries (RTK Query).
 * - Durante carga inicial de páginas.
 *
 * Beneficio:
 * - Evita repetir lógica visual de loading.
 * - Mantiene consistencia en estados globales.
 * =========================================================
 */
export const LoadingState: React.FC = () => {
  return (
    <StatusTemplate status="loading" inContainer>
      <Spinner />
    </StatusTemplate>
  );
};