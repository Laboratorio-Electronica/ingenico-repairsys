import { footer } from './footer';
import { about } from './about';
import { blog } from './blog';
import { clients } from './clients';
import { common } from './common';
import { contact } from './contact';
import { dashboard } from './dashboard';
import { education } from './education';
import { error } from './error';
import { experience } from './experience';
import { feedbackStates } from './feedbackStates';
import { gallery } from './gallery';
import { home } from './home';
import { login } from './login';
import { logo } from './logo';
import { profile } from './profile';
import { projects } from './projects';
import { resources } from './resources';
import { resume } from './resume';
import { service } from './services';
import { settings } from './settings';
import { settingsButton } from './settingsButton';
import { skills } from './skills';
import { successCases } from './successCases';
import { testimonials } from './testimonials';
import { notice } from './notice';
import { unauthorized } from './unauthorized';

/**
 * =========================================================
 * English Translation Dictionary (en)
 * ---------------------------------------------------------
 * Objeto raíz que compone todas las traducciones
 * correspondientes al idioma inglés.
 *
 * Arquitectura:
 * - Cada sección está modularizada por dominio.
 * - Se unifican aquí para mantener coherencia estructural.
 * - Debe mantener la misma forma que el diccionario "es".
 *
 * Dominios representados:
 * - Core: common, error, feedbackStates
 * - Navegación / Branding: logo, footer
 * - Páginas públicas: home, about, blog, contact, gallery
 * - Profesional: projects, experience, education, skills, resume
 * - Comercial: service, successCases, clients, testimonials
 * - Usuario: login, profile, dashboard, settings, settingsButton
 *
 * Nota:
 * Cualquier divergencia estructural respecto a "es"
 * puede generar errores silenciosos en useTranslation().
 * =========================================================
 */
export const en = {
  about,
  blog,
  clients,
  successCases,
  common,
  contact,
  dashboard,
  education,
  experience,
  error,
  gallery,
  home,
  login,
  logo,
  profile,
  projects,
  resources,
  resume,
  service,
  settings,
  settingsButton,
  skills,
  testimonials,
  feedbackStates,
  footer,
  notice,
  unauthorized
};