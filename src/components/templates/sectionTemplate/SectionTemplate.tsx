import { ReactNode } from "react";
import style from './SectionTemplate.module.scss';

/**
 * Props del componente SectionTemplate
 */
interface Props {
  /** Título principal de la sección */
  title: string;

  /** Texto introductorio opcional */
  intro?: string;

  /** Nivel semántico del heading (control SEO / accesibilidad) */
  headingLevel?: 'h2' | 'h3';

  /** Contenido interno de la sección */
  children: ReactNode;

  /** ID opcional para navegación por anclas */
  id?: string;
}

/**
 * =========================================================
 * SectionTemplate
 * ---------------------------------------------------------
 * Componente reutilizable para secciones estructuradas.
 *
 * Responsabilidades:
 * - Renderizar un bloque semántico <section>.
 * - Permitir control del nivel de heading.
 * - Mostrar texto introductorio opcional.
 * - Renderizar contenido dinámico como children.
 *
 * Beneficios:
 * - Mejora consistencia visual.
 * - Mejora jerarquía semántica (SEO / accesibilidad).
 * - Reduce repetición de markup en páginas.
 *
 * Diseño:
 * - Basado en estilos .intro-section (BEM).
 * =========================================================
 */
export const SectionTemplate = ({
  title,
  intro,
  headingLevel: Heading = 'h2',
  children,
  id
}: Props) => {

  /**
   * Asigna dinámicamente el tag del heading.
   */
  const HeadingTag = Heading;

  return (
    <section id={id} className={style['intro-section']}>

      {/* Encabezado semántico */}
      <header>
        <HeadingTag className={style['intro-section__title']}>
          {title}
        </HeadingTag>

        {/* Texto introductorio opcional */}
        {intro && (
          <p className={style['intro-section__paragraph']}>
            {intro}
          </p>
        )}
      </header>

      {/* Contenido dinámico */}
      {children}

    </section>
  );
};

export default SectionTemplate;