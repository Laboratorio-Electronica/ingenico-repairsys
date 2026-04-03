'use client';

/**
 * ==================================================
 * 🚨 GLOBAL ERROR PAGE (App Router)
 * --------------------------------------------------
 * Componente especial de Next.js que se renderiza
 * cuando ocurre un error no controlado en el segmento.
 *
 * Responsabilidades:
 * - Mostrar mensaje de error amigable
 * - Permitir reintentar mediante reset()
 * - Permitir navegación al home
 * - Integrarse con StatusTemplate
 *
 * Accesibilidad:
 * - role="alert" para anunciar error
 * - role="group" para agrupar acciones
 *
 * Internacionalización:
 * - Textos obtenidos desde useTranslation()
 * ==================================================
 */

import Link from 'next/link';
import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';
import { useTranslation } from '@/hooks/useTranslation';
import styles from './error.module.scss';
import { Button } from '@/components/atom/Button/Button';
import { ButtonLink } from '@/components/atom/ButtonLink/ButtonLink';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const { t } = useTranslation();

  return (
    <StatusTemplate status="generalError" withBackground>
      
      {/* Título del error */}
      <h1 className={styles.error__title}>
        {t.error.title}
      </h1>

      {/* Mensaje fallback */}
      <p
        className={styles.error__message}
        role="alert"
      >
        {t.error.fallback}
      </p>

      {/* Acciones disponibles */}
      <div
        className={styles["error__actions"]}
        role="group"
        aria-label={t.error.options}
      >
        {/* Reintentar */}
        <Button
          onClick={reset}
          // className={`${styles.error__button} ${styles["error__button--retry"]}`}
        >
          {t.common.actions.retry}
        </Button>

        {/* Ir al inicio */}
        <ButtonLink variant='secondary'
          href="/"
          className={`${styles.error__button} ${styles["error__button--home"]}`}
        >
          {t.common.navigation.home}
        </ButtonLink>
      </div>

    </StatusTemplate>
  );
}