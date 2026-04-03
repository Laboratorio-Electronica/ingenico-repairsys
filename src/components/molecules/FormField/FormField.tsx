import styles from './FormField.module.scss';
import { ReactNode } from 'react';

/**
 * ==================================================
 * 🧾 FormField (Molecule)
 * --------------------------------------------------
 * Wrapper estructural para controles de formulario.
 *
 * Responsabilidades:
 * - Renderizar label asociado al control
 * - Renderizar children (input/select/switch)
 * - Mostrar mensaje de error opcional
 *
 * Accesibilidad:
 * - Usa htmlFor para vincular label con control
 * - Soporta mensaje de error visible
 *
 * Props:
 * @property label    Texto del label
 * @property htmlFor  ID del control asociado
 * @property error    Mensaje de error opcional
 * @property children Control de formulario
 * ==================================================
 */

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
}

export const FormField = ({
  label,
  htmlFor,
  error,
  children
}: FormFieldProps) => {
  return (
    <div className={styles["form-field"]}>
      <label
        htmlFor={htmlFor}
        className={styles["form-field__label"]}
      >
        {label}
      </label>

      {children}

      {error && (
        <span className={styles["form-field__error"]}>
          {error}
        </span>
      )}
    </div>
  );
};