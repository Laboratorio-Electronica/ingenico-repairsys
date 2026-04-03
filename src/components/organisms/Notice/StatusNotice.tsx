import React from 'react';
import style from './StatusNotice.module.scss';

import { Icon } from '@/components/atom/Icon/Icon';
import { noticeMeta, NoticeType } from '@/domain/notice/noticeMeta';
import { useTranslation } from '@/hooks/useTranslation';

interface StatusNoticeProps {
  /** Tipo de aviso a renderizar */
  type: NoticeType;
}

/**
 * =========================================================
 * StatusNotice
 * ---------------------------------------------------------
 * Componente visual para mostrar mensajes de estado
 * dinámicos según:
 * - Tipo (NoticeType)
 * - Configuración visual del dominio (noticeMeta)
 * - Idioma activo (useTranslation)
 *
 * Arquitectura:
 * - noticeMeta → define icono y color (capa dominio).
 * - t.notice[type] → define contenido textual (capa i18n).
 * - StatusNotice → une ambas capas en la UI.
 *
 * Responsabilidades:
 * - Renderizar icono dinámico.
 * - Aplicar color según tipo.
 * - Mostrar título y descripción traducidos.
 * - Proveer accesibilidad básica (role + aria-live).
 *
 * Este componente desacopla:
 * - Lógica visual (meta)
 * - Contenido (traducción)
 * - Presentación (SCSS)
 * =========================================================
 */
const StatusNotice: React.FC<StatusNoticeProps> = ({ type }) => {

  /**
   * Hook de traducción para obtener textos según idioma activo.
   */
  const { t } = useTranslation();

  /**
   * Metadata del aviso:
   * - icon
   * - color
   */
  const meta = noticeMeta[type];

  /**
   * Contenido textual traducido.
   */
  const content = t.notice[type];

  /**
   * Componente de icono dinámico.
   */
  const IconComponent = meta.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ borderLeft: `4px solid ${meta.color}` }}
      className={style.notice}
    >
      <div
        className={style.notice__icon}
        style={{ color: meta.color }}
      >
        <Icon
          icon={IconComponent}
          size={20}
          ariaLabel="notice icon"
        />
      </div>

      <div className={style.notice__text}>
        <strong>{content.title}</strong>
        <p>{content.description}</p>
      </div>
    </div>
  );
};

export default StatusNotice;