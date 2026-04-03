// /**
//  * =========================================================
//  * Status Metadata
//  * ---------------------------------------------------------
//  * Definición centralizada de metadatos para los distintos
//  * estados que puede tener una entidad dentro del sistema
//  * (por ejemplo: proyectos, contenidos, procesos o tareas).
//  *
//  * Este archivo permite asociar a cada estado:
//  * - etiquetas multilenguaje
//  * - descripciones del estado
//  * - iconos representativos
//  * - color identificador para UI
//  *
//  * Arquitectura:
//  * - Basado en enums para tipado fuerte
//  * - Uso de Record<K, V> para mapear cada estado
//  * - Integración con el tipo compartido EntityMeta
//  *
//  * Responsabilidades:
//  * - Estandarizar los estados dentro de la aplicación
//  * - Facilitar representación visual consistente en UI
//  * - Servir como catálogo semántico de estados
//  *
//  * Utilizado en:
//  * - gestión de contenido
//  * - visualización de proyectos
//  * - seguimiento de procesos o tareas
//  * =========================================================
//  */

// import { Status } from "@/shared/enums";
// import { EntityMeta } from "../shared/meta.types";
// import {
//   FileEdit,
//   Eye,
//   Archive,
//   Calendar,
//   Loader,
//   CheckCircle2,
//   AlertCircle,
//   XCircle,
//   Trash2,
// } from "lucide-react";

// /**
//  * =========================================================
//  * STATUS_META
//  * ---------------------------------------------------------
//  * Mapa de metadatos asociado a cada estado definido en el
//  * enum `Status`.
//  *
//  * Estructura:
//  * Record<Status, EntityMeta>
//  *
//  * Cada entrada define:
//  * - labels y description en múltiples idiomas
//  * - icono representativo (lucide-react)
//  * - color identificador utilizado en UI
//  * =========================================================
//  */
// export const STATUS_META: Record<Status, EntityMeta> = {

//   /**
//    * ======================================================
//    * DRAFT
//    * ------------------------------------------------------
//    * Estado inicial donde el contenido aún está en proceso
//    * de edición y no es visible públicamente.
//    * ======================================================
//    */
//   [Status.DRAFT]: {
//     es: {
//       labels: "Borrador",
//       description:
//         "Contenido en edición que aún no es visible públicamente.",
//     },
//     en: {
//       labels: "Draft",
//       description:
//         "Content in editing stage, not publicly visible yet.",
//     },
//     icon: FileEdit,
//     color: "#9CA3AF",
//   },

//   /**
//    * ======================================================
//    * PUBLISHED
//    * ------------------------------------------------------
//    * Estado que indica que el contenido ya está disponible
//    * públicamente para los usuarios.
//    * ======================================================
//    */
//   [Status.PUBLISHED]: {
//     es: {
//       labels: "Publicado",
//       description:
//         "Disponible públicamente para consumo.",
//     },
//     en: {
//       labels: "Published",
//       description:
//         "Publicly available for consumption.",
//     },
//     icon: Eye,
//     color: "#2563EB",
//   },

//   /**
//    * ======================================================
//    * ARCHIVED
//    * ------------------------------------------------------
//    * Estado que indica que el contenido o entidad ya no
//    * está activo, pero se conserva para referencia histórica.
//    * ======================================================
//    */
//   [Status.ARCHIVED]: {
//     es: {
//       labels: "Archivado",
//       description:
//         "Ya no está activo, pero se conserva para referencia.",
//     },
//     en: {
//       labels: "Archived",
//       description:
//         "No longer active but kept for reference.",
//     },
//     icon: Archive,
//     color: "#6B7280",
//   },

//   /**
//    * ======================================================
//    * PLANNED
//    * ------------------------------------------------------
//    * Estado utilizado cuando un proyecto o tarea ha sido
//    * definido, pero aún no ha comenzado su ejecución.
//    * ======================================================
//    */
//   [Status.PLANNED]: {
//     es: {
//       labels: "Planificado",
//       description:
//         "Definido pero aún no iniciado.",
//     },
//     en: {
//       labels: "Planned",
//       description:
//         "Defined but not yet started.",
//     },
//     icon: Calendar,
//     color: "#0EA5E9",
//   },

//   /**
//    * ======================================================
//    * IN_PROGRESS
//    * ------------------------------------------------------
//    * Estado que indica que el proyecto, proceso o contenido
//    * se encuentra actualmente en desarrollo o ejecución.
//    * ======================================================
//    */
//   [Status.IN_PROGRESS]: {
//     es: {
//       labels: "En progreso",
//       description:
//         "Actualmente en desarrollo o ejecución.",
//     },
//     en: {
//       labels: "In Progress",
//       description:
//         "Currently under development or execution.",
//     },
//     icon: Loader,
//     color: "#F59E0B",
//   },

//   /**
//    * ======================================================
//    * SUCCESS
//    * ------------------------------------------------------
//    * Estado final que indica que el proyecto o proceso se
//    * completó satisfactoriamente cumpliendo los objetivos.
//    * ======================================================
//    */
//   [Status.SUCCESS]: {
//     es: {
//       labels: "Exitoso",
//       description:
//         "Finalizado con éxito y objetivos cumplidos.",
//     },
//     en: {
//       labels: "Success",
//       description:
//         "Successfully completed and objectives achieved.",
//     },
//     icon: CheckCircle2,
//     color: "#10B981",
//   },

//   /**
//    * ======================================================
//    * PARTIAL
//    * ------------------------------------------------------
//    * Estado que indica que el proyecto o proceso cumplió
//    * parcialmente los objetivos definidos.
//    * ======================================================
//    */
//   [Status.PARTIAL]: {
//     es: {
//       labels: "Parcial",
//       description:
//         "Cumple parcialmente los objetivos definidos.",
//     },
//     en: {
//       labels: "Partial",
//       description:
//         "Partially meets defined objectives.",
//     },
//     icon: AlertCircle,
//     color: "#FBBF24",
//   },

//   /**
//    * ======================================================
//    * FAILED
//    * ------------------------------------------------------
//    * Estado final que indica que el proyecto o proceso
//    * no logró cumplir los objetivos esperados.
//    * ======================================================
//    */
//   [Status.FAILED]: {
//     es: {
//       labels: "Fallido",
//       description:
//         "No logró cumplir los objetivos esperados.",
//     },
//     en: {
//       labels: "Failed",
//       description:
//         "Did not meet expected objectives.",
//     },
//     icon: XCircle,
//     color: "#EF4444",
//   },

//   /**
//    * ======================================================
//    * DEPRECATED
//    * ------------------------------------------------------
//    * Estado utilizado para indicar que una tecnología,
//    * funcionalidad o proyecto ya no se recomienda usar
//    * aunque haya sido válido anteriormente.
//    * ======================================================
//    */
//   [Status.DEPRECATED]: {
//     es: {
//       labels: "Obsoleto",
//       description:
//         "Funcionó anteriormente pero ya no se recomienda su uso.",
//     },
//     en: {
//       labels: "Deprecated",
//       description:
//         "Previously functional but no longer recommended for use.",
//     },
//     icon: Trash2,
//     color: "#7C3AED",
//   },
// };