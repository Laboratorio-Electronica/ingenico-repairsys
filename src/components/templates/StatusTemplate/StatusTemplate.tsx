import React, { ReactNode } from 'react';
import clsx from 'clsx';
import style from './StatusTemplate.module.scss';
// import Avatar from '@/components/atom/Avatar/Avatar';

/**
 * ==================================================
 * 🎭 STATUS TEMPLATE
 * --------------------------------------------------
 * Componente estructural reutilizable para:
 * - Error pages
 * - Loading states
 * - Empty states
 * - Unauthorized / Server errors
 *
 * Responsabilidades:
 * - Definir layout base (imagen + contenido)
 * - Renderizar Avatar dinámico según estado
 * - Permitir modificadores visuales opcionales
 *
 * No contiene:
 * - Lógica de negocio
 * - Fetch
 * - Estado interno
 * ==================================================
 */


/**
 * Estados soportados por el Avatar.
 * Representan diferentes situaciones del sistema.
 */
type AvatarStatus =
  | 'generalError'
  | 'serverError'
  | 'notFound'
  | 'noResults'
  | 'loading'
  | 'unauthorized';


/**
 * Props del StatusTemplate
 *
 * @property withBackground → agrega fondo decorativo
 * @property inContainer    → controla altura completa
 * @property status         → determina qué avatar renderizar
 * @property children       → contenido dinámico
 */
interface Props {
  withBackground?: boolean;
  inContainer?: boolean;
  status: AvatarStatus;
  children: ReactNode;
}


/**
 * StatusTemplate Component
 *
 * Renderiza:
 * - Un Avatar asociado al estado
 * - Contenido dinámico debajo o al lado (según layout)
 *
 * Usa clsx para aplicar modificadores condicionales.
 */
const StatusTemplate: React.FC<Props> = ({
  withBackground = false,
  inContainer = false,
  status,
  children
}) => {

  return (
    <section
      className={clsx(
        style.error__container,

        /* Fondo opcional */
        withBackground && style['error__container-background'],

        /* Altura completa si no está dentro de otro contenedor */
        !inContainer && style['error__container-height']
      )}
    >
      {/* Imagen representativa del estado */}
      {/* <Avatar
        name={status}
        className={style["error__image"]}
      /> */}

      {/* Contenido dinámico */}
      <div className={style['error__children']}>
        {children}
      </div>
    </section>
  );
};

export default StatusTemplate;