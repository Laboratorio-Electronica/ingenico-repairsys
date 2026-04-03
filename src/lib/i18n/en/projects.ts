/**
 * =========================================================
 * Projects Locale (EN)
 * ---------------------------------------------------------
 * English translations for the Projects section
 * of the portfolio.
 *
 * Contains:
 * - Hero section
 * - Project listing
 * - Project detail sections
 * - Tech stack
 * - Success cases
 * - Call To Action
 * - Reusable labels
 *
 * This file represents the English locale version.
 * The structure must remain synchronized with other
 * languages (e.g. /es/projects.ts) to ensure
 * consistency across the i18n system.
 * =========================================================
 */

import { ProjectsLocale } from "../es/projects";

/**
 * =========================================================
 * Projects Translations
 * =========================================================
 */
export const projects: ProjectsLocale = {

  /**
   * -------------------------------------------------------
   * HERO
   * -------------------------------------------------------
   * Main header section of the Projects page.
   * Introduces the purpose of the page and the type of
   * projects showcased in the portfolio.
   */
  hero: {
    title: 'Building real-world solutions',

    subtitle:
      'This page brings together projects where I apply software engineering, backend, and IoT to solve concrete problems, making deliberate technical decisions and prioritizing maintainability, architecture, and measurable outcomes.',

    cta: "Explore projects",

    quote: {
      text: 'The way to get started is to stop talking and begin doing.',
      author: 'Walt Disney',
    },
  },


  /**
   * -------------------------------------------------------
   * PROJECT LIST
   * -------------------------------------------------------
   * Main section displaying featured projects.
   * Projects can be filtered by technologies,
   * platforms, and features.
   */
  projects: {
    title: 'Featured Projects',

    intro:
      'A selection of projects that reflect my experience in web development, backend systems, and IoT integration, organized by technology and technical focus.',

    filters: {
      technologies: {
        title: 'Technologies',
        all: 'All technologies',
      },

      platform: {
        title: 'Platforms',
        all: 'All platforms',
      },

      features: {
        title: 'Features',
        all: 'All features',
      },
    }
  },


  /**
   * -------------------------------------------------------
   * PROJECT DETAILS
   * -------------------------------------------------------
   * Titles used in the project detail page.
   *
   * Each field corresponds to a section that describes
   * the project in depth.
   *
   * Sections:
   * - architecture → system architecture overview
   * - technologies → technologies used in the project
   * - features → implemented functionality
   * - outcome → project results or impact
   */
  details: {
    architecture: 'Architecture Overview',
    technologies: 'Project Technologies',
    features: 'Project Features',
    outcome: 'Project Results'
  },


  /**
   * -------------------------------------------------------
   * TECH STACK
   * -------------------------------------------------------
   * Section that presents the technologies used
   * across different projects.
   */
  stack: {
    title: "Tech Stack",

    intro:
      "Technologies I actively use across my projects. The number shows how many projects each tool or language has been applied to.",
  },


  /**
   * -------------------------------------------------------
   * SUCCESS CASES
   * -------------------------------------------------------
   * Highlights projects that generated measurable
   * results or operational improvements.
   */
  successCases: {
    title: 'Success Cases',

    intro:
      'Projects where the implemented solution produced measurable results, operational improvements, or direct impact on processes and users.',
  },


  /**
   * -------------------------------------------------------
   * CALL TO ACTION
   * -------------------------------------------------------
   * Final section encouraging collaboration
   * or contact for future projects.
   */
  cta: {
    title: 'Would you like to work with me on your next project?',
    action: 'Explore services',
  },


  /**
   * -------------------------------------------------------
   * LABELS
   * -------------------------------------------------------
   * Reusable UI labels used across multiple components
   * within the Projects section.
   *
   * These labels support consistency across the UI
   * and help avoid duplicated hardcoded strings.
   */
  labels: {
    client: 'Client',
    challenge: 'Challenge',
    solution: 'Solution',
    results: 'Results',

    code: 'Code',
    details: "View details",

    project: 'Project',
    description: 'Description',

    features: 'Features',
    technologies: 'Technologies',

    platform: 'Platform',
    type: 'Type',

    repository: 'Repository',
    live: 'Live',
    documentation: 'Documentation',

    problem: 'Problem',

    style: 'Style',
    databaseModel: 'Database Model',

    communication: 'Communication',
    internal: 'Internal',
    external: 'External',

    userImpact: 'User Impact',
    keyLearning: 'Key Learning',
    teamInfo: 'Project Team',
    projectType: 'Project Type',
    duration: 'Project Duration',
    teamSize: 'Team Members',
    role: 'My Role',
  },
} as const;