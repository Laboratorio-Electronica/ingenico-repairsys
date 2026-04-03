'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import StatusTemplate from '@/components/templates/StatusTemplate/StatusTemplate';

import styles from './page.module.scss';
import { Button } from '@/components/atom/Button/Button';
import { useTranslation } from '@/hooks/useTranslation';

/**
 * =========================================================
 * UnauthorizedPage
 * ---------------------------------------------------------
 * Página que se muestra cuando el usuario intenta acceder
 * a un recurso o ruta protegida sin los permisos necesarios.
 *
 * Funcionalidades:
 * - Muestra un mensaje informando que el acceso no está permitido.
 * - Explica al usuario que será redirigido automáticamente.
 * - Permite redirigir manualmente al login mediante un botón.
 * - Realiza una redirección automática después de 10 segundos.
 *
 * Dependencias:
 * - useRouter → para redirección programática.
 * - useTranslation → para obtener textos según idioma.
 * - StatusTemplate → layout estándar para páginas de estado.
 *
 * Flujo:
 * 1. Se renderiza el mensaje de acceso no autorizado.
 * 2. Se inicia un temporizador de 10 segundos.
 * 3. Si el usuario no interactúa, se redirige a `/login`.
 * 4. El usuario también puede ir manualmente mediante el botón.
 * =========================================================
 */
export default function UnauthorizedPage() {

  /**
   * Router de Next.js para navegación programática
   */
  const router = useRouter();

  /**
   * Hook de internacionalización
   */
  const { t } = useTranslation();

  /**
   * Textos traducidos de la sección unauthorized
   */
  const texts = t.unauthorized;

  /**
   * Redirección automática al login después de 10 segundos
   */
  useEffect(() => {

    const timeoutId = setTimeout(() => {
      router.push('/login');
    }, 10000);

    /**
     * Limpieza del temporizador si el componente se desmonta
     */
    return () => clearTimeout(timeoutId);

  }, [router]);

  return (
    <StatusTemplate status="unauthorized" withBackground>

      <div className={styles.unauthorized}>

        {/* =================================================
            TITLE
           ================================================= */}
        <h1 className={styles['unauthorized__title']}>
          🔐 {texts.title}
        </h1>

        {/* =================================================
            MAIN MESSAGE
           ================================================= */}
        <p className={styles['unauthorized__text']}>
          {texts.message}
        </p>

        {/* =================================================
            REDIRECT MESSAGE
           ================================================= */}
        <p
          className={clsx(
            styles['unauthorized__text'],
            styles['unauthorized__text--muted']
          )}
        >
          {texts.redirect}
        </p>

        {/* =================================================
            MANUAL REDIRECT BUTTON
           ================================================= */}
        <Button
          variant="primary"
          size="md"
          className={styles["unauthorized__button"]}
          onClick={() => router.push("/login")}
        >
          {texts.goToLogin}
        </Button>

      </div>

    </StatusTemplate>
  );
}