/**
 * Archivo principal de internacionalización (i18n)
 * Exporta todos los idiomas disponibles y define el tipo Language.
 */

import { en } from './en/index';
import { es } from './es/index';

/**
 * Objeto con todos los idiomas disponibles en la aplicación
 */
export const i18n = { en, es };

/**
 * Tipo que representa los códigos de idioma disponibles
 * Usado en hooks y contextos para tipado seguro
 */
export type Language = keyof typeof i18n; // 'en' | 'es'
export type Locale = typeof en;
