import { FC, ReactNode, MouseEvent, useEffect } from "react";
import ReactDOM from "react-dom";
import style from "./Modal.module.scss";
import { Button } from "@/components/atom/Button/Button";
import { FiX } from "react-icons/fi";

/**
 * Props del componente Modal
 */
interface ModalProps {
  /** Función que se ejecuta al cerrar el modal */
  onClose: () => void;

  /** Contenido interno del modal */
  children: ReactNode;

  /** Título opcional para accesibilidad */
  title?: string;
}

/**
 * =========================================================
 * Modal
 * ---------------------------------------------------------
 * Componente modal renderizado mediante Portal.
 *
 * Responsabilidades:
 * - Renderizar contenido por encima del árbol principal.
 * - Cerrar al hacer click en overlay.
 * - Cerrar con tecla Escape.
 * - Bloquear propagación de eventos internos.
 * - Proveer accesibilidad básica (role="dialog").
 *
 * Arquitectura:
 * - Usa ReactDOM.createPortal para montar en document.body.
 * - Maneja cierre por:
 *   • Click en overlay
 *   • Botón de cerrar
 *   • Tecla Escape
 * =========================================================
 */
const Modal: FC<ModalProps> = ({ onClose, children, title }) => {

  /**
   * Cierra el modal cuando se hace click en el overlay.
   */
  const handleOverlayClick = () => onClose();

  /**
   * Evita que el click interno cierre el modal.
   */
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  /**
   * Listener para cerrar el modal con la tecla Escape.
   * Se limpia automáticamente al desmontar.
   */
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  /**
   * Contenido renderizado en el portal.
   */
  const modalContent = (
    <section
      className={style.modal__overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={style.modal__wrapper}
        onClick={handleContentClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <div className={style.modal}>

          {/* Header con botón de cierre */}
          <header className={style.modal__header}>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={onClose}
              aria-label="Close modal"
            >
              <FiX />
            </Button>
          </header>

          {/* Cuerpo del modal */}
          <div className={style.modal__body}>
            {children}
          </div>

        </div>
      </div>
    </section>
  );

  /**
   * Renderiza el modal fuera del árbol principal
   * para evitar problemas de stacking y overflow.
   */
  return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;