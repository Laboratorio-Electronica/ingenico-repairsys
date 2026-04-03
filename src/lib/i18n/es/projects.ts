/**
 * =========================================================
 * Projects Locale (ES)
 * ---------------------------------------------------------
 * Traducciones en español para la sección de proyectos
 * del portafolio.
 *
 * Contiene:
 * - Hero de la página
 * - Listado de proyectos
 * - Secciones de detalle del proyecto
 * - Tech stack
 * - Casos de éxito
 * - Call To Action
 * - Labels reutilizables
 *
 * Este archivo define la estructura base del idioma.
 * Otros idiomas deben seguir exactamente el mismo
 * esquema para mantener consistencia en el sistema i18n.
 * =========================================================
 */

export const projects = {

  /**
   * -------------------------------------------------------
   * HERO
   * -------------------------------------------------------
   * Encabezado principal de la página de proyectos
   */
  hero: {
    title: 'Construyendo soluciones reales',

    subtitle:
      'Esta pagina reúne proyectos donde aplico ingeniería de software, backend e IoT para resolver problemas concretos, tomando decisiones técnicas conscientes y priorizando arquitectura, mantenibilidad y resultados medibles.',

    cta: "Explorar proyectos",

    quote: {
      text: 'La mejor manera de empezar algo es dejar de hablar de ello y empezar a hacerlo.',
      author: 'Walt Disney',
    },
  },


  /**
   * -------------------------------------------------------
   * PROJECT LIST
   * -------------------------------------------------------
   * Sección principal con proyectos destacados
   */
  projects: {
    title: 'Proyectos destacados',

    intro:
      'Una selección de proyectos que reflejan mi experiencia en desarrollo web, backend e integración IoT, organizados por tecnología y enfoque técnico.',

    filters: {
      technologies: {
        title: 'Tecnologías',
        all: 'Todas las tecnologías',
      },

      platform: {
        title: 'Plataformas',
        all: 'Todas las plataformas',
      },

      features: {
        title: 'Características',
        all: 'Todas las características',
      },
    },
  },


  /**
   * -------------------------------------------------------
   * PROJECT DETAILS
   * -------------------------------------------------------
   * Textos utilizados en la página de detalle de un proyecto.
   * Cada campo corresponde al título de una sección
   * dentro del detalle del proyecto.
   *
   * Secciones:
   * - architecture → descripción de la arquitectura del sistema
   * - technologies → tecnologías utilizadas
   * - features → funcionalidades implementadas
   * - outcome → resultados o impacto del proyecto
   */
  details: {
    architecture: 'Visión General de la Arquitectura',
    technologies: 'Tecnologías del Proyecto',
    features: 'Características del proyecto',
    outcome: 'Resultados del Proyecto',
  },


  /**
   * -------------------------------------------------------
   * TECH STACK
   * -------------------------------------------------------
   * Tecnologías utilizadas en los proyectos
   */
  stack: {
    title: "Stack tecnológico",

    intro:
      "Tecnologías que utilizo de forma activa en mis proyectos. El número indica en cuántos proyectos ha sido aplicada cada herramienta o lenguaje.",
  },


  /**
   * -------------------------------------------------------
   * SUCCESS CASES
   * -------------------------------------------------------
   * Proyectos con impacto o resultados medibles
   */
  successCases: {
    title: 'Casos de éxito',

    intro:
      'Proyectos donde la solución implementada generó resultados medibles, mejoras operativas o impacto directo en procesos y usuarios.',
  },


  /**
   * -------------------------------------------------------
   * CTA
   * -------------------------------------------------------
   * Llamado a la acción final
   */
  cta: {
    title: '¿Te gustaría trabajar conmigo en tu próximo proyecto?',
    action: 'Explorar servicios',
  },


  /**
   * -------------------------------------------------------
   * LABELS
   * -------------------------------------------------------
   * Etiquetas reutilizables usadas en múltiples componentes
   */
  labels: {
    client: 'Cliente',
    challenge: 'Reto',
    solution: 'Solución',
    results: 'Resultados',

    code: 'Código',
    details: "Ver detalles",

    project: 'Proyecto',
    description: 'Descripción',

    features: 'Características',
    technologies: 'Tecnologías',

    platform: 'Plataforma',
    type: 'Tipo',

    repository: 'Repositorio',
    live: 'En vivo',
    documentation: 'Documentación',

    problem: 'Problema',

    style: 'Estilos',
    databaseModel: 'Modelado Datos',

    communication: 'Comunicación',
    internal: 'Interno',
    external: 'Externo',

    userImpact: 'Impacto de usuarios',
    keyLearning: 'Aprendizaje clave',
    teamInfo: 'Equipo del proyecto',
    projectType: 'Tipo de proyecto',
    duration: 'Duración del proyecto',
    teamSize: 'Número de integrantes',
    role: 'Mi rol',
  },
};


/**
 * Tipo derivado automáticamente del objeto locale.
 * Garantiza que otros idiomas tengan la misma estructura.
 */
export type ProjectsLocale = typeof projects;