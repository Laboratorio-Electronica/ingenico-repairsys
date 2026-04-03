/**
 * Enum representing different domains or areas of a feature.
 * Useful for categorizing features by their focus in the application.
 */
export enum FeatureDomain {
  /** Features related to technical implementation or low-level system behavior */
  TECHNICAL = "TECHNICAL",

  /** Features that focus on business logic or functional requirements */
  FUNCTIONAL = "FUNCTIONAL",

  /** Features that affect the user interface or user experience */
  UI = "UI",

  /** Features related to backend processes, APIs, or server logic */
  BACKEND = "BACKEND",

  /** Features that address security concerns, vulnerabilities, or access control */
  SECURITY = "SECURITY",

  /** Features concerning the overall system architecture or design decisions */
  ARCHITECTURE = "ARCHITECTURE",
}
