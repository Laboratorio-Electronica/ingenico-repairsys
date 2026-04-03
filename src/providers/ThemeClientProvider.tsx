/**
 * Componente cliente para envolver la aplicación con el ThemeContext.
 * Separa la lógica del contexto de tema del layout principal.
 */

import { ReactNode } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';

interface Props {
  children: ReactNode; // Elementos que serán envueltos por el ThemeProvider
}

/**
 * Envuelve los hijos con ThemeProvider para habilitar
 * el manejo de temas (claro/oscuro) en toda la app.
 */
export const ThemeClientProvider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
