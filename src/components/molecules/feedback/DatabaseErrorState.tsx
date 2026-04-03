import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';
import styles from './FeedbackStates.module.scss';
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * DatabaseErrorState
 * ---------------------------------------------------------
 * Componente que representa un estado de error
 * relacionado con fallos del servidor o base de datos.
 *
 * Responsabilidades:
 * - Obtener textos internacionalizados.
 * - Renderizar estructura visual de error.
 * - Delegar layout base a StatusTemplate.
 *
 * Uso típico:
 * - Fallo en consultas API.
 * - Error 500.
 * - Problemas de conexión con backend.
 *
 * Variante visual:
 * - state--error
 * =========================================================
 */
export const DatabaseErrorState: React.FC = () => {  

  /**
   * Hook i18n.
   */
  const { t } = useTranslation();
  const texts = t.feedbackStates.error;

  return (
    <StatusTemplate status="serverError" inContainer>

      <div className={`${styles.state} ${styles["state--error"]}`}>

        {/* Icono visual de advertencia */}
        <div className={styles.state__icon}>
          ⚠️
        </div>

        {/* Título */}
        <h2 className={styles.state__title}>
          {texts.title}
        </h2>

        {/* Mensaje descriptivo */}
        <p className={styles.state__message}>
          {texts.message}
        </p>

      </div>

    </StatusTemplate>
  );
};