import StatusTemplate from "@/components/templates/StatusTemplate/StatusTemplate";
import styles from "./FeedbackStates.module.scss";
import { FaDatabase, FaFilter } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Props del componente NoDataState
 */
interface Props {
  /**
   * Motivo del estado vacío:
   * - "empty-db" → No existen registros.
   * - "no-match" → Filtros activos sin resultados.
   */
  reason: "empty-db" | "no-match";
}

/**
 * =========================================================
 * NoDataState
 * ---------------------------------------------------------
 * Representa un estado vacío reutilizable.
 *
 * Variantes:
 * - Base de datos vacía.
 * - Sin coincidencias por filtros activos.
 *
 * Responsabilidades:
 * - Determinar contenido dinámico según motivo.
 * - Renderizar icono contextual.
 * - Delegar layout base a StatusTemplate.
 * - Usar textos internacionalizados.
 *
 * Variante visual:
 * - state--muted
 * =========================================================
 */
export const NoDataState: React.FC<Props> = ({ reason }) => {

  /**
   * Determina si el estado proviene de filtros activos.
   */
  const isFilter = reason === "no-match";

  /**
   * Hook de traducción.
   */
  const { t } = useTranslation();
  const texts = t.feedbackStates.noData;

  /**
   * Selección dinámica de título y mensaje.
   */
  const title = isFilter
    ? texts.filterTrue.title
    : texts.filterFalse.title;

  const message = isFilter
    ? texts.filterTrue.subtitle
    : texts.filterFalse.subtitle;

  return (
    <StatusTemplate status="noResults" inContainer>

      <div className={`${styles.state} ${styles["state--muted"]}`}>
        
        {/* Icono contextual */}
        <div className={styles.state__icon}>
          {isFilter ? <FaFilter /> : <FaDatabase />}
        </div>

        {/* Título */}
        <h2 className={styles.state__title}>
          {title}
        </h2>

        {/* Mensaje */}
        <p className={styles.state__message}>
          {message}
        </p>

      </div>

    </StatusTemplate>
  );
};