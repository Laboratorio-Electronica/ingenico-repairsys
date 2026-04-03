import { about } from './about';
import { blog } from './blog';
import { successCases } from './successCases';
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
import { testimonials } from './testimonials';
import { footer } from './footer';
import { notice } from './notice';
import { unauthorized } from './unauthorized';

/**
 * =========================================================
 * Spanish Translation Dictionary (es)
 * ---------------------------------------------------------
 * Este archivo compone el diccionario completo de
 * traducciones para el idioma español.
 *
 * Arquitectura:
 * - Cada módulo representa una sección o feature.
 * - Se agrupan aquí para exportar un único objeto raíz.
 * - Mantiene separación por dominio funcional.
 *
 * Organización por dominios:
 * - Core: common, error, feedbackStates
 * - Navegación / Branding: logo, footer
 * - Páginas públicas: home, about, blog, contact, gallery
 * - Profesional: projects, experience, education, skills, resume
 * - Comercial: service, successCases, clients, testimonials
 * - Usuario: login, profile, dashboard, settings, settingsButton
 *
 * Este objeto debe reflejar la misma estructura que
 * el diccionario del idioma inglés para evitar
 * inconsistencias en useTranslation().
 * =========================================================
 */
export const es = {
  about,
  blog,
  successCases,
  clients,
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
  skills,
  service,
  settings,
  settingsButton,
  testimonials,
  feedbackStates,
  footer,
  notice,
  unauthorized
};